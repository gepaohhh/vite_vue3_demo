<template>
    <el-container style="height: 50vh;">
        <el-card style="width: 100%">
            <template #header>
                <div>
                    <span>{{ tableData.name }}</span>
                </div>
            </template>
            <p>农田面积 : {{ tableData.area }}亩</p>
            <el-divider />
            <p>影像类型 : {{ tableData.type }}</p>
            <el-divider />
            <p>拍摄日期 : {{ tableData.raster_date }}</p>
        </el-card>
    </el-container>
    <el-container style="height: 50vh">
        <el-table :data="layers" style="width: 100%; height: 100%;" border>
            <el-table-column prop="name" label="图层" align="center"/>
        </el-table>
    </el-container>
</template>
<script lang="ts">
export default {
    setup() {
        const tableData = {
            name: "崔庄户20240729全波段新",
            area: 62.45,
            type: "多光谱",
            raster_date: "2024-08-02"
        }

        const layers = [
            {
                name: 'RGB',
            },
            {
                name: 'NDVI',
            },
            {
                name: 'OSAVI',
            },
            {
                name: 'GNDVI',
            },
            {
                name: 'NDRE',
            },
            {
                name: 'LCI',
            },
        ]

        return {
            tableData,
            layers
        }
    }
}
</script>
<style>

</style>