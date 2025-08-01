
import { NextResponse } from 'next/server';
import { clearTokenCookie } from '@/app/lib/auth';

export async function POST() {
  try {
    clearTokenCookie();
    return NextResponse.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}
