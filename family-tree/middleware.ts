import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getToken } from './app/lib/auth';

// Protected API routes that require authentication
const PROTECTED_API_ROUTES = [
  '/api/family',
];

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected API route
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route) && 
    (request.method !== 'GET')
  );

  if (!isProtectedApiRoute) {
    return NextResponse.next();
  }

  // Get token from request
  const token = getToken(request);
  
  // If no token, return unauthorized
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Verify token
  const payload = await verifyToken(token);
  
  // If token is invalid, return unauthorized
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // Token is valid, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/family/:path*',
  ],
};