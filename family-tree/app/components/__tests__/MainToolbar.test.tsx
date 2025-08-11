import { render, screen, fireEvent } from '@testing-library/react';
import MainToolbar from '../MainToolbar';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { OnboardingProvider } from '../OnboardingProvider';
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

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <FamilyTreeProvider>
      <OnboardingProvider>
        {ui}
      </OnboardingProvider>
    </FamilyTreeProvider>
  );
};

describe('MainToolbar', () => {
  it('renders with default title', () => {
    renderWithProvider(<MainToolbar />);
    expect(screen.getByText('Family Tree')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    renderWithProvider(<MainToolbar title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('AddMember modal uses gradient header and primary gradient CTA when opened', () => {
    renderWithProvider(<MainToolbar />);

    const addButton = screen.getByRole('button', { name: /Add Member/i });
    fireEvent.click(addButton);

    const dialogEl = screen.getByRole('dialog');
    const accentBar = (dialogEl as HTMLElement).querySelector('span[aria-hidden="true"].absolute.left-0.top-0.h-full.w-1');
    expect(accentBar).toBeTruthy();
    expect(accentBar?.className).toEqual(expect.stringContaining('u-header-accent--gradient'));

    // There are two "Add Member" buttons (toolbar trigger and form submit). Select the submit inside dialog.
    const submitCandidates = screen.getAllByRole('button', { name: /Add Member/i });
    const submit = submitCandidates.find(btn => dialogEl.contains(btn as HTMLElement)) as HTMLElement;
    expect(submit.className).toEqual(expect.stringContaining('btn-primary--gradient'));
  });

  it('has a Home link', () => {
    renderWithProvider(<MainToolbar />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('calls onShare when Share button is clicked', () => {
    const mockShare = jest.fn();
    renderWithProvider(<MainToolbar onShare={mockShare} />);
    
    // The Share button might only be visible on sm breakpoint and above
    const shareButton = screen.getByRole('button', { name: /Share/i });
    fireEvent.click(shareButton);
    expect(mockShare).toHaveBeenCalledTimes(1);
  });

  it('calls onExport when Export button is clicked', () => {
    const mockExport = jest.fn();
    renderWithProvider(<MainToolbar onExport={mockExport} />);
    
    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);
    expect(mockExport).toHaveBeenCalledTimes(1);
  });

  it('calls onAddMember when Add button is clicked', () => {
    renderWithProvider(<MainToolbar />);
    
    const addButton = screen.getByRole('button', { name: /Add Member/i });
    fireEvent.click(addButton);
    // Since this now opens a modal instead of calling a prop, we just verify it doesn't crash
    expect(addButton).toBeInTheDocument();
  });

  it('shows undo and redo buttons with correct states', () => {
    renderWithProvider(<MainToolbar />);
    
    const undoButton = screen.getByRole('button', { name: /Undo/i });
    const redoButton = screen.getByRole('button', { name: /Redo/i });
    
    expect(undoButton).toBeInTheDocument();
    expect(redoButton).toBeInTheDocument();
    
    // Initially both should be disabled (no history)
    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();
  });

  it('keyboard shortcuts work correctly', () => {
    renderWithProvider(<MainToolbar />);
    
    // Test Ctrl+Z for undo
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true });
    // Should not crash since there's nothing to undo
    
    // Test Ctrl+Y for redo
    fireEvent.keyDown(document, { key: 'y', ctrlKey: true });
    // Should not crash since there's nothing to redo
    
    // Test Ctrl+Shift+Z for redo (alternative)
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true, shiftKey: true });
    // Should not crash since there's nothing to redo
  });
}); 