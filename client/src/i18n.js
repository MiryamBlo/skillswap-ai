import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        offer: "I want to help",
        help: "Help me"
      }
    },
    he: {
      translation: {
        offer: "רוצה לעזור",
        help: "צריכה עזרה"
      }
    }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;