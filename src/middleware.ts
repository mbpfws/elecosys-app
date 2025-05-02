import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './configs/i18n';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Skip if the pathname already has a locale
  if (locales.some(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return;
  }

  // Skip Next.js internal paths
  if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
    return;
  }

  // Skip files with extensions (e.g., favicon.ico)
  if (pathname.match(/\.\w+$/)) {
    return;
  }

  // Redirect to the default locale
  const locale = defaultLocale;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
  ],
};
