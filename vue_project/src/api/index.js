/***
 * @creater:ACBash
 * @create_time:22-12-3 11:55:38
 * @last_modify:ACBash
 * @modify_time:22-12-5 12:2:9
 * @line_count:61
 **/

import request from "@/utils/request";

/**
 * 注册接口
 */
export const getRegister = async (data) => {
    const res = await request({
        method: 'post',
        url: '/api/v1/user/register',
        data
    });
    return res;
};


/**
 * 登录接口
 */
export const getLogin = async (data) => {
    const res = await request({
        method: 'post',
        url: '/api/v1/user/login',
        data
    });
    return res;
};

/**
 * 获取用户信息接口
 */
export const getUserInfo = async () => {
    const res = await request({
        method: 'get',
        url: '/api/v1/user/userInfo'
    });
    return res;
};

/**
 * 获取课程列表数据接口
 */
export const getCourse = async (data) => {
    const res = await request({
        method: 'get',
        url: '/api/v1/course/find',
        data
    });
    return res;
};

/**
 * 修改课程数据接口
 */
 export const changeCourse = async (data) => {
    const res = await request({
        method: 'get',
        url: '/api/v1/course/update',
        data
    });
    return res;
};