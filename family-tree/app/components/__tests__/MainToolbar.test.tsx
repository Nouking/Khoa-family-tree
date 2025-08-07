import { render, screen, fireEvent } from '@testing-library/react';
import MainToolbar from '../MainToolbar';
import '@testing-library/jest-dom';

// Mock next/navigation instead of next/router for app router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

describe('MainToolbar', () => {
  it('renders with default title', () => {
    render(<MainToolbar />);
    expect(screen.getByText('Family Tree')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<MainToolbar title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('has a Home link', () => {
    render(<MainToolbar />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('calls onShare when Share button is clicked', () => {
    const mockShare = jest.fn();
    render(<MainToolbar onShare={mockShare} />);
    
    // The Share button might only be visible on sm breakpoint and above
    const shareButton = screen.getByRole('button', { name: /Share/i });
    fireEvent.click(shareButton);
    expect(mockShare).toHaveBeenCalledTimes(1);
  });

  it('calls onExport when Export button is clicked', () => {
    const mockExport = jest.fn();
    render(<MainToolbar onExport={mockExport} />);
    
    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);
    expect(mockExport).toHaveBeenCalledTimes(1);
  });

  it('calls onAddMember when Add button is clicked', () => {
    const mockAddMember = jest.fn();
    render(<MainToolbar onAddMember={mockAddMember} />);
    
    const addButton = screen.getByRole('button', { name: /Add Member/i });
    fireEvent.click(addButton);
    expect(mockAddMember).toHaveBeenCalledTimes(1);
  });

  it('calls onUndo when Undo button is clicked', () => {
    const mockUndo = jest.fn();
    render(<MainToolbar onUndo={mockUndo} />);
    
    const undoButton = screen.getByRole('button', { name: /Undo/i });
    fireEvent.click(undoButton);
    expect(mockUndo).toHaveBeenCalledTimes(1);
  });

  it('calls onRedo when Redo button is clicked', () => {
    const mockRedo = jest.fn();
    render(<MainToolbar onRedo={mockRedo} />);
    
    const redoButton = screen.getByRole('button', { name: /Redo/i });
    fireEvent.click(redoButton);
    expect(mockRedo).toHaveBeenCalledTimes(1);
  });
}); 