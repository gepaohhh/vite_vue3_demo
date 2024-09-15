<template>
  <el-container>
    <div id="TangShanMap" class="map"></div>
  </el-container>
  <el-divider />
  <el-container style="padding-bottom: 5px;">
    <el-button>
      增
    </el-button>
    <el-button>
      删
    </el-button>
    <el-button>
      改
    </el-button>
    <el-button>
      查
    </el-button>
  </el-container>
  <el-container>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="名称" width="auto">
        <template #default="scope">
          <el-button :type="''" @click="findLocate(scope.$index, scope.row)">
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="面积(亩)" width="180" />
      <el-table-column prop="type" label="类型" width="180" />
      <el-table-column prop="date" label="创建时间" width="180" />
      <el-table-column prop="analysis" label="作物分析状态" width="auto">
        <el-button @click="jump2CropAnalysis">
          查看
        </el-button>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="small" @click="handleDownload(scope.$index, scope.row)">
            下载
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script lang="ts">
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageWMS from 'ol/source/ImageWMS';
import Image from 'ol/source/Image'
import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile.js';
import { url } from 'inspector';
import Layer from 'ol/layer/Layer';
import { OGCMapTile } from 'ol/source';

export default {
  // ----------------setup----------------
  setup() {
    interface UAVImage {
      name: string,
      area: string,
      type: string,
      date: string,
    }
    
    const tableData: UAVImage[] = [
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
      {
        name: '崔庄户20240729全波段新',
        area: '62.45',
        type: '多光谱',
        date: '2024/08/02',
      },
    ]

    const handleEdit = (index: number, row: Image) => {
      console.log(index, row)
    }

    const handleDownload = (index: number, row: Image) => {
      console.log(index, row)
    }

    const handleDelete = (index: number, row: Image) => {
      console.log(index, row)
    }

    const findLocate = (index: number, row: Image) => {
      console.log(index, row)
      console.assert(1,"位置x","位置y")
    }
    return {
      tableData,
      handleEdit,
      handleDownload,
      handleDelete,
      findLocate,
    }
  },
  // ----------------mounted----------------
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
          zoom: 3,
        }),
      });
      console.log("finish map load!!!!!!")
    },

    jump2CropAnalysis() {
      this.$router.push('/CropAnalysis')
    }
  },
}
</script>

<style scoped>
  .map{
    width: 100%;
    height: 400px;
  }
</style>