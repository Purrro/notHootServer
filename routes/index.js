const express = require("express");
const router = express.Router();

const gamesRouter = require("./games");
router.use("/games", gamesRouter);

const questionsRouter = require("./questions");
router.use("/questions", questionsRouter);

const answersRouter = require("./answers");
router.use("/answers", answersRouter);

module.exports = router;