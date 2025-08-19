import React, { useCallback, useEffect, memo, MouseEvent, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

import '../v2-styles.css';

import { FamilyMember, ItemTypes } from '@/types';

import { useFamilyTreeWithDispatch, useSelectedMembers } from '../../contexts/FamilyTreeContext';
import { useVirtualization, useConnectionVirtualization } from '../../hooks/useVirtualization';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import { calculateConnections } from '../../lib/connectionCalculator';
import { useAuth } from '../../hooks/useAuth';

import MemberBanner from '../../components/MemberBanner';
import VirtualizedConnections from '../../components/VirtualizedConnections';
import { useToast } from '../../components/ToastProvider';
import ContextMenuV2, { createMemberContextMenuItems } from '../../components-v2/ContextMenuV2';

export interface FamilyTreeCanvasV2Props {
  members: FamilyMember[];
  moveMember: (id: string, x: number, y: number) => void;
  highlightedIds?: string[];
}

interface DragItem {
  id: string;
  type: string;
  x: number;
  y: number;
}

interface Viewport {
  x: number;
  y: number;
  zoom: number;
  width: number;
  height: number;
}

export interface FamilyTreeCanvasV2Handle {
  focusMember: (memberId: string) => void;
  zoomToFitMembers: (memberIds: string[]) => void;
}

const FamilyTreeCanvasV2 = memo(React.forwardRef<FamilyTreeCanvasV2Handle, FamilyTreeCanvasV2Props>(function FamilyTreeCanvasV2({ members, moveMember, highlightedIds = [] }, ref) {
  // Global state for member selection
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const { showToast } = useToast();
  const selectedMemberIds = useSelectedMembers();
  const { isAuthenticated } = useAuth();
  
  // Canvas state
  const canvasRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    memberId: string;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    memberId: ''
  });

  // Performance monitoring
  usePerformanceMonitor();

  // Virtualization for performance with large family trees
  const { visibleMembers } = useVirtualization(members, { viewport });
  const connectionRelevantMembers = useConnectionVirtualization(
    members, 
    visibleMembers.map(m => m.id)
  );
  
  // Optimized connection calculation with virtualization
  const connections = useMemo(() => {
    return calculateConnections(connectionRelevantMembers);
  }, [connectionRelevantMembers]);

  // Drop target for member positioning
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.MEMBER_CARD,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!canvasRef.current) return;

      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const newX = Math.round(item.x + delta.x / viewport.zoom);
      const newY = Math.round(item.y + delta.y / viewport.zoom);
      
      moveMember(item.id, newX, newY);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [moveMember, viewport.zoom]);

  // Pan canvas functionality
  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Prevent panning if clicking on a member (handled in member component)
    const target = e.target as HTMLElement;
    if (target.closest('[data-member-id]')) {
      return;
    }

    if (e.button === 0) { // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
      e.preventDefault();
    }
  }, [viewport.x, viewport.y]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setViewport(prev => ({ ...prev, x: newX, y: newY }));
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  // Context menu handlers
  const handleMemberContextMenu = useCallback((e: MouseEvent<HTMLDivElement>, memberId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      memberId
    });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleViewMember = useCallback((memberId: string) => {
    // TODO: Implement member detail view - will be enhanced in E13-T8
    showToast({
      title: 'View Member',
      description: `Member detail view for ID: ${memberId}`,
      type: 'info'
    });
  }, [showToast]);

  const handleEditMember = useCallback((memberId: string) => {
    // TODO: Implement edit member modal - requires E13-T5 modal content
    showToast({
      title: 'Edit Member',
      description: `Edit functionality for ID: ${memberId}`,
      type: 'info'
    });
  }, [showToast]);

  const handleDeleteMember = useCallback((memberId: string) => {
    // TODO: Implement delete confirmation and API call
    showToast({
      title: 'Delete Member',
      description: `Delete functionality for ID: ${memberId}`,
      type: 'warning'
    });
  }, [showToast]);

  // Zoom functionality
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const delta = -e.deltaY * 0.001;
    const newZoom = Math.max(0.1, Math.min(3, viewport.zoom + delta));
    
    if (newZoom !== viewport.zoom) {
      const zoomRatio = newZoom / viewport.zoom;
      const newX = mouseX - (mouseX - viewport.x) * zoomRatio;
      const newY = mouseY - (mouseY - viewport.y) * zoomRatio;
      
      setViewport(prev => ({ 
        ...prev, 
        zoom: newZoom,
        x: newX,
        y: newY
      }));
    }
  }, [viewport]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      setViewport(prev => ({ 
        ...prev, 
        width: rect.width, 
        height: rect.height 
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Attach wheel listener with passive: false to prevent default scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Global mouse listeners for drag
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      handleMouseMove(e as unknown as MouseEvent<HTMLDivElement>);
    };
    
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Imperative handle for focus/zoom operations
  useImperativeHandle(ref, () => ({
    focusMember: (memberId: string) => {
      const member = members.find(m => m.id === memberId);
      if (!member || !canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - member.position.x * viewport.zoom;
      const centerY = rect.height / 2 - member.position.y * viewport.zoom;
      
      setViewport(prev => ({ ...prev, x: centerX, y: centerY }));
    },
    zoomToFitMembers: (memberIds: string[]) => {
      if (memberIds.length === 0 || !canvasRef.current) return;
      
      const targetMembers = members.filter(m => memberIds.includes(m.id));
      if (targetMembers.length === 0) return;
      
      // Calculate bounding box
      const minX = Math.min(...targetMembers.map(m => m.position.x));
      const maxX = Math.max(...targetMembers.map(m => m.position.x));
      const minY = Math.min(...targetMembers.map(m => m.position.y));
      const maxY = Math.max(...targetMembers.map(m => m.position.y));
      
      const padding = 100;
      const rect = canvasRef.current.getBoundingClientRect();
      
      const zoomX = rect.width / (maxX - minX + padding * 2);
      const zoomY = rect.height / (maxY - minY + padding * 2);
      const newZoom = Math.max(0.1, Math.min(3, Math.min(zoomX, zoomY)));
      
      const centerX = rect.width / 2 - ((minX + maxX) / 2) * newZoom;
      const centerY = rect.height / 2 - ((minY + maxY) / 2) * newZoom;
      
      setViewport(prev => ({ 
        ...prev, 
        zoom: newZoom,
        x: centerX,
        y: centerY
      }));
    },
  }), [members, viewport.zoom]);

  return (
    <div className="v2-canvas-grid rounded-[16px] h-full p-3 sm:p-5 relative overflow-hidden">
      <h2 className="v2-canvas-title">Family Tree</h2>
      
      {/* Relationship legend overlay */}
      <div className="v2-connection-legend panel p-2" data-expanded="false">
        <button className="v2-legend-toggle" title="Toggle size" aria-label="Toggle legend">↔</button>
        <h4>Relationship key</h4>
        <div className="v2-legend-row">
          <svg width="40" height="10" viewBox="0 0 40 10">
            <path className="v2-connector v2-connector--parent" d="M2 5 H38" fill="none"/>
          </svg>
          <span>Parent → Child</span>
        </div>
        <div className="v2-legend-row">
          <svg width="40" height="10" viewBox="0 0 40 10">
            <path className="v2-connector v2-connector--spouse" d="M2 5 H38" fill="none"/>
          </svg>
          <span>Spouse ↔ Spouse</span>
        </div>
      </div>
      
      {/* Dynamic connectors will be drawn here */}
      <svg 
        id="connections" 
        className="v2-connections-layer absolute inset-0 pointer-events-none hidden min-[480px]:block" 
        width="100%" 
        height="100%" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <VirtualizedConnections connections={connections} viewport={viewport} />
      </svg>

      {/* Canvas Container */}
      <div
        ref={(element) => {
          canvasRef.current = element;
          drop(element);
        }}
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        role="application"
        aria-label="Family tree canvas"
      >
        {/* Members Layer */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            transformOrigin: '0 0'
          }}
        >
          {visibleMembers.map((member) => {
            // Determine ribbon color based on relationship
            const getRibbonColor = (relationship: string = 'Family Member') => {
              const rel = relationship.toLowerCase();
              if (rel.includes('father') || rel.includes('parent')) return 'v2-ribbon-mint';
              if (rel.includes('mother') || rel.includes('parent')) return 'v2-ribbon-sage';
              if (rel.includes('brother') || rel.includes('son')) return 'v2-ribbon-peach';
              if (rel.includes('sister') || rel.includes('daughter')) return 'v2-ribbon-lilac';
              if (rel.includes('spouse') || rel.includes('husband') || rel.includes('wife')) return 'v2-ribbon-sun';
              if (rel.includes('child') || rel.includes('nephew') || rel.includes('niece')) return 'v2-ribbon-rose';
              return 'v2-ribbon-mint'; // default
            };

            return (
              <div
                key={member.id}
                data-member-id={member.id}
                className="absolute v2-node-card float-in px-3 py-3 flex items-center gap-3 cursor-pointer"
                style={{
                  left: member.position.x,
                  top: member.position.y,
                  transform: 'translate(-50%, -50%)'
                }}
                onContextMenu={(e) => handleMemberContextMenu(e, member.id)}
                onDoubleClick={() => handleViewMember(member.id)}
                title={`Right-click for options: ${member.name}`}
              >
                <img 
                  className="v2-node-photo" 
                  src={member.photo || `https://placehold.co/160x160?text=${encodeURIComponent(member.name.split(' ')[0])}`}
                  alt={member.name} 
                />
                <div>
                  <div className={`v2-ribbon ${getRibbonColor(member.relationship)}`}>
                    {member.name}
                  </div>
                  <div className="text-[12px] opacity-70 mt-1">{member.relationship || 'Family Member'}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Canvas Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            className="v2-btn-outline w-10 h-10 flex items-center justify-center"
            onClick={() => setViewport(prev => ({ ...prev, zoom: Math.min(3, prev.zoom * 1.2) }))}
            aria-label="Zoom in"
            title="Zoom in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="v2-btn-outline w-10 h-10 flex items-center justify-center"
            onClick={() => setViewport(prev => ({ ...prev, zoom: Math.max(0.1, prev.zoom * 0.8) }))}
            aria-label="Zoom out"
            title="Zoom out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="v2-btn-outline w-10 h-10 flex items-center justify-center"
            onClick={() => setViewport({ x: 0, y: 0, zoom: 1, width: viewport.width, height: viewport.height })}
            aria-label="Reset view"
            title="Reset view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Zoom level indicator */}
        <div className="absolute top-4 left-4">
          <div className="v2-badge bg-(--surface-1) border border-(--color-neutral-200) px-2 py-1 text-(--text-sm)">
            {Math.round(viewport.zoom * 100)}%
          </div>
        </div>

        {/* Context Menu */}
        <ContextMenuV2
          isOpen={contextMenu.isOpen}
          position={contextMenu.position}
          onClose={handleCloseContextMenu}
          items={contextMenu.memberId ? createMemberContextMenuItems(
            contextMenu.memberId,
            members.find(m => m.id === contextMenu.memberId)?.name || '',
            isAuthenticated,
            handleViewMember,
            handleEditMember,
            handleDeleteMember
          ) : []}
        />
      </div>
    </div>
  );
}));

export default FamilyTreeCanvasV2;