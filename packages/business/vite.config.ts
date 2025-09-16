import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['**/*.ts', '**/*.vue'],
      exclude: ['**/*.test.ts', '**/*.spec.ts', '**/demo/**']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'JnameBusiness',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['vue', 'vant', '@jname/core', '@jname/components', 'compressorjs'],
      output: {
        globals: {
          'vue': 'Vue',
          'vant': 'Vant',
          '@jname/core': 'JnameCore',
          '@jname/components': 'JnameComponents',
          'compressorjs': 'Compressor'
        }
      }
    }
  }
});
