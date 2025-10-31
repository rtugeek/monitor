import { createI18n } from 'vue-i18n'
import messages from './message'

const defaultLocale = (navigator.language || 'en').startsWith('zh') ? 'zh' : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages,
})

export default i18n
