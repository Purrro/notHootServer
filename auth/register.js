const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Create registration route
router.post("/", (req, res) => {
  const { email, password, password2 } = req.body;
  // console.log(email, password, password2);
  const isValidEmail = isValidEmailCheck(email);

  // Create new user and save to database
  if (email && password && password2 && password === password2) {
    // Check if user email already exists and if not, add them
    if (isValidEmail ) {
      User.insertNewUser(email, password);
    } else {
      res.json({ message: "Please enter a real email" });
    } 
    
  } else {
    // Validate user input
    if (!email || !password || !password2) {
      res.json({ message: "All fields are required" });
    }
    // Check if email is valid

    // Check if passwords match
    else if (password != password2) {
      res.json({ message: "Passwords do not match" });
    }
  }
});

const isValidEmailCheck = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = router;
