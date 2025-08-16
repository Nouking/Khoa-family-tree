import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

import MemberDetailPageV2 from '../page';
import { FamilyTreeProvider } from '../../../../contexts/FamilyTreeContext';
import { ToastProvider } from '../../../../components/ToastProvider';
import { FamilyMember } from '@/types';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left-icon" />,
  User: () => <div data-testid="user-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Phone: () => <div data-testid="phone-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  Edit: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
}));

// Test data
const mockMembers: FamilyMember[] = [
  {
    id: 'member-1',
    name: 'John Doe',
    gender: 'male',
    birthDate: '1980-01-15',
    deathDate: null,
    photo: '',
    title: 'Father',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, State',
    biography: 'A loving father and dedicated family man.',
    parentId: null,
    spouseIds: ['member-2'],
    childrenIds: ['member-3'],
    relationship: 'Father',
    order: 1,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 }
  },
  {
    id: 'member-2',
    name: 'Jane Doe',
    gender: 'female',
    birthDate: '1982-05-20',
    deathDate: null,
    photo: '',
    title: 'Mother',
    email: 'jane@example.com',
    phone: '+1234567891',
    address: '123 Main St, City, State',
    biography: 'A caring mother and professional.',
    parentId: null,
    spouseIds: ['member-1'],
    childrenIds: ['member-3'],
    relationship: 'Mother',
    order: 2,
    position: { x: 300, y: 100 },
    size: { width: 200, height: 120 }
  },
  {
    id: 'member-3',
    name: 'Alice Doe',
    gender: 'female',
    birthDate: '2010-12-10',
    deathDate: null,
    photo: '',
    title: 'Daughter',
    email: '',
    phone: '',
    address: '123 Main St, City, State',
    biography: 'A bright young girl with a love for reading.',
    parentId: 'member-1',
    spouseIds: [],
    childrenIds: [],
    relationship: 'Daughter',
    order: 1,
    position: { x: 500, y: 200 },
    size: { width: 200, height: 120 }
  }
];

const mockInitialState = {
  familyTree: {
    id: 'test-tree',
    name: 'Test Family',
    members: mockMembers
  }
};

// Mock router
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

// Wrapper component with providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <FamilyTreeProvider initialState={mockInitialState}>
        {children}
      </FamilyTreeProvider>
    </ToastProvider>
  );
}

