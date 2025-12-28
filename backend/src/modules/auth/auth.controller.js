// auth.controller.js
const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const { generateCaptcha } = require("../../utils/captcha.util");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hashed,
    ancestorIds: req.user
      ? [...req.user.ancestorIds, req.user._id]
      : []
  });

  res.json(user);
};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    console.log("🔥 Login attempt");
  const { email, password, captcha } = req.body;

  // 1️ CAPTCHA validation
  if (
    !req.session.captcha ||
    req.session.captcha.expiresAt < Date.now() ||
    captcha !== req.session.captcha.value
  ) {
    return res.status(400).send("Invalid or expired CAPTCHA");
  }

  // Clear CAPTCHA after use
  req.session.captcha = null;

  // 2️ Normal login flow
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.json({ message: "Login successful" });
};


exports.changeChildPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  const child = await User.findOne({
    _id: userId,
    parentId: req.user._id
  });

  if (!child)
    return res.status(403).send("Not allowed");

  child.password = await bcrypt.hash(newPassword, 10);
  await child.save();

  res.json({ message: "Password updated" });
};


exports.getCaptcha = (req, res) => {
  const captcha = generateCaptcha();

  req.session.captcha = {
    value: captcha,
    expiresAt: Date.now() + 5 * 60 * 1000
  };

  res.json({
    captcha 
  });
};