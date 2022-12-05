# Geek-course-background-management-system
自己独立实现的全栈项目，极客课程后台管理系统，vue3 + express + mysql。

🚀技术栈：vue3，express，mysql

### 1. 项目需求分析

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

### 2. 项目初始化

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


### 3. vscode调试node

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

### 4. 用户注册接口

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

###5. 用户提交的表单数据校验

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

### 6. 用户登录接口

* 登录接口信息

  * 请求方式POST

  * 参数

    userName（string）

    password（string）

* 校验用户提交参数是否合法

  ```javascript
  //user.js
  router.post("/login", expressJoi(userCheck), userController.loginController);
  ```

* 判断用户名是否存在

  ```javascript
  //userController.js
  exports.loginController = (req, res) => {
      const {userName, password} = req.body;
      const userSelectSql = `select * from user where name = ?`;
      db.query(userSelectSql, userName, (err, results) => {
          if(err) return res.send({code: 1, message: err.message})；
          if(results.length == 0) return res.send({code: 1, message: `账号不存在！`});
          res.send({code: 0, message: `登录成功！`});
  })
  }
  ```

* 判断密码是否正确

  ```javascript
  const compareState = bcrypt.compareSync(password, results[0].pwd);
  if(!compareState) return res.send({code: 1, message: `密码错误！`});
  ```

