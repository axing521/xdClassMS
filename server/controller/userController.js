/***
 * @creater:ACBash
 * @create_time:22-11-10 12:56:22
 * @last_modify:ACBash
 * @modify_time:22-11-17 13:10:44
 * @line_count:56
 **/

const db = require("../config/db");

/**
 * 注册接口逻辑
 */
exports.registerController = (req, res) => {
    /* let {password, userName} = req.body;
    const sql = "insert into user (name, pwd, head_img) value ('老六', '666666', 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg')";
    db.query(sql, (err, results) => {
        if(err) return res.send({code: 1, message: err.message});
        res.send({code: 0, data: "注册成功"});
    }); */
    
    //用户名或者密码判空的校验
    let {userName, password} = req.body;
    
    if(!userName || !password) return res.send({code: 1, message: `用户名或者密码不能为空！`});

    //用户名查重的逻辑
    let userSelectSql = `select * from user where name = ?`;
    
    //userName对于Sql语句中的 ? ,能够动态传值在SQL中
    db.query(userSelectSql, userName, (err, results) => {
        if(err) return res.send({code: 1, message: err.message});

        //判断用户是否在数据库中存在
        if(results.length > 0) return res.send({code: 1, message: `该用户名已经存在！`})

        //用户密码加密
        const bcrypt = require("bcryptjs");
        const passwordB = bcrypt.hashSync(password, 10);

        //随机生成用户头像
        const imgList = [
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
            'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
        ]
        //随机生成1 - 10的整数，以便随机生成头像
        const num = Math.floor(Math.random() * 10 + 1);

        //用户信息插入到数据库
        const userInsertSql = `insert into user (name, pwd, head_img) value (?, ?, ?)`;
        db.query(userInsertSql, [userName, passwordB, imgList[num]], (err, results) => {
            if(err) res.send({code: 1, message: err.message});
            res.send({code: 0, message: `注册成功!`});
        });
    });
};