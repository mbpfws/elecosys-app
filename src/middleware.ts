import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Check if the user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // Define protected routes (routes that require authentication)
  const protectedRoutes = [
    '/',
    '/writing-tools',
    '/new-ielts-adaptive',
    '/chat',
    '/pages/account-settings',
    '/admin',
  ];

  // Define auth routes (routes that should redirect to dashboard if already authenticated)
  const authRoutes = [
    '/pages/login',
    '/pages/register',
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/pages/login', request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If the route is an auth route and the user is authenticated, redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
