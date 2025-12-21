import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import it from './locales/it/translation.json';
import es from './locales/es/translation.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  it: { translation: it },
  es: { translation: es },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: ['en', 'fr', 'it', 'es'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
