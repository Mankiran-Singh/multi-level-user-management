 const bcrypt = require("bcryptjs");
const User = require("./user.model");

// Create next-level user only
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).send("Email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashed,
    parentId: req.user._id,
    ancestorIds: [...req.user.ancestorIds, req.user._id]
  });

  res.json({
    message: "User created successfully",
    userId: newUser._id
  });
};

//  Get full downline (direct + indirect)
 
exports.getDownline = async (req, res) => {
  const users = await User.find({
    ancestorIds: req.user._id
  }).select("-password");

  res.json(users);
};

// Get only direct children
exports.getDirectChildren = async (req, res) => {
  const users = await User.find({
    parentId: req.user._id
  }).select("-password");

  res.json(users);
};

//Change password of NEXT-LEVEL user only//
exports.changeChildPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  const child = await User.findOne({
    _id: userId,
    parentId: req.user._id
  });

  if (!child) {
    return res.status(403).send("You can change password of direct child only");
  }

  child.password = await bcrypt.hash(newPassword, 10);
  await child.save();

  res.json({ message: "Password updated successfully" });
};


//  Get own profile
 
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};
