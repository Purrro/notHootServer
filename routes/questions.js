const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const db = require("../db");

  // Get specific game questions []
  router.get("/:gameId", (req, res) => {
    const game_id = req.params.gameId;
  
    db.query(
      "SELECT * FROM questions WHERE is_not_active = 0 and game_id = (?)",
      [game_id],
      (err, result) => {
        if (err) console.log("ERROR: " + err);
        else {
          res.send(result);
        }
      }
    );
  });

  // Delete question
  router.post("/delete", (req, res) => {
    const questionId = req.body.questionId;
  
    db.query(
      "UPDATE questions SET is_not_active = 1 WHERE id = ? ;",
      [questionId],
      (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
      }
    );
  });

  // Create a new question with { body, game_id }
  router.post("/create", (req, res) => {
    const body = req.body.body;
    const game_id = req.body.game_id;
    db.query(
      "INSERT INTO questions (body, game_id) VALUES (?, ?);",
      [body, game_id],
      (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
      }
    );
  });

  module.exports = router;