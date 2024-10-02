<template>
  <div class="content">
    <!-- <div class="left">
      左侧
    </div> -->
    <el-aside class="left">
      <side-tools />
    </el-aside>
    <el-main class="middle">
      <LeafletDraw />
    </el-main>
    <el-aside class="right">
      <side-properties />
    </el-aside>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

import LeafletDraw from '@/pages/CropAnalysis/components/MiddleLeafletDraw.vue';
import SideTools from './components/SideTools.vue';
import SideProperties from './components/SideProperties.vue';

export default{
  components: {Document,IconMenu,Location,Setting,
    SideTools,LeafletDraw,SideProperties},
  setup() {
    
  }
}
</script>

<style scoped>
/* 基础样式 */
.content {
  display: flex;
  padding: 0;
}
.left {
  flex: 1;
  max-width: 15%;
  height: 100vh;
}
.middle {
  flex: 1;
}
.right {
  flex: 1;
  max-width: 25%;
}
.el-main{
  padding: 0px;
}
</style>