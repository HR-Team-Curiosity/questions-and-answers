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
    .query(
      `SELECT *
    FROM questions
    WHERE product_id = ${req.params.productId}
    AND reported = 0`
    )
    .then((data) => {
      responseObj.results = data[0];
    })
    .then(() => {
      res.json(responseObj);
    })
    .catch((err) => res.send(err));
});

app.get("/qa/:questionId/answers", (req, res) => {
  var responseObj = {
    question: req.params.questionId,
    page: req.params.page || 0,
    count: req.params.count || 5,
    results: [],
  };

  db.promise()
    .query(
      `SELECT answers.*, concat('[', group_concat(concat('{"id": ',id, ',"url": "',url,'"}')), ']') as photos
    FROM answers
    LEFT JOIN photos on answers.answer_id = photos.answer_id
    WHERE question_id = ${req.params.questionId}
    AND reported = 0
    GROUP BY answers.answer_id`
    )
    .then((data) => {
      let dataWPhotos = data[0].map((row) => {
        console.log(row.photos);
        row.photos = JSON.parse(row.photos);
        if (row.photos === null) row.photos = [];
        return row;
      });
      responseObj.results = dataWPhotos;
    })
    .then(() => {
      console.log(responseObj);
      res.json(responseObj);
    })
    .catch((err) => res.send(err));
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
  db.promise()
    .query(
      `UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = ${req.params.questionId}`
    )
    .then(() => res.sendStatus(200));
});

app.put("/qa/question/:questionId/report", (req, res) => {
  db.promise()
    .query(
      `UPDATE questions
    SET reported = not reported
    WHERE question_id = ${req.params.questionId}`
    )
    .then(() => res.sendStatus(200));
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
