<template>
    <transition name="dialog-fade">
        <el-dialog
            :title="dialogTitle"
            class="dialog-component"
            width="500px"
        >
            <el-form
                ref="formInfo"
                :model="formInfo"
                class="demo-form-inline"
                label-width="80px"
            >
                <!-- 影像信息 -->
                <el-form-item label="影像名称:" prop="name" required>
                    <el-input v-model="formInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="影像类型:" prop="type" required>
                    <el-input v-model="formInfo.type"></el-input>
                </el-form-item>
                <el-form-item label="影像面积:" prop="area" required>
                    <el-input v-model="formInfo.area"></el-input>
                </el-form-item>
                <el-form-item label="拍摄日期:" prop="date" required>
                    <el-input v-model="formInfo.date"></el-input>
                </el-form-item>
                <!-- 确定/取消 -->
                <el-form-item style="text-align: right;">
                    <el-button type="primary" @click="submitForm('formInfo')">
                        确定
                    </el-button>
                    <el-button @click="closeDialog(0)">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </transition>
</template>
   
<script>
  export default {
    name: "DialogComponent",
    props: {
      dialogTitle: {
        type: String,
        default: "添加影像",
      },
      itemInfo: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
    data() {
      return {
        showDialog: true,
        formInfo: JSON.parse(JSON.stringify(this.itemInfo)),
      };
    },
    methods: {
      // 保存操作
      submitForm(formName) {
        const that = this;
        const params = Object.assign(that.formInfo, {});
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 走保存请求
            that.$message({
              message: "操作成功！",
              type: "success",
            });
            that.closeDialog(1);
          } else {
            return false;
          }
        });
      },
      // 关闭弹框
      closeDialog(flag) {
        this.$refs["formInfo"].resetFields();
        this.showDialog = false;
        this.$emit("closeDialog", flag);
      },
    },
  };
</script>
   
<style scoped lang="scss">
  .dialog-fade-enter-active {
    -webkit-animation: dialog-fade-in 0.3s;
    animation: dialog-fade-in 0.3s;
  }
  .dialog-fade-leave-active {
    -webkit-animation: dialog-fade-out 0.3s;
    animation: dialog-fade-out 0.3s;
  }
  @-webkit-keyframes dialog-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes dialog-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @-webkit-keyframes dialog-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }
  @keyframes dialog-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }
</style>