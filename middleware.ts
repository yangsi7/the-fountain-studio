import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // TEMPORARY: Disable Supabase auth for public marketing site
  // The current .env.local points to Horkos Invoice Automation Supabase project
  // which redirects to wrong auth page. Since The Fountain Studio is a public
  // website with no protected routes, we skip Supabase middleware entirely.
  // TODO: Either create proper Supabase project for The Fountain Studio OR
  // remove Supabase entirely as it's not needed for this public site.

  return NextResponse.next({
    request,
  });

  // Handle authentication with Supabase (DISABLED)
  // return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};