import React from 'react';
import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FamilyTreeCanvas from '../FamilyTreeCanvas';
import { FamilyMember } from '../../../types';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';

// Mock data with relationships for connection testing
const mockMembersWithConnections: FamilyMember[] = [
  {
    id: 'parent1',
    name: 'Parent 1',
    gender: 'male',
    parentId: null,
    spouseIds: ['parent2'],
    childrenIds: ['child1'],
    order: 1,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 },
    relationship: 'Father',
  },
  {
    id: 'parent2',
    name: 'Parent 2',
    gender: 'female',
    parentId: null,
    spouseIds: ['parent1'],
    childrenIds: ['child1'],
    order: 2,
    position: { x: 350, y: 100 },
    size: { width: 200, height: 120 },
    relationship: 'Mother',
  },
  {
    id: 'child1',
    name: 'Child 1',
    gender: 'female',
    parentId: 'parent1',
    spouseIds: [],
    childrenIds: [],
    order: 3,
    position: { x: 225, y: 300 },
    size: { width: 200, height: 120 },
    relationship: 'Daughter',
  },
];

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DndProvider backend={HTML5Backend}>
    <FamilyTreeProvider initialMembers={mockMembersWithConnections}>
      {children}
    </FamilyTreeProvider>
  </DndProvider>
);

describe('Dynamic Connection Rendering', () => {
  const mockMoveMember = jest.fn();

  beforeEach(() => {
    mockMoveMember.mockClear();
  });

  it('should render SVG connections layer', () => {
    render(
      <TestWrapper>
        <FamilyTreeCanvas 
          members={mockMembersWithConnections} 
          moveMember={mockMoveMember} 
        />
      </TestWrapper>
    );

    // Check that the SVG connections layer exists
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full', 'pointer-events-none');
  });

  it('should render TreeConnection components for relationships', () => {
    render(
      <TestWrapper>
        <FamilyTreeCanvas 
          members={mockMembersWithConnections} 
          moveMember={mockMoveMember} 
        />
      </TestWrapper>
    );

    // Should have parent-child connection lines
    const parentChildConnections = screen.getAllByTestId('tree-connection-parent-child');
    expect(parentChildConnections.length).toBeGreaterThan(0);

    // Should have spouse connection line  
    const spouseConnections = screen.getAllByTestId('tree-connection-spouse');
    expect(spouseConnections.length).toBeGreaterThan(0);
  });

  it('should render correct number of connections based on relationships', () => {
    render(
      <TestWrapper>
        <FamilyTreeCanvas 
          members={mockMembersWithConnections} 
          moveMember={mockMoveMember} 
        />
      </TestWrapper>
    );

    // Expected connections:
    // 1. parent1 -> child1 (parent-child)
    // 2. parent1 <-> parent2 (spouse)
    
    const parentChildConnections = screen.getAllByTestId('tree-connection-parent-child');
    expect(parentChildConnections).toHaveLength(1);

    const spouseConnections = screen.getAllByTestId('tree-connection-spouse');
    expect(spouseConnections).toHaveLength(1);
  });

  it('should recalculate connections when members prop changes', () => {
    const { rerender } = render(
      <TestWrapper>
        <FamilyTreeCanvas 
          members={mockMembersWithConnections} 
          moveMember={mockMoveMember} 
        />
      </TestWrapper>
    );

    // Initial connections count
    let parentChildConnections = screen.getAllByTestId('tree-connection-parent-child');
    expect(parentChildConnections).toHaveLength(1);

    // Add another child to test dynamic recalculation
    const updatedMembers = [
      ...mockMembersWithConnections,
      {
        id: 'child2',
        name: 'Child 2',
        gender: 'male',
        parentId: 'parent1',
        spouseIds: [],
        childrenIds: [],
        order: 4,
        position: { x: 475, y: 300 },
        size: { width: 200, height: 120 },
        relationship: 'Son',
      },
    ];

    // Update parent1 to include the new child
    updatedMembers[0].childrenIds = ['child1', 'child2'];

    rerender(
      <TestWrapper>
        <FamilyTreeCanvas 
          members={updatedMembers} 
          moveMember={mockMoveMember} 
        />
      </TestWrapper>
    );

    // Should now have 2 parent-child connections
    parentChildConnections = screen.getAllByTestId('tree-connection-parent-child');
    expect(parentChildConnections).toHaveLength(2);
  });

  it('should handle empty members array without errors', () => {
    render(
      <TestWrapper>
        <FamilyTreeCanvas 
          members={[]} 
          moveMember={mockMoveMember} 
        />
      </TestWrapper>
    );

    // Should still render the SVG layer but with no connections
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Should have no connection lines
    const connections = document.querySelectorAll('line');
    expect(connections).toHaveLength(0);
  });
});