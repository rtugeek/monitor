import { URL, fileURLToPath } from "node:url";
import widget from "@widget-js/vite-plugin-widget";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import UnoCSS from 'unocss/vite'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import NutUIResolver from '@nutui/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/monitor',
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: `@import "@nutui/nutui/dist/styles/variables-jdt.scss";`
      }
    }
  },
  plugins: [
    vue(),
    UnoCSS(),
    widget(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver(), NutUIResolver()] }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
