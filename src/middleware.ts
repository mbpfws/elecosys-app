import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Create a Supabase client using the new SSR package
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Check if the user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // Define public routes (routes that don't require authentication)
  const publicRoutes = [
    '/landing',
    '/about',
    '/(blank-layout)/(guest-only)/login',
    '/(blank-layout)/(guest-only)/register',
    '/(blank-layout)/(guest-only)/forgot-password',
  ];

  // Define auth routes (routes that should redirect to dashboard if already authenticated)
  const authRoutes = [
    '/(blank-layout)/(guest-only)/login',
    '/(blank-layout)/(guest-only)/register',
    '/(blank-layout)/(guest-only)/forgot-password',
  ];

  // Define admin-only routes
  const adminRoutes = [
    '/(dashboard)/(admin)',
  ];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  ) || pathname.includes('/_next') || pathname.includes('/api/');

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if the current route is an admin route
  const isAdminRoute = adminRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // If the route is not public and the user is not authenticated, redirect to login
  if (!isPublicRoute && !session) {
    const redirectUrl = new URL('/landing', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If the route is an auth route and the user is authenticated, redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check admin access for admin routes
  if (isAdminRoute && session) {
    // Get the user's profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    // Redirect non-admin users to dashboard
    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
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
