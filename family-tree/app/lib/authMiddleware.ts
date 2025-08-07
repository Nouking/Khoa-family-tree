import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getToken } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

/**
 * Middleware to check authentication for protected routes
 * Returns null if authenticated, NextResponse for unauthorized access
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const token = getToken(request);
  
  if (!token) {
    return NextResponse.json(
      { message: 'Authentication required. Please log in.' }, 
      { status: 401 }
    );
  }

  const payload = await verifyToken(token);
  
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json(
      { message: 'Invalid or expired token. Please log in again.' }, 
      { status: 401 }
    );
  }

  // Token is valid, attach user info to request
  return null;
}

/**
 * Get user information from authenticated request
 */
export async function getUserFromRequest(request: NextRequest) {
  const token = getToken(request);
  
  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  return {
    id: payload.id as string,
    username: payload.username as string,
    role: payload.role as string,
  };
}