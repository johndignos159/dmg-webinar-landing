import { NextResponse, type NextRequest } from 'next/server';

/**
 * Serves each training from its own subdomain.
 *
 *   entrenamiento.dmgagencycore.com/           -> /entrenamiento
 *   entrenamiento.dmgagencycore.com/confirmado -> /entrenamiento/confirmado
 *   training.dmgagencycore.com/                -> /training
 *   training.dmgagencycore.com/confirmed       -> /training/confirmed
 *
 * Why a rewrite rather than a second Vercel project: the trainings reuse the
 * header, footer, countdown and reveal components the webinar page already
 * has. A separate project would mean a second copy of all of them, and the
 * copies would drift the first time one got a fix.
 *
 * The paths also stay reachable directly at /entrenamiento and /training on
 * the main domain, which is what makes a page testable before its DNS record
 * exists.
 */
const SITES = [
  { subdomain: 'entrenamiento.', base: '/entrenamiento' },
  { subdomain: 'training.', base: '/training' },
] as const;

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const site = SITES.find((s) => host.startsWith(s.subdomain));
  if (!site) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  // Already under the base — leave it alone, or the rewrite would stack the
  // prefix onto itself and 404.
  if (pathname === site.base || pathname.startsWith(`${site.base}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? site.base : `${site.base}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the API, and anything with a file extension. Without
  // this every image and script request would be rewritten too and the page
  // would load unstyled.
  matcher: ['/((?!_next/|api/|.*\\.[\\w]+$).*)'],
};
