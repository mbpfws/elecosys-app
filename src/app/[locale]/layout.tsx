'use client';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/configs/i18n';

// Emotion Cache Provider for MUI
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

// Theme Provider Import
import CustomThemeProvider from '@core/theme/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

function EmotionCacheProvider({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key="emotion"
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <EmotionCacheProvider>
          <CustomThemeProvider systemMode="light">
            <CssBaseline />
            {children}
          </CustomThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
