import { fileURLToPath, URL } from 'node:url'
import NutUIResolver from '@nutui/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import widget from '@widget-js/vite-plugin-widget'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const offlineMode = config.mode === 'offline'
  const base = offlineMode ? './' : '/monitor'
  return {
    base,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@nutui/nutui/dist/styles/variables-jdt.scss";`,
        },
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
      widget({
        zipName: 'monitor',
        generateZip: offlineMode,
      }),
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver(), NutUIResolver()] }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
