import { NextResponse, type NextRequest } from 'next/server';

/**
 * Serves the Spanish training from its own subdomain.
 *
 *   entrenamiento.dmgagencycore.com/           -> /entrenamiento
 *   entrenamiento.dmgagencycore.com/confirmado -> /entrenamiento/confirmado
 *
 * Why a rewrite rather than a second Vercel project: the training reuses the
 * header, footer, countdown and reveal components the webinar page already
 * has. A separate project would mean a second copy of all of them, and the two
 * copies would drift the first time one got a fix.
 *
 * The paths also stay reachable directly at /entrenamiento on the main domain,
 * which is what makes the page testable before the DNS record exists.
 */
const SUBDOMAIN = 'entrenamiento.';
const BASE = '/entrenamiento';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  if (!host.startsWith(SUBDOMAIN)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  // Already under /entrenamiento — leave it alone, or the rewrite would stack
  // the prefix onto itself and 404.
  if (pathname === BASE || pathname.startsWith(`${BASE}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? BASE : `${BASE}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the API, and anything with a file extension. Without
  // this every image and script request would be rewritten too and the page
  // would load unstyled.
  matcher: ['/((?!_next/|api/|.*\\.[\\w]+$).*)'],
};
