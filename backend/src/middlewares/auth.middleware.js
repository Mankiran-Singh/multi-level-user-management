const jwt = require("jsonwebtoken");
const User = require("../modules/users/user.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send("User not found");

    req.user = user; // FULL USER ATTACHED
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};
