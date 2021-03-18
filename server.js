const express = require("express");
const path = require("path");
var cors = require("cors");
const db = require("./db/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/qa/:productId", (req, res) => {
  var responseObj = {
    product_id: req.params.productId,
    results: [],
  };

  db.promise()
    .query(`SELECT * FROM questions WHERE product_id = ${req.params.productId}`)
    .then((data) => {
      if (!data[0].length) throw "No questions found!";
      responseObj.results = data[0];
    })
    .then(() => {
      console.log(responseObj);
      res.json(responseObj);
    })
    .catch((err) => res.send(err));
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

app.listen(port, () => {
  console.log("The Questions and Answers service is running");
  console.log(`To get started, visit: http://localhost:${port}`);
});
