const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");

const {
  creditChild,
  myStatement,
  selfRecharge
} = require("./wallet.controller");

console.log("🔥 WALLET ROUTES LOADED");
router.use(auth);

router.post("/credit", creditChild);
router.get("/statement", myStatement);
router.post("/recharge", selfRecharge);

module.exports = router;
