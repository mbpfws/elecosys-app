// Available locales
export const locales = ['en', 'vi'];

// Default locale
export const defaultLocale = 'en';

// Locale names for display
export const localeNames = {
  en: 'English',
  vi: 'Tiếng Việt',
};

// Dictionary loader
export async function getDictionary(locale: string) {
  return (await import(`../data/dictionaries/${locale}.json`)).default;
}

// I18n Provider (client-side)
export function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  return children;
}

// Hooks for client-side i18n
export function useI18n() {
  return (key: string) => key;
}

export function useCurrentLocale() {
  return 'en';
}

export function useChangeLocale() {
  return (locale: string) => {
    window.location.pathname = window.location.pathname.replace(/^\/[^\/]+/, `/${locale}`);
  };
}
