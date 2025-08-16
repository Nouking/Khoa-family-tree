import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MemberBannerV2 from '../MemberBannerV2';
import { FamilyMember } from '@/types';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
}));

// Test data
const mockMember: FamilyMember = {
  id: 'member-1',
  name: 'John Doe',
  gender: 'male',
  birthDate: '1980-01-15',
  deathDate: '2023-05-20',
  photo: 'https://example.com/photo.jpg',
  title: 'Senior Developer',
  email: 'john@example.com',
  phone: '+1234567890',
  address: '123 Main St',
  biography: 'A dedicated professional.',
  parentId: null,
  spouseIds: ['member-2'],
  childrenIds: ['member-3'],
  relationship: 'Father',
  order: 1,
  position: { x: 100, y: 100 },
  size: { width: 200, height: 120 }
};

const minimalMember: FamilyMember = {
  id: 'member-minimal',
  name: 'Jane Smith',
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

describe('MemberBannerV2', () => {
  describe('Complete Member Data', () => {
    it('renders member banner with all information', () => {
      render(<MemberBannerV2 member={mockMember} />);

      // Check profile photo
      const photo = screen.getByRole('img', { name: /john doe profile photo/i });
      expect(photo).toBeInTheDocument();
      expect(photo).toHaveAttribute('src', 'https://example.com/photo.jpg');

      // Check name in ribbon
      expect(screen.getByText('John Doe')).toBeInTheDocument();

      // Check relationship badge
      expect(screen.getByText('Father')).toBeInTheDocument();

      // Check title
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();

      // Check gender
      expect(screen.getByText('male')).toBeInTheDocument();

      // Check dates
      expect(screen.getByText('Born 1980-01-15 • Died 2023-05-20')).toBeInTheDocument();
    });

    it('applies correct CSS classes for styling', () => {
      const { container } = render(<MemberBannerV2 member={mockMember} />);

      // Check main container classes
      const section = container.querySelector('section');
      expect(section).toHaveClass('panel', 'p-3');

      // Check profile card structure
      const profileCard = container.querySelector('.profile-card');
      expect(profileCard).toBeInTheDocument();

      const profileMeta = container.querySelector('.profile-meta');
      expect(profileMeta).toBeInTheDocument();

      // Check ribbon and badge classes
      const ribbon = container.querySelector('.ribbon.ribbon-peach');
      expect(ribbon).toBeInTheDocument();

      const badge = container.querySelector('.badge');
      expect(badge).toBeInTheDocument();

      // Check label chips
      const labelChips = container.querySelectorAll('.label-chip');
      expect(labelChips).toHaveLength(2); // Gender and Dates

      // Check value classes
      const values = container.querySelectorAll('.value');
      expect(values.length).toBeGreaterThan(0);
    });

    it('has proper accessibility attributes', () => {
      render(<MemberBannerV2 member={mockMember} />);

      // Check ARIA labelledby
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-labelledby', 'profile-heading');

      // Check heading ID
      const heading = screen.getByText('John Doe');
      expect(heading).toHaveAttribute('id', 'profile-heading');

      // Check photo alt text
      const photo = screen.getByRole('img');
      expect(photo).toHaveAttribute('alt', 'John Doe profile photo');

      // Check icons are present
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });
  });

  describe('Minimal Member Data', () => {
    it('handles missing data gracefully with fallbacks', () => {
      render(<MemberBannerV2 member={minimalMember} />);

      // Check name is still displayed
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();

      // Check fallback relationship
      expect(screen.getByText('Family Member')).toBeInTheDocument();

      // Check no title is displayed (should not show empty title)
      expect(screen.queryByText('Senior Developer')).not.toBeInTheDocument();

      // Check fallback gender and dates
      expect(screen.getAllByText('—')).toHaveLength(2); // Gender and dates
    });

    it('generates placeholder image when no photo provided', () => {
      render(<MemberBannerV2 member={minimalMember} />);

      const photo = screen.getByRole('img');
      expect(photo).toHaveAttribute('src', expect.stringContaining('placehold.co'));
      expect(photo).toHaveAttribute('src', expect.stringContaining('text=JS')); // Initials: Jane Smith
    });
  });

  describe('Date Formatting', () => {
    it('formats birth date only correctly', () => {
      const memberBirthOnly = {
        ...mockMember,
        deathDate: null
      };

      render(<MemberBannerV2 member={memberBirthOnly} />);
      expect(screen.getByText('Born 1980-01-15')).toBeInTheDocument();
    });

    it('formats death date only correctly', () => {
      const memberDeathOnly = {
        ...mockMember,
        birthDate: '',
        deathDate: '2023-05-20'
      };

      render(<MemberBannerV2 member={memberDeathOnly} />);
      expect(screen.getByText('Died 2023-05-20')).toBeInTheDocument();
    });

    it('shows fallback when no dates provided', () => {
      const memberNoDates = {
        ...mockMember,
        birthDate: '',
        deathDate: null
      };

      render(<MemberBannerV2 member={memberNoDates} />);
      expect(screen.getByText('—')).toBeInTheDocument();
    });
  });

  describe('Photo Handling', () => {
    it('uses provided photo URL when available', () => {
      render(<MemberBannerV2 member={mockMember} />);

      const photo = screen.getByRole('img');
      expect(photo).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('generates initials correctly for placeholder', () => {
      const memberMultipleNames = {
        ...minimalMember,
        name: 'Mary Elizabeth Johnson-Smith'
      };

      render(<MemberBannerV2 member={memberMultipleNames} />);

      const photo = screen.getByRole('img');
      expect(photo).toHaveAttribute('src', expect.stringContaining('text=ME')); // First two initials
    });

    it('handles single name for initials', () => {
      const memberSingleName = {
        ...minimalMember,
        name: 'Madonna'
      };

      render(<MemberBannerV2 member={memberSingleName} />);

      const photo = screen.getByRole('img');
      expect(photo).toHaveAttribute('src', expect.stringContaining('text=M'));
    });
  });

  describe('Custom Props', () => {
    it('applies custom className correctly', () => {
      const { container } = render(
        <MemberBannerV2 member={mockMember} className="custom-class" />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass('panel', 'p-3', 'custom-class');
    });

    it('works without custom className', () => {
      const { container } = render(<MemberBannerV2 member={mockMember} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('panel', 'p-3');
      expect(section).not.toHaveClass('custom-class');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive classes applied', () => {
      const { container } = render(<MemberBannerV2 member={mockMember} />);

      // Check for responsive flex classes on chip container
      const chipContainer = container.querySelector('.flex.items-center.gap-4.flex-wrap');
      expect(chipContainer).toBeInTheDocument();

      // Check for responsive flex classes on name/badge container
      const nameContainer = container.querySelector('.flex.items-center.gap-2.flex-wrap');
      expect(nameContainer).toBeInTheDocument();
    });
  });

  describe('Token-Driven Styling', () => {
    it('uses design token classes correctly', () => {
      const { container } = render(<MemberBannerV2 member={mockMember} />);

      // Check key token-driven classes are present
      expect(container.querySelector('.profile-card')).toBeInTheDocument();
      expect(container.querySelector('.profile-meta')).toBeInTheDocument();
      expect(container.querySelector('.ribbon.ribbon-peach')).toBeInTheDocument();
      expect(container.querySelector('.badge')).toBeInTheDocument();
      expect(container.querySelector('.label-chip')).toBeInTheDocument();
      expect(container.querySelector('.value')).toBeInTheDocument();
      expect(container.querySelector('.value-muted')).toBeInTheDocument();
      expect(container.querySelector('.node-photo')).toBeInTheDocument();
    });
  });
});