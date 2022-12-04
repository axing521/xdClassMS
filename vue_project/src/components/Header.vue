<template>
    <div class = 'header'>
        <div class = 'homeIcon'>
            <el-icon size = '25px' @click = 'handleCollapse()' :style = "{transform: isCollapse ? '' : 'rotate(180deg)'}">
                <expand />
            </el-icon>
            <span>首页</span>
        </div>
        <div class = 'user' @mouseenter="isShowUserInfo('show')" @mouseleave="isShowUserInfo('leave')">
            <img :src=userInfo.headImg alt="dance">
            <div class = 'userInfo' v-show="show">
                <div>{{userInfo.name}}</div>
                <div @click = 'loginOut'>退出登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref, defineProps, onMounted, reactive } from 'vue';
import {getUserInfo} from '../api/index';

/**
 * 获取父组件的参数
 */
const {handleCollapse, isCollapse} = defineProps(['handleCollapse', 'isCollapse']);

/**
 * 鼠标移动个人信息的展示
 */
let show = ref(false);
const isShowUserInfo = (flag) => {
    show.value = flag == 'show';
}

/**
 * 获取用户信息
 */
const userInfo = reactive({
    name: '',
    headImg: ''
})
//用户信息接口的调用
const getUserInfoData = async () => {
    const res = await getUserInfo();

    if(res){
        userInfo.name = res.name;
        userInfo.headImg = res.headImg;
    }
};
//初始化渲染的时候调用
onMounted(() => {
    getUserInfoData();
});

/**
 * 退出登录按钮
 */
const loginOut = () => {
    router.push('/login');
    localStorage.removeItem('token');
};

</script>

<style lang='less' scoped>
.userInfo {
  z-index: 22;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: -65px;
  background-color: #fff;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;

  div:hover {
    color: #409eff;
  }

  div {
    padding: 10px;
  }
}

.header {
  position: relative;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .homeIcon {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
      font-size: 1.25rem;
    }
  }

  .user {
    display: flex;
    justify-content: center;
    width: 80px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>