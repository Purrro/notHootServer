const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "harzbatz4421",
  database: "nothoot",
  port: "3306",
  insecureAuth: true,
});

// Create a new game
app.post("/creategame", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO games (name) VALUES (?)", [name], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

// Create a new question with { body, game_id }
app.post("/createquestion", (req, res) => {
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

// Create new answer with { body, iscorrect, question_id }
app.post("/createanswers", (req, res) => {
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

// Delete question
app.post("/deletequestion", (req, res) => {
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

// Delete game
app.post("/deletegame", (req, res) => {
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

// Get all games
app.get("/showallgames", (req, res) => {
  db.query("SELECT * FROM games WHERE is_not_active = 0", (err, result) => {
    if (err) console.log("ERROR: " + err);
    else {
      res.send(result);
    }
  });
});

// Get specific game
app.get("/getgamedetails/:gameId", (req, res) => {
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

// Get Game by name

// Get specific game questions []
app.get("/getquestions/:gameId", (req, res) => {
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

app.listen(3001, () => {
  console.log("Server connected on port 3001");
});

// Get specific game questions []
app.get("/getanswers/:questionid", (req, res) => {
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

/* 
  Hint sheet for SQL commands:

    db.query(
      "SELECT * FROM `table_name` WHERE `column_name` = (?)", [value_of_`?`],
      (err, result) => {
        if (err) console.log("ERROR: " + err);
        else {
          res.send(result);
        }
      }
    );


    SELECT * FROM nothoot.questions WHERE game_id = 2 and is_not_active = 0;

    UPDATE `nothoot`.`questions` SET `is_not_active` = '1' WHERE (`id` = '1');
*/
