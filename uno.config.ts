import { defineConfig } from 'unocss'
import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // flex布局相关
    ['flex-center', 'flex justify-center items-center'],
    ['flex-x-center', 'flex justify-center'],
    ['flex-y-center', 'flex items-center'],
    // 边距相关
    ['m-auto', 'mx-auto my-auto'],
    ['mx-auto', 'ml-auto mr-auto'],
    ['my-auto', 'mt-auto mb-auto']
  ],
  theme: {
    colors: {
      primary: '#1976d2',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3'
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
