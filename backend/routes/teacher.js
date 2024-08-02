const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const college_admin = require("../middleware/college_admin");
const db = require("../startup/db");

router.post("/", auth, college_admin, function (req, res) {
  const sql =
    "INSERT INTO INSTRUCTOR(name,email,d_id,password,is_hod) VALUES(?,?,?,?,?)";
  const { name, email, d_id, password, is_hod } = req.body;
  db.query(
    sql,
    [name, email, d_id, password, is_hod]).then(function (results) {
      console.log("re", results[0].changedRows);
      if (!results[0].changedRows) {
        return res.status(400).send("no data has been changed");
        // return console.log(err);
      }
      res.send(results[0]);
    }).catch((error) => {
      console.log(error);
      return res.status(400).send(error.sqlMessage);
    });
});

router.put("/", auth, college_admin, function (req, res) {
  const sql =
    "UPDATE INSTRUCTOR SET name=?,email=?,d_id=?,is_hod=? WHERE i_id=?";
  const { name, email, d_id, is_hod, i_id } = req.body;
  db.query(
    sql,
    [name, email, d_id, is_hod, i_id]).then(function (results) {
      console.log("re", results[0].changedRows);
      if (!results[0].changedRows) {
        return res.status(400).send("no data has been changed");
        // return console.log(err);
      }
      res.send(results[0]);
    }).catch((error) => {
      console.log(error);
      return res.status(400).send(error.sqlMessage);
    });
});

router.get("/", auth, college_admin, function (req, res) {
  const sql =
    "SELECT i_id,name, email,d_id,is_hod,d_name FROM INSTRUCTOR NATURAL JOIN DEPARTMENT";
  db.query(sql).then(function (results) {
    if (!results[0].length) {
      return res.status(400).send("unexpected error occured");
    }
    res.send(results[0]);
  });
});

router.delete("/:id", auth, college_admin, function (req, res) {
  const sql = "DELETE FROM INSTRUCTOR WHERE i_id=?";
  db.query(sql, [req.params.id]).then(function (results) {
    console.log("re", req.params.id, results[0]);
    if (!results[0].affectedRows) {
      return res.status(400).send("no data has been changed");
      // return console.log(err);
    }
    res.send(results[0]);
  }).catch((error) => {
    console.log(error);
    return res.status(400).send(error.sqlMessage);
  });
});

module.exports = router;
