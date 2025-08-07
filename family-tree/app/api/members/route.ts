
import { NextRequest, NextResponse } from "next/server";
import { getAllMembers, addMember } from '@/app/lib/data';
import { requireAuth, getUserFromRequest } from '@/app/lib/authMiddleware';
import { FamilyMember } from '@/types';

/**
 * GET /api/members - Get all family members
 * Public access - no authentication required
 */
export async function GET() {
  try {
    const members = await getAllMembers();
    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to get members:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve family members' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/members - Add a new family member
 * Protected route - requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    // Get user info for logging
    const user = await getUserFromRequest(request);
    
    // Parse and validate request body
    let newMemberData: Partial<FamilyMember>;
    try {
      newMemberData = await request.json();
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!newMemberData.name || typeof newMemberData.name !== 'string' || newMemberData.name.trim() === '') {
      return NextResponse.json(
        { message: 'Missing or invalid required field: name' },
        { status: 400 }
      );
    }

    if (!newMemberData.position || typeof newMemberData.position !== 'object' ||
        typeof newMemberData.position.x !== 'number' || typeof newMemberData.position.y !== 'number') {
      return NextResponse.json(
        { message: 'Missing or invalid required field: position must have x and y coordinates' },
        { status: 400 }
      );
    }

    if (!newMemberData.size || typeof newMemberData.size !== 'object' ||
        typeof newMemberData.size.width !== 'number' || typeof newMemberData.size.height !== 'number') {
      return NextResponse.json(
        { message: 'Missing or invalid required field: size must have width and height' },
        { status: 400 }
      );
    }

    // Validate gender if provided
    if (newMemberData.gender && !['male', 'female', 'other'].includes(newMemberData.gender)) {
      return NextResponse.json(
        { message: 'Invalid gender value. Must be: male, female, or other' },
        { status: 400 }
      );
    }

    // Validate order if provided
    if (newMemberData.order !== undefined && (typeof newMemberData.order !== 'number' || newMemberData.order < 0)) {
      return NextResponse.json(
        { message: 'Invalid order value. Must be a non-negative number' },
        { status: 400 }
      );
    }

    // Set defaults for required fields
    const memberToCreate = {
      ...newMemberData,
      name: newMemberData.name.trim(),
      gender: newMemberData.gender || 'other' as const,
      order: newMemberData.order || 1,
      spouseIds: newMemberData.spouseIds || [],
      childrenIds: newMemberData.childrenIds || [],
      relationship: newMemberData.relationship || 'Unspecified',
    } as Omit<FamilyMember, 'id'>;

    const newMember = await addMember(memberToCreate);
    
    console.log(`User ${user?.username} added new member: ${newMember.name} (${newMember.id})`);
    
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Failed to create member:', error);
    
    if (error instanceof Error && error.message.includes('Missing required member fields')) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    
    return NextResponse.json(
      { message: 'Failed to create family member' },
      { status: 500 }
    );
  }
}
