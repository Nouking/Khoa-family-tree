import React from 'react';
import { FamilyTreeData } from '@/types';
import MemberCard from './MemberCard';

interface FamilyTreeCanvasProps {
  familyTree: FamilyTreeData;
}

const FamilyTreeCanvas: React.FC<FamilyTreeCanvasProps> = ({ familyTree }) => {
  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Connections Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Connection lines will be rendered here */}
      </svg>

      {/* Members Layer */}
      {familyTree.members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default FamilyTreeCanvas;
