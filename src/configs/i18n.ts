// Available locales
export const locales = ['en', 'vi'];

// Default locale
export const defaultLocale = 'en';

// Locale names for display
export const localeNames = {
  en: 'English',
  vi: 'Tiếng Việt',
};

// Dictionary cache
let dictionaries: Record<string, any> = {};

// Load dictionary
export async function loadDictionary(locale: string): Promise<Record<string, any>> {
  // If dictionary is already loaded, return it
  if (dictionaries[locale] && Object.keys(dictionaries[locale]).length > 0) {
    return dictionaries[locale];
  }

  try {
    // Dynamic import of the dictionary
    const dictionary = await import(`../data/dictionaries/${locale}.json`);
    dictionaries[locale] = dictionary.default;
    console.log(`Loaded dictionary for ${locale}`, Object.keys(dictionary.default).length, 'sections');
    return dictionaries[locale];
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error);
    // Fallback to empty dictionary
    dictionaries[locale] = {};
    return dictionaries[locale];
  }
}

// Simple i18n provider (no-op for now)
export function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  return children;
}

// Client-side translation function
export function useTranslation(locale = defaultLocale) {
  // Translation function
  const t = (key: string): string => {
    // If dictionary is not loaded yet, return the key
    if (!dictionaries[locale]) {
      return key;
    }

    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: any = dictionaries[locale];

    // Traverse the dictionary object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Return the key if the translation is not found
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}
