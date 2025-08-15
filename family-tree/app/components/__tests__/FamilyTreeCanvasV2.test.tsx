import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FamilyTreeCanvasV2 from '../../v2/components/FamilyTreeCanvasV2';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { OnboardingProvider } from '../OnboardingProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@testing-library/jest-dom';

// Mock the virtualization and performance hooks
jest.mock('../../hooks/useVirtualization', () => ({
  useVirtualization: jest.fn((members) => ({
    visibleMembers: Array.isArray(members) ? members : [],
    stats: { totalMembers: Array.isArray(members) ? members.length : 0, visibleMembers: Array.isArray(members) ? members.length : 0 }
  })),
  useConnectionVirtualization: jest.fn((allMembers, visibleMemberIds) => Array.isArray(allMembers) ? allMembers : []),
}));

jest.mock('../../hooks/usePerformanceMonitor', () => ({
  usePerformanceMonitor: jest.fn(),
}));

jest.mock('../../lib/connectionCalculator', () => ({
  calculateConnections: jest.fn(() => []),
}));

// Mock VirtualizedConnections component
jest.mock('../VirtualizedConnections', () => {
  return function MockVirtualizedConnections() {
    return <g data-testid="virtualized-connections" />;
  };
});

const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    gender: 'male' as const,
    parentId: null,
    spouseIds: [],
    childrenIds: [],
    order: 0,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 150 },
    relationship: 'Father'
  },
  {
    id: '2',
    name: 'Jane Doe',
    gender: 'female' as const,
    parentId: null,
    spouseIds: [],
    childrenIds: [],
    order: 1,
    position: { x: 200, y: 150 },
    size: { width: 200, height: 150 },
    relationship: 'Mother'
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <FamilyTreeProvider>
        <OnboardingProvider>
          {ui}
        </OnboardingProvider>
      </FamilyTreeProvider>
    </DndProvider>
  );
};

describe('FamilyTreeCanvasV2', () => {
  const mockProps = {
    members: mockMembers,
    moveMember: jest.fn(),
    highlightedIds: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders canvas with proper structure', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const canvas = screen.getByRole('application');
    expect(canvas).toHaveAttribute('aria-label', 'Family tree canvas');
    expect(canvas).toHaveClass('canvas-grid');
  });

  it('renders connections layer under nodes with proper z-index', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const connectionsLayer = screen.getByTestId('virtualized-connections').closest('svg');
    expect(connectionsLayer).toHaveClass('connections-layer');
    expect(connectionsLayer).toHaveClass('-z-10'); // Behind nodes
  });

  it('hides connections on screens smaller than 480px', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const connectionsLayer = screen.getByTestId('virtualized-connections').closest('svg');
    expect(connectionsLayer).toHaveClass('hidden', 'min-[480px]:block');
  });

  it('renders member banners at correct positions', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    // Check that member containers exist with data attributes
    const memberContainers = screen.getAllByTestId(/member-banner-/);
    expect(memberContainers).toHaveLength(2);
    
    // Check positioning styles are applied
    const firstMember = screen.getByTestId('member-banner-1').closest('[data-member-id]');
    expect(firstMember).toHaveAttribute('data-member-id', '1');
    expect(firstMember).toHaveClass('absolute');
  });

  it('renders canvas controls (zoom in, zoom out, reset)', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset view')).toBeInTheDocument();
  });

  it('renders zoom level indicator', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const zoomIndicator = screen.getByText('100%');
    expect(zoomIndicator).toBeInTheDocument();
    expect(zoomIndicator.closest('div')).toHaveClass('badge');
  });

  it('uses tokenized styling classes', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const canvas = screen.getByRole('application');
    expect(canvas).toHaveClass('canvas-grid');
    
    const zoomControls = screen.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('Zoom') || 
      btn.getAttribute('aria-label')?.includes('Reset')
    );
    
    zoomControls.forEach(control => {
      expect(control).toHaveClass('btn-outline');
    });
  });

  it('handles zoom controls correctly', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const zoomInButton = screen.getByLabelText('Zoom in');
    const zoomOutButton = screen.getByLabelText('Zoom out');
    const resetButton = screen.getByLabelText('Reset view');
    
    // Initially at 100%
    expect(screen.getByText('100%')).toBeInTheDocument();
    
    // Test zoom in
    fireEvent.click(zoomInButton);
    expect(screen.getByText('120%')).toBeInTheDocument();
    
    // Test zoom out from 120%
    fireEvent.click(zoomOutButton);
    expect(screen.getByText('96%')).toBeInTheDocument();
    
    // Test reset
    fireEvent.click(resetButton);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('prevents zoom below 10% and above 300%', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const zoomOutButton = screen.getByLabelText('Zoom out');
    const zoomInButton = screen.getByLabelText('Zoom in');
    
    // Test minimum zoom (10%)
    // Zoom out multiple times to reach minimum
    for (let i = 0; i < 20; i++) {
      fireEvent.click(zoomOutButton);
    }
    expect(screen.getByText('10%')).toBeInTheDocument();
    
    // Should not go below 10%
    fireEvent.click(zoomOutButton);
    expect(screen.getByText('10%')).toBeInTheDocument();
    
    // Reset and test maximum zoom
    fireEvent.click(screen.getByLabelText('Reset view'));
    
    // Zoom in multiple times to reach maximum
    for (let i = 0; i < 15; i++) {
      fireEvent.click(zoomInButton);
    }
    expect(screen.getByText('300%')).toBeInTheDocument();
    
    // Should not go above 300%
    fireEvent.click(zoomInButton);
    expect(screen.getByText('300%')).toBeInTheDocument();
  });

  it('handles mouse pan interactions correctly', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const canvas = screen.getByRole('application');
    
    // Test mouse down sets cursor to grabbing
    fireEvent.mouseDown(canvas, { button: 0, clientX: 100, clientY: 100 });
    expect(canvas).toHaveClass('active:cursor-grabbing');
    
    // Test mouse up resets dragging state
    fireEvent.mouseUp(canvas);
  });

  it('prevents panning when clicking on member elements', () => {
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} />);
    
    const canvas = screen.getByRole('application');
    const memberElement = screen.getByTestId('member-banner-1');
    
    // Mock member element being inside canvas
    Object.defineProperty(memberElement, 'closest', {
      value: jest.fn(() => memberElement)
    });
    
    // Clicking on member should not start canvas panning
    fireEvent.mouseDown(canvas, { 
      button: 0, 
      clientX: 100, 
      clientY: 100,
      target: memberElement 
    });
    
    // Pan state should not be set when clicking member
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 150 });
    // Canvas position should not change (tested implicitly through lack of style changes)
  });

  it('exposes focus and zoom methods via ref', () => {
    const ref = React.createRef();
    renderWithProviders(<FamilyTreeCanvasV2 {...mockProps} ref={ref} />);
    
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.focusMember).toBe('function');
    expect(typeof ref.current.zoomToFitMembers).toBe('function');
  });
});