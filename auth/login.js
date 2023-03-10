const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const mysql = require("mysql2/promise");

const User = require("../models/user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res) => {
    const { email, password } = req.body;

  // Passport local strategy
  passport.use(
    new LocalStrategy(
      {
        emailField: email,
        passwordField: password,
      },
      async (email, password, done) => {
        const [rows, fields] = await connection.execute(
          "SELECT id, email, password FROM users WHERE email = ?",
          [email]
        );
        const user = rows[0];

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      }
    )
  );

  // Passport JWT strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  };
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      const [rows, fields] = await connection.execute(
        "SELECT id, email FROM users WHERE id = ?",
        [payload.sub]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    })
  );
});

module.exports = router;
