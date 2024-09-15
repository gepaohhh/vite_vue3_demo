<template>
    <div id="map" style="width: 100%; height: 85vh;"></div>
</template>
  
<script setup name="LeafletDraw">
  import { onMounted, ref } from 'vue';
  import L from 'leaflet';
  import '../../../../node_modules/leaflet/dist/leaflet.css';
  // import 'leaflet-draw/dist/leaflet.draw.css';
  // import 'leaflet-draw';
  
  let map = ref(null);
  const drawnItems = ref(null);
  const popupsMap = ref(new Map()); // 用于存储每个图层对应的 popups
  
  onMounted(() => {
    // 初始化地图
    map.value = L.map('map').setView([39.4315, 117.9345], 18);
  
    // 加载瓦片图层
    let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    Esri_WorldImagery.addTo(map.value);

    // 加载geoserver提供的地图
    let geo_base_map = L.tileLayer.wms("http://localhost:8080/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?3&filter=false", {
      layers:'nurc:mosaic',
      format:'image/jpg',
      transparent:false,
    });
    geo_base_map.addTo(map.value);
  
    // 添加比例尺
    L.control.scale().addTo(map.value);

  
    // 初始化 FeatureGroup 用于存储绘制的图形
    drawnItems.value = new L.FeatureGroup();
    map.value.addLayer(drawnItems.value);
  
    // 初始化 leaflet-draw 控件
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems.value,
        remove: true,
      },
      draw: {
        polyline: {
          shapeOptions: {
            color: 'blue'
          }
        },
        polygon: {
          shapeOptions: {
            color: 'red'
          }
        },
        circle: false,
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
    });
    map.value.addControl(drawControl);
  
    // 处理创建新图形时的事件
    map.value.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      let popupContent = '';
  
      if (layer instanceof L.Polyline) {
      const latlngs = layer.getLatLngs();
      latlngs.forEach((latlng, i) => {
        if (i < latlngs.length - 1) {
          const start = latlng;
          const end = latlngs[i + 1];
          const distance = map.value.distance(start, end).toFixed(2);

          const midPoint = L.latLng(
            (start.lat + end.lat) / 2,
            (start.lng + end.lng) / 2
          );

          const popup = L.popup({
            closeButton: true,
            autoClose: false,
            closeOnClick: false,
            className: 'distance-popup'
          })
            .setLatLng(midPoint)
            .setContent(`${distance} m`)
            .openOn(map.value);
          // 绑定 popup 内容到图层
            popupsMap.value.set(layer, popup);
        }
        
      });

      
    }
  
      if (layer instanceof L.Polygon) {
        // 这是 Polygon，用于测量面积
        const latlngs = layer.getLatLngs()[0];
        const area = L.GeometryUtil.geodesicArea(latlngs);
  
        popupContent = `面积: ${area.toFixed(2)} 平方米`;
  
        // 计算多边形的中心位置作为 popup 的位置
        const centerLatLng = layer.getBounds().getCenter();
        const popup = L.popup({
          closeButton: true,
          className: 'measure-popup'
        })
          .setLatLng(centerLatLng)
          .setContent(popupContent)
          .openOn(map.value);
  
        // 绑定 popup 内容到图层
        popupsMap.value.set(layer, popup);
      }
  
      // 添加图层到 FeatureGroup
      drawnItems.value.addLayer(layer);
    });
  
    // 处理删除图形时的事件
    map.value.on(L.Draw.Event.DELETED, function (event) {
      const layers = event.layers;
      layers.eachLayer(function (layer) {
        // 移除与图层关联的 popup
        const popup = popupsMap.value.get(layer);
        if (popup) {
          map.value.closePopup(popup);
          popupsMap.value.delete(layer);
        }
      });
    });
  
    // 可选：处理编辑图形后的事件（更新 popup）
    map.value.on(L.Draw.Event.EDITED, function (event) {
      const layers = event.layers;
      layers.eachLayer(function (layer) {
        const popup = popupsMap.value.get(layer);
        if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
          const latlngs = layer.getLatLngs();
          let totalDistance = 0;
          for (let i = 0; i < latlngs.length - 1; i++) {
            totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
          }
          const popupContent = `总距离: ${totalDistance.toFixed(2)} 米`;
          if (popup) {
            const centerLatLng = getPolylineCenter(latlngs);
            popup.setLatLng(centerLatLng).setContent(popupContent);
          }
        }
  
        if (layer instanceof L.Polygon) {
          const latlngs = layer.getLatLngs()[0];
          const area = L.GeometryUtil.geodesicArea(latlngs);
          const popupContent = `面积: ${area.toFixed(2)} 平方米`;
          if (popup) {
            const centerLatLng = layer.getBounds().getCenter();
            popup.setLatLng(centerLatLng).setContent(popupContent);
          }
        }
      });
    });
  });
  
  // 计算 Polyline 中心点的辅助函数
  function getPolylineCenter(latlngs) {
    if (latlngs.length === 1) {
      return latlngs[0];
    }
  
    let totalDistance = 0;
    const distances = [];
    for (let i = 0; i < latlngs.length - 1; i++) {
      const dist = latlngs[i].distanceTo(latlngs[i + 1]);
      distances.push(dist);
      totalDistance += dist;
    }
  
    const halfDistance = totalDistance / 2;
    let accumulatedDistance = 0;
    for (let i = 0; i < distances.length; i++) {
      accumulatedDistance += distances[i];
      if (accumulatedDistance >= halfDistance) {
        return latlngs[i + 1];
      }
    }
  
    return latlngs[Math.floor(latlngs.length / 2)];
  }
</script>
  
<style scoped>
  #map {
    width: 100%;
    height: 85vh;
  }
  
  .measure-popup {
    font-size: 14px;
  }
</style>
  