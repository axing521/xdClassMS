/***
 * @creater:ACBash
 * @create_time:22-11-18 0:55:53
 * @last_modify:ACBash
 * @modify_time:22-11-21 17:32:6
 * @line_count:45
 **/

const joi = require("joi");

//用户提交参数的校验规则
const userName = joi.string().pattern(/^[\S]{1,6}$/).required();
const password = joi.string().pattern(/^[\S]{6,15}$/).required();

exports.userCheck = {
    body: {
        userName,
        password
	}
}

//课程查询参数的校验规则
const category = joi.string().required();
const page = joi.number().integer().required();
const size = joi.number().integer().required();

exports.findCourseCheck = {
    query: {
        category,
        page,
        size
    }
}

//课程修改提交参数校验规则
const title = joi.string();
const price = joi.number().integer();
const id = joi.number().min(1).integer().required();

exports.updateCourseCheck = {
    query: {
        title,
        price,
        id
    }
}

//课程修改提交参数校验规则
exports.deleteCourseCheck = {
    query: {
        id
    }
}