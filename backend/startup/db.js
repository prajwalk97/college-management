const mysql = require("mysql2")


const db = mysql.createPool({
    host: "0.0.0.0",
    user: "root",
    password: "my-secret-pw",
    database: "collegeSpace",
    port: "3306"
}).promise();

module.exports = db