const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const db = require("../db");

// Get all games
router.get("/", (req, res) => {
  db.query("SELECT * FROM games WHERE is_not_active = 0", (err, result) => {
    if (err) console.log("ERROR: " + err);
    else {
      res.send(result);
    }
  });
});

// Create a new game
router.post("/create", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO games (name) VALUES (?)", [name], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

// Delete game
router.post("/delete", (req, res) => {
  const gameId = req.body.gameId;

  db.query(
    "UPDATE games SET is_not_active = 1 WHERE id = ? ;",
    [gameId],
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    }
  );
});

// Get specific game
router.get("/:gameId", (req, res) => {
  const game_id = req.params.gameId;

  db.query(
    "SELECT * FROM games WHERE id = ? and is_not_active = 0",
    [game_id],
    (err, result) => {
      if (err) console.log("ERROR: " + err);
      else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
