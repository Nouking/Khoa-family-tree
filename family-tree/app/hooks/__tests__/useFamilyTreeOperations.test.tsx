import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useFamilyTreeOperations } from '../useFamilyTreeOperations';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { FamilyMember, FamilyTreeData } from '@/types';

// Mock fetch globally
global.fetch = jest.fn();

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

const mockChild: FamilyMember = {
  id: 'test-child-1',
  name: 'Test Child',
  gender: 'female',
  parentId: mockMember.id,
  spouseIds: [],
  childrenIds: [],
  order: 2,
  position: { x: 300, y: 200 },
  size: { width: 200, height: 120 },
  relationship: 'Daughter'
};

const mockSpouse: FamilyMember = {
  id: 'test-spouse-1',
  name: 'Test Spouse',
  gender: 'female',
  parentId: null,
  spouseIds: [mockMember.id],
  childrenIds: [mockChild.id],
  order: 1,
  position: { x: 200, y: 100 },
  size: { width: 200, height: 120 },
  relationship: 'Mother'
};

// Update relationships
mockMember.spouseIds = [mockSpouse.id];
mockMember.childrenIds = [mockChild.id];

const mockFamilyTree: FamilyTreeData = {
  id: 'test-tree',
  name: 'Test Family Tree',
  members: [mockMember, mockSpouse, mockChild],
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

const TestWrapper: React.FC<{ children: React.ReactNode; initialData?: FamilyTreeData }> = ({ 
  children, 
  initialData 
}) => (
  <FamilyTreeProvider initialData={initialData}>
    {children}
  </FamilyTreeProvider>
);

describe('useFamilyTreeOperations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Member operations', () => {
    it('should add a member', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.addMember(mockMember);
      });

      expect(result.current.state.members).toContain(mockMember);
    });

    it('should update a member', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const updates = { name: 'Updated Name', relationship: 'Updated Father' };

      act(() => {
        result.current.updateMember(mockMember.id, updates);
      });

      const updatedMember = result.current.getMemberById(mockMember.id);
      expect(updatedMember?.name).toBe('Updated Name');
      expect(updatedMember?.relationship).toBe('Updated Father');
    });

    it('should delete a member', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.deleteMember(mockMember.id);
      });

      expect(result.current.getMemberById(mockMember.id)).toBeUndefined();
    });

    it('should update member position', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const newPosition = { x: 500, y: 600 };

      act(() => {
        result.current.updateMemberPosition(mockMember.id, newPosition);
      });

      const updatedMember = result.current.getMemberById(mockMember.id);
      expect(updatedMember?.position).toEqual(newPosition);
    });
  });

  describe('Selection operations', () => {
    it('should select a member', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.selectMember(mockMember.id);
      });

      expect(result.current.state.selectedMemberIds).toContain(mockMember.id);
    });

    it('should select member with multi-select', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.selectMember(mockMember.id);
        result.current.selectMember(mockSpouse.id, true); // multi-select
      });

      expect(result.current.state.selectedMemberIds).toContain(mockMember.id);
      expect(result.current.state.selectedMemberIds).toContain(mockSpouse.id);
    });

    it('should deselect a member', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.selectMember(mockMember.id);
        result.current.deselectMember(mockMember.id);
      });

      expect(result.current.state.selectedMemberIds).not.toContain(mockMember.id);
    });

    it('should clear selection', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.selectMember(mockMember.id);
        result.current.selectMember(mockSpouse.id, true);
        result.current.clearSelection();
      });

      expect(result.current.state.selectedMemberIds).toEqual([]);
    });

    it('should toggle member selection', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      // Initially not selected, should select
      act(() => {
        result.current.toggleMemberSelection(mockMember.id);
      });

      expect(result.current.state.selectedMemberIds).toContain(mockMember.id);

      // Now selected, should deselect
      act(() => {
        result.current.toggleMemberSelection(mockMember.id);
      });

      expect(result.current.state.selectedMemberIds).not.toContain(mockMember.id);
    });

    it('should select multiple members', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const memberIds = [mockMember.id, mockSpouse.id, mockChild.id];

      act(() => {
        result.current.selectMultipleMembers(memberIds);
      });

      expect(result.current.state.selectedMemberIds).toEqual(memberIds);
    });
  });

  describe('Viewport operations', () => {
    it('should update viewport', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      const updates = { x: 100, y: 200, zoom: 1.5 };

      act(() => {
        result.current.updateViewport(updates);
      });

      expect(result.current.state.viewport.x).toBe(100);
      expect(result.current.state.viewport.y).toBe(200);
      expect(result.current.state.viewport.zoom).toBe(1.5);
    });

    it('should zoom in', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      const initialZoom = result.current.state.viewport.zoom;

      act(() => {
        result.current.zoomIn();
      });

      expect(result.current.state.viewport.zoom).toBe(initialZoom * 1.2);
    });

    it('should zoom out', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      const initialZoom = result.current.state.viewport.zoom;

      act(() => {
        result.current.zoomOut();
      });

      expect(result.current.state.viewport.zoom).toBe(initialZoom / 1.2);
    });

    it('should limit zoom in to maximum', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      // Zoom in multiple times to hit the limit
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.zoomIn();
        }
      });

      expect(result.current.state.viewport.zoom).toBe(3.0);
    });

    it('should limit zoom out to minimum', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      // Zoom out multiple times to hit the limit
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.zoomOut();
        }
      });

      expect(result.current.state.viewport.zoom).toBe(0.3);
    });

    it('should reset zoom', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.updateViewport({ x: 100, y: 200, zoom: 2.0 });
        result.current.resetZoom();
      });

      expect(result.current.state.viewport.zoom).toBe(1);
      expect(result.current.state.viewport.x).toBe(0);
      expect(result.current.state.viewport.y).toBe(0);
    });
  });

  describe('Editing operations', () => {
    it('should start editing', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.startEditing();
      });

      expect(result.current.state.isEditing).toBe(true);
    });

    it('should stop editing', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.startEditing();
        result.current.stopEditing();
      });

      expect(result.current.state.isEditing).toBe(false);
    });
  });

  describe('Utility functions', () => {
    it('should get member by id', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const member = result.current.getMemberById(mockMember.id);
      expect(member).toEqual(mockMember);
    });

    it('should return undefined for non-existent member', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const member = result.current.getMemberById('non-existent-id');
      expect(member).toBeUndefined();
    });

    it('should get selected members', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.selectMultipleMembers([mockMember.id, mockSpouse.id]);
      });

      const selectedMembers = result.current.getSelectedMembers();
      expect(selectedMembers).toHaveLength(2);
      expect(selectedMembers).toContain(mockMember);
      expect(selectedMembers).toContain(mockSpouse);
    });

    it('should get member children', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const children = result.current.getMemberChildren(mockMember.id);
      expect(children).toHaveLength(1);
      expect(children[0]).toEqual(mockChild);
    });

    it('should get member spouses', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const spouses = result.current.getMemberSpouses(mockMember.id);
      expect(spouses).toHaveLength(1);
      expect(spouses[0]).toEqual(mockSpouse);
    });

    it('should get member parent', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const parent = result.current.getMemberParent(mockChild.id);
      expect(parent).toEqual(mockMember);
    });

    it('should return undefined for member without parent', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const parent = result.current.getMemberParent(mockMember.id);
      expect(parent).toBeUndefined();
    });
  });

  describe('Bulk operations', () => {
    it('should delete selected members', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      act(() => {
        result.current.selectMultipleMembers([mockMember.id, mockSpouse.id]);
        result.current.deleteSelectedMembers();
      });

      expect(result.current.getMemberById(mockMember.id)).toBeUndefined();
      expect(result.current.getMemberById(mockSpouse.id)).toBeUndefined();
      expect(result.current.state.selectedMemberIds).toEqual([]);
    });

    it('should move selected members', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper initialData={mockFamilyTree}>{children}</TestWrapper>
      });

      const deltaX = 50;
      const deltaY = 100;

      act(() => {
        result.current.selectMultipleMembers([mockMember.id, mockSpouse.id]);
        result.current.moveSelectedMembers(deltaX, deltaY);
      });

      const movedMember = result.current.getMemberById(mockMember.id);
      const movedSpouse = result.current.getMemberById(mockSpouse.id);

      expect(movedMember?.position.x).toBe(mockMember.position.x + deltaX);
      expect(movedMember?.position.y).toBe(mockMember.position.y + deltaY);
      expect(movedSpouse?.position.x).toBe(mockSpouse.position.x + deltaX);
      expect(movedSpouse?.position.y).toBe(mockSpouse.position.y + deltaY);
    });
  });

  describe('Data loading operations', () => {
    it('should load family tree successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFamilyTree
      });

      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      await act(async () => {
        await result.current.loadFamilyTree();
      });

      expect(result.current.state.familyTree).toEqual(mockFamilyTree);
      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toBeNull();
    });

    it('should handle load family tree error', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      await act(async () => {
        await result.current.loadFamilyTree();
      });

      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toBe('Failed to load family tree data');
    });

    it('should handle network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      await act(async () => {
        await result.current.loadFamilyTree();
      });

      expect(result.current.state.loading).toBe(false);
      expect(result.current.state.error).toBe('Network error');
    });
  });

  describe('Loading and error operations', () => {
    it('should set loading state', () => {
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.state.loading).toBe(true);
    });

    it('should set error state', () => {
      const errorMessage = 'Test error';
      const { result } = renderHook(() => useFamilyTreeOperations(), {
        wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
      });

      act(() => {
        result.current.setError(errorMessage);
      });

      expect(result.current.state.error).toBe(errorMessage);
    });
  });
});