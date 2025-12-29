const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");

const {
  creditChild,
  myStatement,
  selfRecharge
} = require("./wallet.controller");

router.use(auth);

router.post("/credit", creditChild);
router.get("/statement", myStatement);
router.post("/recharge", selfRecharge);

module.exports = router;
