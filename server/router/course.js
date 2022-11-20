/***
 * @creater:ACBash
 * @create_time:22-11-21 0:44:42
 * @last_modify:ACBash
 * @modify_time:22-11-21 0:56:19
 * @line_count:9
 **/

const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const courseController = require("../controller/courseController");
const {findCourseCheck} = require("../utils/check");
//查询课程
router.get("/find", expressJoi(findCourseCheck), courseController.listVideo);

module.exports = router;