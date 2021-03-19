DROP DATABASE IF EXISTS questions_and_answers;

CREATE DATABASE questions_and_answers;

USE questions_and_answers;

CREATE TABLE questions (
  question_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT 0,
  question_helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (question_id)
);

CREATE TABLE answers (
  answer_id INT NOT NULL AUTO_INCREMENT,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT 0,
  helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  answer_id INT NOT NULL,
  url VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);
