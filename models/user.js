const mysql = require("mysql2");
const db = require("../db");

const create = (user, res) => {
  console.log(user.email, user.password) + "here";
  const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
  db.query(sql, [user.email, user.password], (err, result) => {
    if (err) res.send(err);
    return null, result;
  });
};

const getUserByEmail = (email, res) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], (err, result) => {
    if (err) res.send(err);
    console.log(result);
    return result;
  });
};

const validateDuplicateEntry = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        // If a result is returned, the email already exists in the database
        return resolve(false);
      } else {
        // If no result is returned, the email is unique
        return resolve(true);
      }
    });
  });
};

const insertNewUser = async (email, password) => {
  try {
    const isUnique = await validateDuplicateEntry(email);
    if (!isUnique) {
      console.log("Duplicate email found!");
      console.log({ message: "User already exists" });
      return;
    }
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.query(query, [email, password], (error, results) => {
      if (error) {
        console.log("Error inserting new user:", error);
        return;
      }
      console.log("New user inserted with ID:", results.insertId);
      return;
    });
  } catch (error) {
    console.log("Error validating duplicate entry:", error);
    return;
  }
};

module.exports = {
  create,
  getUserByEmail,
  validateDuplicateEntry,
  insertNewUser,
};
