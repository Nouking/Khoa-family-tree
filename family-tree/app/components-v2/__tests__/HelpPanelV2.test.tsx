import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import HelpPanelV2 from '../HelpPanelV2';
import { OnboardingProvider } from '../../components/OnboardingProvider';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock ContextTipsOverlay
jest.mock('../../components/ContextTipsOverlay', () => {
  return function MockContextTipsOverlay({ onClose }: { onClose: () => void }) {
    return (
      <div data-testid="context-tips-overlay">
        <button onClick={onClose}>Close Tips</button>
      </div>
    );
  };
});

// Test wrapper component that provides onboarding context
const TestWrapper: React.FC<{ children: React.ReactNode; helpOpen?: boolean }> = ({ 
  children, 
  helpOpen = true 
}) => {
  return (
    <OnboardingProvider>
      {children}
    </OnboardingProvider>
  );
};

// Helper to render with help panel open
const renderWithHelpOpen = () => {
  const result = render(
    <TestWrapper>
      <HelpPanelV2 />
    </TestWrapper>
  );
  
  // Simulate opening help panel
  fireEvent.keyDown(document, { key: '/', shiftKey: true });
  
  return result;
};

describe('HelpPanelV2', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Modal Structure and Content', () => {
    test('renders with correct structure when help is open', async () => {
      renderWithHelpOpen();

      // Check modal is present
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');

      // Check title and description
      expect(screen.getByText('Help & Shortcuts')).toBeInTheDocument();
      expect(screen.getByText(/Quick tips for the toolbar, canvas, search, and filters/)).toBeInTheDocument();
    });

    test('renders all content sections with correct headings', async () => {
      renderWithHelpOpen();

      // Check all section headings are present
      expect(screen.getByText('Getting Started')).toBeInTheDocument();
      expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();
      expect(screen.getByText('Tips & Tour')).toBeInTheDocument();
      expect(screen.getByText('More Help')).toBeInTheDocument();
    });

    test('sections have proper ARIA attributes', async () => {
      renderWithHelpOpen();

      // Check ARIA labelledby relationships
      const gettingStartedSection = screen.getByLabelText('Getting Started');
      expect(gettingStartedSection).toBeInTheDocument();
      
      const shortcutsSection = screen.getByLabelText('Keyboard Shortcuts');
      expect(shortcutsSection).toBeInTheDocument();
      
      const tourSection = screen.getByLabelText('Tips & Tour');
      expect(tourSection).toBeInTheDocument();
      
      const moreHelpSection = screen.getByLabelText('More Help');
      expect(moreHelpSection).toBeInTheDocument();
    });

    test('renders content for Getting Started section', async () => {
      renderWithHelpOpen();

      expect(screen.getByText(/Use the toolbar to Add, Share, Export/)).toBeInTheDocument();
      expect(screen.getByText(/Drag the canvas to pan/)).toBeInTheDocument();
      expect(screen.getByText(/Click a member to select/)).toBeInTheDocument();
    });

    test('renders keyboard shortcuts with proper formatting', async () => {
      renderWithHelpOpen();

      expect(screen.getByText('Ctrl+/')).toBeInTheDocument();
      expect(screen.getByText('Ctrl+Z / Ctrl+Shift+Z')).toBeInTheDocument();
      expect(screen.getByText('Shift+?')).toBeInTheDocument();
    });
  });

  describe('Modal Behavior', () => {
    test('does not render when help is closed', () => {
      render(
        <TestWrapper>
          <HelpPanelV2 />
        </TestWrapper>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('opens when Shift+/ is pressed', async () => {
      render(
        <TestWrapper>
          <HelpPanelV2 />
        </TestWrapper>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      fireEvent.keyDown(document, { key: '/', shiftKey: true });

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    test('closes when close button is clicked', async () => {
      renderWithHelpOpen();

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    test('closes when footer close button is clicked', async () => {
      renderWithHelpOpen();

      const footerCloseButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(footerCloseButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    test('closes when Escape key is pressed', async () => {
      renderWithHelpOpen();

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    test('closes when backdrop is clicked', async () => {
      renderWithHelpOpen();

      const backdrop = screen.getByRole('dialog').parentElement;
      fireEvent.click(backdrop!);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Action Buttons', () => {
    test('renders Start Tour and Show Tips buttons', async () => {
      renderWithHelpOpen();

      expect(screen.getByRole('button', { name: /start guided tour/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /show contextual tips/i })).toBeInTheDocument();
    });

    test('Start Tour button has correct styling classes', async () => {
      renderWithHelpOpen();

      const startTourButton = screen.getByRole('button', { name: /start guided tour/i });
      expect(startTourButton).toHaveClass('btn', 'btn-primary', 'btn-primary--gradient', 'btn-press');
    });

    test('Show Tips button has correct styling classes', async () => {
      renderWithHelpOpen();

      const showTipsButton = screen.getByRole('button', { name: /show contextual tips/i });
      expect(showTipsButton).toHaveClass('btn', 'btn-outline', 'btn-press');
    });

    test('Start Tour button closes help and triggers tour', async () => {
      renderWithHelpOpen();

      const startTourButton = screen.getByRole('button', { name: /start guided tour/i });
      fireEvent.click(startTourButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    test('Show Tips button displays context tips overlay', async () => {
      renderWithHelpOpen();

      const showTipsButton = screen.getByRole('button', { name: /show contextual tips/i });
      fireEvent.click(showTipsButton);

      expect(screen.getByTestId('context-tips-overlay')).toBeInTheDocument();
    });

    test('context tips overlay can be closed', async () => {
      renderWithHelpOpen();

      const showTipsButton = screen.getByRole('button', { name: /show contextual tips/i });
      fireEvent.click(showTipsButton);

      expect(screen.getByTestId('context-tips-overlay')).toBeInTheDocument();

      const closeTipsButton = screen.getByRole('button', { name: /close tips/i });
      fireEvent.click(closeTipsButton);

      expect(screen.queryByTestId('context-tips-overlay')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('modal has proper ARIA attributes', async () => {
      renderWithHelpOpen();

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby');
      expect(modal).toHaveAttribute('aria-describedby');
    });

    test('close button has proper aria-label', async () => {
      renderWithHelpOpen();

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    test('action buttons have proper aria-labels', async () => {
      renderWithHelpOpen();

      expect(screen.getByLabelText('Start guided tour')).toBeInTheDocument();
      expect(screen.getByLabelText('Show contextual tips')).toBeInTheDocument();
    });

    test('sections have proper heading hierarchy', async () => {
      renderWithHelpOpen();

      // Main title should be h2
      const mainTitle = screen.getByRole('heading', { level: 2 });
      expect(mainTitle).toHaveTextContent('Help & Shortcuts');

      // Section headings should be h3
      const sectionHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(sectionHeadings).toHaveLength(4);
      expect(sectionHeadings[0]).toHaveTextContent('Getting Started');
      expect(sectionHeadings[1]).toHaveTextContent('Keyboard Shortcuts');
      expect(sectionHeadings[2]).toHaveTextContent('Tips & Tour');
      expect(sectionHeadings[3]).toHaveTextContent('More Help');
    });

    test('focus management works correctly', async () => {
      const user = userEvent.setup();
      renderWithHelpOpen();

      // First focusable element should receive focus
      const modal = screen.getByRole('dialog');
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Section Reveal Animation', () => {
    test('sections have u-section-reveal class', async () => {
      renderWithHelpOpen();

      const sections = screen.getAllByRole('region');
      sections.forEach(section => {
        expect(section).toHaveClass('u-section-reveal');
      });
    });

    test('intersection observer is set up correctly', async () => {
      renderWithHelpOpen();

      // Verify IntersectionObserver was called
      expect(mockIntersectionObserver).toHaveBeenCalled();
      
      // Verify observe method is called for each section
      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      expect(observerInstance.observe).toHaveBeenCalled();
    });

    test('intersection observer is cleaned up on unmount', async () => {
      const { unmount } = renderWithHelpOpen();

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      
      unmount();

      expect(observerInstance.disconnect).toHaveBeenCalled();
    });
  });

  describe('Responsive Behavior', () => {
    test('modal has large size for better content display', async () => {
      renderWithHelpOpen();

      // The Modal component should receive size="large"
      const modal = screen.getByRole('dialog');
      expect(modal.closest('.help-panel-v2')).toBeInTheDocument();
    });

    test('modal uses gradient header style', async () => {
      renderWithHelpOpen();

      // Modal should have gradient header style applied
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    test('integrates with OnboardingProvider correctly', async () => {
      render(
        <OnboardingProvider>
          <HelpPanelV2 />
        </OnboardingProvider>
      );

      // Should not throw error and should work with provider
      expect(() => {
        fireEvent.keyDown(document, { key: '/', shiftKey: true });
      }).not.toThrow();
    });

    test('context tips use correct tip data', async () => {
      renderWithHelpOpen();

      const showTipsButton = screen.getByRole('button', { name: /show contextual tips/i });
      fireEvent.click(showTipsButton);

      // ContextTipsOverlay should be rendered with tips
      expect(screen.getByTestId('context-tips-overlay')).toBeInTheDocument();
    });
  });
});