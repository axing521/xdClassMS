/***
 * @creater:ACBash
 * @create_time:22-11-10 12:56:22
 * @last_modify:ACBash
 * @modify_time:22-11-10 13:18:38
 * @line_count:13
 **/

const db = require("../config/db");

/**
 * 注册接口逻辑
 */
exports.registerController = (req, res) => {
    const sql = "insert into user (name, pwd, head_img) value ('老六', '666666', 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg')";

    db.query(sql, (err, results) => {
        if(err) return res.send({code: 1, message: err.message});
        res.send({code: 0, data: "注册成功"});
    });
};