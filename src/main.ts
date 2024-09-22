import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'
// element-plus 全局
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import axios from 'axios'

// createApp(App).mount('#app')
const app = createApp(App)

// app.provide('$axios', axios)

// 先引用
app.use(store)
   .use(router)
   .use(ElementPlus)

// 再挂载
app.mount('#app');