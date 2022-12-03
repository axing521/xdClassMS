<template>
    <div>
        <!-- <div>首页</div>
        <el-button type="primary" @click="toGo('/login')">去登录</el-button>
        <el-button type="primary" @click="toGo('/register')">去注册</el-button> -->
        <div class="common-layout">
            <el-container>
                <el-aside width="200px">
                    <Aside :isCollapse = 'isCollapse' />
                </el-aside>

                <el-container>
                    <el-header>
                        <Header :handleCollapse = 'handleCollapse' :isCollapse = 'isCollapse'/>
                    </el-header>

                    <el-main>
                        <Main />
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'
import { ref, onMounted } from 'vue'
import request from '../utils/request'
/* import router from '../router/index'
const toGo = (val) => {
    router.push(val);
} */

let isCollapse = ref(false);
const handleCollapse = () => {
    isCollapse.value = !isCollapse.value;
}

onMounted(() => {
    request({
        method: 'post',
        url: '/api/v1/user/login',
        data: {
            userName: 'acbash',
            password: 'zxcmnb123'
        }
    })
});

</script>

<style lang='less' scoped>
.el-aside {
  width: auto;
  background-color: #545c64;
  width: auto;
  overflow: hidden;
}

.el-container {
  height: 100vh;
}

.el-main {
  display: flex;
}

.el-header {
  // padding: 0 20px 0 0;
  background-color: #fff;
}
</style>