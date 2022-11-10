/***
 * @creater:ACBash
 * @create_time:22-11-10 12:51:44
 * @last_modify:ACBash
 * @modify_time:22-11-10 12:57:25
 * @line_count:8
 **/

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//注册
router.post("/register", userController.registerController);

module.exports = router;