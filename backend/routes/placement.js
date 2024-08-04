const db = require("../startup/db");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dept_admin = require("../middleware/dept_admin");

router.get("/", auth, function (req, res) {
  db.query(
    "SELECT * FROM PLACEMENT WHERE (placement_id IN (SELECT p_id FROM PLACEMENT_ELIGIBILITY WHERE ?=d_id) AND ?=year AND ?>=min_cgpa AND ?<=max_backlogs) ORDER BY date DESC",
    [req.user.d_id, req.user.year, req.user.cgpa, req.user.current_backlogs]).then(function (results) {
      if (!results[0].length) {
        return res.status(300).send("No companies to apply yet for your profile");
        // return console.log(err);
      }
      res.send(results[0]);
    });
});

router.post("/", auth, dept_admin, function (req, res) {
  const sql1 = `INSERT INTO PLACEMENT(company,job_profile,stipend,max_backlogs,min_cgpa,role,year,category) VALUES (?,?,?,?,?,?,?,?)`;
  const sql2 = `SELECT placement_id FROM PLACEMENT WHERE company=? and job_profile=? and year=? and stipend=? and category=?`;
  db.query(
    sql1,
    [
      req.body.company,
      req.body.job_profile,
      req.body.stipend,
      req.body.max_backlogs,
      req.body.min_cgpa,
      req.body.role,
      req.body.year,
      req.body.category,
    ]
  ).then(function (results) {
    if (!results[0].affectedRows) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    db.query(
      sql2,
      [
        req.body.company,
        req.body.job_profile,
        req.body.year,
        req.body.stipend,
        req.body.category,
      ]).then(function (ress) {
        let sql3 = "INSERT INTO PLACEMENT_ELIGIBILITY(p_id,d_id) VALUES ";
        let placement_id = '';
        placement_id = ress[0][ress[0].length - 1].placement_id;
        console.log(placement_id, ress);
        sql3 += ` (${placement_id},${parseInt(req.user.d_id)})`;
        db.query(sql3).then(function (results) {
          if (!results[0].affectedRows) {
            res.status(400).send(err.sqlMessage);
            return console.log(err);
          }
          res.send(results[0]);
        }).catch((error) => {
          console.log(error);
          return res.status(400).send(error.sqlMessage);
        });
      }).catch((error) => {
        console.log(error);
        return res.status(400).send(error.sqlMessage);
      });
  }).catch((error) => {
    console.log(error);
    return res.status(400).send(error.sqlMessage);
  });

  // function (err, results, fields) {
  //   if (err) return console.log(err);
  //   let sql3 = "INSERT INTO PLACEMENT_ELIGIBILITY(p_id,d_id) VALUES ";
  //   sql3 += ` (${results[0].placement_id},${parseInt(req.user.d_id)})`;
  //   db.query(sql3, function (err, results, fields) {
  //     if (err) return console.log(err);
  //     res.send(results);
  //   });
  // }
  // );
});

router.post("/register", auth, function (req, res) {
  const sql = `INSERT INTO PLACEMENT_STUDENTS(s_id,placement_id) VALUES(?,?)`;
  db.query(
    sql,
    [req.user.s_id, req.body.placement_id])
    .then(function (results) {
      if (!results[0].affectedRows) {
        return res.status(400).send(err.sqlMessage);
      }
      res.send(results[0]);
    }).catch((error) => {
      console.log(error);
      return res.status(400).send(error.sqlMessage);
    });
});

router.get("/individual", auth, function (req, res) {
  const sql = `SELECT placement_id FROM PLACEMENT_STUDENTS WHERE ?=s_id`;
  db.query(sql, [req.user.s_id]).then(function (results) {
    res.send(results[0]);
  });
});

module.exports = router;
