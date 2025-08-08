"use client";

import React, { useEffect, useState } from 'react';

import { FamilyMember } from '@/types';

import FamilyTreeCanvas from './FamilyTreeCanvas';

interface FamilyTreeProps {
  initialMembers: FamilyMember[];
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ initialMembers }) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);

  // Process members to ensure they have size properties
  useEffect(() => {
    const processedMembers = initialMembers.map(member => ({
      ...member,
      // Set default size if not already set
      size: member.size || { width: 250, height: 120 },
      // Ensure relationship field exists
      relationship: member.relationship || 'Member'
    }));
    
    setMembers(processedMembers);
  }, [initialMembers]);

  const moveMember = async (id: string, x: number, y: number) => {
    // Optimistically update the local state
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, position: { x, y } } : member
      )
    );

    // Persist the change to the backend
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position: { x, y } }),
      });

      if (!response.ok) {
        throw new Error('Failed to update member position');
      }
    } catch (error) {
      console.error('Error updating member position:', error);
      // Optionally, revert the state change if the API call fails
      // For now, we'll just log the error
    }
  };

  return (
    <div className="w-full h-full">
      <FamilyTreeCanvas members={members} moveMember={moveMember} />
    </div>
  );
};

export default FamilyTree;
