<template>
    <div>
        <el-dialog title = '编辑' v-model="popShow" width = '30%' center :show-close = 'false'>
            <el-form :model = 'editData'>
                <el-form-item label = '课程标题' prop = 'title' required>
                    <el-input v-model = 'editData.title' />
                </el-form-item>
                <el-form-item label = '课程价格' prop = 'price' required>
                    <el-input v-model = 'editData.price' />
                </el-form-item>
                <el-form-item>
                    <el-button>取消</el-button>
                    <el-button type = 'primary'>确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import {defineProps, reactive} from 'vue';

const {popShow, message} = defineProps(['popShow', 'message']);

/**
 * 编辑组件维护的数据
 */
const editData = reactive({
    title: message.title,
    price: message.price
})

</script>

<style lang='less' scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

:deep(.el-form-item__label) {
  width: 80px !important;
}

:deep(.el-form-item__content) {
  justify-content: center;
  margin-left: 0 !important;
}
</style>