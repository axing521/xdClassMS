/***
 * @creater:ACBash
 * @create_time:22-11-10 12:51:44
 * @last_modify:ACBash
 * @modify_time:22-11-19 20:37:5
 * @line_count:17
 **/

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const expressJoi = require("@escook/express-joi")
const {userCheck} = require("../utils/check");

/**
 * 用户注册接口
 */
router.post("/register", expressJoi(userCheck), userController.registerController);

/**
 * 用户登录接口
 */
router.post("/login", expressJoi(userCheck), userController.loginController);

module.exports = router;