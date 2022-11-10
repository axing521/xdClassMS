/***
 * @creater:ACBash
 * @create_time:22-11-10 12:25:56
 * @last_modify:ACBash
 * @modify_time:22-11-10 12:54:17
 * @line_count:27
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

app.listen(3000, () => {
    console.log("服务运行在 http://127.0.0.1:3000");
});