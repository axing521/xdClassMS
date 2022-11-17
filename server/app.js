/***
 * @creater:ACBash
 * @create_time:22-11-10 12:25:56
 * @last_modify:ACBash
 * @modify_time:22-11-18 1:3:0
 * @line_count:46
 **/

const express = require("express");
const app = express();

/**
 * 解析post请求的body数据
 */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * 跨域请求配置
 */
const cors = require("cors");
app.use(cors());

/**
 * 路由配置:
 * 1.用户路由
 * 2.课程路由
 */
const userRouter = require("./router/user");
app.use("/api/v1/user", userRouter);

/**
 * 错误中间件
 */
const joi = require("joi");
app.use((err, req, res, next) => {
    //joi参数校验失败
    if(err instanceof joi.ValidationError){
        return res.send({
            code: 1,
            message: err.message
		});
	}
    //未知错误
    res.send({
        code: 1,
        message: err.message
    })
})

app.listen(3000, () => {
    console.log("服务运行在 http://127.0.0.1:3000");
});