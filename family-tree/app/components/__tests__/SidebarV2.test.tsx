import { render, screen, fireEvent } from '@testing-library/react';
import SidebarV2 from '../../v2/components/SidebarV2';
import '@testing-library/jest-dom';

describe('SidebarV2', () => {
  const mockProps = {
    onAddMember: jest.fn(),
    onExport: jest.fn(),
    onHelp: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sidebar with Add, Export, Help buttons only', () => {
    render(<SidebarV2 {...mockProps} />);
    
    // Check that only the expected buttons are present
    expect(screen.getByLabelText('Add Member')).toBeInTheDocument();
    expect(screen.getByLabelText('Export family tree')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
    
    // Verify no Share button (removed per E12-T1 requirements)
    expect(screen.queryByText('Share')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<SidebarV2 {...mockProps} />);
    
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveAttribute('aria-label', 'Sidebar navigation');
    
    // All buttons should be properly labeled
    expect(screen.getByLabelText('Add Member')).toBeInTheDocument();
    expect(screen.getByLabelText('Export family tree')).toBeInTheDocument();
    expect(screen.getByLabelText('Help')).toBeInTheDocument();
  });

  it('calls handlers when buttons are clicked', () => {
    render(<SidebarV2 {...mockProps} />);
    
    fireEvent.click(screen.getByLabelText('Add Member'));
    expect(mockProps.onAddMember).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Export family tree'));
    expect(mockProps.onExport).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Help'));
    expect(mockProps.onHelp).toHaveBeenCalledTimes(1);
  });

  it('uses tokenized styling classes', () => {
    render(<SidebarV2 {...mockProps} />);
    
    const addButton = screen.getByLabelText('Add Member');
    expect(addButton).toHaveClass('btn-primary');
    expect(addButton).toHaveClass('focus-visible:outline-(--color-primary)');
    
    const helpButton = screen.getByLabelText('Help');
    expect(helpButton).toHaveClass('btn-outline');
    expect(helpButton).toHaveClass('focus-visible:outline-(--color-primary)');
  });

  it('has responsive text visibility', () => {
    render(<SidebarV2 {...mockProps} />);
    
    // Text should be hidden on small screens, visible on large
    const addText = screen.getByText('Add');
    expect(addText).toHaveClass('hidden', 'lg:inline');
    
    const exportText = screen.getByText('Export');
    expect(exportText).toHaveClass('hidden', 'lg:inline');
    
    const helpText = screen.getByText('Help');
    expect(helpText).toHaveClass('hidden', 'lg:inline');
  });

  it('includes user avatar section', () => {
    render(<SidebarV2 {...mockProps} />);
    
    // User avatar should be present but hidden on small screens
    const userSection = screen.getByRole('img', { hidden: true });
    expect(userSection.closest('div')).toHaveClass('hidden', 'lg:flex');
  });
});