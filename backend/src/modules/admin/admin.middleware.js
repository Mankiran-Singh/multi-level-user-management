module.exports = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).send("Admin access only");

  next();
};
