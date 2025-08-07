import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { 
  FamilyTreeProvider, 
  useFamilyTree, 
  useFamilyTreeDispatch, 
  useFamilyTreeHistory,
  useFamilyTreeWithDispatch,
  type FamilyTreeState,
  type FamilyTreeAction
} from '../FamilyTreeContext';
import { FamilyMember, FamilyTreeData } from '@/types';

// Mock data
const mockMember: FamilyMember = {
  id: 'test-member-1',
  name: 'Test Member',
  gender: 'male',
  parentId: null,
  spouseIds: [],
  childrenIds: [],
  order: 1,
  position: { x: 100, y: 100 },
  size: { width: 200, height: 120 },
  relationship: 'Father'
};

const mockFamilyTree: FamilyTreeData = {
  id: 'test-tree',
  name: 'Test Family Tree',
  members: [mockMember],
  settings: {
    canvasSize: { width: 2000, height: 1500 },
    gridEnabled: true,
    snapToGrid: true,
    theme: 'light',
    layout: 'hierarchical'
  },
  metadata: {
    created: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    version: '1.0'
  }
};

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode; initialData?: FamilyTreeData }> = ({ 
  children, 
  initialData 
}) => (
  <FamilyTreeProvider initialData={initialData}>
    {children}
  </FamilyTreeProvider>
);

