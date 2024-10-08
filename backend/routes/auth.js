// const bcrypt = require('bcrypt')
const express = require("express");
const router = express.Router();
const db = require("../startup/db");
const jwt = require("jsonwebtoken");

function generateAuthToken(object) {
  const token = jwt.sign(JSON.stringify(object), "jwtPrivateKey");
  return token;
}
function handleQueryResponse(req, res, result) {
  const [results] = result;
  if (results.length != 1)
    return res.status(400).send("Invalid Email or Password!");
  if (results[0].password != req.body.password)
    return res.status(400).send("Invalid Email or Password!");
  delete results[0].password;
  const token = generateAuthToken(results[0]);
  res.send({ email: results[0].email, name: results[0].name, token });
}
router.post("/instructor", (req, res) => {
  db.query(
    "SELECT * FROM INSTRUCTOR WHERE ?=email",
    [req.body.email]
  ).then((result) => handleQueryResponse(req, res, result))
});

router.post("/student", (req, res) => {
  db.query(
    "SELECT * FROM STUDENT WHERE email=?",
    [req.body.email]
  ).then((result) => handleQueryResponse(req, res, result))
});

router.post("/admin", (req, res) => {
  db.query(
    "SELECT * FROM ADMIN WHERE ?=email",
    [req.body.email]
  ).then((result) => handleQueryResponse(req, res, result))
});

module.exports = router;
