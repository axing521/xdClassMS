/***
 * @creater:ACBash
 * @create_time:22-11-10 12:51:44
 * @last_modify:ACBash
 * @modify_time:22-11-17 11:20:2
 * @line_count:10
 **/

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/**
 * 用户注册接口
 */
router.post("/register", userController.registerController);

module.exports = router;