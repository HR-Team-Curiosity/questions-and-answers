const mysql = require("mysql2");
require("dotenv").config("../.env");

const db = mysql.createPool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

module.exports = db;
