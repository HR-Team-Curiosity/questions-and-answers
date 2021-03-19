const mysql = require("mysql2");
require("dotenv").config("../.env");

const db = mysql.createPool({
  user: "root",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = db;
