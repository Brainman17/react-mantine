import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
          translation: {
            "auth": {
                "title": "Sign in",
                 "sendMessage": "Send a message with code"
            }
          }
        },
        ru: {
            translation: {
                "auth": {
                    "title": "Войдите",
                    "sendMessage": "Отправить СМС с кодом "
                }
            }
          }
      }
})

export default i18n;