const express = require("express");
const app = express();
const department = require("./routes/department");
const auth = require("./routes/auth");
const placement = require("./routes/placement");
const course = require("./routes/course");
const user = require("./routes/user");
const student = require("./routes/student");
const teacher = require("./routes/teacher");
const sendResetEmail = require("./startup/nodemailer");
const jwt = require('jsonwebtoken');
const db = require("./startup/db");
var cors = require("cors");

const listeningPort = 1500;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  return res.json({
    message: "hiiii",
  })
});

app.use("/api/getUser", user);
app.use("/api/department", department);
app.use("/api/student", student);
app.use("/api/teacher", teacher);
app.use("/api/auth", auth);
app.use("/api/course", course);
app.use("/api/placement", placement);

app.post('/api/forgot-password', async (req, res) => {
  const { email, userType } = req.body;
  if (!(userType === "STUDENT" || userType === "INSTRUCTOR" || userType === "ADMIN")) {
    return res.status(400).json({ message: 'User with this email does not exist' });
  }
  // Assuming you have a User model to fetch user data
  // db.query(
  //   "SELECT * FROM STUDENT NATURAL JOIN DEPARTMENT WHERE email=?",
  //   [req.user.email]
  // ).then(
  //   function (results) {
  //     if (results[0].length == 0)
  //       return res.status(400).send("Invalid Email or Password!");
  //     delete results[0].password;
  //     // console.log("student", results[0]);
  //     res.send(results[0][0]);
  //   });
  console.log(userType);
  try {
    const user = await db.query(
      `SELECT * FROM ${userType} WHERE email=?`,
      [email]
    );
    if (!user[0].length) {
      return res.status(400).json({ message: 'User with this email does not exist in this user type. please recheck' });
    }
    console.log(user);
    // Create a JWT token (valid for 1 hour)
    const token = jwt.sign({ id: user[0]?.[0]?.s_id, userType }, process.env.JWT_SECRET ?? "JWT_SECRET", { expiresIn: '1h' });
    // console.log(user[0]?.[0]?.s_id);
    // // Send email with reset token
    sendResetEmail(email, token);

    res.json({ message: 'Password reset email sent' });
  }
  catch (e) {
    return res.status(400).json({ message: 'User with this email does not exist' + email });
  }
});

app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "JWT_SECRET");
    console.log(decoded, password);
    if (!decoded || !decoded.userType) throw new Error();
    // Update user's password in the database
    await db.query(`SELECT * FROM ${decoded?.userType} WHERE s_id=?`, [decoded?.id], (err, users) => {
      if (err) return res.status(500).send('Server error');
      if (users.length === 0) return res.status(400).send('Invalid or expired token');

      // Hash the new password

      // Update the password and remove the reset token and expiration
      db.query('UPDATE STUDENT SET password=? WHERE s_id=?',
        [password, decoded?.id], (err) => {
          if (err) return res.status(500).send('Error updating password');
          res.status(200).send('Password has been successfully reset.');
        });
    });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.listen(listeningPort);
