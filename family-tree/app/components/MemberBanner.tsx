import React, { useCallback, memo, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import { FamilyMember, ItemTypes } from '@/types';

import ContextMenu from './ContextMenu';

interface MemberBannerProps {
  member: FamilyMember;
  isSelected?: boolean;
  selectedCount?: number;
  onSelect?: (member: FamilyMember, event?: React.MouseEvent) => void;
  onEdit?: (member: FamilyMember) => void;
  onDelete?: (member: FamilyMember) => void;
  onBulkDelete?: () => void;
}

const MemberBanner = memo<MemberBannerProps>(function MemberBanner({ 
  member, 
  isSelected = false,
  selectedCount = 0,
  onSelect,
  onEdit,
  onDelete,
  onBulkDelete
}) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEMBER_CARD,
    item: { id: member.id, x: member.position.x, y: member.position.y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  // Connect drag ref with error handling
  const connectDragRef = useCallback((node: HTMLDivElement | null) => {
    dragRef.current = node;
    if (typeof drag === 'function') {
      drag(node);
    }
  }, [drag]);

  // Handle member selection with memoized member reference
  const handleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect?.(member, event);
  }, [member.id, onSelect]);

  // Handle context menu with optimized dependencies
  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Auto-select member if not already selected when right-clicking
    if (!isSelected) {
      onSelect?.(member, event);
    }
    
    setContextMenu({
      x: event.clientX,
      y: event.clientY
    });
  }, [isSelected, member.id, onSelect]);

  // Context menu items - different based on selection state
  const contextMenuItems = useMemo(() => {
    if (selectedCount > 1) {
      // Multiple selection context menu
      return [
        {
          id: 'bulk-delete',
          label: `Delete ${selectedCount} Members`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          onClick: () => onBulkDelete?.(),
          className: 'hover:bg-red-50 hover:text-red-600'
        }
      ];
    } else {
      // Single selection context menu
      return [
        {
          id: 'edit',
          label: 'Edit Member',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          ),
          onClick: () => onEdit?.(member)
        },
        {
          id: 'delete',
          label: 'Delete Member',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          onClick: () => onDelete?.(member),
          className: 'hover:bg-red-50 hover:text-red-600'
        }
      ];
    }
  }, [selectedCount, member, onEdit, onDelete, onBulkDelete]);

  // Memoize inline styles to prevent recreating objects
  const bannerStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: member.position.x,
    top: member.position.y,
    width: member.size.width,
    height: member.size.height,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'move',
  }), [member.position.x, member.position.y, member.size.width, member.size.height, isDragging]);
  
  // Memoize className to prevent recalculation
  const bannerClassName = useMemo(() => 
    `member-banner rounded-lg bg-white shadow-md border-2 transition-all p-4 ${
      isSelected 
        ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
        : 'border-transparent hover:border-blue-300 hover:shadow-lg'
    }`, [isSelected]);

  return (
    <>
      <div
        ref={connectDragRef}
        data-testid={`member-banner-${member.id}`}
        style={bannerStyle}
        className={bannerClassName}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        <div className="banner-content flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="photo-section flex justify-center mb-2 sm:mb-0">
            {member.photo ? (
              <img 
                src={member.photo} 
                alt={member.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-base sm:text-xl">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="info-section text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg">{member.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{member.relationship || 'Member'}</p>
            {member.title && (
              <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>
            )}
            {(member.birthDate || member.deathDate) && (
              <p className="text-xs text-gray-500 mt-1">
                {member.birthDate && `Born: ${member.birthDate}`}
                {member.deathDate && member.birthDate && ' • '}
                {member.deathDate && `Died: ${member.deathDate}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu !== null}
        position={contextMenu || { x: 0, y: 0 }}
        onClose={() => setContextMenu(null)}
        items={contextMenuItems}
      />
    </>
  );
});

export default MemberBanner;