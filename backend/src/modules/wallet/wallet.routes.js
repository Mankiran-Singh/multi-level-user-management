const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");
const { creditChild } = require("./wallet.controller");

router.post("/credit", auth, creditChild);
router.get("/statement", auth, myStatement);


module.exports = router;