describe('MemberDetailPageV2', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  describe('Valid Member ID', () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: 'member-1' });
    });

    it('renders member detail page with correct structure and content', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check header
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /member detail/i })).toBeInTheDocument();
      
      // Check back button
      expect(screen.getByRole('button', { name: /back to family tree/i })).toBeInTheDocument();

      // Check breadcrumb navigation
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();

      // Check action buttons
      expect(screen.getByRole('button', { name: /edit john doe/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /delete john doe/i })).toBeInTheDocument();

      // Check main content sections
      expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /relations/i })).toBeInTheDocument();
    });

    it('displays member information correctly in profile banner', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check profile banner content
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Father')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
      expect(screen.getByText(/born 1980-01-15/i)).toBeInTheDocument();
    });

    it('displays member information correctly in about section', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check about section content
      const aboutSection = screen.getByLabelledBy('about-heading');
      expect(aboutSection).toBeInTheDocument();
      
      // Check info grid items
      expect(screen.getByText('male')).toBeInTheDocument();
      expect(screen.getByText('1980-01-15')).toBeInTheDocument();
      expect(screen.getByText('A loving father and dedicated family man.')).toBeInTheDocument();
    });

    it('displays contact information correctly', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check contact section content
      const contactSection = screen.getByLabelledBy('contact-heading');
      expect(contactSection).toBeInTheDocument();
      
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('+1234567890')).toBeInTheDocument();
      expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    });

    it('displays relationships correctly with clickable chips', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check relations section content
      const relationsSection = screen.getByLabelledBy('relations-heading');
      expect(relationsSection).toBeInTheDocument();
      
      // Check spouse
      const spouseChip = screen.getByRole('button', { name: /view jane doe details/i });
      expect(spouseChip).toBeInTheDocument();
      
      // Check child
      const childChip = screen.getByRole('button', { name: /view alice doe details/i });
      expect(childChip).toBeInTheDocument();
    });

    it('handles navigation correctly', async () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Test back button
      const backButton = screen.getByRole('button', { name: /back to family tree/i });
      fireEvent.click(backButton);
      expect(mockPush).toHaveBeenCalledWith('/v2/view');

      // Test relation navigation
      const spouseChip = screen.getByRole('button', { name: /view jane doe details/i });
      fireEvent.click(spouseChip);
      expect(mockPush).toHaveBeenCalledWith('/v2/members/member-2');
    });

    it('handles action buttons correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Test edit button
      const editButton = screen.getByRole('button', { name: /edit john doe/i });
      fireEvent.click(editButton);
      expect(consoleSpy).toHaveBeenCalledWith('Edit member:', 'member-1');

      // Test delete button
      const deleteButton = screen.getByRole('button', { name: /delete john doe/i });
      fireEvent.click(deleteButton);
      expect(consoleSpy).toHaveBeenCalledWith('Delete member:', 'member-1');

      consoleSpy.mockRestore();
    });
  });

  describe('Invalid Member ID', () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: 'non-existent' });
    });

    it('renders member not found error when member does not exist', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      expect(screen.getByRole('heading', { name: /member not found/i })).toBeInTheDocument();
      expect(screen.getByText(/the requested family member could not be found/i)).toBeInTheDocument();
      
      const returnButton = screen.getByRole('button', { name: /return to family tree/i });
      expect(returnButton).toBeInTheDocument();
      
      fireEvent.click(returnButton);
      expect(mockPush).toHaveBeenCalledWith('/v2/view');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: 'member-1' });
    });

    it('has proper heading hierarchy', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check heading levels
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Member Detail');

      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s).toHaveLength(3); // About, Contact, Relations

      const h3s = screen.getAllByRole('heading', { level: 3 });
      expect(h3s.length).toBeGreaterThan(0); // Biography, relation subsections
    });

    it('has proper ARIA landmarks', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main content
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    });

    it('has proper button labels and touch targets', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check button accessibility
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });

      // Check minimum touch target size for key buttons
      const backButton = screen.getByRole('button', { name: /back to family tree/i });
      const editButton = screen.getByRole('button', { name: /edit john doe/i });
      const deleteButton = screen.getByRole('button', { name: /delete john doe/i });
      
      [backButton, editButton, deleteButton].forEach(button => {
        const styles = window.getComputedStyle(button);
        const minHeight = parseInt(styles.minHeight || '0');
        expect(minHeight).toBeGreaterThanOrEqual(32); // Minimum 32px for buttons
      });
    });
  });

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: 'member-1' });
    });

    it('applies responsive classes correctly', () => {
      render(
        <TestWrapper>
          <MemberDetailPageV2 />
        </TestWrapper>
      );

      // Check for responsive classes
      const profileCard = document.querySelector('.profile-card');
      expect(profileCard).toBeInTheDocument();

      const infoGrids = document.querySelectorAll('.info-grid');
      expect(infoGrids.length).toBeGreaterThan(0);

      // Verify CSS classes are applied
      expect(profileCard).toHaveClass('profile-card');
      infoGrids.forEach(grid => {
        expect(grid).toHaveClass('info-grid');
      });
    });
  });

  describe('Member with Missing Data', () => {
    beforeEach(() => {
      // Mock member with minimal data
      const minimalMember: FamilyMember = {
        id: 'member-minimal',
        name: 'Minimal Member',
        gender: '',
        birthDate: '',
        deathDate: null,
        photo: '',
        title: '',
        email: '',
        phone: '',
        address: '',
        biography: '',
        parentId: null,
        spouseIds: [],
        childrenIds: [],
        relationship: '',
        order: 1,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 120 }
      };

      const mockStateWithMinimal = {
        familyTree: {
          id: 'test-tree',
          name: 'Test Family',
          members: [minimalMember]
        }
      };

      (useParams as jest.Mock).mockReturnValue({ id: 'member-minimal' });
      
      // Re-render with minimal member
      render(
        <ToastProvider>
          <FamilyTreeProvider initialState={mockStateWithMinimal}>
            <MemberDetailPageV2 />
          </FamilyTreeProvider>
        </ToastProvider>
      );
    });

    it('handles missing data gracefully with fallback values', () => {
      // Check fallback values are displayed
      expect(screen.getAllByText('—')).toHaveLength(9); // Various missing fields
      expect(screen.getByText('Family Member')).toBeInTheDocument(); // Default relationship
      expect(screen.getByText('No biography available.')).toBeInTheDocument();
    });
  });
});