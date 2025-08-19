import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FamilyMember } from '@/types';
import MemberDetailModalV2 from '../MemberDetailModalV2';

// Mock the FamilyTreeContext
const mockUseFamilyMembers = jest.fn();
jest.mock('../../contexts/FamilyTreeContext', () => ({
  useFamilyMembers: () => mockUseFamilyMembers(),
}));

// Mock the Modal component
jest.mock('../../components/Modal', () => {
  return function MockModal({ isOpen, children, title, onClose }: { 
    isOpen: boolean; 
    children: React.ReactNode; 
    title: string; 
    onClose: () => void;
  }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <div data-testid="modal-title">{title}</div>
        <button onClick={onClose} data-testid="modal-close">
          Close
        </button>
        {children}
      </div>
    );
  };
});

const mockMember: FamilyMember = {
  id: 'member-1',
  name: 'John Doe',
  gender: 'male',
  birthDate: '1980-01-01',
  deathDate: undefined,
  photo: '',
  title: 'Software Engineer',
  email: 'john@example.com',
  phone: '+1234567890',
  address: '123 Main St, City, State',
  biography: 'A passionate software engineer with 10 years of experience.',
  parentId: 'parent-1',
  spouseIds: ['spouse-1'],
  childrenIds: ['child-1', 'child-2'],
  order: 1,
  position: { x: 100, y: 100 },
  size: { width: 200, height: 120 },
  relationship: 'Son'
};

const mockParent: FamilyMember = {
  id: 'parent-1',
  name: 'Jane Doe',
  gender: 'female',
  birthDate: '1950-01-01',
  deathDate: undefined,
  photo: '',
  title: 'Teacher',
  email: 'jane@example.com',
  phone: '+1234567891',
  address: '456 Oak Ave, City, State',
  biography: 'A dedicated teacher.',
  parentId: null,
  spouseIds: [],
  childrenIds: ['member-1'],
  order: 1,
  position: { x: 50, y: 50 },
  size: { width: 200, height: 120 },
  relationship: 'Mother'
};

const mockSpouse: FamilyMember = {
  id: 'spouse-1',
  name: 'Alice Smith',
  gender: 'female',
  birthDate: '1982-05-15',
  deathDate: undefined,
  photo: '',
  title: 'Designer',
  email: 'alice@example.com',
  phone: '+1234567892',
  address: '123 Main St, City, State',
  biography: 'A creative designer.',
  parentId: null,
  spouseIds: ['member-1'],
  childrenIds: ['child-1', 'child-2'],
  order: 2,
  position: { x: 150, y: 100 },
  size: { width: 200, height: 120 },
  relationship: 'Spouse'
};

const mockChild1: FamilyMember = {
  id: 'child-1',
  name: 'Emma Doe',
  gender: 'female',
  birthDate: '2010-03-10',
  deathDate: undefined,
  photo: '',
  title: '',
  email: '',
  phone: '',
  address: '123 Main St, City, State',
  biography: 'A bright young girl.',
  parentId: 'member-1',
  spouseIds: [],
  childrenIds: [],
  order: 1,
  position: { x: 200, y: 150 },
  size: { width: 200, height: 120 },
  relationship: 'Daughter'
};

const mockChild2: FamilyMember = {
  id: 'child-2',
  name: 'Max Doe',
  gender: 'male',
  birthDate: '2012-08-20',
  deathDate: undefined,
  photo: '',
  title: '',
  email: '',
  phone: '',
  address: '123 Main St, City, State',
  biography: 'An energetic boy.',
  parentId: 'member-1',
  spouseIds: [],
  childrenIds: [],
  order: 2,
  position: { x: 250, y: 150 },
  size: { width: 200, height: 120 },
  relationship: 'Son'
};

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  member: mockMember,
  onEditMember: jest.fn(),
  onDeleteMember: jest.fn(),
  onNavigateToMember: jest.fn(),
  showActions: true,
};

