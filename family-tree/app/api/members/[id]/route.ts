import { NextRequest, NextResponse } from "next/server";

import { FamilyMember } from '@/types';

import { requireAuth, getUserFromRequest } from '@/app/lib/authMiddleware';
import { getMemberById, updateMember, deleteMember } from '@/app/lib/data';

type Params = {
    id: string;
};

/**
 * GET /api/members/[id] - Get a single family member by ID
 * Public access - no authentication required
 */
export async function GET(request: NextRequest, context: { params: Promise<Params> }) {
  let id = 'unknown';
  try {
    const params = await context.params;
    id = params.id;
    
    // Validate ID format
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ message: 'Invalid member ID' }, { status: 400 });
    }

    const member = await getMemberById(id);
    if (!member) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error(`Failed to get member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to retrieve family member' }, { status: 500 });
  }
}

/**
 * PUT /api/members/[id] - Update a family member
 * Protected route - requires authentication
 */
export async function PUT(request: NextRequest, context: { params: Promise<Params> }) {
  let id = 'unknown';
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    // Get user info for logging
    const user = await getUserFromRequest(request);
    
    const params = await context.params;
    id = params.id;
    
    // Validate ID format
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ message: 'Invalid member ID' }, { status: 400 });
    }

    // Parse and validate request body
    let updates: Partial<FamilyMember>;
    try {
      updates = await request.json();
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate updates
    if (updates.name !== undefined) {
      if (typeof updates.name !== 'string' || updates.name.trim() === '') {
        return NextResponse.json(
          { message: 'Invalid name: must be a non-empty string' },
          { status: 400 }
        );
      }
      updates.name = updates.name.trim();
    }

    if (updates.gender !== undefined && !['male', 'female', 'other'].includes(updates.gender)) {
      return NextResponse.json(
        { message: 'Invalid gender value. Must be: male, female, or other' },
        { status: 400 }
      );
    }

    if (updates.position !== undefined) {
      if (typeof updates.position !== 'object' ||
          typeof updates.position.x !== 'number' || 
          typeof updates.position.y !== 'number') {
        return NextResponse.json(
          { message: 'Invalid position: must have numeric x and y coordinates' },
          { status: 400 }
        );
      }
    }

    if (updates.size !== undefined) {
      if (typeof updates.size !== 'object' ||
          typeof updates.size.width !== 'number' || 
          typeof updates.size.height !== 'number' ||
          updates.size.width <= 0 || updates.size.height <= 0) {
        return NextResponse.json(
          { message: 'Invalid size: must have positive numeric width and height' },
          { status: 400 }
        );
      }
    }

    if (updates.order !== undefined && (typeof updates.order !== 'number' || updates.order < 0)) {
      return NextResponse.json(
        { message: 'Invalid order: must be a non-negative number' },
        { status: 400 }
      );
    }

    // Validate arrays
    if (updates.spouseIds !== undefined && !Array.isArray(updates.spouseIds)) {
      return NextResponse.json(
        { message: 'Invalid spouseIds: must be an array' },
        { status: 400 }
      );
    }

    if (updates.childrenIds !== undefined && !Array.isArray(updates.childrenIds)) {
      return NextResponse.json(
        { message: 'Invalid childrenIds: must be an array' },
        { status: 400 }
      );
    }

    const updatedMember = await updateMember(id, updates);

    if (!updatedMember) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    
    console.log(`User ${user?.username} updated member: ${updatedMember.name} (${id})`);
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error(`Failed to update member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to update family member' }, { status: 500 });
  }
}

/**
 * DELETE /api/members/[id] - Delete a family member
 * Protected route - requires authentication
 */
export async function DELETE(request: NextRequest, context: { params: Promise<Params> }) {
  let id = 'unknown';
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    // Get user info for logging
    const user = await getUserFromRequest(request);
    
    const params = await context.params;
    id = params.id;
    
    // Validate ID format
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ message: 'Invalid member ID' }, { status: 400 });
    }

    // Get member name for logging before deletion
    const member = await getMemberById(id);
    const memberName = member?.name || 'Unknown';

    const success = await deleteMember(id);

    if (!success) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    
    console.log(`User ${user?.username} deleted member: ${memberName} (${id})`);
    
    return NextResponse.json({ 
      message: 'Family member deleted successfully',
      deletedMember: { id, name: memberName }
    });
  } catch (error) {
    console.error(`Failed to delete member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete family member' }, { status: 500 });
  }
}
