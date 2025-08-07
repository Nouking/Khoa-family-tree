import React from 'react';
import { render, screen } from '@testing-library/react';
import MemberBanner from '../MemberBanner';
import { FamilyMember } from '../../../types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Mock family member data
const mockMember: FamilyMember = {
  id: 'member1',
  name: 'John Doe',
  gender: 'male',
  birthDate: '1980-01-01',
  relationship: 'Father',
  title: 'Family Head',
  parentId: null,
  spouseIds: ['spouse1'],
  childrenIds: ['child1', 'child2'],
  order: 1,
  position: { x: 100, y: 100 },
  size: { width: 250, height: 120 }
};

const mockMemberWithoutOptionals: FamilyMember = {
  id: 'member2',
  name: 'Jane Doe',
  gender: 'female',
  spouseIds: [],
  childrenIds: [],
  order: 2,
  position: { x: 200, y: 200 },
  size: { width: 250, height: 120 },
  relationship: ''
};

describe('MemberBanner Component', () => {
  const renderWithDnd = (ui: React.ReactElement) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {ui}
      </DndProvider>
    );
  };

  it('renders member information correctly', () => {
    renderWithDnd(<MemberBanner member={mockMember} />);
    
    // Check if name and relationship are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Father')).toBeInTheDocument();
    expect(screen.getByText('Family Head')).toBeInTheDocument();
    expect(screen.getByText('Born: 1980-01-01')).toBeInTheDocument();
  });

  it('renders with default relationship text when not provided', () => {
    renderWithDnd(<MemberBanner member={mockMemberWithoutOptionals} />);
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Member')).toBeInTheDocument();
  });

  it('renders first letter of name as fallback when no photo', () => {
    renderWithDnd(<MemberBanner member={mockMember} />);
    
    const nameInitial = screen.getByText('J');
    expect(nameInitial).toBeInTheDocument();
  });

  it('applies correct styling and positioning', () => {
    renderWithDnd(<MemberBanner member={mockMember} />);
    
    const banner = screen.getByTestId('member-banner-member1');
    expect(banner).toHaveStyle({
      position: 'absolute',
      left: '100px',
      top: '100px',
      width: '250px',
      height: '120px'
    });
    
    expect(banner).toHaveClass('member-banner');
    expect(banner).toHaveClass('rounded-lg');
    expect(banner).toHaveClass('bg-white');
    expect(banner).toHaveClass('hover:border-blue-300');
  });
}); 