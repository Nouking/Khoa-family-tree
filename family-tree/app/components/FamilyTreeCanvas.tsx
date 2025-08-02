import React from 'react';
import { FamilyTreeData } from '@/types';
import MemberCard from './MemberCard';

interface FamilyTreeCanvasProps {
  familyTree: FamilyTreeData;
}

const FamilyTreeCanvas: React.FC<FamilyTreeCanvasProps> = ({ familyTree }) => {
  return (
    <div className="relative w-full h-screen bg-gray-100">
      {familyTree.members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default FamilyTreeCanvas;
