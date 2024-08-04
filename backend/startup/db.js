const mysql = require("mysql2")


const db = mysql.createPool({
    host: process.env.host ?? "0.0.0.0",
    user: process.env.user ?? "root",
    password: process.env.password ?? "my-secret-pw",
    database: process.env.database ?? "collegeSpace",
    port: process.env.port ?? "3306"
}).promise();

module.exports = db

