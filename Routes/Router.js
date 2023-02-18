const express = require("express");
const router = express.Router();

const gamesRouter = require("./Games/GamesRouter");
router.use("/games", gamesRouter);

const questionsRouter = require("./Questions/QuestionsRouter");
router.use("/questions", questionsRouter);

const answersRouter = require("./Answers/AnswersRouter");
router.use("/answers", answersRouter);

module.exports = router;