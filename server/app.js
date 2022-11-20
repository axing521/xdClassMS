/***
 * @creater:ACBash
 * @create_time:22-11-10 12:25:56
 * @last_modify:ACBash
 * @modify_time:22-11-21 0:44:39
 * @line_count:63
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
 * 解析token校验是否正确，哪些接口需要token校验
 */
const expressJwt = require("express-jwt");
const {jwtSecretKey} = require("./config/jwtSecretKey");
//expressJwt({secret: jwtSecretKey})解析token的中间件
//unless({path: [/^\/user\//]})指定哪些接口不需要访问权限
app.use(expressJwt({secret: jwtSecretKey, algorithms: [`HS256`]})
   .unless({path:[`/api/v1/user/register`, `/api/v1/user/login`] }))

/**
 * 路由配置:
 * 1.用户路由
 * 2.课程路由
 */
const userRouter = require("./router/user");
app.use("/api/v1/user", userRouter);

const courseRouter = require("./router/course");
app.use("/api/v1/course", courseRouter);

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
    //处理身份认证失败的错误
    if(err.name == `UnauthorizedError`){
        return res.send({code: 1, message: `身份认证失败！`})
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