<template>
    <div class = 'pagination'>
        <div class = 'pre' @click = "currentChange('pre')">上一页</div>
        <div class = 'next' @click = "currentChange('next')">下一页</div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';

const {currentChange} = defineProps(['currentChange']);

</script>

<style lang='less' scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: #fff;

  .pre {
    background-color: #409eff;
    margin-right: 10px;
    padding: 5px;
  }

  .next {
    padding: 5px;
    background-color: #409eff;
  }
}
</style>