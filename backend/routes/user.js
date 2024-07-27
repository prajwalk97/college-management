const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const db = require("../startup/db");

router.get("/", auth, function (req, res) {
  db.query(
    "SELECT * FROM STUDENT NATURAL JOIN DEPARTMENT WHERE email=?",
    [req.user.email]
  ).then(
    function (results) {
      if (results[0].length == 0)
        return res.status(400).send("Invalid Email or Password!");
      delete results[0].password;
      res.send(results[0]);
    });
});

router.get("/teacher/", auth, function (req, res) {
  db.query(
    "SELECT * FROM INSTRUCTOR NATURAL JOIN DEPARTMENT WHERE email =?",
    [req.user.email]
  ).then(
    function (results) {
      if (results[0].length == 0)
        return res.status(400).send("Invalid Email or Password!");
      delete results[0].password;
      res.send(results[0]);
    });
});

router.get("/admin/", auth, function (req, res) {
  db.query("SELECT * FROM ADMIN").then(resul => {
    const [results] = resul;
    console.log("hiiiii", results);
    delete results[0].password;
    res.send(results[0]);
  }
  )
});

module.exports = router;
