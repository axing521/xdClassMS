<template>
    <div>
        <el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
            <div class="xd-icon">
                <img src="../assets/xd-icon.png">
                <span>小滴课程管理系统</span>
            </div>

            <el-sub-menu index="1">
                <template #title>
                    <el-icon><document /></el-icon>
                    <span>课程管理</span>
                </template>

                <el-menu-item index="1-1">前端课程</el-menu-item>
                <el-menu-item index="1-2">后端课程</el-menu-item>
                <el-menu-item index="1-3">全栈课程</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon><setting /></el-icon>
                    <span>用户管理</span>
                </template>

                <el-menu-item index="2-1">用户1</el-menu-item>
                <el-menu-item index="2-2">用户2</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
</script>
<style lang="less" scoped>
.el-radio-button__inner {
  padding: 0;
}

.el-menu--collapse {
  border: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border: none;
}

.xd-icon {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;
  background-color: #fff;
  white-space: nowrap;
  padding-left: 15px;
  font-size: 1.125rem;

  img {
    width: 45px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>