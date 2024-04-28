import { createI18n } from 'vue-i18n'
import en from 'src/lang/en'
import vn from 'src/lang/vn'

export default ({ app }) => {
  // Create I18n instance
  const i18n = createI18n({
    locale: 'en',
    legacy: false,
    messages: {
      en,
      vn,
    }
  })

  // Tell app to use the I18n instance
  app.use(i18n)
}
