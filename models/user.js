const db = require("../db");

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

const insertNewUser = async (email, password, callback) => {
  try {
    const isUnique = await validateDuplicateEntry(email);
    if (!isUnique) {
      callback(409, { message: "User already exists" });
    } else {
      const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
      db.query(query, [email, password], (error, results) => {
        if (error) {
          callback(500, { message: "Error inserting new user" });
        } else {
          console.log();
          callback(201, {
            message: "New user inserted with ID:" + results.insertId,
          });
        }
      });
    }
  } catch (error) {
    console.log("Error validating duplicate entry:", error);
    callback(500, { message: "Internal server error" });
  }
};

module.exports = {
  validateDuplicateEntry,
  insertNewUser,
};
