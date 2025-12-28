const mongoose = require("mongoose"); // ✅ MISSING IMPORT
const User = require("../users/user.model");
const Transaction = require("../wallet/transaction.model");

exports.getNextLevelUsers = async (req, res) => {
  const users = await User.find({
    parentId: req.user._id
  }).select("-password");

  res.json(users);
};

exports.getUserDownline = async (req, res) => {
  const { userId } = req.params;

  const downline = await User.find({
    ancestorIds: userId
  }).select("-password");

  res.json(downline);
};

exports.adminCreditUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, amount } = req.body;

    if (!userId || amount <= 0) {
      throw "Invalid request";
    }

    const user = await User.findById(userId).session(session);
    if (!user) throw "User not found";

    if (!user.parentId) {
      throw "Root user cannot be credited";
    }

    const parent = await User.findById(user.parentId).session(session);
    if (!parent) throw "Parent not found";

    if (parent.balance < amount) {
      throw "Parent has insufficient balance";
    }

    // Balance updates
    parent.balance -= amount;
    user.balance += amount;

    await parent.save({ session });
    await user.save({ session });

    // Ledger
    await Transaction.create(
      [
        {
          fromUser: parent._id,
          toUser: user._id,
          amount,
          type: "DEBIT"
        },
        {
          fromUser: parent._id,
          toUser: user._id,
          amount,
          type: "CREDIT"
        }
      ],
      { session }
    );

    await session.commitTransaction();
    res.json({ message: "Admin credit successful" });

  } catch (err) {
    await session.abortTransaction();
    res.status(400).send(err);
  } finally {
    session.endSession();
  }
};

exports.balanceSummary = async (req, res) => {
  const summary = await User.aggregate([
    {
      $group: {
        _id: null,
        totalBalance: { $sum: "$balance" },
        userCount: { $sum: 1 }
      }
    }
  ]);

  res.json(summary[0] || { totalBalance: 0, userCount: 0 });
};
