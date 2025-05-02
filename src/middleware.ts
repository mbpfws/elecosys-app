import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This is a placeholder middleware that does nothing
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
