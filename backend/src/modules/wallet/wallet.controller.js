const mongoose = require("mongoose");
const User = require("../users/user.model");
const Transaction = require("./transaction.model");

/**
 * Credit balance to direct child only (ATOMIC)
 */

const { Types } = mongoose;
const MAX_RETRIES = 3;

exports.creditChild = async (req, res) => {
  const childId = req.body.childId;
  const amount = Number(req.body.amount);

  if (!childId || isNaN(amount) || amount <= 0) {
    return res.status(400).send("Invalid request");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const parent = await User.findById(req.user._id).session(session);
    const child = await User.findOne({
      _id: childId,
      parentId: req.user._id
    }).session(session);

    if (!child) throw "Not your direct child";
    if (parent.balance < amount) throw "Insufficient balance";

    parent.balance -= amount;
    child.balance += amount;

    await parent.save({ session });
    await child.save({ session });

    await Transaction.create(
      [
        { fromUser: parent._id, toUser: child._id, amount, type: "DEBIT" },
        { fromUser: parent._id, toUser: child._id, amount, type: "CREDIT" }
      ],
      { session, ordered: true  }
    );

    await session.commitTransaction();
    return res.json({ message: "Balance transferred successfully" });

  } catch (err) {
    await session.abortTransaction();
    console.error("CREDIT FAILED:", err);
    return res.status(500).json({ error: err });

  } finally {
    session.endSession();
  }
};




/**
 * Logged-in user's transaction statement
 */
exports.myStatement = async (req, res) => {
  const transactions = await Transaction.find({
    $or: [
      { fromUser: req.user._id },
      { toUser: req.user._id }
    ]
  })
    .populate("fromUser", "name email")
    .populate("toUser", "name email")
    .sort({ createdAt: -1 });

  res.json(transactions);
};

/**
 * Self recharge (Owner / Admin)
 */

exports.selfRecharge = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update balance
    req.user.balance += amount;
    await req.user.save({ session });

    // ✅ IMPORTANT: Transaction.create MUST receive full object
    await Transaction.create(
      [
        {
          fromUser: req.user._id,
          toUser: req.user._id,
          amount,
          type: "CREDIT"
        }
      ],
      { session }
    );

    await session.commitTransaction();
    res.json({ message: "Recharge successful" });

  } catch (err) {
    await session.abortTransaction();
    console.error("Recharge error:", err);
    res.status(500).send("Recharge failed");
  } finally {
    session.endSession();
  }
};

