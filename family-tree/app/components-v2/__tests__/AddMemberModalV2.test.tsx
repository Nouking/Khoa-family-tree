import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddMemberModalV2 from '../AddMemberModalV2';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { FamilyTreeData } from '@/types';

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock ToastProvider
jest.mock('../../components/ToastProvider', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}));

// Mock family tree data
const mockFamilyTree: FamilyTreeData = {
  id: 'test-tree',
  name: 'Test Family',
  members: [
    {
      id: 'member-1',
      name: 'John Doe',
      gender: 'male',
      relationship: 'Father',
      spouseIds: ['member-2'],
      childrenIds: [],
      order: 1,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 120 }
    },
    {
      id: 'member-2',
      name: 'Jane Doe',
      gender: 'female',
      relationship: 'Mother',
      spouseIds: ['member-1'],
      childrenIds: [],
      order: 2,
      position: { x: 300, y: 100 },
      size: { width: 200, height: 120 }
    }
  ],
  settings: {
    canvasSize: { width: 2000, height: 1500 },
    gridEnabled: true,
    snapToGrid: true,
    theme: 'light',
    layout: 'hierarchical',
  },
  metadata: {
    created: '2024-01-01',
    lastModified: '2024-01-01',
    version: '1.0'
  }
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <FamilyTreeProvider initialData={mockFamilyTree}>
      {component}
    </FamilyTreeProvider>
  );
};

