import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { User } from '../../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = '1d'; // 1 day

// Generate JWT token
export async function generateToken(user: Omit<User, 'password'>) {
  const token = await new SignJWT({
    id: user.id,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(new TextEncoder().encode(JWT_SECRET));

  return token;
}

// Verify JWT token
export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return verified.payload;
  } catch (error) {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

// Set token in cookies
export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

// Get token from cookies or headers
export function getToken(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (token) return token;

  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}

// Clear token cookie
export async function clearTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}