describe('FamilyTreeContext', () => {
  describe('Provider and hooks', () => {
    it('should provide initial state', () => {
      const { result } = renderHook(() => useFamilyTree(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      expect(result.current.familyTree).toBeNull();
      expect(result.current.members).toEqual([]);
      expect(result.current.selectedMemberIds).toEqual([]);
      expect(result.current.isEditing).toBe(false);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.viewport.zoom).toBe(1);
    });

    it('should provide initial data when passed', () => {
      const { result } = renderHook(() => useFamilyTree(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      expect(result.current.familyTree).toEqual(mockFamilyTree);
      expect(result.current.members).toEqual(mockFamilyTree.members);
      expect(result.current.settings).toEqual(mockFamilyTree.settings);
    });

    it('should throw error when hooks are used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useFamilyTree());
      }).toThrow('useFamilyTree must be used within a FamilyTreeProvider');

      expect(() => {
        renderHook(() => useFamilyTreeDispatch());
      }).toThrow('useFamilyTreeDispatch must be used within a FamilyTreeProvider');

      expect(() => {
        renderHook(() => useFamilyTreeHistory());
      }).toThrow('useFamilyTreeHistory must be used within a FamilyTreeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('State management', () => {
    it('should handle SET_FAMILY_TREE action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SET_FAMILY_TREE', payload: mockFamilyTree });
      });

      expect(result.current.state.familyTree).toEqual(mockFamilyTree);
      expect(result.current.state.members).toEqual(mockFamilyTree.members);
      expect(result.current.state.settings).toEqual(mockFamilyTree.settings);
      expect(result.current.state.error).toBeNull();
    });

    it('should handle ADD_MEMBER action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'ADD_MEMBER', payload: mockMember });
      });

      expect(result.current.state.members).toContain(mockMember);
      expect(result.current.state.members).toHaveLength(1);
    });

    it('should handle UPDATE_MEMBER action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const updates = { name: 'Updated Name', position: { x: 200, y: 200 } };

      act(() => {
        result.current.dispatch({ 
          type: 'UPDATE_MEMBER', 
          payload: { id: mockMember.id, updates } 
        });
      });

      const updatedMember = result.current.state.members.find(m => m.id === mockMember.id);
      expect(updatedMember?.name).toBe('Updated Name');
      expect(updatedMember?.position).toEqual({ x: 200, y: 200 });
    });

    it('should handle DELETE_MEMBER action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'DELETE_MEMBER', payload: mockMember.id });
      });

      expect(result.current.state.members).not.toContain(mockMember);
      expect(result.current.state.members).toHaveLength(0);
    });
  });

  describe('Selection management', () => {
    it('should handle SELECT_MEMBER action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SELECT_MEMBER', payload: mockMember.id });
      });

      expect(result.current.state.selectedMemberIds).toContain(mockMember.id);
    });

    it('should not duplicate member in selection', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SELECT_MEMBER', payload: mockMember.id });
        result.current.dispatch({ type: 'SELECT_MEMBER', payload: mockMember.id });
      });

      expect(result.current.state.selectedMemberIds).toEqual([mockMember.id]);
    });

    it('should handle DESELECT_MEMBER action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SELECT_MEMBER', payload: mockMember.id });
        result.current.dispatch({ type: 'DESELECT_MEMBER', payload: mockMember.id });
      });

      expect(result.current.state.selectedMemberIds).not.toContain(mockMember.id);
    });

    it('should handle CLEAR_SELECTION action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SELECT_MEMBER', payload: mockMember.id });
        result.current.dispatch({ type: 'CLEAR_SELECTION' });
      });

      expect(result.current.state.selectedMemberIds).toEqual([]);
    });

    it('should handle SET_SELECTED_MEMBERS action', () => {
      const memberIds = ['member1', 'member2', 'member3'];
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SET_SELECTED_MEMBERS', payload: memberIds });
      });

      expect(result.current.state.selectedMemberIds).toEqual(memberIds);
    });
  });

  describe('Viewport management', () => {
    it('should handle UPDATE_VIEWPORT action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      const viewportUpdates = { x: 100, y: 200, zoom: 1.5 };

      act(() => {
        result.current.dispatch({ type: 'UPDATE_VIEWPORT', payload: viewportUpdates });
      });

      expect(result.current.state.viewport.x).toBe(100);
      expect(result.current.state.viewport.y).toBe(200);
      expect(result.current.state.viewport.zoom).toBe(1.5);
    });

    it('should merge viewport updates with existing state', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'UPDATE_VIEWPORT', payload: { x: 100, y: 200 } });
        result.current.dispatch({ type: 'UPDATE_VIEWPORT', payload: { zoom: 1.5 } });
      });

      expect(result.current.state.viewport.x).toBe(100);
      expect(result.current.state.viewport.y).toBe(200);
      expect(result.current.state.viewport.zoom).toBe(1.5);
    });
  });

  describe('Loading and error states', () => {
    it('should handle SET_LOADING action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SET_LOADING', payload: true });
      });

      expect(result.current.state.loading).toBe(true);
    });

    it('should handle SET_ERROR action', () => {
      const errorMessage = 'Test error message';
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SET_LOADING', payload: true });
        result.current.dispatch({ type: 'SET_ERROR', payload: errorMessage });
      });

      expect(result.current.state.error).toBe(errorMessage);
      expect(result.current.state.loading).toBe(false);
    });

    it('should handle RESET_STATE action', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'SELECT_MEMBER', payload: mockMember.id });
        result.current.dispatch({ type: 'SET_LOADING', payload: true });
        result.current.dispatch({ type: 'SET_ERROR', payload: 'Some error' });
        result.current.dispatch({ type: 'RESET_STATE' });
      });

      expect(result.current.state.familyTree).toBeNull();
      expect(result.current.state.members).toEqual([]);
      expect(result.current.state.selectedMemberIds).toEqual([]);
      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toBeNull();
    });
  });

  describe('History management', () => {
    it('should provide history functionality', () => {
      const { result } = renderHook(() => useFamilyTreeHistory(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      expect(result.current.canUndo).toBe(false);
      expect(result.current.canRedo).toBe(false);
      expect(typeof result.current.undo).toBe('function');
      expect(typeof result.current.redo).toBe('function');
      expect(typeof result.current.clearHistory).toBe('function');
    });

    it('should track history for state-changing actions', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'ADD_MEMBER', payload: mockMember });
      });

      expect(result.current.history.canUndo).toBe(true);
      expect(result.current.history.canRedo).toBe(false);
    });

    it('should not track history for viewport updates', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'UPDATE_VIEWPORT', payload: { x: 100 } });
      });

      expect(result.current.history.canUndo).toBe(false);
    });

    it('should perform undo operation', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'ADD_MEMBER', payload: mockMember });
      });

      expect(result.current.state.members).toHaveLength(1);

      act(() => {
        result.current.history.undo();
      });

      expect(result.current.state.members).toHaveLength(0);
      expect(result.current.history.canUndo).toBe(false);
      expect(result.current.history.canRedo).toBe(true);
    });

    it('should perform redo operation', () => {
      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'ADD_MEMBER', payload: mockMember });
        result.current.history.undo();
        result.current.history.redo();
      });

      expect(result.current.state.members).toHaveLength(1);
      expect(result.current.history.canUndo).toBe(true);
      expect(result.current.history.canRedo).toBe(false);
    });

    it('should clear future history when new action is performed', () => {
      const secondMember: FamilyMember = {
        ...mockMember,
        id: 'test-member-2',
        name: 'Second Member'
      };

      const { result } = renderHook(() => useFamilyTreeWithDispatch(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.dispatch({ type: 'ADD_MEMBER', payload: mockMember });
        result.current.dispatch({ type: 'ADD_MEMBER', payload: secondMember });
        result.current.history.undo(); // Now we can redo
      });

      expect(result.current.history.canRedo).toBe(true);

      act(() => {
        // Performing a new action should clear redo history
        result.current.dispatch({ type: 'DELETE_MEMBER', payload: mockMember.id });
      });

      expect(result.current.history.canRedo).toBe(false);
    });
  });
});