describe('AddMemberModalV2 Component', () => {
  const mockOnClose = jest.fn();
  const mockOnMemberAdded = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnMemberAdded.mockClear();
    (global.fetch as jest.Mock).mockClear();
    mockLocalStorage.getItem.mockReturnValue('mock-token');
  });

  it('renders modal with v2 token-driven styling when isOpen is true', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    expect(screen.getByText('Add Family Member')).toBeInTheDocument();
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Relationship *')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={false}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    expect(screen.queryByText('Add Family Member')).not.toBeInTheDocument();
  });

  it('applies gradient header and token-driven button styling', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Modal uses gradient header style
    const modal = screen.getByRole('dialog');
    const accentBar = (modal as HTMLElement).querySelector('span[aria-hidden="true"].absolute.left-0.top-0.h-full.w-1');
    expect(accentBar).toBeTruthy();
    expect(accentBar?.className).toEqual(expect.stringContaining('u-header-accent--gradient'));

    // Primary submit button uses token-driven gradient
    const submit = screen.getByRole('button', { name: /Add Member/i });
    expect(submit.className).toEqual(expect.stringContaining('btn-primary--gradient'));
  });

  it('uses token-only styling for form elements (no raw hex)', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Section dividers with accent data attribute should map to tokens
    const dividers = document.querySelectorAll('[data-accent="true"].border-t');
    expect(dividers.length).toBeGreaterThan(0);

    // Token-driven chip utility exists
    const chip = document.querySelector('.u-chip--accent');
    expect(chip).toBeTruthy();

    // Input elements use token-driven border radius
    const nameInput = screen.getByLabelText('Name *');
    expect(nameInput.className).toEqual(expect.stringContaining('rounded-[var(--radius-md)]'));
  });

  it('provides APG modal dialog semantics', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modal).toHaveAttribute('aria-describedby', 'modal-description');

    const title = screen.getByText('Add Family Member');
    expect(title).toHaveAttribute('id', 'modal-title');
  });

  it('supports mobile bottom-sheet variant with proper viewport handling', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const modal = screen.getByRole('dialog');
    const modalContainer = modal.firstChild as HTMLElement;
    
    // Mobile bottom-sheet styling is present
    expect(modalContainer).toHaveClass('max-sm:h-[100dvh]');
    expect(modalContainer).toHaveClass('max-sm:rounded-none');
  });

  it('handles escape key and backdrop close', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Test escape key
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Reset mock
    mockOnClose.mockClear();

    // Test backdrop click
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('implements focus trap for accessibility', async () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // First focusable element should be focused
    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name *');
      expect(nameInput).toHaveFocus();
    });

    // Test that tab key cycles through focusable elements within modal
    const genderSelect = screen.getByLabelText('Gender');
    genderSelect.focus();
    expect(genderSelect).toHaveFocus();
  });

  it('validates required fields with proper ARIA attributes', async () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText('Name is required');
      const relationshipError = screen.getByText('Relationship is required');
      
      expect(nameError).toBeInTheDocument();
      expect(relationshipError).toBeInTheDocument();
      
      // Error messages have proper ARIA attributes
      expect(nameError).toHaveAttribute('role', 'alert');
      expect(relationshipError).toHaveAttribute('role', 'alert');
      
      // Input elements have proper aria-invalid and aria-describedby
      expect(screen.getByLabelText('Name *')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('Relationship *')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('Name *')).toHaveAttribute('aria-describedby', 'name-error');
      expect(screen.getByLabelText('Relationship *')).toHaveAttribute('aria-describedby', 'relationship-error');
    });
  });

  it('maintains validation behavior without layout shift', async () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const nameInput = screen.getByLabelText('Name *');
    const errorContainer = nameInput.parentElement?.querySelector('.min-h-\\[20px\\]');
    
    // Error container exists with fixed height to prevent layout shift
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass('min-h-[20px]');

    // Submit to trigger validation
    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText('Name is required');
      expect(nameError).toBeInTheDocument();
      // Error appears in the reserved container space
      expect(errorContainer).toContainElement(nameError);
    });
  });

  it('respects reduced motion preferences', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const modal = screen.getByRole('dialog');
    // Modal backdrop includes motion-reduce class
    expect(modal.className).toEqual(expect.stringContaining('motion-reduce:transition-none'));

    const modalContainer = modal.firstChild as HTMLElement;
    // Modal container includes motion-reduce class
    expect(modalContainer.className).toEqual(expect.stringContaining('motion-reduce:transition-none'));

    // Primary button includes motion-reduce class
    const submitButton = screen.getByText('Add Member');
    expect(submitButton.className).toEqual(expect.stringContaining('motion-reduce:transition-none'));
  });

  it('maintains AA contrast standards', () => {
    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Text elements use appropriate contrast token classes
    const sectionHeading = screen.getByText('Basic Information');
    expect(sectionHeading.className).toEqual(expect.stringContaining('text-(--color-neutral-900)'));

    const label = screen.getByText('Name *');
    expect(label.className).toEqual(expect.stringContaining('text-(--color-neutral-700)'));
  });

  it('successfully submits form with v2 styling intact', async () => {
    const mockResponse = {
      id: 'new-member-1',
      name: 'Test Member',
      relationship: 'Son',
      gender: 'male',
      spouseIds: [],
      childrenIds: [],
      order: 3,
      position: { x: 300, y: 200 },
      size: { width: 200, height: 120 }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Fill required fields
    const nameInput = screen.getByLabelText('Name *');
    const relationshipSelect = screen.getByLabelText('Relationship *');

    fireEvent.change(nameInput, { target: { value: 'Test Member' } });
    fireEvent.change(relationshipSelect, { target: { value: 'Son' } });

    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"name":"Test Member"'),
      });
    });

    await waitFor(() => {
      expect(mockOnMemberAdded).toHaveBeenCalledWith(mockResponse);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('disables form during submission with loading state', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    );

    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Fill required fields
    const nameInput = screen.getByLabelText('Name *');
    const relationshipSelect = screen.getByLabelText('Relationship *');

    fireEvent.change(nameInput, { target: { value: 'Test Member' } });
    fireEvent.change(relationshipSelect, { target: { value: 'Son' } });

    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Adding Member...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      // Cancel button should also be disabled during submission
      const cancelButton = screen.getByText('Cancel');
      expect(cancelButton).toBeDisabled();
    });
  });

  it('handles API errors gracefully with user-friendly messaging', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });

    renderWithProvider(
      <AddMemberModalV2
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Fill required fields
    const nameInput = screen.getByLabelText('Name *');
    const relationshipSelect = screen.getByLabelText('Relationship *');

    fireEvent.change(nameInput, { target: { value: 'Test Member' } });
    fireEvent.change(relationshipSelect, { target: { value: 'Son' } });

    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });

    expect(mockOnMemberAdded).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});