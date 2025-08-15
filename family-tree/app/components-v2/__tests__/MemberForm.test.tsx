import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberForm from '../shared/MemberForm';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { FamilyTreeData, FamilyMember } from '@/types';
import { MemberFormData } from '../../lib/validation/memberValidation';

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

describe('MemberForm v2 Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultInitialData: MemberFormData = {
    name: '',
    gender: 'male',
    birthDate: '',
    deathDate: '',
    photo: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    biography: '',
    parentId: null,
    spouseIds: [],
    relationship: '',
    position: { x: 300, y: 200 },
    size: { width: 200, height: 120 }
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders form with token-driven styling and section structure', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Section headings with icons and chips exist
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Dates')).toBeInTheDocument();
    expect(screen.getAllByText('Photo')[0]).toBeInTheDocument(); // Multiple elements with "Photo" text
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Relations')).toBeInTheDocument();
    expect(screen.getByText('Biography')).toBeInTheDocument();

    // Required fields chip exists
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('uses token-only styling for inputs and buttons', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Input elements use token-driven border radius
    const nameInput = screen.getByLabelText('Name *');
    expect(nameInput.className).toEqual(expect.stringContaining('rounded-[var(--radius-md)]'));

    const relationshipSelect = screen.getByLabelText('Relationship *');
    expect(relationshipSelect.className).toEqual(expect.stringContaining('rounded-[var(--radius-md)]'));

    // Buttons use token utilities
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton.className).toEqual(expect.stringContaining('btn-outline'));

    const submitButton = screen.getByText('Add Member');
    expect(submitButton.className).toEqual(expect.stringContaining('btn-primary--gradient'));
  });

  it('applies accent styling to appropriate dividers via data attributes', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Dividers with data-accent="true" should exist
    const accentDividers = document.querySelectorAll('[data-accent="true"].border-t');
    expect(accentDividers.length).toBeGreaterThan(0);
  });

  it('includes u-section-reveal class for animation', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Sections should have reveal animation class
    const sectionsWithReveal = document.querySelectorAll('.u-section-reveal');
    expect(sectionsWithReveal.length).toBeGreaterThan(0);
  });

  it('maintains proper ARIA labeling and error associations', async () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Submit form to trigger validation
    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText('Name is required');
      const relationshipError = screen.getByText('Relationship is required');

      // Error messages have proper ARIA attributes
      expect(nameError).toHaveAttribute('role', 'alert');
      expect(nameError).toHaveAttribute('id', 'name-error');
      
      expect(relationshipError).toHaveAttribute('role', 'alert');
      expect(relationshipError).toHaveAttribute('id', 'relationship-error');

      // Input fields are properly associated with errors
      expect(screen.getByLabelText('Name *')).toHaveAttribute('aria-describedby', 'name-error');
      expect(screen.getByLabelText('Relationship *')).toHaveAttribute('aria-describedby', 'relationship-error');
      expect(screen.getByLabelText('Name *')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText('Relationship *')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('provides proper section labeling for screen readers', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Each section should be properly labeled with correct IDs
    const basicInfoHeading = screen.getByText('Basic Information');
    expect(basicInfoHeading).toHaveAttribute('id', 'section-basic-info');

    const datesHeading = screen.getByText('Dates');
    expect(datesHeading).toHaveAttribute('id', 'section-dates');

    const photoHeadings = screen.getAllByText('Photo');
    const photoSectionHeading = photoHeadings.find(el => el.id === 'section-photo');
    expect(photoSectionHeading).toBeDefined();
  });

  it('handles form input changes correctly', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const nameInput = screen.getByLabelText('Name *');
    const relationshipSelect = screen.getByLabelText('Relationship *');
    const titleInput = screen.getByLabelText('Title/Occupation');

    fireEvent.change(nameInput, { target: { value: 'John Smith' } });
    fireEvent.change(relationshipSelect, { target: { value: 'Father' } });
    fireEvent.change(titleInput, { target: { value: 'Engineer' } });

    expect(nameInput).toHaveValue('John Smith');
    expect(relationshipSelect).toHaveValue('Father');
    expect(titleInput).toHaveValue('Engineer');
  });

  it('validates email format with token-styled error messages', async () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
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
      expect(emailError.className).toEqual(expect.stringContaining('text-(--color-error)'));
    });
  });

  it('handles photo upload with proper preview and accessibility', async () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const uploadButton = screen.getByText('Choose Photo');
    expect(uploadButton.className).toEqual(expect.stringContaining('btn-outline'));

    // Photo input should be hidden but accessible
    const photoInputs = screen.getAllByLabelText('Photo');
    const hiddenInput = photoInputs.find(input => input.classList.contains('hidden'));
    expect(hiddenInput).toBeDefined();
    expect(hiddenInput).toHaveAttribute('accept', 'image/*');
  });

  it('shows edit-only canvas fields when mode is edit', () => {
    const editInitialData = { ...defaultInitialData, name: 'Existing Member' };
    
    renderWithProvider(
      <MemberForm
        mode="edit"
        initialData={editInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Canvas section should be visible in edit mode
    expect(screen.getByText('Canvas Position & Size')).toBeInTheDocument();
    expect(screen.getByLabelText('X Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Y Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Width')).toBeInTheDocument();
    expect(screen.getByLabelText('Height')).toBeInTheDocument();

    // Button text should be for edit mode
    expect(screen.getByText('Update Member')).toBeInTheDocument();
  });

  it('does not show canvas fields when mode is add', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Canvas section should not be visible in add mode
    expect(screen.queryByText('Canvas Position & Size')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('X Position')).not.toBeInTheDocument();

    // Button text should be for add mode
    expect(screen.getByText('Add Member')).toBeInTheDocument();
  });

  it('provides biography character count with proper styling', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const biographyTextarea = screen.getByRole('textbox', { name: /biography/i });
    expect(biographyTextarea).toHaveAttribute('maxLength', '1000');

    // Character count should be displayed
    expect(screen.getByText('(0/1000 characters)')).toBeInTheDocument();

    // Update biography and check count
    fireEvent.change(biographyTextarea, { target: { value: 'Test biography' } });
    expect(screen.getByText('(14/1000 characters)')).toBeInTheDocument();
  });

  it('disables all form controls when isSubmitting is true', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isSubmitting={true}
      />
    );

    // Input controls should be disabled
    expect(screen.getByLabelText('Name *')).toBeDisabled();
    expect(screen.getByLabelText('Gender')).toBeDisabled();
    expect(screen.getByLabelText('Relationship *')).toBeDisabled();

    // Buttons should show loading state
    expect(screen.getByText('Adding Member...')).toBeInTheDocument();
    expect(screen.getByText('Adding Member...')).toBeDisabled();
  });

  it('applies appropriate touch-friendly sizing for mobile', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Buttons should have minimum touch target height on mobile
    const cancelButton = screen.getByText('Cancel');
    const submitButton = screen.getByText('Add Member');
    
    expect(cancelButton.className).toEqual(expect.stringContaining('max-sm:min-h-[44px]'));
    expect(submitButton.className).toEqual(expect.stringContaining('max-sm:min-h-[44px]'));
  });

  it('calls onSubmit with properly formatted data', async () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Fill required fields
    const nameInput = screen.getByLabelText('Name *');
    const relationshipSelect = screen.getByLabelText('Relationship *');

    fireEvent.change(nameInput, { target: { value: '  Test Member  ' } });
    fireEvent.change(relationshipSelect, { target: { value: 'Son' } });

    const submitButton = screen.getByText('Add Member');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Member', // Should be trimmed
          relationship: 'Son',
          gender: 'male'
        })
      );
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    renderWithProvider(
      <MemberForm
        mode="add"
        initialData={defaultInitialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});