import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 生产环境使用构建后的包，开发环境使用源码
      '@jname/core': process.env.NODE_ENV === 'production'
        ? resolve(__dirname, '../core/dist/index.mjs')
        : resolve(__dirname, '../core/index.ts'),
      '@jname/components': process.env.NODE_ENV === 'production'
        ? resolve(__dirname, '../components/dist/index.mjs')
        : resolve(__dirname, '../components/index.ts'),
      '@jname/business': process.env.NODE_ENV === 'production'
        ? resolve(__dirname, '../business/dist/index.mjs')
        : resolve(__dirname, '../business/index.ts')
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
