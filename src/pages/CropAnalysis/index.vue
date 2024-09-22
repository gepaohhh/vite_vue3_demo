<template>
  <div class="content">
    <!-- <div class="left">
      左侧
    </div> -->
    <el-aside class="left">
      
    </el-aside>
    <el-main class="middle">
      <LeafletDraw />
    </el-main>
    <el-aside class="right">
      
    </el-aside>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import LeafletDraw from '@/pages/CropAnalysis/components/MiddleLeafletDraw.vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

export default{
  components: {LeafletDraw,Document,IconMenu,Location,Setting,},
  setup() {
    const showCornMenu = ref(true);
    const showWheatMenu = ref(true);
    const showSoilMenu = ref(true);
    function toggleCornMenu() {showCornMenu.value = !showCornMenu.value;}
    function toggleWheatMenu() {showWheatMenu.value = !showWheatMenu.value;}
    function toggleSoilMenu() {showSoilMenu.value = !showSoilMenu.value;}
    function importMap() {}
    function displayWheat() {}
    function displayCorn() {}
    function displaySoil() {}
    function exportReport() {}
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return{
      handleOpen,
      handleClose,
      toggleCornMenu,
      toggleWheatMenu,
      toggleSoilMenu,
      importMap,
      displayWheat,
      displayCorn,
      displaySoil,
      exportReport,
      showCornMenu,
      showWheatMenu,
      showSoilMenu,
    }
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
  max-width: 15%;
}
.el-main{
  padding: 0px;
}
</style>