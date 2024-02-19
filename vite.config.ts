import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://api.fanyi.baidu.com/api/trans/vip/translate'
    }
  },
  build: {
    outDir: 'docs'
  }
});
