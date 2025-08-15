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
    
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('flex', 'flex-col', 'gap-2', 'text-xs');
    
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

  it('uses simple button styling', () => {
    render(<SidebarV2 {...mockProps} />);
    
    const addButton = screen.getByLabelText('Add Member');
    expect(addButton).toHaveClass('w-full');
    expect(addButton).toHaveAttribute('data-active', 'true');
    
    const helpButton = screen.getByLabelText('Help');
    expect(helpButton).toHaveClass('w-full');
    expect(helpButton).toHaveAttribute('title', 'Help (Shift+?)');
  });

  it('includes lucide icons', () => {
    render(<SidebarV2 {...mockProps} />);
    
    // Check for lucide icon spans
    const addIcon = screen.getByLabelText('Add Member').querySelector('[data-lucide="plus"]');
    expect(addIcon).toBeInTheDocument();
    
    const exportIcon = screen.getByLabelText('Export family tree').querySelector('[data-lucide="share"]');
    expect(exportIcon).toBeInTheDocument();
    
    const helpIcon = screen.getByLabelText('Help').querySelector('[data-lucide="help-circle"]');
    expect(helpIcon).toBeInTheDocument();
  });
});