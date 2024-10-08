const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const college_admin = require("../middleware/college_admin");
const db = require("../startup/db");

router.post("/", auth, college_admin, function (req, res) {
  const sql =
    "INSERT INTO STUDENT(name,email,year,d_id,counsellor_id,cgpa,usn,current_backlogs,password,is_spc) VALUES(?,?,?,?,?,?,?,?,?,?)";
  const {
    name,
    email,
    year,
    d_id,
    counsellor_id,
    cgpa,
    usn,
    current_backlogs,
    password,
    is_spc,
  } = req.body;
  db.query(
    sql,
    [
      name,
      email,
      year,
      d_id,
      counsellor_id,
      cgpa,
      usn,
      current_backlogs,
      password,
      is_spc,
    ]
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

router.put("/", auth, college_admin, function (req, res) {
  try {
    const sql =
      "UPDATE STUDENT SET name=?,email=?,year=?,d_id=?,counsellor_id=?,cgpa=?,usn=?,current_backlogs=?,is_spc=? WHERE s_id=?";
    const {
      name,
      email,
      year,
      d_id,
      counsellor_id,
      cgpa,
      usn,
      current_backlogs,
      is_spc,
      s_id,
    } = req.body;
    db.query(
      sql,
      [
        name,
        email,
        year,
        d_id,
        counsellor_id,
        cgpa,
        usn,
        current_backlogs,
        is_spc,
        s_id,
      ]).then(function (results) {
        console.log("re", results[0].changedRows);
        if (!results[0].changedRows) {
          return res.status(400).send("no data has been changed");
        }
        res.send(results[0]);
      }).catch((error) => {
        console.log(error);
        return res.status(400).send(error.sqlMessage);
      });
  } catch (error) {
    return res.status(400).send("You have entered incorrectly");
  }
});

router.get("/", auth, college_admin, function (req, res) {
  const sql =
    "SELECT name, email, year, d_id, counsellor_id, cgpa, usn, s_id, current_backlogs, is_spc,d_name FROM STUDENT NATURAL JOIN DEPARTMENT";
  db.query(sql).then(function (results) {
    if (!results[0].length) {
      return res.status(400).send("unexpected error occured");
      // return console.log(err);
    }
    res.send(results[0]);
  });
});

router.delete("/:id", auth, college_admin, function (req, res) {
  try {
    const sql = `DELETE FROM STUDENT WHERE s_id=?`;
    db.query(sql, [req.params.id]).then(function (results) {
      console.log(results);
      if (!results[0].affectedRows) {
        return res.status(400).send("unexpected error occured");
      }
      res.send(results[0]);
    }).catch((error) => {
      console.log(error);
      return res.status(400).send(error.sqlMessage);
    });
  } catch (error) {
    return res.status(400).send("You have entered incorrectly");
  }
});

module.exports = router;
