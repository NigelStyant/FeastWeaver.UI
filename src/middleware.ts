import { auth } from '@/auth';
import { NextResponse } from 'next/server';
 
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  // Protect dashboard routes
  if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
