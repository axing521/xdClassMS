/***
 * @creater:ACBash
 * @create_time:22-11-10 12:51:44
 * @last_modify:ACBash
 * @modify_time:22-11-20 23:23:37
 * @line_count:22
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

/**
 * 用户信息查询接口
 */
router.get("/userInfo", userController.userInfoController);

module.exports = router;