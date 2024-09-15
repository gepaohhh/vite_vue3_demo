<template>
    <div>
        <el-container class="MapContainer">
          <div id="TangShanMap" class="map"></div>
        </el-container>
        <el-container class="ProToolContainer">
          <el-aside>
              <CropAnalysisSide />
          </el-aside>
        </el-container>
    </div>
</template>

<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { OGCMapTile } from 'ol/source';

import CropAnalysisSide from './components/CropAnalysisSide.vue';

export default {
    setup(){

    },
    components: {
        CropAnalysisSide: CropAnalysisSide
    },

    mounted() {
    this.initMap();
    },
    methods: {
        initMap() {
        new Map({
            // 目标div中的id
            target: 'TangShanMap',
            // 图层来源
            layers: [
            new TileLayer({
                source: new OGCMapTile({
                url: 'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
                })
            })
            ],
            // 地图展示方法
            view: new View({
            center: [0, 0],
            zoom: 20,
            }),
        });
        console.log("finish map load!!!!!!")
        },
    },
};
</script>

<style scoped>
/* 地图 工具 数据 细节布局 */
.map{
    width: 100%;
    height: 700px;
}

/* 地图属性工具外边框布局 */
.MapContainer{
    width: 75%;
}

.ProToolContainer{
    width: 25%;
}
</style>