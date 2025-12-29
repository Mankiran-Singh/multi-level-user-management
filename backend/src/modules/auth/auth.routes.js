const express = require("express");
const router = express.Router();
const { getCaptcha, login, register, logout } = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/captcha", getCaptcha);
router.post("/logout", logout);

module.exports = router;
