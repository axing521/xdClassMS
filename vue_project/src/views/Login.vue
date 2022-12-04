<template>
    <div class = "login">
        <div class = "bgp"></div>
        <div class = 'login_container'>
            <h1>小滴课程管理系统</h1>
            <el-form class = 'login_form' :model = 'userInfo' :rules = 'rules' @keyup.enter='onLogin' ref = 'ref_form'>
                <el-form-item prop = 'userName'>
                    <el-input placeholder = '请输入用户名' v-model.trim="userInfo.userName">
                        <template #prepend>
                            <el-icon><Avatar /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop = 'password'>
                    <el-input placeholder = '请输入密码' show-password v-model.trim="userInfo.password">
                        <template #prepend>
                            <el-icon><Key /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" class="login_submit" @click = 'onLogin'>登录</el-button>
                
                <div class = 'login_register' @click = 'toRegister'>
                去注册
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import router from '../router/index';
import {getLogin} from '../api/index';

/**
 * 初始的ref
 */
const ref_form = ref(null);
/**
 * 表单的数据声明
 */
const userInfo = reactive({
    userName: '',
    password: ''
});
/**
 * 表单数据校验规则
 */
const rules = {
    userName: [{required: 'true', trigger: 'blur', message: '用户名不能为空'}],
    password: [{required: 'true', trigger: 'blur', message: '密码不能为空'}],
}
/**
 * 登录的方法
 */
const onLogin = () => {
    //登录信息不为空则进行登录接口调用
    ref_form.value.validate((flag) => {
        if(flag){
            getLoginData()
        }
    })
};
/**
 * 登录的接口，获取执行登录后，后台返回的数据
 */
const getLoginData = async () => {
    //登录接口的调用......
    const res = await getLogin({userName: userInfo.userName, password: userInfo.password});

    //登录成功的消息反馈
    if(res){
        //储存后端返回的token在本地客户端
        localStorage.setItem('token', res.token);

        //登录成功的消息反馈
        ElMessage({
            message: res.message,
            type: 'success'
        })

        //成功后通过router跳转到主页路径
        router.push('/home');
    }
};

/**
 * 跳转去注册页面
 */
const toRegister = () => {
    router.push('/register');
};

</script>

<style lang='less' scoped>
@keyframes fadenum {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.login {
  height: 100%;

  .bgp {
    height: 100%;
    background-image: url("../assets/bj.jpeg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 50% 50%;
  }

  .el-icon {
    height: 30px !important;
  }

  .login_container {
    animation: fadenum 1s ease;
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;

    h1 {
      font-size: 24px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el-card {
      border-radius: 20px;
    }

    .login_form {
      .login_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .login_register {
        width: 6.25rem;
        font-size: 1.125rem;
        margin: 0 auto;
      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>