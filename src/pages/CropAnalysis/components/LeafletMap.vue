<template>
  <div id="map" style="width:100%; height:85vh"></div>
</template>

<script name="LeafletMap" setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onMounted, ref } from "vue";
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';


//初始化地图
let map = ref(null);
let measureLayer = ref(null);

onMounted(()=>{
  map.value = L.map('map').setView([39.4315,117.9345], 18);

  // Google Satellite，使用这个tile要借助VPN，否则可能导致地图失效
  /* let googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    }); */
  //googleSat.addTo(map.value)

  //加载tile
  let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
  Esri_WorldImagery.addTo(map.value)

  //Layer Controller
  /* let baseMaps = {
    "Google Map": googleSat,
    'Esri Map': Esri_WorldImagery
  };
  L.control.layers(baseMaps, null).addTo(map.value) */

  //添加地图比例尺
  L.control.scale().addTo(map.value)
    
  //初始化测量图层
  measureLayer.value = L.layerGroup().addTo(map.value);

  // 测量距离事件
  map.value.on('click', (e) => {
    if (e.originalEvent.shiftKey) {
      measureDistance(e);
    } else if (e.originalEvent.ctrlKey) {
      measureArea(e);
    }
  });
});

// 测量距离
function measureDistance(e) {
  measureLayer.value.clearLayers();
  const latlngs = [];
  const line = L.polyline(latlngs, { color: 'blue' }).addTo(measureLayer.value);

  function onMouseMove(ev) {
    latlngs.push(ev.latlng);
    line.setLatLngs(latlngs);
    let distance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      distance += latlngs[i].distanceTo(latlngs[i + 1]);
    }
    L.popup()
      .setLatLng(ev.latlng)
      .setContent('距离: ' + distance.toFixed(2) + ' 米')
      .openOn(map.value);
  }

  function onClick() {
    map.value.off('mousemove', onMouseMove);
    map.value.off('click', onClick);
  }

  map.value.on('mousemove', onMouseMove);
  map.value.on('click', onClick);
}

// 测量面积
function measureArea(e) {
  measureLayer.value.clearLayers();
  const latlngs = [];
  const polygon = L.polygon(latlngs, { color: 'red' }).addTo(measureLayer.value);

  function onMouseMove(ev) {
    latlngs.push(ev.latlng);
    polygon.setLatLngs(latlngs);
    const area = L.GeometryUtil.geodesicArea(latlngs);
    L.popup()
      .setLatLng(ev.latlng)
      .setContent('面积: ' + area.toFixed(2) + ' 平方米')
      .openOn(map.value);
  }

  function onClick() {
    map.value.off('mousemove', onMouseMove);
    map.value.off('click', onClick);
  }

  map.value.on('mousemove', onMouseMove);
  map.value.on('click', onClick);
}

</script>

<style scoped>
</style>
