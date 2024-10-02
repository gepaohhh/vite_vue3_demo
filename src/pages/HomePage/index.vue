<template>
  <div style="padding: 10px;">
    <div class="app-container">
      <!-- <el-form>
        <el-form-item label="图片上传">
          <image-upload v-model="picUrls" />
        </el-form-item>

        <el-form-item label="文件上传">
          <file-upload v-model="fileUrls" />
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import ImageUpload from "@/components/Upload/ImageUpload.vue";
// import FileUpload from "@/components/Upload/FileUpload.vue";
import { ref } from "vue";


const size = ref("");
// 这里放外链图片，防止被删
const picUrls = ref([
  "https://s2.loli.net/2023/05/24/yNsxFC8rLHMZQcK.jpg",
  "https://s2.loli.net/2023/05/24/RuHFMwW4rG5lIqs.jpg",
  "https://s2.loli.net/2023/05/24/ZPiGbcpR91WqInB.jpg",
  "https://s2.loli.net/2023/05/24/e1bcnEq3MFdmlNL.jpg",
  "https://s2.loli.net/2023/05/24/wZTSPj1yDQNcuhU.jpg",
]);
</script>

<style scoped>
</style>
