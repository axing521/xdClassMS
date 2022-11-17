/***
 * @creater:ACBash
 * @create_time:22-11-10 12:51:44
 * @last_modify:ACBash
 * @modify_time:22-11-18 1:5:50
 * @line_count:12
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

module.exports = router;