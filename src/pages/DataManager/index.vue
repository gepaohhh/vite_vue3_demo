<template>
  <div style="padding: 10px">
    <!-- 加载地图 -->
    <el-container>
      <div id="TangShanMap" class="map"></div>
    </el-container>
    <!-- 分割线 -->
    <el-divider />
    <!-- 添加+查询按钮 -->
    <el-container style="padding-bottom: 5px;">
      <el-button @click="dialogVisible = true">
        添加新影像
      </el-button>
      <!-- <el-button>
        查询影像
      </el-button> -->
    </el-container>
    <!-- 数据展示表 -->
    <el-container>
      <el-table :data="rasterDatas" stripe style="width: 100%;">
        <el-table-column prop="name" label="名称" width="auto" align="center">
          <template #default="scope">
            <el-button :type="''" @click="locateMap(scope.row.id,scope.row.name)">
              {{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="area" label="面积(亩)" width="180" />
        <el-table-column prop="type" label="类型" width="180" />
        <el-table-column prop="raster_date" label="创建时间" width="180" />
        <el-table-column prop="analysis" label="作物分析" width="120" align="center">
          <el-button size="small" @click="jump2CropAnalysis">
            查看
          </el-button>
        </el-table-column>
        <el-table-column prop="operate" label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handelEdit(scope.row.id,scope.row.name,scope.row.type,scope.row.area,scope.row.raster_date)">
              编辑
            </el-button>
            <el-button
              size="small"
              @click="handleDownload(scope.row.id,scope.row.name)"
            >
              下载
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
<!-------------------------------------------------------------------------------------------------->
  <!-- ---------------添加弹窗--------------- -->
  <el-dialog
    v-model="dialogVisible"
    title="影像信息添加"
    style="width: 1000px;height: auto;"
    :before-close="handleClose"
  >
    <!-- 信息填写 -->
    <el-form :model="rasterDatasAdd">
      <el-form-item label="影 像 名 称 :" width="80px" required>
        <el-input
          class="dialog_input"
          v-model="rasterDatasAdd.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="影 像 类 型 :" width="80px" required>
        <el-input class="dialog_input" v-model="rasterDatasAdd.type" ></el-input>
      </el-form-item>
      <el-form-item label="影 像 面 积 :" width="80px" required>
        <el-input class="dialog_input" v-model="rasterDatasAdd.area" ></el-input>
      </el-form-item>
      <el-form-item label=" 日 期 :" width="80px" required>
        <el-date-picker
          v-model="rasterDatasAdd.raster_date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 按钮反馈 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirmUavData()">确 定</el-button>
    </div>
  </el-dialog>
  <!-- ---------------编辑弹窗--------------- -->
  <el-dialog
    v-model="dialogVisibleEdit"
    title="影像信息编辑"
    style="width: 1000px;height: auto;"
    :before-close="handleClose"
  >
    <!-- 信息填写 -->
    <el-form :model="rasterDatasEdit">
      <el-form-item label="影 像 名 称 :" width="80px" required>
        <el-input
          class="dialog_input"
          v-model="rasterDatasEdit.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="影 像 类 型 :" width="80px" required>
        <el-input class="dialog_input" v-model="rasterDatasEdit.type" ></el-input>
      </el-form-item>
      <el-form-item label="影 像 面 积 :" width="80px" required>
        <el-input class="dialog_input" v-model="rasterDatasEdit.area" ></el-input>
      </el-form-item>
      <el-form-item label=" 日 期 :" width="80px" required>
        <el-date-picker
          v-model="rasterDatasEdit.raster_date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 按钮反馈 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirmUavDataEdit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Image from 'ol/source/Image'
import TileLayer from 'ol/layer/Tile.js';
import { OGCMapTile } from 'ol/source';
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { ref, toRaw } from "vue"

export default {
  // ----------------methods  存储方法，能够在mounted/@click中挂载----------------
  methods: {
    // ----------------------------生成底图----------------------------
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
          center: [117.9345, 39.4315],
          zoom: 3,
        }),
      });
      console.log("finish map load!!!!!!")
    },
    // ----------------------------跳转至影像处理页面----------------------------
    jump2CropAnalysis() {
      window.open('/CropAnalysis','_blank')
    },
    // ----------------------------获取完整数据库----------------------------
    getAllUavData() {
      axios
        .get("http://localhost:8081/uav/getAllUav")
        .then(rasterDatas => {
          console.log("get data")
          console.log(rasterDatas)
          this.rasterDatas = rasterDatas.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 关闭对话框
    cancel() {
      this.dialogVisible = false
      this.dialogVisibleEdit = false
    },
    // ----------------------------影像添加----------------------------
    // 添加影像数据
    confirmUavData() {
      // GMT转yyyy-mm-dd类型
      // console.log(this.rasterDatasAdd)
      const elDate = new Date(toRaw(this.rasterDatasAdd).raster_date)
      const year = elDate.getFullYear();
      const month = (elDate.getMonth() + 1).toString().padStart(2, '0');
      const day = elDate.getDate().toString().padStart(2, '0');
      this.rasterDatasAdd.raster_date = year+'-'+month+'-'+day
      console.log(this.rasterDatasAdd)
      this.axiosAddDate()
      this.dialogVisible = false
    },
    // 后端请求添加数据
    axiosAddDate() {
      axios
        .post('http://localhost:8081/uav/add',this.rasterDatasAdd)
        .then(response => {
          console.log(response.data)
          if(response.data == 1){
            ElMessage({
              type: 'info',
              message: '添加成功',
            })
            window.location.reload()
          }else{
            ElMessage({
              type: 'info',
              message: '添加失败',
            })
          }
        })
        .catch(error => {
          console.log(error)
          ElMessage({
            type: 'info',
            message: '取消添加',
          })
        })
    },
    // ----------------------------影像编辑----------------------------
    // 编辑影像数据
    handelEdit(id: 0,name: "",type: "",area: "",raster_date: "") {
      this.dialogVisibleEdit = true
      console.log(this.rasterDatasEdit)
      this.rasterDatasEdit.id = id
      this.rasterDatasEdit.name = name
      this.rasterDatasEdit.type = type
      this.rasterDatasEdit.area = area
      this.rasterDatasEdit.raster_date = raster_date
      console.log(this.rasterDatasEdit)
    },
    confirmUavDataEdit(){
      const elDate = new Date(toRaw(this.rasterDatasEdit).raster_date)
      const year = elDate.getFullYear();
      const month = (elDate.getMonth() + 1).toString().padStart(2, '0');
      const day = elDate.getDate().toString().padStart(2, '0');
      this.rasterDatasEdit.raster_date = year+'-'+month+'-'+day
      console.log(this.rasterDatasEdit)
      this.axiosEditDate()
      this.dialogVisibleEdit = false
    },
    axiosEditDate() {
      axios
        .post('http://localhost:8081/uav/update',this.rasterDatasEdit)
        .then(response => {
          console.log(response.data)
          if(response.data == 1){
            ElMessage({
              type: 'info',
              message: '修改成功',
            })
            window.location.reload()
          }else{
            ElMessage({
              type: 'info',
              message: '修改失败',
            })
          }
        })
        .catch(error => {
          console.log(error)
          ElMessage({
            type: 'info',
            message: '取消修改',
          })
        })
    },
    // ----------------------------影像删除----------------------------
    handleDelete(row: JSON) {
      ElMessageBox.confirm(
        '该影像内容将被彻底删除，是否确定要删除',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          // console.log(toRaw(row))
          // console.log(index)
          const delUAVData = toRaw(row)
          axios
            .post('http://localhost:8081/uav/delete',delUAVData)
            .then(response => {
              console.log(response.data)
              if (response.data == 1){
                ElMessage({
                  type: 'info',
                  message: '删除成功',
                })
                window.location.reload()
              }
              else{
                ElMessage({
                  type: 'info',
                  message: '删除失败',
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除',
          })
        })
    },
    // ----------------------------下载数据----------------------------
    handleDownload(id: 0,name: "") {
      alert(String(id)+"***"+name)
      console.log(id, name)
    },
    // ----------------------------地图显示UAV影像位置----------------------------
    locateMap(id: 0,name: "") {
      alert(String(id)+"***"+name)
      console.log(id, name)
    }
  },
  // ----------------mounted  模板搭建完后再挂载----------------
  mounted() {
    this.initMap();
    this.getAllUavData();
  },
  // ----------------data  存储数据----------------
  data() {
    return{
      rasterDatas: null,
      dialogVisible: false,
      dialogVisibleEdit: false,
      rasterDatasAdd: {
        id: 0,
        name: "",
        type: "",
        area: "",
        raster_date: "",
      },
      rasterDatasEdit: {
        id: 0,
        name: "",
        type: "",
        area: "",
        raster_date: "",
      },
    }
  },
  // ----------------setup----------------
  setup() {
    // 关闭提问
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('你确定要关闭该窗体吗?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    // ******return******
    return {
      handleClose,
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