* JWT生成token认证

  * JWT

    全称是json web token，最新流行的跨域认证方案，可以在客户端和服务器之间安全可靠的传递用户信息。(session不能跨域)

    生成token时，不能将用户的密码一起拼接。

    ```
    "xdclasseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjp7ImlkIjoxNSwibmFtZSI6IuWwj-a7tCIsInB3ZCI6IiQyYSQxMCQubTY3bHdYMi5WVmFSdUpEd0dDdHhlM0cwRTA3d1NMcEZkdlFraHJlTFRuNTJicVkuelpuVyIsImhlYWRfaW1nIjpudWxsLCJwaG9uZSI6IiIsImNyZWF0ZV90aW1lIjpudWxsfSwicHdkIjoiIiwiaGVhZF9pbWciOiIiLCJpYXQiOjE2NDg3OTQyMDYsImV4cCI6MTY0ODc5NzgwNn0.PQD7ucT3UgwW59HAITIQqUPVc3lNSN0EuhQ9hiHILMk"
    
    头部，用户信息，签名
    
    头部：加密算法的信息，创建token的时间，过期的时间
    用户信息：id、昵称、头像
    签名：头部和用户信息的加密内容
    ```

  * JWT工作原理

    ![image-20220424125259447](https://file.xdclass.net/note/2022/79-vue3%2Bnode%2Bmysql/images/image-20220424125259447.png)

  * 安装JWT插件

    ```javascript
    npm i jsonwebtoken@8.5.1 -S
    ```

  * 定义加密内容

    ```javascript
    //config/jwtSecretKey.js
    module.export = {
        jwtSecretKey: `xdclass.net`
    }
    ```

  * 配置

    ```javascript
    //userController.js
    const jwt = require("jsonwebtoken");
    const {jwtSecretKey} = require("../config/jwtSecretKey");
    
    //jwt生成
    const user = {...results[0], pwd: ``}
    const token = jwt.sign(user, jwtSecretKey, {expireIn: `5s`});
    res.send({code: 0, message: `登录成功`, token: `Bearer ` + token});
    ```

* 解析token

  * 安装

    ```javascript
    npm i express-jwt@6.1.1 -S
    ```

  * 在路由配置之前配置解析token中间件

    ```javascript
    const expressJwt = require("express-jwt");
    const {jwtSecretKey} = require("../config/jwtSecretKey");
    
    //expressJwt({secret: jwtSecretKey})解析token的中间件
    //unless({path: [/^\/user\//]})指定哪些接口不需要访问权限
    app.use(expressJwt({secret: jwtSecretKey, algorithms: [`HS256`]}).unless({path:['/api/v1/user/register', '/api/v1/user/login'] }))
    ```

  * 错误中间件处理身份认证失败的错误

    ```javascript
    if(err.name == `UnauthorizedError`){
        return res.send({code: 1, message: `身份认证失败！`})
    }
    ```


### 7. 用户信息查询接口

* 新建查询接口

  ```javascript
  //获取用户数据
  router.get("/userInfo", userController.userInfoController);
  ```

* 解析token方法

  ```javascript
  const userInfo = jwt.verify(token.split(`Bearer `)[1], jwtSecretKey);
  ```

* 查询接口逻辑

  ```javascript
  //获取用户数据
  exports.userInfoController = (req, res) => {
      //获取用户token解析
      const token = req.headers.authorization;
      const userInfo = jwt.verify(token.split(`Bearer `)[1], jwtSecretKey);
      res.send({
      	code: 0,
          data: {
              name: userInfo.name,
              headImg: userInfo.head_img
  		}
  	})
  }
  ```

### 8. 课程查询接口

* 课程查询接口信息

  * 请求方式 GET

  * 参数

    category（string）：分类

    page（number）：页数

    size（number）：个数

* 课程模块的路由配置

  ```javascript
  //app.js
  const courseRouter = require("./router/course");
  app.use("/api/v1/course", courseRouter);
  ```

* 课程查询接口配置

  ```javascript
  //course.js
  const express = require("express");
  const router = express.Router();
  const courseController = require("../controller/courseController");
  const {findCourseCheck} = require("../utils/check");
  //查询课程
  router.get("/find", expressJoi(findCourseCheck), courseController.listVideo);
  ```

* 课程查询逻辑，查询数据库返回客户端

  ```javascript
  //courseController.js
  const db = require("../config/db");
  //课程查询逻辑
  exports.listVideo = (req, res) => {
      let {category, page, size} = req.query;
      page = (page - 1) * size;
      let pageSql = `select * from video where del = 0 and category = ? order by id limit ?,?`;
      let totalSql = `select count(*) as total from video where del = 0 and category = ?`;
      
      db.query(pageSql, [category, Number(page), Number(size)], (err, resPage) => {
          if(err) return res.send({code: 1, message: err.message});
          db.query(totalSql, [category], (err, resTotal) => {
              if(err) return res.send({code: 1, message: err.message});
              res.send({
                  code: 0,
                  data: {
                      total: resTotal[0].total,
                      list: resPage
  				}
  			})
  		})
  	})
  }
  ```

### 9. 课程修改接口

* 课程修改接口信息

  * 请求方式GET

  * 参数

    title（string）：标题

    price（number）：价格

    id（number）：课程id

* 课程修改接口配置

  ```javascript
  //course.js
  //修改课程
  router.get("/update", expressJoi(updateCourseCheck), courseController.updateVideoById);
  ```

* 参数校验规则

  ```javascript
  //check.js
  //课程修改提交参数校验规则
  const title = joi.string();
  const price = joi.number().integer();
  const id = joi.number().min(1).integer().required();
  
  exports.updateCourseCheck = {
      query: {
          title,
          price,
          id
  }
  }
  ```

* 课程修改逻辑

  ```javascript
  //courseController.js
  exports.updateVideoById = (req, res) => {
      let {title, price, id} = req.query;
      let arr = [];
      let changeSql = `update video set `;
      
      //修改标题和价格
      if(title && price){
          changeSql += `title = ?, price = ? where id = ?`;
          arr = [title, Number(price), Number(id)];
  	}else if(title){
          //修改标题
          changeSql += `title = ? where id = ?`;
          arr = [title, Number(id)];
  	}else if(price){
          //修改课程价格
          changeSql += `price = ? where id = ?`;
          arr = [Number(price), Number(id)];
  	}
      
      db.query(changeSql, arr, (err, results) => {
          if(err) return res.send({code: 1, message: err.message});
          res.send({
              code: 0,
              data: {
                  message: `修改成功！`
  			}
          })
  	})
  }
  ```

### 10. 课程删除接口

* 课程删除接口配置

  ```javascript
  //course.js
  router.get("/delete", courseController.deleteVideoById);
  ```

* 课程修改提交参数校验规则

  ```javascript
  exports.deleteCourseCheck = {
      query: {
          id
      }
  }
  ```

* 课程删除逻辑

  ```javascript
  //courseController.js
  exports.deleteVideoById = (req, res) => {
      let {id} = req.query;
      let deleteSql = `update video set del = 1 where id = ?`;
      
      db.query(deleteSql, id, (err, results) => {
          if(err) return res.send({code: 1, message: err.message});
          
          res.send({
              code: 0,
              data: {
                  message: `删除成功`
  			}
          })
  	})
  }
  ```

### 11. 页面需求分析

* 设计图页面

  * 用户页面

    ![image-20220426105859708](https://file.xdclass.net/note/2022/79-vue3%2Bnode%2Bmysql/images/image-20220426105859708.png)

  * 首页

    ![image-20220426110003101](https://file.xdclass.net/note/2022/79-vue3%2Bnode%2Bmysql/images/image-20220426110003101.png)

* 页面需求分析

  * 通过路由实现首页、登录、注册页面切换
  * 使用element-plus组件库实现页面的样式
    * 布局
    * 菜单
    * 表格
  * 使用element-plus组件库实现页面的交互
    * 搜索功能
    * 分页切换功能（组件库有问题的组件）
    * 编辑修改课程信息功能
    * 删除课程功能

### 12. 项目初始化

* vue3项目创建

  * 安装脚手架vue/cli

    ```javascript
    npm install -g @vue/cli@5.0.4
    ```

  * 查看vue/cli版本

    ```javascript
    vue -v
    vue --version
    ```

  * 如果版本不一致

    ```javascript
    npm uninstall -g vue-cli
    npm install -g @vue/cli@5.0.4
    ```

  * 创建项目

    ```javascript
    //终端进入项目文件存放位置
    vue create xxx	//xxx文件名
    ```

  * 查看vue版本

    ```javascript
    //在package.json中查看
    ```

  * template 标签警告

    ```javascript
    //jsconfig.json
    "jsx": "preserve"
    ```

* 项目基础样式

  ```javascript
  //	/common/base.less
  ```

* 配置项目文件结构

  ```javascript
  views		//路由页面
  components	//组件
  router		//路由配置
  assets		//图片
  common		//公共样式
  api			//接口
  utils		//工具：axios封装，全局事件总线等等
  ```

### 13. 预处理器、组件库引入和代码管理

* less预处理器

  * 安装

    ```javascript
    npm i less@4.1.2 less-loader@7 -S
    ```

  * 使用

    ```html
    <style lang='less'>
    </style>
    ```

* element-plus组件自动引入配置

  * 官网地址：https://element-plus.org/zh-CN/guide/quickstart.html

  * 安装组件库依赖包

    ```javascript
    npm install element-plus@2.1.11 -S
    ```

  * 按需导入

    ```javascript
    npm install -D unplugin-vue-components@0.19.3 unplugin-auto-import@0.7.1
    ```

  * vue.config.js配置

    ```javascript
    const AutoImport = require('unplugin-auto-import/webpack');
    const Components = require('unplugin-vue-components/webpack');
    const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
    
    module.exports = {
      lintOnSave: false,   //关闭ESlint校验
      configureWebpack: {
        plugins: [
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ],
      },
    };
    ```

* element-plus图标自动引入配置

  * 全局配置

    ```javascript
    //main.js
    import * as elementIcons from "@element-plus/icons-vue";
    
    for(let iconName in elementIcons){
        app.component(iconName, elementIcons[iconName]);
    }
    ```

  * 也可以自动导入，安装插件npm install -D unplugin-icons@0
  * 然后配置vue.config.js

* 代码提交github远程仓库管理

### 14. 路由页面配置

* 路由插件安装

  ```javascript
  npm i vue-router@4.0.14 -S
  ```

* 主入口文件引入路由配置

  ```javascript
  //main.js
  import router from './router/index';
  app.use(router);
  ```

* 页面展示

  ```html
  <router-view></router-view>
  ```

* 路由配置

  ```javascript
  import { createRouter, createWebHashHistory } from 'vue-router';
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        redirect: '/login',
      },
      {
        path: '/home',
        component: () => import('../views/Home'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/login',
        component: () => import('../views/Login'),
      },
      {
        path: '/register',
        component: () => import('../views/Register'),
      },
    ],
  });
  // 路由拦截
  router.beforeEach((to, from, next) => {
    //判断是否需要登录权限
    if (to.meta.isAuth) {
      if (localStorage.getItem('token')) {
        next();
      } else {
        ElMessage.error({
          message: '请先登录',
          type: 'error',
        });
        router.push('./login');
      }
    } else {
      next();
    }
  });
  
  export default router;
  ```

* 使用

  ```javascript
  import { useRouter } from "vue-router";
  //跳转登录页面
  const router = useRouter()
  
  // import router from './router/index.js'
  router.push('/login')
  ```


### 15. 登录页面

* 登录页面样式
* 登录页面逻辑

 ### 16. 注册页面

* 注册页面样式
* 注册页面逻辑

### 17. 主页页面

* 主页布局样式
* 侧边菜单栏
* 侧边栏组件的折叠和展开
* 头部组件
* 主要内容组件
  * 课程表格
  * 课程编辑
  * 课程删除
  * 搜索功能
  * 分页功能

### 18. axios请求二次封装

* axios安装

  ```javascript
  npm i axios@0.27.2 -S
  ```

* 官网

  http://www.axios-js.com/zh-cn/

### 19. 注册和登录接口

### 20.获取用户信息接口

### 21. 课程列表查询接口

安装订阅发布插件：npm i mitt@3 -S

事件总线：eventBus.js

### 22. 课程信息修改接口

### 23. 课程列表删除接口

### 24.项目部署上线

* 域名准备
* vue3项目部署
* Node环境安装
* pm2运行Node项目
* bug修复

### 25. 存在的问题

* vue中v-model，:model，:value，:prop , :data,reactive, #defalut = 'scope',v-if,v-show,ref, prop都是什么意思,onmounted

* 异步，async，await,computed

* express框架使用axios进行post请求返回的数据是undefined的问题

  解决：因为前端响应拦截中没有data

