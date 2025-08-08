'use client';

import { useCallback } from 'react';
import { FamilyMember } from '@/types';
import { useFamilyTreeWithDispatch } from '../contexts/FamilyTreeContext';

/**
 * Custom hook that provides high-level operations for family tree management
 */
export function useFamilyTreeOperations() {
  const { state, dispatch, history } = useFamilyTreeWithDispatch();

  // Member operations
  const addMember = useCallback((member: FamilyMember) => {
    dispatch({ type: 'ADD_MEMBER', payload: member });
  }, [dispatch]);

  const updateMember = useCallback((id: string, updates: Partial<FamilyMember>) => {
    dispatch({ type: 'UPDATE_MEMBER', payload: { id, updates } });
  }, [dispatch]);

  const deleteMember = useCallback((id: string) => {
    dispatch({ type: 'DELETE_MEMBER', payload: id });
  }, [dispatch]);

  const updateMemberPosition = useCallback((id: string, position: { x: number; y: number }) => {
    dispatch({ type: 'UPDATE_MEMBER', payload: { id, updates: { position } } });
  }, [dispatch]);

  // Selection operations
  const selectMember = useCallback((id: string, multiSelect = false) => {
    if (multiSelect) {
      dispatch({ type: 'SELECT_MEMBER', payload: id });
    } else {
      dispatch({ type: 'SET_SELECTED_MEMBERS', payload: [id] });
    }
  }, [dispatch]);

  const deselectMember = useCallback((id: string) => {
    dispatch({ type: 'DESELECT_MEMBER', payload: id });
  }, [dispatch]);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, [dispatch]);

  const selectMultipleMembers = useCallback((ids: string[]) => {
    dispatch({ type: 'SET_SELECTED_MEMBERS', payload: ids });
  }, [dispatch]);

  const toggleMemberSelection = useCallback((id: string) => {
    if (state.selectedMemberIds.includes(id)) {
      dispatch({ type: 'DESELECT_MEMBER', payload: id });
    } else {
      dispatch({ type: 'SELECT_MEMBER', payload: id });
    }
  }, [dispatch, state.selectedMemberIds]);

  // Viewport operations
  const updateViewport = useCallback((updates: { x?: number; y?: number; zoom?: number; width?: number; height?: number }) => {
    dispatch({ type: 'UPDATE_VIEWPORT', payload: updates });
  }, [dispatch]);

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(state.viewport.zoom * 1.2, 3.0);
    dispatch({ type: 'UPDATE_VIEWPORT', payload: { zoom: newZoom } });
  }, [dispatch, state.viewport.zoom]);

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(state.viewport.zoom / 1.2, 0.3);
    dispatch({ type: 'UPDATE_VIEWPORT', payload: { zoom: newZoom } });
  }, [dispatch, state.viewport.zoom]);

  const resetZoom = useCallback(() => {
    dispatch({ type: 'UPDATE_VIEWPORT', payload: { zoom: 1, x: 0, y: 0 } });
  }, [dispatch]);

  // Editing operations
  const startEditing = useCallback(() => {
    dispatch({ type: 'SET_EDITING', payload: true });
  }, [dispatch]);

  const stopEditing = useCallback(() => {
    dispatch({ type: 'SET_EDITING', payload: false });
  }, [dispatch]);

  // Loading and error operations
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [dispatch]);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [dispatch]);

  // Utility functions
  const getMemberById = useCallback((id: string): FamilyMember | undefined => {
    return state.members.find(member => member.id === id);
  }, [state.members]);

  const getSelectedMembers = useCallback((): FamilyMember[] => {
    return state.members.filter(member => state.selectedMemberIds.includes(member.id));
  }, [state.members, state.selectedMemberIds]);

  const getMemberChildren = useCallback((memberId: string): FamilyMember[] => {
    const member = getMemberById(memberId);
    if (!member) return [];
    return state.members.filter(m => member.childrenIds.includes(m.id));
  }, [state.members, getMemberById]);

  const getMemberSpouses = useCallback((memberId: string): FamilyMember[] => {
    const member = getMemberById(memberId);
    if (!member) return [];
    return state.members.filter(m => member.spouseIds.includes(m.id));
  }, [state.members, getMemberById]);

  const getMemberParent = useCallback((memberId: string): FamilyMember | undefined => {
    const member = getMemberById(memberId);
    if (!member || !member.parentId) return undefined;
    return getMemberById(member.parentId);
  }, [getMemberById]);

  // Bulk operations
  const deleteSelectedMembers = useCallback(() => {
    state.selectedMemberIds.forEach(id => {
      dispatch({ type: 'DELETE_MEMBER', payload: id });
    });
  }, [dispatch, state.selectedMemberIds]);

  const moveSelectedMembers = useCallback((deltaX: number, deltaY: number) => {
    const selectedMembers = getSelectedMembers();
    selectedMembers.forEach(member => {
      const newPosition = {
        x: member.position.x + deltaX,
        y: member.position.y + deltaY,
      };
      dispatch({ type: 'UPDATE_MEMBER', payload: { id: member.id, updates: { position: newPosition } } });
    });
  }, [dispatch, getSelectedMembers]);

  // Data loading operations
  const loadFamilyTree = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/members');
      if (!response.ok) {
        throw new Error('Failed to load family tree data');
      }
      
      const data = await response.json();
      dispatch({ type: 'SET_FAMILY_TREE', payload: data });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [dispatch, setLoading, setError]);

  return {
    // State
    state,
    history,
    
    // Member operations
    addMember,
    updateMember,
    deleteMember,
    updateMemberPosition,
    
    // Selection operations
    selectMember,
    deselectMember,
    clearSelection,
    selectMultipleMembers,
    toggleMemberSelection,
    
    // Viewport operations
    updateViewport,
    zoomIn,
    zoomOut,
    resetZoom,
    
    // Editing operations
    startEditing,
    stopEditing,
    
    // Loading and error operations
    setLoading,
    setError,
    
    // Utility functions
    getMemberById,
    getSelectedMembers,
    getMemberChildren,
    getMemberSpouses,
    getMemberParent,
    
    // Bulk operations
    deleteSelectedMembers,
    moveSelectedMembers,
    
    // Data operations
    loadFamilyTree,
  };
}