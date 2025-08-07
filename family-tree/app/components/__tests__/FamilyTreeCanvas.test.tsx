import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FamilyTreeCanvas from '../FamilyTreeCanvas';

// Mock the react-dnd hooks
jest.mock('react-dnd', () => ({
  useDrop: () => [
    { isOver: false, canDrop: false },
    jest.fn()
  ]
}));

// Mock MemberCard component
jest.mock('../MemberCard', () => {
  return function MockMemberCard({ member }: { member: any }) {
    return (
      <div data-testid={`member-card-${member.id}`}>
        {member.name}
      </div>
    );
  };
});

// Mock props
const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    gender: 'male' as const,
    spouseIds: [],
    childrenIds: [],
    order: 1,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 100 },
    relationship: 'Father'
  }
];

const mockMoveMember = jest.fn();

describe('FamilyTreeCanvas', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('renders member cards', () => {
    render(<FamilyTreeCanvas members={mockMembers} moveMember={mockMoveMember} />);
    expect(screen.getByTestId('member-card-1')).toBeInTheDocument();
  });

  it('initializes with default viewport values', () => {
    render(<FamilyTreeCanvas members={mockMembers} moveMember={mockMoveMember} />);
    const canvasContent = screen.getByTestId('family-tree-canvas-content');
    
    // Check that the canvas has the default transform style
    expect(canvasContent.style.transform).toBe('translate(0px, 0px) scale(1)');
  });

  it('increases zoom level when zoom in button is clicked', () => {
    render(<FamilyTreeCanvas members={mockMembers} moveMember={mockMoveMember} />);
    
    const zoomInButton = screen.getByTestId('zoom-in-button');
    fireEvent.click(zoomInButton);
    
    const canvasContent = screen.getByTestId('family-tree-canvas-content');
    // Check that the canvas zoom level has increased
    expect(canvasContent.style.transform).toBe('translate(0px, 0px) scale(1.1)');
  });

  it('decreases zoom level when zoom out button is clicked', () => {
    render(<FamilyTreeCanvas members={mockMembers} moveMember={mockMoveMember} />);
    
    const zoomOutButton = screen.getByTestId('zoom-out-button');
    fireEvent.click(zoomOutButton);
    
    const canvasContent = screen.getByTestId('family-tree-canvas-content');
    // Check that the canvas zoom level has decreased
    expect(canvasContent.style.transform).toBe('translate(0px, 0px) scale(0.9)');
  });

  it('pans the canvas when mouse drag occurs', () => {
    render(<FamilyTreeCanvas members={mockMembers} moveMember={mockMoveMember} />);
    
    const canvas = screen.getByTestId('family-tree-canvas');
    
    // Simulate mouse down event
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    
    // Simulate mouse move event
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    
    const canvasContent = screen.getByTestId('family-tree-canvas-content');
    
    // Simulate mouse up event
    fireEvent.mouseUp(canvas);
    
    // Check that the canvas has been panned
    expect(canvasContent.style.transform).toBe('translate(50px, 50px) scale(1)');
  });
}); 