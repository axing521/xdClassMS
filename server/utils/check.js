/***
 * @creater:ACBash
 * @create_time:22-11-18 0:55:53
 * @last_modify:ACBash
 * @modify_time:22-11-18 0:58:39
 * @line_count:11
 **/

const joi = require("joi");

const userName = joi.string().pattern(/^[\S]{1,6}$/).required();
const password = joi.string().pattern(/^[\S]{6,15}$/).required();

exports.userCheck = {
    body: {
        userName,
        password
	}
}