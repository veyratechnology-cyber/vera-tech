import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global Middleware for Crash Prevention
 * Handles errors gracefully and prevents site crashes
 */

export function middleware(request: NextRequest) {
  try {
    // Add request timeout header
    const response = NextResponse.next();
    
    // Set security headers to prevent common attacks
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Add request ID for tracking
    const requestId = crypto.randomUUID();
    response.headers.set('X-Request-ID', requestId);
    
    return response;
  } catch (error) {
    // Log error but don't crash
    console.error('[MIDDLEWARE] Error:', error);
    
    // Return a minimal response to prevent crash
    return NextResponse.next();
  }
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
