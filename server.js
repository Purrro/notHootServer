const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv").config();

const router = require("./routes/index");
app.use("/", router);

app.listen(3001, () => {
  console.log("Server connected on port 3001");
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
