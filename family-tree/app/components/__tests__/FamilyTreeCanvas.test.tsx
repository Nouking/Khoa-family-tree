import React from 'react';
import { render, screen } from '@testing-library/react';
import FamilyTreeCanvas from '../FamilyTreeCanvas'; // Adjust this path if needed
import { FamilyTreeData } from '@/types';

// Mock data for testing, conforming to FamilyTreeData
const mockFamilyTree: FamilyTreeData = {
  id: 'family-1',
  name: 'Test Family',
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
    version: '1.0',
  },
  members: [
    {
      id: 'member-1',
      name: 'John Doe',
      gender: 'male',
      order: 1,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 120 },
      relationship: 'self',
      spouseIds: [],
      childrenIds: [],
    },
    {
      id: 'member-2',
      name: 'Jane Doe',
      gender: 'female',
      order: 2,
      position: { x: 400, y: 100 },
      size: { width: 200, height: 120 },
      relationship: 'spouse',
      spouseIds: [],
      childrenIds: [],
    },
  ],
};

describe('FamilyTreeCanvas', () => {
  it('renders all members from the family tree data', () => {
    render(<FamilyTreeCanvas familyTree={mockFamilyTree} />);

    // Check if both members are rendered by looking for their names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
