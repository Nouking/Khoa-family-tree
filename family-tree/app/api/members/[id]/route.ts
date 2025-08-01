
import { NextResponse } from "next/server";
import { getMemberById, updateMember, deleteMember } from '@/app/lib/data';
import { FamilyMember } from '@/types';

type Params = {
    id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    const member = await getMemberById(context.params.id);
    if (!member) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error(`Failed to get member ${context.params.id}:`, error);
    return NextResponse.json({ message: 'Failed to get member' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Params }) {
  try {
    const updates = await request.json() as Partial<FamilyMember>;
    const updatedMember = await updateMember(context.params.id, updates);

    if (!updatedMember) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error(`Failed to update member ${context.params.id}:`, error);
    return NextResponse.json({ message: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  try {
    const success = await deleteMember(context.params.id);

    if (!success) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete member ${context.params.id}:`, error);
    return NextResponse.json({ message: 'Failed to delete member' }, { status: 500 });
  }
}
