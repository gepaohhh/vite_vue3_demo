<template>
    <div class="app">
      <h1 id="title">基于无人机遥感影像的小麦、玉米长势反演与制图系统</h1>
    </div>
    <div class="content">
      <div class="module">
        <ul class="main-menu">
          <li>
            <button @click="importMap()">无人机影像导入</button>
          </li>
          <li>
            <button @click="toggleCornMenu">
              玉米作物长势分析
              <span :class="{'arrow-down': showCornMenu, 'arrow-right': !showCornMenu}">▸</span>
            </button>
            <ul v-if="showCornMenu" class="sub-menu">
              <li><button @click="displayCorn()">玉米长势计算</button></li>
              <li><button @click="displayCorn()">玉米长势分析与制图</button></li>
            </ul>
          </li>
          <li>
            <button @click="toggleWheatMenu">
              小麦作物长势分析
              <span :class="{'arrow-down': showWheatMenu, 'arrow-right': !showWheatMenu}">▸</span>
            </button>
            <ul v-if="showWheatMenu" class="sub-menu">
              <li><button @click="displayWheat()">小麦长势计算</button></li>
              <li><button @click="displayWheat()">小麦长势分析与制图</button></li>
            </ul>
          </li>
          <li>
            <button @click="toggleSoilMenu">
              土壤墒情分析
              <span :class="{'arrow-down': showSoilMenu, 'arrow-right': !showSoilMenu}">▸</span>
            </button>
            <ul v-if="showSoilMenu" class="sub-menu">
              <li><button @click="displaySoil()">土壤墒情计算</button></li>
              <li><button @click="displaySoil()">土壤墒情分析与制图</button></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="middle-content">
        <LeafletDraw />
      </div>
      <div class="info-panel">
        <div class="image-info">
          <p class="info-title">影像信息</p>
          <div class="info-content">此处显示影像信息内容</div>
        </div>
        <div class="analysis-info">
          <p class="info-title">作物长势/土壤墒情分析</p>
          <div class="info-content">此处显示分析内容</div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" name="App" setup>
  import { ref } from 'vue';
  import LeafletMap from '@/pages/CropAnalysis/components/LeafletMap.vue';
  import LeafletDraw from '@/pages/CropAnalysis/components/LeafletDraw.vue';
  
  const showCornMenu = ref(true);
  const showWheatMenu = ref(true);
  const showSoilMenu = ref(true);
  
  function toggleCornMenu() {
    showCornMenu.value = !showCornMenu.value;
  }
  
  function toggleWheatMenu() {
    showWheatMenu.value = !showWheatMenu.value;
  }
  
  function toggleSoilMenu() {
    showSoilMenu.value = !showSoilMenu.value;
  }
  
  function importMap() {}
  
  function displayWheat() {}
  
  function displayCorn() {}
  
  function displaySoil() {}
  
  function exportReport() {}
  
  </script>
  
  <style scoped>
  /* 基础样式 */
  html, body, #app {
    height: 100%;
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
  
  .app {
    text-align: center;
    padding: 10px;
  }
  
  #title {
    color: #4CAF50;
    border-bottom: 2px solid #4CAF50;
    padding-bottom: 10px;
    margin-bottom: 0;
    font-size: 30px;
  }
  
  .content {
    display: flex;
    height: calc(100% - 60px);
  }
  
  .module {
    flex: 1;
    padding: 20px;
    max-width: 15%;
    border-right: 2px solid #ddd;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    overflow-y: auto;
  }
  
  .middle-content {
    flex: 1;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
  }
  
  .info-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: (100vh - 60px);
    max-width: 15%;
    box-sizing: border-box;
    margin-left: 5px;
  }
  
  .image-info {
    flex: 1;
    padding: 10px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    margin-bottom: 5px;
    border-radius: 3px;
  }
  
  .analysis-info {
    flex: 1;
    padding: 10px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    border-radius: 3px;
  }
  
  .info-content {
    border: 1px solid;
    border-radius: 3px;
    width:100%;
    height:30vh;
    background-color: #ffffff;
    text-align: center;
    line-height: 230px;
  }
  
  .info-title {
    text-align: center;
  }
  
  .module ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  
  .module li {
    margin-bottom: 10px;
    width: 100%;
  }
  
  .module button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
    transition: background-color 0.3s, transform 0.2s;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    position: relative;
  }
  
  .module button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
  
  /* 子菜单按钮样式 */
  .sub-menu {
    list-style: none;
    padding-left: 20px;
    margin-top: 5px;
  }
  
  .sub-menu > li {
    margin-bottom: 5px;
  }
  
  .sub-menu > li > button {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 5px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .sub-menu > li > button:hover {
    background-color: #e0e0e0;
  }
  
  /* 箭头样式 */
  .arrow-right {
    float: right;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }
  
  .arrow-down {
    float: right;
    transform: rotate(90deg);
    transition: transform 0.3s ease;
  }
  </style>
  