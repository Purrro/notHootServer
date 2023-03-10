const express = require("express");
const router = express.Router();

const register = require("./register");
router.use("/register", register);

const login = require("./login");
router.use("/login", login);

module.exports = router;