import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { FamilyMember, ItemTypes } from '../../types';
import MemberCard from './MemberCard';
import { XYCoord } from 'dnd-core';

interface FamilyTreeCanvasProps {
  members: FamilyMember[];
  moveMember: (id: string, x: number, y: number) => void;
}

interface DragItem {
  id: string;
  type: string;
  x: number;
  y: number;
}

const FamilyTreeCanvas: React.FC<FamilyTreeCanvasProps> = ({ members, moveMember }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.MEMBER_CARD,
      drop: (item: DragItem, monitor: DropTargetMonitor) => {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const x = Math.round(item.x + delta.x);
        const y = Math.round(item.y + delta.y);
        moveMember(item.id, x, y);
        return undefined;
      },
    }),
    [moveMember]
  );

  return (
    <div ref={drop as unknown as React.Ref<HTMLDivElement>} data-testid="family-tree-canvas" className="relative w-full h-screen bg-gray-100">
      {/* Connections Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Connection lines will be rendered here */}
      </svg>

      {/* Members Layer */}
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default FamilyTreeCanvas;
