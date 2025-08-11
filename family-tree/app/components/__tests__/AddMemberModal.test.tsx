import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddMemberModal from '../AddMemberModal';
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

describe('AddMemberModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnMemberAdded = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnMemberAdded.mockClear();
    (global.fetch as jest.Mock).mockClear();
    mockLocalStorage.getItem.mockReturnValue('mock-token');
  });

  it('applies gradient header on Modal and gradient button utility on primary CTA', () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Modal header gradient bar should exist via u-header-accent--gradient through headerStyle="gradient"
    const modal = screen.getByRole('dialog');
    const accentBar = (modal as HTMLElement).querySelector('span[aria-hidden="true"].absolute.left-0.top-0.h-full.w-1');
    expect(accentBar).toBeTruthy();
    expect(accentBar?.className).toEqual(expect.stringContaining('u-header-accent--gradient'));

    // Primary submit button in MemberForm should have gradient utility class
    const submit = screen.getByRole('button', { name: /Add Member/i });
    expect(submit.className).toEqual(expect.stringContaining('btn-primary--gradient'));
  });

  it('uses token/utility classes for dividers and chips (no raw hex expectations)', () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Section divider with data-accent attribute should map to accent token via CSS
    const dividers = document.querySelectorAll('[data-accent="true"].border-t');
    expect(dividers.length).toBeGreaterThan(0);

    // Token-driven chip utility
    const chip = document.querySelector('.u-chip--accent');
    expect(chip).toBeTruthy();
  });

  it('renders modal when isOpen is true', () => {
    renderWithProvider(
      <AddMemberModal
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
      <AddMemberModal
        isOpen={false}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    expect(screen.queryByText('Add Family Member')).not.toBeInTheDocument();
  });

  it('displays validation errors for required fields', async () => {
    renderWithProvider(
      <AddMemberModal
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
      // Errors are associated to inputs and use error styling
      expect(nameError).toHaveAttribute('role', 'alert');
      expect(relationshipError).toHaveAttribute('role', 'alert');
      expect(screen.getByLabelText('Name *')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('Relationship *')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('handles form input changes', () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const nameInput = screen.getByLabelText('Name *');
    const relationshipSelect = screen.getByLabelText('Relationship *');

    fireEvent.change(nameInput, { target: { value: 'Test Member' } });
    fireEvent.change(relationshipSelect, { target: { value: 'Son' } });

    expect(nameInput).toHaveValue('Test Member');
    expect(relationshipSelect).toHaveValue('Son');
  });

  it('displays existing members in parent and spouse selectors', () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Check parent selector
    const parentSelect = screen.getByLabelText('Parent');
    expect(parentSelect).toBeInTheDocument();
    
    // Check that existing members are available as options (may appear in multiple selects)
    const johnOptions = screen.getAllByText('John Doe (Father)');
    const janeOptions = screen.getAllByText('Jane Doe (Mother)');

    expect(johnOptions[0]).toBeInTheDocument();
    expect(janeOptions[0]).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText('Please enter a valid email address');
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveAttribute('role', 'alert');
      expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('validates date fields', async () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    const birthDateInput = screen.getByLabelText('Birth Date');
    const deathDateInput = screen.getByLabelText('Death Date');

    // Set death date before birth date
    fireEvent.change(birthDateInput, { target: { value: '2000-01-01' } });
    fireEvent.change(deathDateInput, { target: { value: '1999-01-01' } });
    
    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Death date must be after birth date')).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
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
      <AddMemberModal
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

  it('handles API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });

    renderWithProvider(
      <AddMemberModal
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

  it('resets form when closed', () => {
    renderWithProvider(
      <AddMemberModal
        isOpen={true}
        onClose={mockOnClose}
        onMemberAdded={mockOnMemberAdded}
      />
    );

    // Fill form
    const nameInput = screen.getByLabelText('Name *');
    fireEvent.change(nameInput, { target: { value: 'Test Member' } });

    // Close modal
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('disables form during submission', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    );

    renderWithProvider(
      <AddMemberModal
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
    });
  });
});