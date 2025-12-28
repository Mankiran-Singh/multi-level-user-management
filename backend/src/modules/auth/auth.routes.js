const express = require("express");
const router = express.Router();
const { getCaptcha, login, register } = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/captcha", getCaptcha);

module.exports = router;
