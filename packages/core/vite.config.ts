import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'JnameCore',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
