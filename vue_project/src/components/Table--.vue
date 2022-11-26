<template>
  <div class="table">
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column prop="courseImg" label="图片">
        <template #default="scope">
          <img :src="scope.row.courseImg" class="courseImg-img">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="price" label="价格">
      </el-table-column>
      <el-table-column prop="point" label="评分">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="editClick(scope.row)">
            编辑
          </el-button>
          <el-popconfirm title="确定要删除该课程吗?">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const { list, editClick } = defineProps(['list', 'editClick'])
/**
 * 定义每行课程的区分颜色
 */
const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex % 2 === 0) {
    return 'warning-row'
  } else {
    return ''
  }
}





</script>
<style lang='less' scoped>
.courseImg-img {
  width: 150px;
  height: 100px;
}
</style>