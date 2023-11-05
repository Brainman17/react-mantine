import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import translationRu from '../../../public/locales/ru/translation.json';
import translationEn from '../../../public/locales/en/translation.json';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    lng: 'en',
    debug: true,
    resources: {
        ru: {
            translation: translationRu
        } , 
        en: {
            translation: translationEn
        } 
      }
})

export default i18n;