const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const adminMiddleware = require("./admin.middleware");
const {
  getNextLevelUsers,
  getUserDownline,
  adminCreditUser,
  balanceSummary
} = require("./admin.controller");

// All admin routes are protected
router.use(authMiddleware, adminMiddleware);

router.get("/next-level", getNextLevelUsers);
router.get("/downline/:userId", getUserDownline);
router.post("/credit", adminCreditUser);
router.get("/balance-summary", balanceSummary);

module.exports = router;
