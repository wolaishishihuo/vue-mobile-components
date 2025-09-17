import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 开发和生产环境都使用源码，让 Vite 处理打包
      '@jname/core': resolve(__dirname, '../core/index.ts'),
      '@jname/components': resolve(__dirname, '../components/index.ts'),
      '@jname/business': resolve(__dirname, '../business/index.ts')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
