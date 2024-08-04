const express = require("express");
const router = express.Router();
const db = require("../startup/db");
const auth = require("../middleware/auth");
const college_admin = require("../middleware/college_admin");

router.get("/", auth, function (req, res) {
  const sql = `SELECT * FROM COURSE WHERE ?=d_id`;
  db.query(sql, [req.user.d_id]).then(function (results) {
    if (!results[0].length) {

      return res.status(300).send("Currently fgsdfgsd no announcements for your class!");
      // return console.log(err);
    }
    res.send(results[0]);
  });
});

router.post("/add", auth, college_admin, function (req, res) {
  const sql = "INSERT INTO COURSE(name,c_code,d_id) VALUES (?,?,?)";
  db.query(
    sql,
    [req.body.name, req.body.c_code, req.body.d_id]
  ).then(function (results) {
    if (!results[0].affectedRows) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    res.send(results[0]);
  }).catch((error) => {
    console.log(error);
    return res.status(400).send(error.sqlMessage);
  });
});

router.get("/all", auth, college_admin, function (req, res) {
  const sql = "SELECT * FROM COURSE";
  db.query(sql).then(function (results) {
    console.log("courses", results[0])
    if (!results[0].length) {

      return res.status(300).send("Currently fgsdfgsd no announcements for your class!");
      // return console.log(err);
    }
    res.send(results[0]);
  });
});

router.get("/posts", auth, function (req, res) {
  const sql = `SELECT * FROM CLASS_POST NATURAL JOIN COURSE WHERE c_id IN (SELECT c_id FROM COURSE_STUDENTS WHERE ?=s_id) ORDER BY DATE DESC`;
  db.query(sql, [2]).then(function (results) {
    // if (!results[0].length) {

    //   return res.status(400).send("Currently dfadsfsfas no announcements for your class!");
    //   // return console.log(err);
    // }
    res.send(results[0]);
  });
});

router.post("/post", auth, function (req, res) {
  const sql = `INSERT INTO CLASS_POST(author,c_id,message,title) VALUES (?,?,?,?)`;
  db.query(
    sql,
    [req.user.name, req.body.c_id, req.body.message, req.body.title]).then(function (results) {
      res.send("successfull");
    })
    .catch((error) => {
      return res.status(400).send(error.sqlMessage);
    });
});

router.post("/register", function (req, res) {
  const sql = "INSERT INTO COURSE_STUDENTS(s_id,c_id) VALUES(?,?)";
  db.query(
    sql,
    [req.body.s_id, req.body.c_id]).then(function (results) {
      console.log("courses", results[0])
      res.send("successfull");
    })
    .catch((error) => {
      return res.status(400).send(error.sqlMessage);
    });
});

module.exports = router;
