import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  // server: {
  //   // 未上线
  //   port: 5432,
  //   hmr: {
  //     host: '127.0.0.1',
  //     port: 5432
  //   },
  //   // http代理
  //   proxy: {
  //     '/api': {
  //       target: "",
  //       changeOrigin: true,
  //       rewrite: (path: string) => path.replace(/^\/api/,'')
  //     }
  //   }
  // }
})
