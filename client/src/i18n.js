import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        offer: "I want to help",
        help: "Help me",
        newCategory: "New Category",
        Description: "Description",
        ShortDescription: "Short Title",
        Category: "Category",
        free: "Free",
        DisplayDuration: "Display Duration (days)",
        CreditCost: "Credit Cost",
        DistanceRange: "Distance range (km)",
        Other: "Other",
        Submit: "Submit",
        HowToHelp: "How would you like to help",
        HowCanWeHelpYou: "How can we help you"
      }
    },
    he: {
      translation: {
        offer: "רוצה לעזור",
        help: "צריכה עזרה",
        newCategory: "קטגוריה חדשה",
        Description: "תיאור",
        ShortDescription: "כותרת קצרה",
        Category: "קטגוריה",
        free: "חינם",
        DisplayDuration: "משך התצוגה (ימים)",
        CreditCost: "עלות קרדיטים",
        DistanceRange: "טווח מרחק (קילומטרים)",
        Other: "אחר",
        Submit: "שלח",
        HowToHelp: "איך תרצה לעזור",
        HowCanWeHelpYou: "כיצד נוכל לעזור לך"
      }
    }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;