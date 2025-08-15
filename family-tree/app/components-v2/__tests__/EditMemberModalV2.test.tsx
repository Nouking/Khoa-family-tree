import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import EditMemberModalV2 from '../EditMemberModalV2';
import { FamilyMember } from '@/types';

// Mock dependencies
jest.mock('../../contexts/FamilyTreeContext', () => ({
  useFamilyTreeWithDispatch: jest.fn(),
  useFamilyMembers: jest.fn()
}));

jest.mock('../../components/ToastProvider', () => ({
  useToast: jest.fn()
}));

jest.mock('../../components/Modal', () => ({
  default: ({ children, isOpen, title }: any) => 
    isOpen ? (
      <div data-testid="modal" role="dialog" aria-labelledby="modal-title">
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    ) : null
}));

// Mock fetch
global.fetch = jest.fn();

const mockMember: FamilyMember = {
  id: 'test-member-1',
  name: 'John Doe',
  gender: 'male',
  relationship: 'Father',
  birthDate: '1970-01-01',
  deathDate: '',
  photo: '',
  title: 'Engineer',
  email: 'john@example.com',
  phone: '+1 555-123-4567',
  address: '123 Main St',
  biography: 'A great father and engineer.',
  parentId: null,
  spouseIds: [],
  childrenIds: [],
  position: { x: 100, y: 150 },
  size: { width: 200, height: 120 },
  order: 1
};

import { useFamilyTreeWithDispatch, useFamilyMembers } from '../../contexts/FamilyTreeContext';
import { useToast } from '../../components/ToastProvider';

const mockDispatch = jest.fn();
const mockShowToast = jest.fn();

(useFamilyTreeWithDispatch as jest.Mock).mockReturnValue({
  state: { error: null },
  dispatch: mockDispatch
});

(useFamilyMembers as jest.Mock).mockReturnValue([]);
(useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

describe('EditMemberModalV2', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    member: mockMember,
    onMemberUpdated: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMember)
    });
  });

  it('renders edit modal with member data', () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit Family Member')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Engineer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('renders canvas position and size fields in edit mode', () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    expect(screen.getByLabelText('X Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Y Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Width')).toBeInTheDocument();
    expect(screen.getByLabelText('Height')).toBeInTheDocument();
    
    expect(screen.getByDisplayValue('100')).toBeInTheDocument(); // X position
    expect(screen.getByDisplayValue('150')).toBeInTheDocument(); // Y position
    expect(screen.getByDisplayValue('200')).toBeInTheDocument(); // Width
    expect(screen.getByDisplayValue('120')).toBeInTheDocument(); // Height
  });

  it('validates position coordinates within 0-3000 bounds', async () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    const xPositionInput = screen.getByLabelText('X Position');
    const submitButton = screen.getByRole('button', { name: /update member/i });
    
    // Test invalid position (negative)
    fireEvent.change(xPositionInput, { target: { value: '-10' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('X position must be between 0 and 3000')).toBeInTheDocument();
    });
  });

  it('validates size dimensions with minimum 100px', async () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    const widthInput = screen.getByLabelText('Width');
    const submitButton = screen.getByRole('button', { name: /update member/i });
    
    // Test invalid width
    fireEvent.change(widthInput, { target: { value: '50' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Width must be at least 100 pixels')).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    const nameInput = screen.getByDisplayValue('John Doe');
    const submitButton = screen.getByRole('button', { name: /update member/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Updated Doe' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/members/${mockMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('John Updated Doe')
      });
    });
  });

  it('handles API errors appropriately', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Update failed' })
    });
    
    render(<EditMemberModalV2 {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /update member/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Failed to update member',
        description: 'Update failed'
      });
    });
  });

  it('renders null when no member provided', () => {
    render(<EditMemberModalV2 {...defaultProps} member={null} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies token-driven styling classes', () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    // Check for error styling structure
    const form = screen.getByRole('form');
    expect(form).toHaveClass('space-y-6');
    
    // Check button styling
    const updateButton = screen.getByRole('button', { name: /update member/i });
    expect(updateButton).toHaveClass('btn-primary', 'btn-primary--gradient');
  });

  it('focuses management works correctly', () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    const nameInput = screen.getByDisplayValue('John Doe');
    const positionXInput = screen.getByLabelText('X Position');
    
    // Navigate to position fields
    fireEvent.click(positionXInput);
    expect(document.activeElement).toBe(positionXInput);
  });

  it('prevents self-relationships in edit mode', async () => {
    const memberWithParentOption: FamilyMember = {
      ...mockMember,
      id: 'member-1'
    };
    
    // Mock family members including the current member
    (useFamilyMembers as jest.Mock).mockReturnValue([
      memberWithParentOption,
      { ...mockMember, id: 'member-2', name: 'Jane Doe' }
    ]);
    
    render(<EditMemberModalV2 {...defaultProps} member={memberWithParentOption} />);
    
    const parentSelect = screen.getByLabelText('Parent');
    const submitButton = screen.getByRole('button', { name: /update member/i });
    
    // Try to set self as parent
    fireEvent.change(parentSelect, { target: { value: 'member-1' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('A member cannot be their own parent')).toBeInTheDocument();
    });
  });

  it('handles responsive mobile layout requirements', () => {
    render(<EditMemberModalV2 {...defaultProps} />);
    
    // Check mobile-specific classes are present
    const buttons = screen.getAllByRole('button');
    const mobileButton = buttons.find(btn => 
      btn.className.includes('max-sm:min-h-[44px]')
    );
    expect(mobileButton).toBeInTheDocument();
  });
});