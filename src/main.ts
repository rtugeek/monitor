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

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(Notify)
app.use(Toast)
app.use(pinia)
app.use(WidgetJsPlugin)
app.mount('#app')
