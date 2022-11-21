/***
 * @creater:ACBash
 * @create_time:22-11-21 0:44:42
 * @last_modify:ACBash
 * @modify_time:22-11-21 17:35:5
 * @line_count:16
 **/

const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const courseController = require("../controller/courseController");
const {findCourseCheck, updateCourseCheck, deleteCourseCheck} = require("../utils/check");
//查询课程
router.get("/find", expressJoi(findCourseCheck), courseController.listVideo);

//修改课程
router.get("/update", expressJoi(updateCourseCheck), courseController.updateVideoById);

//删除课程
router.get("/delete", expressJoi(deleteCourseCheck), courseController.deleteVideoById);


module.exports = router;