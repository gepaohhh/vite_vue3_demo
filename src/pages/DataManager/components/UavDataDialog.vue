<template>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      style="width: 1000px;height: auto;"
      :before-close="handleClose"
    >
    </el-dialog>
</template>
   
<script>
  export default {
    name: "DialogComponent",
    props: {
      dialogTitle: {
        type: String,
        default: "添加影像",
      },
      rasterDatas: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
    setup() {
      let showDialog= ref(true)
    },
  };
</script>
   
<style scoped>
</style>