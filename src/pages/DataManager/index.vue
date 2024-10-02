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
      <el-button @click="handleAdd()">
        添加新影像
      </el-button>
      <!-- <el-button>
        查询影像
      </el-button> -->
    </el-container>
    <!-- 数据展示表 -->
    <el-container>
      <el-table :data="rasterDatas.list" stripe style="width: 100%;">
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
          <el-button size="small" @click="jump2CropAnalysis()">
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
    
    <!-------------------------------添加窗口------------------------------->
    <el-dialog
      v-model="dialogVisibleAdd"
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
          <el-input class="dialog_input" v-model="rasterDatasAdd.area " ></el-input>
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
        <el-button type="primary" @click="confirmAddUavData()">确 定</el-button>
      </div>
    </el-dialog>
    <!-------------------------------编辑窗口------------------------------->
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
        <el-button type="primary" @click="confirmEditUavData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, toRaw } from 'vue';
// import UavDataDialog from './components/UavDataDialog.vue';
import { View, Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Source from 'ol/source/ImageTile.js';
import { TileWMS } from 'ol/source';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

export default {
  // components: {UavDataDialog},
  setup() {
    let rasterDatas = reactive({ list: [] })
    let dialogVisibleAdd = ref(false)
    let dialogVisibleEdit = ref(false)
    let rasterDatasAdd = reactive({
      id: 0,
      name: "",
      type: "",
      area: 0,
      raster_date: "",
    })
    let rasterDatasEdit= reactive({
      id: 0,
      name: "",
      type: "",
      area: 0,
      raster_date: "",
    })
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

    // ----------------------------添加一条数据----------------------------
    // 激活添加窗体
    function handleAdd(){
      dialogVisibleAdd.value = true
    }
    // 确认提交UAV数据------GMT转yyyy-mm-dd类型
    function confirmAddUavData(){
      const elDate = new Date(toRaw(rasterDatasAdd).raster_date)
      const year = elDate.getFullYear();
      const month = (elDate.getMonth() + 1).toString().padStart(2, '0');
      const day = elDate.getDate().toString().padStart(2, '0');
      rasterDatasAdd.raster_date = year+'-'+month+'-'+day
      console.log(rasterDatasAdd)
      axiosAddDate()
      dialogVisibleAdd.value = false
    }
    // 后端请求添加数据
    function axiosAddDate() {
      axios
        .post('http://localhost:8081/uav/add',rasterDatasAdd)
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
    }
    
    // ----------------------------编辑一条数据----------------------------
    // 激活窗体
    function handelEdit(id: 0,name: "",type: "",area= 0.0,raster_date: ""){
      dialogVisibleEdit.value = true
      // console.log(rasterDatasEdit)
      rasterDatasEdit.id = id
      rasterDatasEdit.name = name
      rasterDatasEdit.type = type
      rasterDatasEdit.area = area
      rasterDatasEdit.raster_date = raster_date
    }
    // 确认编辑UAV数据
    function confirmEditUavData(){
      const elDate = new Date(toRaw(rasterDatasEdit).raster_date)
      const year = elDate.getFullYear();
      const month = (elDate.getMonth() + 1).toString().padStart(2, '0');
      const day = elDate.getDate().toString().padStart(2, '0');
      rasterDatasEdit.raster_date = year+'-'+month+'-'+day
      console.log(rasterDatasEdit)
      axiosEditDate()
      dialogVisibleEdit.value = false
    }
    // 后端请求编辑数据
    function axiosEditDate() {
      axios
        .post('http://localhost:8081/uav/update', rasterDatasEdit)
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
    }
    
    // ----------------------------删除一条数据----------------------------
    // 直接删除整行数据
    function handleDelete(row: JSON){
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
    }
    
    // ----------------------------获取完整数据库----------------------------
    function getAllUavData() {
      axios
        .get("http://localhost:8081/uav/getAllUav")
        .then(response => {
          rasterDatas.list = response.data
        })
        .catch(error => {
          console.log(error)
        })
      console.log(rasterDatas)
    }

    // 关闭弹窗时提问
    function handleClose(done: () => void) {
      ElMessageBox.confirm('你确定要关闭该窗体吗?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    // 关闭对话框
    function cancel() {
      dialogVisibleAdd.value = false
      dialogVisibleEdit.value = false
    }

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

    // ----------------------------显示目标----------------------------
    function locateMap(id: 0,name: "") {alert(name + "---" + id + "展示")}
    // ----------------------------下载目标影像----------------------------
    function handleDownload(id: 0,name: ""){alert(name + "---" + id + "下载")}
    // ----------------------------跳转数据----------------------------
    function jump2CropAnalysis() {
      window.open('/CropAnalysis','_blank')
    }

    onMounted(()=>{
      getAllUavData()
      initMap()
    })
    
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const handleRemove = (file: UploadFile) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }

    return {
      locateMap,
      jump2CropAnalysis,
      handleDownload,
      handelEdit,
      handleAdd,
      confirmAddUavData,
      confirmEditUavData,
      handleDelete,
      handleClose,
      cancel,
      initMap,
      rasterDatas,
      dialogVisibleAdd,
      dialogVisibleEdit,
      rasterDatasAdd,
      rasterDatasEdit,
      // 
      dialogImageUrl,
      dialogVisible,
      disabled,
      handleRemove,
      handlePictureCardPreview,
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style>
  .map{
    width: 100%;
    height: 400px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>