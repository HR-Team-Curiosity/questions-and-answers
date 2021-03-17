DROP DATABASE IF EXISTS questions_and_answers;

CREATE DATABASE questions_and_answers;

USE questions_and_answers;

CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_added DATE NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT 0,
  helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_added DATE NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT 0,
  helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  answer_id INT NOT NULL,
  url VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers(id)
);
