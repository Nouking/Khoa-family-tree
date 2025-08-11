import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditMemberModal from '../EditMemberModal';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <FamilyTreeProvider>
      {component}
    </FamilyTreeProvider>
  );
};

describe('EditMemberModal', () => {
  const mockOnClose = jest.fn();
  const mockOnMemberUpdated = jest.fn();

  const member = {
    id: 'm1',
    name: 'John Doe',
    relationship: 'Father',
    gender: 'male',
    spouseIds: [],
    childrenIds: [],
    order: 1,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 }
  } as any;

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnMemberUpdated.mockClear();
    (global.fetch as any) = jest.fn().mockResolvedValue({ ok: true, json: async () => member });
  });

  it('renders with gradient header and gradient CTA', () => {
    renderWithProvider(
      <EditMemberModal
        isOpen={true}
        onClose={mockOnClose}
        member={member}
        onMemberUpdated={mockOnMemberUpdated}
      />
    );

    const dialog = screen.getByRole('dialog');
    const accentBar = (dialog as HTMLElement).querySelector('span[aria-hidden="true"].absolute.left-0.top-0.h-full.w-1');
    expect(accentBar).toBeTruthy();
    expect(accentBar?.className).toEqual(expect.stringContaining('u-header-accent--gradient'));

    const submit = screen.getByRole('button', { name: /Update/i });
    expect(submit.className).toEqual(expect.stringContaining('btn-primary--gradient'));
  });

  it('updates member successfully', async () => {
    renderWithProvider(
      <EditMemberModal
        isOpen={true}
        onClose={mockOnClose}
        member={member}
        onMemberUpdated={mockOnMemberUpdated}
      />
    );

    const nameInput = screen.getByLabelText('Name *');
    fireEvent.change(nameInput, { target: { value: 'Johnathon Doe' } });

    const submit = screen.getByRole('button', { name: /Update/i });
    fireEvent.click(submit);

    await waitFor(() => expect(mockOnMemberUpdated).toHaveBeenCalled());
    expect(mockOnClose).toHaveBeenCalled();
  });
});


