const express = require("express");
require("dotenv").config();
const path = require("path");
var cors = require("cors");
const db = require("./db/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var today = new Date().toISOString().slice(0, 19).replace("T", " ");

//GET

app.get("/", (req, res) => {
  res.send("hello world");
});

//get questions
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

//get answers
app.get("/qa/:questionId/answers", (req, res) => {
  var responseObj = {
    question: req.params.questionId,
    page: req.params.page || 1,
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
        row.photos = JSON.parse(row.photos);
        if (row.photos === null) row.photos = [];
        return row;
      });
      responseObj.results = dataWPhotos;
    })
    .then(() => {
      res.json(responseObj);
    })
    .catch((err) => res.send(err));
});

//POST
//add question
app.post("/qa/:productId", (req, res) => {
  db.promise()
    .query(
      `INSERT INTO questions
      VALUES (NULL, ${req.params.productId}, '${req.body.body}', '${today}', '${req.body.name}', '${req.body.email}', 0, 0)`
    )
    .then(res.sendStatus(200));
});

//add answer
app.post("/qa/:questionId/answers", (req, res) => {
  db.promise()
    .query(
      `INSERT INTO answers
    VALUES (NULL, ${req.params.questionId}, '${req.body.body}', '${today}', '${req.body.name}', '${req.body.email}', 0, 0)`
    )
    .then((insertResponse) => {
      const answer_id = insertResponse[0].insertId;
      if (req.body.photos.length) {
        let promises = req.body.photos.map((img) => {
          return db
            .promise()
            .query(`INSERT INTO photos VALUES (NULL, ${answer_id}, '${img}')`);
        });
        return Promise.all(promises);
      }
      return;
    })
    .then(res.sendStatus(200));
});

//PUT

app.put("/qa/question/:questionId/helpful", (req, res) => {
  console.log("trying to log");
  db.promise()
    .query(
      `UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = ${req.params.questionId}`
    )
    .then(() => console.log(`added helpful to ${req.params.questionId}`))
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
  db.promise()
    .query(
      `UPDATE answers
      SET helpfulness = helpfulness + 1
      WHERE answer_id = ${req.params.answerId}`
    )
    .then(() => res.sendStatus(200));
});

app.put("/qa/answer/:answerId/report", (req, res) => {
  db.promise()
    .query(
      `UPDATE answers
      SET reported = not reported
      WHERE answer_id = ${req.params.answerId}`
    )
    .then(() => res.sendStatus(200));
});

const port = 3000;

app.listen(port, () => {
  console.log("The Questions and Answers service is running");
  console.log(`To get started, visit: http://localhost:${port}`);
});
