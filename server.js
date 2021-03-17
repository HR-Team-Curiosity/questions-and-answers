const express = require("express");
const path = require("path");
const db = require("./db/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/qa/:productId", (req, res) => {
  res.send(
    `hey you are trying to get the questions for product ${req.params.productId}!`
  );
});

app.get("/qa/:questionId/answers", (req, res) => {
  res.send(
    `hey you are trying to get the answers for question ${req.params.questionId}!`
  );
});

//POST

app.post("/qa/:productId", (req, res) => {
  res.send(
    `hey you are trying to ask a question about product ${req.params.productId}!`
  );
});

app.post("/qa/:questionId/answers", (req, res) => {
  res.send(`hey you are trying to answer question ${req.params.questionId}!`);
});

//PUT

app.put("/qa/question/:questionId/helpful", (req, res) => {
  res.send(
    `hey you are trying mark question ${req.params.questionId} as helpful!`
  );
});

app.put("/qa/question/:questionId/report", (req, res) => {
  res.send(`hey you are trying report question ${req.params.questionId}!`);
});

app.put("/qa/answer/:answerId/helpful", (req, res) => {
  res.send(`hey you are trying mark answer ${req.params.answerId} as helpful!`);
});

app.put("/qa/answer/:answerId/report", (req, res) => {
  res.send(`hey you are trying report answer ${req.params.answerId}!`);
});

const port = 3000;

db.promise()
  .query("SELECT * FROM questions LIMIT 2")
  .then((data) => console.log(data));

app.listen(port, () => {
  console.log("The Questions and Answers service is running");
  console.log(`To get started, visit: http://localhost:${port}`);
});
