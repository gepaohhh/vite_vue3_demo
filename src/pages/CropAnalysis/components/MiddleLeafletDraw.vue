<template>
    <!-- 加载地图 -->
    <el-container>
      <div id="TangShanMap" class="map"></div>
    </el-container>
</template>
  
<script name="LeafletDraw">
import { onMounted, reactive, ref } from 'vue';
import { View, Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Source from 'ol/source/ImageTile.js';
import { TileWMS } from 'ol/source';

export default{
  setup() {
    // openlayer 参数
    const target = 'TangShanMap'
    const view = new View({
      center: [117.9345, 39.4315],
      zoom: 17,
      maxZoom: 18,
      projection: "EPSG:4326"
    })
    const base_layer = new TileLayer({
      source: new Source({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      })
    })
      //LAYERS参数多个图层名称，中间用“,”隔开***
    let test_layer = new TileLayer({
      source: new TileWMS({
        url:'http://localhost:8080/geoserver/TangShanRS/wms',    
        params:{    
        'LAYERS':'TangShanRS:崔庄户20240729全波段新',
        'TILED':false
        },
        serverType:'geoserver'
      })
    })
    let layers = reactive({list: [base_layer, test_layer]})
    // ----------------------------生成地图----------------------------
    function initMap() {
      new Map({
        // 目标div中的id
        target: target,
        // 图层来源
        layers: layers.list,
        // 地图展示方法
        view: view,
      });
      console.log("finish map load!!!!!!")
    }

    onMounted(() => {
      initMap()
    })

    return {
      initMap
    }
  }
}
</script>
  
<style scoped>
  .map {
    width: 100%;
    height: 100vh;
  }
</style>
  