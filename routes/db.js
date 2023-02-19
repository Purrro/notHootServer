const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const port = process.env.DB_PORT;

const db = mysql.createConnection({
  user: user,
  host: host,
  password: password,
  database: database,
  port: port,
  insecureAuth: true,
});

module.exports = db;
