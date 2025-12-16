import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import translationRU from './locales/ru.json';
import translationEN from './locales/en.json';

// Ресурсы с переводами
const resources = {
  ru: {
    translation: translationRU
  },
  en: {
    translation: translationEN
  }
};

i18n
  // Загрузка переводов с бэкенда
  .use(Backend)
  // Определение языка пользователя
  .use(LanguageDetector)
  // передача i18n в react-i18next
  .use(initReactI18next)
  // инициализация i18next
  .init({
    resources,
    fallbackLng: 'ru', // язык по умолчанию
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // не нужно экранировать для React
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n; 