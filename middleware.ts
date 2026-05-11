import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protège /studio par HTTP Basic Auth si les variables sont définies.
 * Sans STUDIO_BASIC_AUTH_* → accès inchangé (pratique en local).
 * Sur Vercel : définissez les deux variables avec des caractères ASCII.
 */
export function middleware(request: NextRequest) {
  const user = process.env.STUDIO_BASIC_AUTH_USER;
  const pass = process.env.STUDIO_BASIC_AUTH_PASSWORD;

  if (!user || !pass) {
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");
  let expected: string;
  try {
    expected = `Basic ${btoa(`${user}:${pass}`)}`;
  } catch {
    // Mot de passe non ASCII / btoa impossible — ne pas planter le middleware
    return NextResponse.next();
  }

  if (header === expected) {
    return NextResponse.next();
  }

  return new NextResponse("Authentification requise pour accéder au Studio.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Mycélium Studio"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
