<template>
    <div>
        <div class='main'>
            <el-form>
                <el-form-item>
                    <el-input placeholder = '请输入内容' v-model.trim = 'inputValue'></el-input>
                </el-form-item>
                <el-button type = 'primary' @click = 'handleClick'>查询</el-button>
            </el-form>
            <Table :list = 'courseList' :editClick = 'editClick' :deleteHandle = 'deleteHandle' />
            <Pagination :currentChange = 'currentChange' />
        </div>

        <EditPop :popShow = 'popShow' v-if = 'popShow' :message = 'courseItemState.message' :confirmClick = 'confirmClick' />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import Table from './Table.vue';
import EditPop from './EditPop.vue';
import Pagination from './Pagination.vue';
import { getCourse, changeCourse, deleteCourse } from '@/api';
import emitter from '@/utils/eventBus';
import { isFlowDeclaration } from '@babel/types';

//初始化的写死数据
const data = reactive({
    list: [
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2022/77-QD/cover.jpeg",
            del: 0,
            id: 1,
            point: 9.8,
            price: "99",
            title: "22年新版【前端高级工程师】面试专题第一季"
        },
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2022/75-Vue3/cover1.jpeg",
            del: 0,
            id: 2,
            point: 9.5,
            price: "99",
            title: "22年新版-零基础玩转vue3+开发仿美团外卖项目vue视频"
        },
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2022/76-webpack5/cover.jpeg",
            del: 0,
            id: 3,
            point: 9.3,
            price: "59",
            title: "新版webpack5丨带你玩转时下最流行的构建工具"
        },
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2021/74-git/WechatIMG3026.jpeg",
            del: 0,
            id: 4,
            point: 9.2,
            price: "39",
            title: "22年新版-玩转Git零基础到进阶实战 git视频急速入门"
        },
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2021/73-ES6/cover.jpeg",
            del: 0,
            id: 5,
            point: 9.4,
            price: "49",
            title: "22年新版-玩转ECMAScript6零基础到进阶实战es6视频"
        },
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2021/70-Javascript/cover.jpeg",
            del: 0,
            id: 6,
            point: 9.2,
            price: "29",
            title: "22年新-Javascript视频前端零基础到项目实战/js视频"
        },
        {
            category: "front",
            course_img: "https://file.xdclass.net/video/2021/69-HTML%2BCSS/cover.jpeg",
            del: 0,
            id: 7,
            point: 9.4,
            price: "49",
            title: "22年新版-玩转html+css前端零基础到项目实战"
        },
        {
            category: "back",
            course_img: "https://file.xdclass.net/video/2021/71-HLSJCL/cover.jpeg",
            del: 0,
            id: 8,
            point: 9.9,
            price: "3699",
            title: "微服务架构-海量数据商用短链平台项目大课【预售特价中】"
        },
    ],

    page: 1,  //默认展示第一页的数据
    total: 15,   //数据的总条数
    sideCategory: 'front',  //课程的分类
})

/**
 * 课程列表数据获取 + 课程类目切换逻辑
 */
const getCourseData = async (query) => {
    const category = query?.category || data.sideCategory;
    const page = query?.page || 1;
    const size = query?.size || 5;

    const res = await getCourse({category, page, size});

    if(res){
        //筛选符合分类的课程
        data.list = res.list.filter(item => item.category == category);
        data.total = res.total;
    }
};

onMounted(() => {
    getCourseData();

    //监听课程类目tab切换
    emitter.on('course', val => {
        data.sideCategory = val;
        data.page = 1;
        getCourseData({category: val, page: 1});
    });
});

/**
 * 分页的逻辑
 */
const currentChange = (val) => {
    if(val == 'pre'){
        if(data.page > 1){
            data.page--;
        }else{
            ElMessage({
                message: '已经是第一页了！',
                type: 'warning',
                showClose: true
            })
        }
    }else if(val == 'next'){
        if(data.page < Math.ceil(data.total / 5)){
              data.page++;
        }else{
            ElMessage({
                message: '已经是最后一页了！',
                type: 'warning',
                showClose: true
            })
        }
    }

    //请求课程的接口...
    getCourseData({category: data.sideCategory, page: data.page});
}

/**
 * 搜索框的逻辑
 */
const inputValue = ref('');
//搜索的逻辑
const courseList = computed(() => {
    return data.list?.filter((item) => {
        return item.title.includes(inputValue.value);
    })
});
//搜索按钮的点击事件
const handleClick = () => {
    if(inputValue.value){
        ElMessage({
          message: '查询成功！',
          type: 'success'
        })
    }else{
      ElMessage({
        message: '请输入搜索内容！',
        type: 'error'
      })
    }
};

/**
 * 课程编辑的逻辑
 */
//课程修改接口调用
const changeCourseData = async (query) => {
    const {title, price, id} = query;

    const res = await changeCourse({title, price, id});

    if(res){
        ElMessage({
            message: res.message,
            type: 'success'
        });
    }
};
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
        
        isShowPop(false);

        //修改接口的调用...
        changeCourseData({title: val.title, price: val.price, id: val.id});
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
//删除接口调用
const deleteCourseData = async (query) => {
    const res = await deleteCourse({id: query});

    if(res){
        ElMessage({
            message: res.message,
            type: 'success'
        })
    }

    //如果当前页的数据清零时，重置到第一页
    if(data.list.length == 0){
        getCourseData({category: data.sideCategory, page: 1});
    }
};
const deleteHandle = (val) => {
    if(val){
        data.list = data.list.filter((item) => {
            return item.id != val;
        });

        //删除接口的调用...
        deleteCourseData(val);
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