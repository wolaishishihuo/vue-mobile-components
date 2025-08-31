import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      include: [
        'src/index.ts',
        'src/**/*',
        'src/types/**/*',
        'src/utils/**/*'
      ],
      exclude: [
        'src/**/*.stories.*',
        'src/**/*.test.*',
        'src/App.vue',
        'src/main.ts'
      ],
      outDir: 'lib'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@jname/vue-mobile-components': resolve(__dirname, 'src/index.ts')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueMobileComponents',
      formats: ['es', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'vant',
        '@vueuse/core',
        '@vant/use',
        'dayjs',
        'lodash-es'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          'vant': 'Vant',
          '@vueuse/core': 'VueUse',
          '@vant/use': 'VantUse',
          'dayjs': 'dayjs',
          'lodash-es': 'lodash'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
