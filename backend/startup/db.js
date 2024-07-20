const mysql = require("mysql2/promise")


const db = mysql.createPool({
    host: "0.0.0.0",
    user: "root",
    password: "my-secret-pw",
    database: "collegeSpace",
    port: "3306"
}).promise

db.connect(function (err) {
    if (err)
        return console.log(err)
})

module.exports = db