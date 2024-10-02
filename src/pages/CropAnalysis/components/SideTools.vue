<template>
    <div>
        <el-menu
            style="border"
        >
            <el-sub-menu>
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>作物长势</span>
                </template>
                <el-menu-item-group title="机器学习模型">
                    <el-menu-item>XGBoost</el-menu-item>
                    <el-menu-item>支持向量机</el-menu-item>
                    <el-menu-item>随机森林</el-menu-item>
                    <el-menu-item>线性回归</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu>
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>土壤墒情</span>
                </template>
                <el-menu-item-group title="机器学习模型">
                    <el-menu-item>XGBoost</el-menu-item>
                    <el-menu-item>支持向量机</el-menu-item>
                    <el-menu-item>随机森林</el-menu-item>
                    <el-menu-item>线性回归</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>


<script lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

export default {
    components: {Document,IconMenu,Location,Setting}
    
}
</script>

<style scoped>

</style>