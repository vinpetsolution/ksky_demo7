import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = new Set(['/']);
const AUTH_COOKIE = 'ksky_auth_active';

const PROTECTED_PREFIXES = [
  '/game_casino',
  '/game_slot',
  '/casino',
  '/slots',
  '/deposit',
  '/withdraw',
  '/points',
  '/bet-history',
  '/messages',
  '/inquiries',
  '/announcement',
  '/article',
  '/my-page',
  '/voucher',
  '/deposit-trc20',
  '/agent-ranking',
  '/user-ranking',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(AUTH_COOKIE);
  if (!authCookie?.value) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('login', '1');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|images|fonts|videos|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)).*)',
  ],
};
