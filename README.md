# Geek-course-background-management-system
自己独立实现的全栈项目，极客课程后台管理系统，vue3 + express + mysql。

🚀技术栈：vue3，express，mysql

### 1.项目需求分析

* 后端接口

  * 课程相关
    * 课程查询接口
    * 课程修改接口
    * 课程删除接口
  * 用户相关
    * 用户注册接口
    * 用户登录接口
    * 用户查询接口

* 数据库数据结构

  * 用户数据表

    | 字段     | 含义   |
    | -------- | ------ |
    | name     | 用户名 |
    | password | 密码   |
    | headImg  | 头像   |

  * 课程数据表

    | 字段      | 含义     |
    | --------- | -------- |
    | title     | 标题     |
    | courseImg | 图片     |
    | price     | 价格     |
    | point     | 评分     |
    | category  | 分类     |
    | del       | 是否删除 |

### 2.项目初始化

* 创建项目

  * 初始化和安装

    ```javascript
    npm init -y
    npm i express@4.17.3 -S
    ```

  * 文件配置

    ```javascript
    const express = require("express");
    const app = express();
    
    app.listen(3000, () => {
    	console.log("服务运行在 http://127.0.0.1:3000")
    })
    ```

* 配置解析请求参数的中间件

  * 安装

    ```javascript
    npm i body-parser@1.19.2 -S
    ```

  * 配置

    ```javascript
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    ```

  * 注意

    **配置要写在调用路由之前**

* 配置CORS跨域

  * 安装

    ```javascript
    npm i cors@2.8.5 -S
    ```

  * 配置

    ```javascript
    const cors = require("cors");
    app.use(cors());
    ```

  * 注意

    **配置要写在调用路由之前**

* 路由模块化

  * 路由配置

    ```javascript
    //app.js
    //用户路由模块
    const userRouter = require("./router/user");
    app.use("/user", userRouter);
    ```

  * 新建router文件

    ```javascript
    //user.js
    const express = require("express");
    const router = express.Router();
    const userController = require("../controllers/userController");
    
    //注册
    router.post("/register", userController.registerController);
    
    module.exports = router;
    ```

  * 新建逻辑处理文件

    ```javascript
    //userController.js
    exports.registerController = (req, res) => {
        res.send("成功");
    }
    ```

* 安装和配置mysql模块

  * 安装

    ```javascript
    npm i mysql@2.18.1 -S
    ```

  * 配置

    ```javascript
    //config/db.js
    const mysql = require("mysql");
    
    const db = mysql.createPool({
        host: "82.156.170.136",
        user: "root",
        password: "Qwepoi.123456",
        database: "Geek-course-background-management-system"
    });
    ```

    ```javascript
    //userController.js
    const db = require("../config/db");
    
    exports.registerController = (req. res) => {
        const sql = "insert into user (name, pwd, head_img) value ('老六', '666666', 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg')";
        
        db.query(sql, (err, results) => {
            if(err){
                return res.send({code: 1, message: err.message});
    }
            res.send({
                code: 0,
                data: "注册成功"
            });
    })
    };
    ```

    
