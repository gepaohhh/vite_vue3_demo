<template>
    <div>
        <el-container>
            <el-aside width="200px" v-if="$route.meta.DataSideBar">
                <SiderNav />
            </el-aside>
            <el-container>
                <!-- <div>ssss</div> -->
                <!-- <el-header style="height: 60px; display: flex; align-items: center;
                box-shadow: 2px 0 6px rgba(0, 21, 41, .35);">
                    <header-nav />
                </el-header> -->
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import Aside from '@/components/Sider.vue';
import Header from '@/components/Header.vue';
    
export default{
    components: {
        SiderNav: Aside,
        HeaderNav: Header
    },
}
</script>

<style scoped>
.el-aside {
  box-shadow: 5px 0 6px rgba(15, 14, 14, 0.35); /* 菜单栏右侧阴影  0  阴影扩散范围 阴影的颜色 */
  background-color: #001529;   /* 菜单栏整体的背景色 */
  color: #fff;   /* 菜单栏顶部的系统颜色 */
  min-height: 100vh;  /* 菜单栏整体高度 */
  transition: width .3s;  /* 菜单栏展开收缩的整体时间0.3s */
  float: left;
}
.el-main {
    padding: 0px;
}
</style>
