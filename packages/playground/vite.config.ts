import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 直接引用源码，获取最新修改
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
