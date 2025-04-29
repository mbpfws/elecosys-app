import { createI18n } from 'next-international';

export const { useI18n, useScopedI18n, I18nProvider, getLocaleProps } = createI18n({
  en: () => import('../data/dictionaries/en.json'),
  vi: () => import('../data/dictionaries/vi.json'),
});

// Default locale
export const defaultLocale = 'vi';

// Available locales
export const locales = ['en', 'vi'];

// Locale names for display
export const localeNames = {
  en: 'English',
  vi: 'Tiếng Việt',
};
