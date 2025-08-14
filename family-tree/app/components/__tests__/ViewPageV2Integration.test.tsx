import { render, screen, fireEvent } from '@testing-library/react';
import ViewPageV2Client from '../../(v2)/view/ViewPageV2Client';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { OnboardingProvider } from '../OnboardingProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@testing-library/jest-dom';

// Mock the hooks and utilities
jest.mock('../../hooks/useVirtualization', () => ({
  useVirtualization: jest.fn((members) => members.slice(0, 10)),
  useConnectionVirtualization: jest.fn((connections) => connections),
}));

jest.mock('../../hooks/usePerformanceMonitor', () => ({
  usePerformanceMonitor: jest.fn(),
}));

jest.mock('../../lib/connectionCalculator', () => ({
  calculateConnections: jest.fn(() => []),
}));

jest.mock('../../hooks/useFamilyTreeOperations', () => ({
  useFamilyTreeOperations: () => ({
    moveMember: jest.fn(),
  }),
}));

jest.mock('../VirtualizedConnections', () => {
  return function MockVirtualizedConnections() {
    return <g data-testid="virtualized-connections" />;
  };
});

jest.mock('../MemberBanner', () => {
  return function MockMemberBanner({ member, isSelected, onSelect }) {
    return (
      <div 
        data-testid={`member-banner-${member.id}`}
        onClick={() => onSelect(member.id)}
        className={isSelected ? 'selected' : ''}
      >
        {member.name}
      </div>
    );
  };
});

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

describe('ViewPageV2 Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders complete v2 layout with sidebar, toolbar, and canvas', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    expect(screen.getByLabelText('Add Member')).toBeInTheDocument();
    expect(screen.getByLabelText('Export family tree')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Family Tree');
    expect(screen.getByLabelText('Search family members')).toBeInTheDocument();
    expect(screen.getByLabelText('Open Filters')).toBeInTheDocument();
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('ensures sidebar contains only Add, Export, Help (no Share)', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    expect(screen.getByLabelText('Add Member')).toBeInTheDocument();
    expect(screen.getByLabelText('Export family tree')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
    expect(screen.queryByText('Share')).not.toBeInTheDocument();
  });

  it('uses tokenized styling throughout components', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    const addButton = screen.getByLabelText('Add Member');
    expect(addButton).toHaveClass('btn-primary');
    expect(addButton).toHaveClass('focus-visible:outline-(--color-primary)');
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('u-header-accent--gradient');
    
    const searchInput = screen.getByLabelText('Search family members');
    expect(searchInput).toHaveClass('input');
    
    const canvas = screen.getByRole('application');
    expect(canvas).toHaveClass('canvas-grid');
  });

  it('handles responsive behavior at breakpoints', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-16', 'lg:w-48');
    
    const searchInput = screen.getByLabelText('Search family members');
    expect(searchInput).toHaveClass('w-32', 'sm:w-40', 'md:w-56');
  });

  it('ensures connectors are layered behind nodes', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    const connectionsLayer = screen.getByTestId('virtualized-connections').closest('svg');
    expect(connectionsLayer).toHaveClass('connections-layer');
    expect(connectionsLayer).toHaveClass('-z-10');
    expect(connectionsLayer).toHaveClass('pointer-events-none');
  });

  it('hides connectors on screens smaller than 480px', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    const connectionsLayer = screen.getByTestId('virtualized-connections').closest('svg');
    expect(connectionsLayer).toHaveClass('hidden', 'min-[480px]:block');
  });

  it('shows placeholder modals for Add and Filters', () => {
    renderWithProviders(<ViewPageV2Client />);
    
    fireEvent.click(screen.getByLabelText('Add Member'));
    expect(screen.getByText('Add Member modal will be implemented in E12-T2')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Close'));
    
    fireEvent.click(screen.getByLabelText('Open Filters'));
    expect(screen.getByText('Filter functionality will be implemented in v2')).toBeInTheDocument();
  });
});