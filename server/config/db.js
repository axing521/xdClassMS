/***
 * @creater:ACBash
 * @create_time:22-11-10 13:6:22
 * @last_modify:ACBash
 * @modify_time:22-11-10 13:10:26
 * @line_count:10
 **/

const mysql = require("mysql");

const db = mysql.createPool({
    host: "82.156.170.136",
    user: "root",
    password: "Qwepoi.123456",
    database: "Geek-course-background-management-system"
});

module.exports = db;