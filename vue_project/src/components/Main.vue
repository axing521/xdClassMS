<template>
    <div>
        <div class='main'>
            <!-- <div>搜索框</div> -->
            <Table :list = 'data.list' :editClick = 'editClick' :deleteHandle = 'deleteHandle' />
            <!-- <div>分页</div> -->
        </div>

        <EditPop :popShow = 'popShow' v-if = 'popShow' :message = 'courseItemState.message' :confirmClick = 'confirmClick' />
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Table from './Table.vue';
import EditPop from './EditPop.vue';

//初始化的写死数据
const data = reactive({
    list: [
        {
            category: "front",
            courseImg: "https://file.xdclass.net/video/2022/77-QD/cover.jpeg",
            del: 0,
            id: 1,
            point: 9.8,
            price: "99",
            title: "22年新版【前端高级工程师】面试专题第一季"
        },
        {
            category: "front",
            courseImg: "https://file.xdclass.net/video/2022/75-Vue3/cover1.jpeg",
            del: 0,
            id: 2,
            point: 9.5,
            price: "99",
            title: "22年新版-零基础玩转vue3+开发仿美团外卖项目vue视频"
        },
        {
            category: "front",
            courseImg: "https://file.xdclass.net/video/2022/76-webpack5/cover.jpeg",
            del: 0,
            id: 3,
            point: 9.3,
            price: "59",
            title: "新版webpack5丨带你玩转时下最流行的构建工具"
        },
        {
            category: "front",
            courseImg: "https://file.xdclass.net/video/2021/74-git/WechatIMG3026.jpeg",
            del: 0,
            id: 4,
            point: 9.2,
            price: "39",
            title: "22年新版-玩转Git零基础到进阶实战 git视频急速入门"
        },
        {
            category: "front",
            courseImg: "https://file.xdclass.net/video/2021/73-ES6/cover.jpeg",
            del: 0,
            id: 5,
            point: 9.4,
            price: "49",
            title: "22年新版-玩转ECMAScript6零基础到进阶实战es6视频"
        },
    ]
})

/**
 * 课程编辑的逻辑
 */
//编辑的数据
const courseItemState = reactive({
    message: {}
})
//控制编辑弹窗的展示变量
let popShow = ref(false);
//控制编辑弹窗的展示方法
const isShowPop = (flag) => {
    popShow.value = flag;
}
//编辑的按钮点击事件函数
const editClick = (val) => {
    isShowPop(true);
    courseItemState.message = val;
};
//编辑弹窗vue的取消和确认按钮逻辑
const confirmClick = (val) => {
    if(val == 'cancel'){
        isShowPop(false);
    }else if(val.title != courseItemState.message.title || val.price != courseItemState.message.price){
      //更改对应课程的title/price
        data.list.map((item) => {
            if(item.id == val.id){
                item.title = val.title;
                item.price = val.price;
            }
        });
        
        //修改接口的调用...

        isShowPop(false);
        ElMessage({
            showClose: true,
            message: '更改成功！',
            type: 'success'
        })
    }else{
        ElMessage({
            showClose: true,
            message: '没发现有更改的内容噢~',
            type: 'warning'
        })
    }
};

/**
 * 课程删除的逻辑
 */
const deleteHandle = (val) => {
    if(val){
        data.list = data.list.filter((item) => {
            return item.id != val;
        });

        //删除接口的调用...

        ElMessage({
            showClose: true,
            message: '删除成功！',
            type: 'success'
        })
    }
};

</script>

<style lang='less' scoped>
.el-form {
  display: flex;
}

.main {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  position: fixed;
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none
}
</style>