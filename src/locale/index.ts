import enLocale from './locales/en.json';
import frLocale from './locales/fr.json';

export const LOCALE = {
  EN: 'en',
  FR: 'fr',
};

export const DEFAULT_LOCALE = LOCALE.EN;

export const LOCALES = {
  [LOCALE.EN]: enLocale,
  [LOCALE.FR]: frLocale,
};
