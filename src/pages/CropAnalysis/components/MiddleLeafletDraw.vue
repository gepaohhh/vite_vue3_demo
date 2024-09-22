<template>
    <div id="map" style="width: 100%; height: 100%;"></div>
</template>
  
<script name="LeafletDraw">
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import '../../../../node_modules/leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import 'leaflet-draw';

export default{
  // ------------------methods  提供方法------------------
  methods: {
    initMap() {
      console.log("init map")
      let baseMap = ref(null)
      // !!!!!!!!!!!!!!!!!!!查看Map类型
      const popupsMap = ref(new Map())
      baseMap.value = L.map('map').setView([39.4315, 117.9345], 18)
      // ************调用ESRI地图************
      let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });
      Esri_WorldImagery.addTo(baseMap.value);
      console.log("add esri map")
      // ************从Geoserver调用本地地图方法************
      // let geo_base_map = L.tileLayer.wms("http://localhost:8080/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?3&filter=false", {
      //   layers:'nurc:mosaic',
      //   format:'image/jpg',
      //   transparent:false,
      // });
      // geo_base_map.addTo(map.value);
      // ************添加比例尺************
      // L.control.scale().addTo(map.value);
    },
  },
  mounted() {
    this.initMap()
  },
  // ------------------data  提供基础数据------------------
  data() {

  },
  setup() {
  }
}
</script>
  
<style scoped>
  #map {
    width: 100%;
    height: 85vh;
  }
</style>
  