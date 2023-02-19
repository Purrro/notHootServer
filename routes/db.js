const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const user = process.env.DB_USER;

const db = mysql.createConnection({
    user: user,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    insecureAuth: true,
  });

  module.exports = db;