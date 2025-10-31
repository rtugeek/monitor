import i18n from '@/i18n'
import { Notify, Toast } from '@nutui/nutui'
import { WidgetJsPlugin } from '@widget-js/vue3'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import '@widget-js/vue3/dist/style.css'
import '@/assets/main.css'
import '@nutui/touch-emulator'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(i18n)
app.use(Notify)
app.use(Toast)
app.use(pinia)
app.use(WidgetJsPlugin)
app.mount('#app')
