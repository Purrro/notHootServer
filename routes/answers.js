const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const db = require("./db");

// Create or edit answer with { body, iscorrect, question_id }
router.post("/create", (req, res) => {
  const answers = req.body.body;
  const isCorrect = req.body.isCorrect;
  const questionId = req.body.questionId;
  const values = [];

  // Check if there are already answers for this question

  db.query(
    "DELETE FROM answers WHERE question_id = ?",
    [questionId],
    (err, result) => {
      if (err) res.status(500).send(err);
    }
  );

  for (let i = 0; i < 4; i++) {
    if (i === isCorrect) values.push([answers[i], 1, questionId]);
    else values.push([answers[i], 0, questionId]);
  }

  db.query(
    "INSERT INTO answers (body, iscorrect, question_id) VALUES ?;",
    [values],
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    }
  );
});

// Get specific game answers []
router.get("/:questionid", (req, res) => {
  const question_id = req.params.questionid;

  db.query(
    "SELECT * FROM answers WHERE question_id = (?) and is_not_active = 0",
    [question_id],
    (err, result) => {
      if (err) console.log("ERROR: " + err);
      else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
