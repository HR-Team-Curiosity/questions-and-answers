const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = 3000;

app.listen(port, () => {
  console.log("The Questions and Answers service is running");
  console.log(`To get started, visit: http://localhost:${port}`);
});
