
import { NextResponse } from 'next/server';
import { findUserByUsername, updateUserLastLogin } from '@/app/lib/data';
import { generateToken, verifyPassword, setTokenCookie } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const user = await findUserByUsername(username);

    if (!user || !user.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = await generateToken(userWithoutPassword);

    setTokenCookie(token);
    await updateUserLastLogin(user.id);

    return NextResponse.json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