describe('MemberDetailModalV2', () => {
  beforeEach(() => {
    mockUseFamilyMembers.mockReturnValue([
      mockMember,
      mockParent,
      mockSpouse,
      mockChild1,
      mockChild2,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Member Detail');
  });

  it('does not render when closed', () => {
    render(<MemberDetailModalV2 {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('does not render when member is null', () => {
    render(<MemberDetailModalV2 {...defaultProps} member={null} />);
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('displays member information correctly', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    // Check name appears in multiple places
    expect(screen.getAllByText('John Doe')).toHaveLength(2); // breadcrumb and ribbon
    
    // Check relationship
    expect(screen.getByText('Son')).toBeInTheDocument();
    
    // Check title appears in multiple places
    expect(screen.getAllByText('Software Engineer')).toHaveLength(2); // profile and about section
    
    // Check gender
    expect(screen.getAllByText('male')).toHaveLength(2); // Once in quick info, once in about section
    
    // Check contact information
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    
    // Check biography
    expect(screen.getByText('A passionate software engineer with 10 years of experience.')).toBeInTheDocument();
  });

  it('displays action buttons when showActions is true', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('hides action buttons when showActions is false', () => {
    render(<MemberDetailModalV2 {...defaultProps} showActions={false} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('calls onEditMember when Edit button is clicked', () => {
    const onEditMember = jest.fn();
    render(<MemberDetailModalV2 {...defaultProps} onEditMember={onEditMember} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEditMember).toHaveBeenCalledWith(mockMember);
  });

  it('calls onDeleteMember when Delete button is clicked', () => {
    const onDeleteMember = jest.fn();
    render(<MemberDetailModalV2 {...defaultProps} onDeleteMember={onDeleteMember} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(onDeleteMember).toHaveBeenCalledWith(mockMember);
  });

  it('displays relationships correctly', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    // Parent
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    
    // Spouse
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    
    // Children
    expect(screen.getByText('Emma Doe')).toBeInTheDocument();
    expect(screen.getByText('Max Doe')).toBeInTheDocument();
  });

  it('calls onNavigateToMember when relation chip is clicked', () => {
    const onNavigateToMember = jest.fn();
    render(<MemberDetailModalV2 {...defaultProps} onNavigateToMember={onNavigateToMember} />);
    
    // Click on parent
    fireEvent.click(screen.getByText('Jane Doe'));
    expect(onNavigateToMember).toHaveBeenCalledWith('parent-1');
    
    // Click on spouse
    fireEvent.click(screen.getByText('Alice Smith'));
    expect(onNavigateToMember).toHaveBeenCalledWith('spouse-1');
    
    // Click on child
    fireEvent.click(screen.getByText('Emma Doe'));
    expect(onNavigateToMember).toHaveBeenCalledWith('child-1');
  });

  it('handles missing optional data gracefully', () => {
    const memberWithoutOptionalData: FamilyMember = {
      ...mockMember,
      title: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      biography: undefined,
      parentId: null,
      spouseIds: [],
      childrenIds: [],
    };

    render(<MemberDetailModalV2 {...defaultProps} member={memberWithoutOptionalData} />);
    
    // Should show fallback values
    expect(screen.getAllByText('—')).toHaveLength(8); // Multiple fallback dashes for missing data
    expect(screen.getByText('No biography available.')).toBeInTheDocument();
  });

  it('generates correct initials for members without photos', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    // Should generate "JD" initials for "John Doe" - appears in multiple places
    expect(screen.getAllByText('JD')).toHaveLength(2); // Profile photo and parent avatar
  });

  it('formats dates correctly', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    // Should format birth date
    expect(screen.getByText(/Born/)).toBeInTheDocument();
    // Date formatting may vary by locale, just check it contains the year
    expect(screen.getAllByText(/1980/)).toHaveLength(2); // Should appear in quick info and about section
  });

  it('applies correct ribbon color class based on relationship', () => {
    render(<MemberDetailModalV2 {...defaultProps} />);
    
    // Find the ribbon element specifically (not the breadcrumb)
    const ribbon = document.querySelector('.v2-ribbon');
    expect(ribbon).toHaveClass('v2-ribbon-lilac'); // Son relationship should get lilac color
    expect(ribbon).toHaveTextContent('John Doe');
  });

  it('calls onClose when modal close button is clicked', () => {
    const onClose = jest.fn();
    render(<MemberDetailModalV2 {...defaultProps} onClose={onClose} />);
    
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalled();
  });
});