import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FamilyTree, { groupMembersByGeneration } from '../FamilyTree';
import { FamilyMember } from '../../../types';

// Mock the TreeConnection component
jest.mock('../TreeConnection', () => {
  return function MockTreeConnection({ from, to, type }: any) {
    return (
      <line 
        data-testid={`tree-connection-${type}`}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
      />
    );
  };
});

// Mock the MemberCard component
jest.mock('../MemberCard', () => {
  return function MockMemberCard({ member }: { member: FamilyMember }) {
    return <div data-testid={`member-card-${member.id}`}>{member.name}</div>;
  };
});

// Mock getBoundingClientRect for DOM measurements
const mockBoundingClientRect = () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(function(this: Element) {
      const id = this.getAttribute('data-member-id');
      if (id === 'parent1') {
        return { left: 10, top: 20, width: 100, height: 100 };
      } else if (id === 'parent2') {
        return { left: 210, top: 20, width: 100, height: 100 };
      } else if (id === 'child1') {
        return { left: 110, top: 220, width: 100, height: 100 };
      }
      return { left: 0, top: 0, width: 0, height: 0 };
    });
  });
  
  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });
};

describe('groupMembersByGeneration', () => {
  test('should group members by generation correctly', () => {
    const testMembers: FamilyMember[] = [
      {
        id: 'parent1',
        name: 'Parent 1',
        gender: 'male',
        spouseIds: ['parent2'],
        childrenIds: ['child1', 'child2'],
        parentId: undefined,
        order: 1
      },
      {
        id: 'parent2',
        name: 'Parent 2',
        gender: 'female',
        spouseIds: ['parent1'],
        childrenIds: ['child1', 'child2'],
        parentId: undefined,
        order: 2
      },
      {
        id: 'child1',
        name: 'Child 1',
        gender: 'male',
        spouseIds: [],
        childrenIds: ['grandchild1'],
        parentId: 'parent1',
        order: 1
      },
      {
        id: 'child2',
        name: 'Child 2',
        gender: 'female',
        spouseIds: [],
        childrenIds: [],
        parentId: 'parent1',
        order: 2
      },
      {
        id: 'grandchild1',
        name: 'Grandchild 1',
        gender: 'female',
        spouseIds: [],
        childrenIds: [],
        parentId: 'child1',
        order: 1
      }
    ];

    const generations = groupMembersByGeneration(testMembers);
    
    // Should have 3 generations
    expect(generations.length).toBe(3);
    
    // First generation should have parent1 and parent2
    expect(generations[0].map(m => m.id)).toEqual(expect.arrayContaining(['parent1', 'parent2']));
    
    // Second generation should have child1 and child2
    expect(generations[1].map(m => m.id)).toEqual(expect.arrayContaining(['child1', 'child2']));
    
    // Third generation should have grandchild1
    expect(generations[2].map(m => m.id)).toEqual(['grandchild1']);
  });

  test('should handle empty members array', () => {
    const generations = groupMembersByGeneration([]);
    expect(generations.length).toBe(0);
  });
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('FamilyTree', () => {
  mockBoundingClientRect();
  
  const testMembers: FamilyMember[] = [
    {
      id: 'parent1',
      name: 'Parent 1',
      gender: 'male',
      spouseIds: ['parent2'],
      childrenIds: ['child1'],
      parentId: undefined,
      order: 1
    },
    {
      id: 'parent2',
      name: 'Parent 2',
      gender: 'female',
      spouseIds: ['parent1'],
      childrenIds: ['child1'],
      parentId: undefined,
      order: 2
    },
    {
      id: 'child1',
      name: 'Child 1',
      gender: 'male',
      spouseIds: [],
      childrenIds: [],
      parentId: 'parent1',
      order: 1
    }
  ];

  test('renders the family tree with correct structure', () => {
    // Mock the container ref's getBoundingClientRect
    const originalQuerySelector = Element.prototype.querySelectorAll;
    Element.prototype.querySelectorAll = jest.fn().mockImplementation(function(this: Element, selector: string) {
      if (selector === '[data-member-id]') {
        // Mock the elements with data-member-id
        return [
          { getAttribute: () => 'parent1', getBoundingClientRect: () => ({ left: 10, top: 20, width: 100, height: 100 }) },
          { getAttribute: () => 'parent2', getBoundingClientRect: () => ({ left: 210, top: 20, width: 100, height: 100 }) },
          { getAttribute: () => 'child1', getBoundingClientRect: () => ({ left: 110, top: 220, width: 100, height: 100 }) }
        ] as unknown as NodeListOf<Element>;
      }
      return originalQuerySelector.call(this, selector);
    });
    
    render(<FamilyTree members={testMembers} />);
    
    // Check if the component renders
    const treeContainer = screen.getByTestId('family-tree');
    expect(treeContainer).toBeInTheDocument();
    
    // Check if parent members are rendered
    expect(screen.getByTestId('member-card-parent1')).toBeInTheDocument();
    expect(screen.getByTestId('member-card-parent2')).toBeInTheDocument();
    
    // Restore the original implementation
    Element.prototype.querySelectorAll = originalQuerySelector;
  });

  it('should apply responsive classes based on viewport width', () => {
    // Mock window.innerWidth to simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375, // Mobile width
    });
    
    // Create a minimal member for testing
    const mockMembers = [
      {
        id: '1',
        name: 'Test Member',
        gender: 'male' as 'male' | 'female' | 'other',
        spouseIds: [],
        childrenIds: [],
        order: 1,
      }
    ];
    
    // Fire resize event to trigger responsive behavior
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    
    // Render component
    render(<FamilyTree members={mockMembers} />);
    
    // Check for mobile class
    expect(screen.getByTestId('family-tree')).toHaveClass('mobile-view');
    
    // Cleanup
    jest.resetAllMocks();
  });
}); 