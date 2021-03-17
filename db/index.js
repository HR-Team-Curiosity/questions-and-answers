const mysql = require("mysql2");
const { dbToken } = require("../config.js");

const db = mysql.createPool({
  user: "root",
  password: dbToken,
  database: "questions_and_answers",
});

module.exports = db;
