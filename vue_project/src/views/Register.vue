<template>
    <div class = "register">
        <div class = "bgp"></div>
        <div class = 'register_container'>
            <h1>小滴课程管理系统</h1>
            <el-form class = 'register_form' :model = 'userInfo' :rules = 'rules' @keyup.enter='onRegister' ref = 'ref_form'>
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

                <el-button type="primary" class="register_submit" @click = 'onRegister'>注册</el-button>
                
                <div class = 'register_login' @click = 'toLogin'>
                我已有账号，去登录
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import router from '../router/index';

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
 * 注册的方法
 */
const onRegister = () => {
    //登录信息不为空则进行登录接口调用
    ref_form.value.validate((flag) => {
        if(flag){
            getRegisterData()
        }
    })
};
/**
 * 注册的接口，获取执行注册后，后台返回的数据
 */
const getRegisterData = () => {
    //注册接口的调用......

    //注册成功的消息反馈
    ElMessage({
        message: '注册成功！',
        type: 'success'
    })

    //成功后通过router跳转到登录路径
    router.push('/login');
};

/**
 * 跳转去登录页面
 */
const toLogin = () => {
    router.push('/login');
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

.register {
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

  .register_container {
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

    .register_form {
      .register_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .register_login {
        width: 12rem;
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