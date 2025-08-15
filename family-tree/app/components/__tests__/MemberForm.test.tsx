import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberForm from '../shared/MemberForm';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { FamilyMember } from '@/types';

const initialData = {
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
  position: { x: 0, y: 0 },
  size: { width: 200, height: 120 },
};

describe('MemberForm', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FamilyTreeProvider>{ui}</FamilyTreeProvider>);
  };

  it('renders chips and dividers utilities and gradient CTA', () => {
    renderWithProvider(
      <MemberForm mode="add" initialData={initialData as Partial<FamilyMember>} onSubmit={onSubmit} onCancel={onCancel} />
    );

    // Accent chip exists
    expect(document.querySelector('.u-chip--accent')).toBeTruthy();
    // Dividers are present
    expect(document.querySelectorAll('.border-t').length).toBeGreaterThan(0);
    // Submit button gradient class present
    const submit = screen.getByRole('button', { name: /Add Member/i });
    expect(submit.className).toEqual(expect.stringContaining('btn-primary--gradient'));
  });

  it('keeps layout stable when showing errors (no layout shift heuristic via min-h containers)', () => {
    renderWithProvider(
      <MemberForm mode="add" initialData={initialData as Partial<FamilyMember>} onSubmit={onSubmit} onCancel={onCancel} />
    );

    const errorSlotsAll = Array.from(document.querySelectorAll('.mt-1'));
    const errorSlots = errorSlotsAll.filter((el) => (el as HTMLElement).className.includes('min-h-[20px]'));
    expect(errorSlots.length).toBeGreaterThan(0);

    // Trigger validation by submitting empty
    const submit = screen.getByRole('button', { name: /Add Member/i });
    fireEvent.click(submit);

    // Error slots still exist; we rely on class presence not visual diff
    const afterAll = Array.from(document.querySelectorAll('.mt-1'));
    const after = afterAll.filter((el) => (el as HTMLElement).className.includes('min-h-[20px]'));
    expect(after.length).toBe(errorSlots.length);
  });
});


