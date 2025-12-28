const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");

const {
  createUser,
  getDownline,
  getDirectChildren,
  changeChildPassword,
  getMe
} = require("./user.controller");

// All user routes are protected
router.use(auth);

router.post("/create", createUser);
router.get("/downline", getDownline);
router.get("/children", getDirectChildren);
router.post("/change-password", changeChildPassword);
router.get("/me", getMe);

module.exports = router;
