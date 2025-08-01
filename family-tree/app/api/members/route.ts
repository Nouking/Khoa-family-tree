
import { NextResponse } from 'next/server';
import { getAllMembers, addMember } from '@/app/lib/data';
import { FamilyMember } from '@/types';

export async function GET() {
  try {
    const members = await getAllMembers();
    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to get members:', error);
    return NextResponse.json({ message: 'Failed to get members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMemberData = await request.json() as Omit<FamilyMember, 'id'>;

    if (!newMemberData.name || !newMemberData.birthDate) {
        return NextResponse.json({ message: 'Missing required member data' }, { status: 400 });
    }

    const newMember = await addMember(newMemberData);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Failed to create member:', error);
    return NextResponse.json({ message: 'Failed to create member' }, { status: 500 });
  }
}
