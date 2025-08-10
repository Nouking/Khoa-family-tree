import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import BulkDeleteModal from '../BulkDeleteModal';
import { FamilyMember } from '@/types';

const mockMembers: FamilyMember[] = [
  {
    id: 'member-1',
    name: 'John Doe',
    gender: 'male',
    relationship: 'Father',
    parentId: undefined,
    spouseIds: ['member-2'],
    childrenIds: ['member-3'],
    order: 1,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 },
  },
  {
    id: 'member-2',
    name: 'Jane Doe', 
    gender: 'female',
    relationship: 'Mother',
    parentId: undefined,
    spouseIds: ['member-1'],
    childrenIds: ['member-3'],
    order: 2,
    position: { x: 300, y: 100 },
    size: { width: 200, height: 120 },
  },
  {
    id: 'member-3',
    name: 'Bob Doe',
    gender: 'male',
    relationship: 'Son',
    parentId: 'member-1',
    spouseIds: [],
    childrenIds: [],
    order: 3,
    position: { x: 200, y: 300 },
    size: { width: 200, height: 120 },
  },
  {
    id: 'member-4',
    name: 'Alice Doe',
    gender: 'female',
    relationship: 'Friend',
    parentId: undefined,
    spouseIds: [],
    childrenIds: [],
    order: 4,
    position: { x: 400, y: 400 },
    size: { width: 200, height: 120 },
  },
];

const mockFamilyTreeData = {
  id: 'family-tree-1',
  name: 'Test Family Tree',
  members: mockMembers,
  settings: {
    canvasSize: { width: 2000, height: 1500 },
    gridEnabled: true,
    snapToGrid: true,
    theme: 'light' as const,
    layout: 'hierarchical' as const,
  },
  metadata: {
    created: '2024-01-01',
    lastModified: '2024-01-01',
    version: '1.0',
  },
};

// Mock fetch for API calls
global.fetch = jest.fn();

const renderBulkDeleteModal = (memberIds: string[] = [], isOpen = true) => {
  const onClose = jest.fn();
  const onMembersDeleted = jest.fn();

  return {
    ...render(
      <FamilyTreeProvider initialData={mockFamilyTreeData}>
        <BulkDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          memberIds={memberIds}
          onMembersDeleted={onMembersDeleted}
        />
      </FamilyTreeProvider>
    ),
    onClose,
    onMembersDeleted,
  };
};

describe('BulkDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  it('renders modal title with correct member count', () => {
    renderBulkDeleteModal(['member-1', 'member-2']);
    
    expect(screen.getByText('Delete 2 Family Members')).toBeInTheDocument();
  });

  it('displays list of members to be deleted', () => {
    renderBulkDeleteModal(['member-1', 'member-2']);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Father')).toBeInTheDocument();
    expect(screen.getByText('Mother')).toBeInTheDocument();
  });

  it('shows affected relationships warning when members have relationships', () => {
    renderBulkDeleteModal(['member-1', 'member-2']);
    
    expect(screen.getByText(/Warning: These members have existing relationships/)).toBeInTheDocument();
    expect(screen.getByText(/Affected Children/)).toBeInTheDocument();
    expect(screen.getByText('Bob Doe')).toBeInTheDocument();
  });

  it('requires DELETE confirmation for members with relationships', () => {
    renderBulkDeleteModal(['member-1', 'member-2']);
    
    expect(screen.getByText(/To confirm bulk deletion, please type/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type DELETE to confirm')).toBeInTheDocument();
    
    const deleteButton = screen.getByRole('button', { name: /Delete 2 Members/ });
    expect(deleteButton).toBeDisabled();
  });

  it('enables delete button when DELETE is typed correctly', async () => {
    renderBulkDeleteModal(['member-1', 'member-2']);
    
    const confirmInput = screen.getByPlaceholderText('Type DELETE to confirm');
    const deleteButton = screen.getByRole('button', { name: /Delete 2 Members/ });
    
    expect(deleteButton).toBeDisabled();
    
    fireEvent.change(confirmInput, { target: { value: 'DELETE' } });
    
    await waitFor(() => {
      expect(deleteButton).not.toBeDisabled();
    });
  });

  it('allows immediate deletion for members without relationships', () => {
    renderBulkDeleteModal(['member-4']); // Member 4 has no spouses, children, or parents
    
    const deleteButton = screen.getByRole('button', { name: /Delete 1 Members/ });
    expect(deleteButton).not.toBeDisabled();
    
    expect(screen.queryByText(/To confirm bulk deletion, please type/)).not.toBeInTheDocument();
  });

  it('handles successful bulk deletion', async () => {
    const { onMembersDeleted, onClose } = renderBulkDeleteModal(['member-1', 'member-2']);
    
    const confirmInput = screen.getByPlaceholderText('Type DELETE to confirm');
    fireEvent.change(confirmInput, { target: { value: 'DELETE' } });
    
    const deleteButton = screen.getByRole('button', { name: /Delete 2 Members/ });
    
    await waitFor(() => {
      expect(deleteButton).not.toBeDisabled();
    });
    
    fireEvent.click(deleteButton);
    
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('/api/members/member-1', {
      method: 'DELETE',
      headers: {},
    });
    expect(global.fetch).toHaveBeenCalledWith('/api/members/member-2', {
      method: 'DELETE',
      headers: {},
    });
  });

  it('handles API errors during deletion', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Deletion failed' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });
      
    renderBulkDeleteModal(['member-1', 'member-2']);
    
    const confirmInput = screen.getByPlaceholderText('Type DELETE to confirm');
    fireEvent.change(confirmInput, { target: { value: 'DELETE' } });
    
    const deleteButton = screen.getByRole('button', { name: /Delete 2 Members/ });
    
    await waitFor(() => {
      expect(deleteButton).not.toBeDisabled();
    });
    
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Some deletions failed/)).toBeInTheDocument();
    });
  });

  it('returns null when no members to delete', () => {
    const { container } = renderBulkDeleteModal([]);
    expect(container.firstChild).toBeNull();
  });

  it('closes modal when cancel is clicked', () => {
    const { onClose } = renderBulkDeleteModal(['member-1']);
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});