const express = require("express");
const router = express.Router();
const db = require("../startup/db");
const auth = require("../middleware/auth");
const dept_admin = require("../middleware/dept_admin");

router.get("/", auth, function (req, res) {
  const sql = `SELECT * FROM DEPARTMENT`;
  db.query(sql).then(function (results) {
    if (!results[0].length) {
      return res.status(400).send("unexpected error occured");
      // return console.log(err);
    }
    res.send(results[0]);
  });
});

router.get("/post", auth, (req, res) => {
  db.query(
    "SELECT * FROM DEPARTMENT_POST WHERE ?=d_id AND ?=YEAR ORDER BY date DESC",
    [req.user.d_id, req.user.year],
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.status(400).send(err.sqlMessage);
      }
      res.send(results);
    }
  );
});

router.post("/post", auth, dept_admin, (req, res) => {
  const query = `INSERT INTO DEPARTMENT_POST(year,title,message,d_id) VALUES (?,?,?,?)`;
  db.query(
    query,
    [req.body.year, req.body.title, req.body.message, req.user.d_id]).then(function (results) {
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

router.get("/post/all", auth, (req, res) => {
  db.query(
    "SELECT * FROM DEPARTMENT_POST ORDER BY date DESC",
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.status(400).send(err.sqlMessage);
      }
      res.send(results);
    }
  );
});

module.exports = router;
