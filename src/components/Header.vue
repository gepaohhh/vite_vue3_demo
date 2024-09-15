<!-- Header.vue -->
<template>
  <div>
    <!-- 绑定字体距离图标的距离、还有点击图标跳转的路由 -->
    <el-breadcrumb separator="/" style="margin-left: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/DataManager' }">数据管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
 
<script lang="ts">
export default {
  name: 'Header',
  props: {
    // collapseIcon: String,
    // handleCollapse: Function
    // 其他需要的 props
  }
  // 其他逻辑和方法
};
</script>
 
<style>
</style>