import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// createApp(App).mount('#app')
const app = createApp(App)

// 先引用
app.use(store)
app.use(router)
app.use(ElementPlus)

// 再挂载
app.mount('#app');