const User = require("../users/user.model");
const Transaction = require("./transaction.model");

exports.creditChild = async (req, res) => {
  const { childId, amount } = req.body;

  if (amount <= 0)
    return res.status(400).send("Invalid amount");

  const child = await User.findOne({
    _id: childId,
    parentId: req.user._id
  });

  if (!child)
    return res.status(403).send("Not your direct child");

  if (req.user.balance < amount)
    return res.status(400).send("Insufficient balance");

  // 1️ Deduct from sender
  req.user.balance -= amount;
  await req.user.save();

  // 2️ Credit child
  child.balance += amount;
  await child.save();

  // 3️ Ledger entries
  await Transaction.create([
    {
      fromUser: req.user._id,
      toUser: child._id,
      amount,
      type: "DEBIT"
    },
    {
      fromUser: req.user._id,
      toUser: child._id,
      amount,
      type: "CREDIT"
    }
  ]);

  res.json({ message: "Balance transferred successfully" });
};

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

exports.selfRecharge = async (req, res) => {
  const { amount } = req.body;

  req.user.balance += amount;
  await req.user.save();

  await Transaction.create({
    fromUser: req.user._id,
    toUser: req.user._id,
    amount,
    type: "CREDIT"
  });

  res.json({ message: "Recharge successful" });
};
