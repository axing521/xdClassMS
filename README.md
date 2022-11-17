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


### 3.vscode调试node

* 启动调试命令

  ```javascript
  nodemon --inspect app.js
  ```

* Edge浏览器打开调试地址

  ```javascript
  edge://inspect/#devices
  ```

* 打开调试工具（方式多种）

  ![image-20221110164523653](C:\Users\28274\AppData\Roaming\Typora\typora-user-images\image-20221110164523653.png)

* 选择文件加入到工作区进行断点调试(Edge-F12-SourceCode-FileSystem)
* **注意**：请求接口时不能进入断点时，需要关闭DevTools工具重新打开

### 4.用户注册接口

* 注册接口信息

  * 请求方式post

  * 参数

    userName（string）

    password（string）

* 注册用户流程

  * 校验用户名密码是否为空

    ```javascript
    let {userName, password} = req.body;
    if(!userName || !password){
        return res.send({code: 1, message: "用户名或者密码不能为空！"});
    }
    ```

  * 校验当前用户是否已注册

    ```javascript
    //userController.js
    /**
    * 用户注册
    */
    const db = require("../db/index");
    
    exports.registerController = (req, res) => {
        let {userName, password} = req.body;
        //判断用户名密码是否为空
        if(!userName || !password){
    		return res.send({code: 1, data: "用户名或者密码不能为空！"});
    }
        const userSelectSql = "select * from user where name=?";
        
        db.query(userSelectSql, userName, (err, results) => {
            if(err) return res.send({code: 1, message: err.message});
            if(results.length > 0) return res.send({code: 1, message: "用户名已存在！"});
    });
        	//密码加密
    }
    ```

  * 将用户的密码进行加密处理

    * 分类

      bcryptjs加密：每次生成的值是不一样的，更加安全。

      md5加密：每次生成的值是一样的，有可能会被解密。

    * 安装加密插件

      ```javascript
      npm i bcryptjs@2.4.3 -S
      ```

    * 配置

      ```javascript
      //userController.js
      const bcrypt = require("bcryptjs");
      
      //bcrypt.hashSync(明文密码，随机长度)
      password = bcrypt.hashSync(password, 10);
      ```

    * 生成随机的头像

      ```javascript
      //头像列表
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
      //随机生成1 - 10的整数
      const num = Math.floor(Math.random() * 10 + 1);
      
      //随机头像
      imgList[num]
      ```

    * 新用户信息插入到数据库

      ```javascript
      const userInsertSql = "insert into user (name, pwd, head_img) value (?, ?, ?)";
      
      db.query(userInsertSql, {userName, password, imgList[num]}, (err, results) => {
          //sql语句成功与否
          if(err) res.send({code: 1, message: err.message});
          //影响行数是否为1
          if(results.affectedRows !== 1){
              return res.send({code: 1, message: "注册失败"});
      }
          //注册成功
          res.send({code: 0, message: "注册成功！"});
      })
      ```

  * 注意，后端写sql等字符串时候，最好用``，以免传值用的?也是""
  * 注意，post写请求的时候都是当作字符串处理的，名字直接写老六就行，而不是“老六”，这样反而后端写入sql语句时会出问题。

###5.用户提交的表单数据校验

* 详细配置地址：https://www.npmjs.com/package/@escook/express-joi

* 安装

  ```javascript
  npm i @hapi/joi@17.1.1             //验证规则
  npm i @escook/express-joi@1.1.1    //自动对数据校验的中间件
  ```

* 配置

  * 定义用户参数校验规则

    ```javascript
    //check.js
    const joi = require("joi");
    
    const username = joi.string().pattern(/^[\S]{1,6}$/).required();
    
    const password = joi.string().pattern(/^[\S]{6,15}$/).required();
    
    exports.userCheck = {
        body: {
            username,
            password
    	}
    }
    ```

  * 使用

    ```javascript
    //user.js
    const expressJoi = require("@escook/express-joi");
    
    const {userCheck} = require("../utils/check");
    
    //注册
    router.post(
        "/register",
        expressJoi(userCheck),
        userController.registerController
    )
    ```

  * 错误中间件

    ```javascript
    //app.js
    const joi = require("joi");
    
    //错误级别中间件
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
    ```

