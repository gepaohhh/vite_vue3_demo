import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'

// createApp(App).mount('#app')
const app = createApp(App)

// 先引用
app.use(store)
app.use(router)

// 再挂载
app.mount('#app');