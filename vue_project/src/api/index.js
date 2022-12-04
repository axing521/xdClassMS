/***
 * @creater:ACBash
 * @create_time:22-12-3 11:55:38
 * @last_modify:ACBash
 * @modify_time:22-12-4 14:53:44
 * @line_count:19
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
