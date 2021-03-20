const mysql = require("mysql2");
require("dotenv").config("../.env");

console.log(process.env.DB_USERNAME);

const db = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = db;
