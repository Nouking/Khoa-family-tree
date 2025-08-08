import React, { useState, useCallback, useRef, MouseEvent, useMemo } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { FamilyMember, ItemTypes } from '../../types';
import MemberBanner from './MemberBanner';
import EditMemberModal from './EditMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
import BulkDeleteModal from './BulkDeleteModal';
import TreeConnection from './TreeConnection';
import { XYCoord } from 'dnd-core';
import { useFamilyTreeWithDispatch, useSelectedMembers } from '../contexts/FamilyTreeContext';
import { calculateConnections } from '../../lib/connectionCalculator';

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

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

const FamilyTreeCanvas: React.FC<FamilyTreeCanvasProps> = ({ members, moveMember }) => {
  // Global state for member selection
  const { dispatch } = useFamilyTreeWithDispatch();
  const selectedMemberIds = useSelectedMembers();
  
  // Viewport state for pan and zoom
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
  
  // State to track panning
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState<{ x: number; y: number } | null>(null);
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<FamilyMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<FamilyMember | null>(null);
  
  // Constants for zoom
  const ZOOM_STEP = 0.1;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2.0;

  // Reference to the canvas div for mouse events
  const canvasRef = useRef<HTMLDivElement>(null);

  // Calculate connections dynamically based on member positions
  const connections = useMemo(() => {
    return calculateConnections(members);
  }, [members]);

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.MEMBER_CARD,
      drop: (item: DragItem, monitor: DropTargetMonitor) => {
        // Only handle drop if we're not currently panning
        if (!isPanning) {
          const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
          const x = Math.round(item.x + delta.x);
          const y = Math.round(item.y + delta.y);
          moveMember(item.id, x, y);
        }
        return undefined;
      },
    }),
    [moveMember, isPanning]
  );

  // Set up combined ref for canvas
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Apply the drop ref from react-dnd
      (drop as unknown as React.RefCallback<HTMLDivElement>)(node);
      // Store our own ref
      canvasRef.current = node;
    },
    [drop]
  );

  // Handle zoom in
  const handleZoomIn = useCallback(() => {
    setViewport(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom + ZOOM_STEP, MAX_ZOOM)
    }));
  }, []);

  // Handle zoom out
  const handleZoomOut = useCallback(() => {
    setViewport(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom - ZOOM_STEP, MIN_ZOOM)
    }));
  }, []);

  // Handle mouse down for panning
  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Only start panning with left mouse button
    if (e.button !== 0) return;
    
    setIsPanning(true);
    setStartPanPos({ x: e.clientX, y: e.clientY });
  }, []);

  // Handle mouse move for panning
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !startPanPos) return;

    const deltaX = e.clientX - startPanPos.x;
    const deltaY = e.clientY - startPanPos.y;

    setViewport(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setStartPanPos({ x: e.clientX, y: e.clientY });
  }, [isPanning, startPanPos]);

  // Handle mouse up to end panning
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setStartPanPos(null);
  }, []);

  // Reset viewport to center
  const handleResetView = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 });
  }, []);

  // Handle member selection with support for multi-select
  const handleMemberSelect = useCallback((member: FamilyMember, event?: React.MouseEvent) => {
    if (event?.ctrlKey || event?.metaKey) {
      // Multi-select with Ctrl/Cmd
      if (selectedMemberIds.includes(member.id)) {
        dispatch({ type: 'DESELECT_MEMBER', payload: member.id });
      } else {
        dispatch({ type: 'SELECT_MEMBER', payload: member.id });
      }
    } else if (event?.shiftKey && selectedMemberIds.length > 0) {
      // TODO: Could implement range selection here in future
      dispatch({ type: 'SELECT_MEMBER', payload: member.id });
    } else {
      // Single select - clear existing and select new
      dispatch({ type: 'SET_SELECTED_MEMBERS', payload: [member.id] });
    }
  }, [dispatch, selectedMemberIds]);

  // Handle canvas click (deselect members)
  const handleCanvasClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Only deselect if clicking on the canvas background (not during panning)
    if (e.target === e.currentTarget && !isPanning) {
      dispatch({ type: 'CLEAR_SELECTION' });
    }
  }, [dispatch, isPanning]);

  // Handle member edit
  const handleMemberEdit = useCallback((member: FamilyMember) => {
    setMemberToEdit(member);
    setShowEditModal(true);
  }, []);

  // Handle member delete
  const handleMemberDelete = useCallback((member: FamilyMember) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  }, []);

  // Handle bulk delete
  const handleBulkDelete = useCallback(() => {
    setShowBulkDeleteModal(true);
  }, []);

  return (
    <div 
      data-testid="family-tree-canvas"
      className="relative w-full h-screen bg-gray-100 overflow-hidden"
      ref={setRefs}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
      style={{ cursor: isPanning ? 'grabbing' : 'default' }}
    >
      {/* Viewport Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 bg-white rounded-lg shadow-md p-2">
        <button 
          data-testid="zoom-in-button"
          className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600"
          onClick={handleZoomIn}
          aria-label="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          data-testid="zoom-out-button"
          className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600"
          onClick={handleZoomOut}
          aria-label="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          data-testid="reset-view-button"
          className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600"
          onClick={handleResetView}
          aria-label="Reset View"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Transformed Canvas Content */}
      <div 
        data-testid="family-tree-canvas-content"
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: 'center',
          transition: isPanning ? 'none' : 'transform 0.15s ease-out'
        }}
      >
        {/* Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection) => (
            <TreeConnection
              key={connection.id}
              from={connection.from}
              to={connection.to}
              type={connection.type}
            />
          ))}
        </svg>

        {/* Members Layer */}
        {members.map((member) => (
          <MemberBanner 
            key={member.id} 
            member={member}
            isSelected={selectedMemberIds.includes(member.id)}
            selectedCount={selectedMemberIds.length}
            onSelect={(member, event) => handleMemberSelect(member, event)}
            onEdit={handleMemberEdit}
            onDelete={handleMemberDelete}
            onBulkDelete={handleBulkDelete}
          />
        ))}
      </div>

      {/* Info Text */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-500 bg-white bg-opacity-75 p-2 rounded-md">
        <p>Zoom: {(viewport.zoom * 100).toFixed(0)}%</p>
        <p className="text-xs">Drag canvas to pan • Use buttons to zoom</p>
      </div>

      {/* Modals */}
      <EditMemberModal 
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setMemberToEdit(null);
        }}
        member={memberToEdit}
        onMemberUpdated={() => {
          setShowEditModal(false);
          setMemberToEdit(null);
          // Optional: Show success notification
        }}
      />

      <DeleteMemberModal 
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setMemberToDelete(null);
        }}
        member={memberToDelete}
        onMemberDeleted={() => {
          setShowDeleteModal(false);
          setMemberToDelete(null);
          // Selection is automatically cleared when member is deleted via context reducer
          // Optional: Show success notification
        }}
      />

      <BulkDeleteModal 
        isOpen={showBulkDeleteModal}
        onClose={() => {
          setShowBulkDeleteModal(false);
        }}
        memberIds={selectedMemberIds}
        onMembersDeleted={() => {
          setShowBulkDeleteModal(false);
          // Selections are automatically cleared when members are deleted via context reducer
          // Optional: Show success notification
        }}
      />
    </div>
  );
};

export default FamilyTreeCanvas;
