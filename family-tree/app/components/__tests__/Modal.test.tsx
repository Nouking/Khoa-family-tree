import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    // Reset body overflow style
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    // Clean up body overflow style
    document.body.style.overflow = 'unset';
  });

  it('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Modal content');
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('sets body overflow to hidden when modal is open', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="small">
        <div>Modal content</div>
      </Modal>
    );

    let modalContent = screen.getByRole('dialog').firstChild as HTMLElement;
    expect(modalContent).toHaveClass('max-w-[480px]');

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="medium">
        <div>Modal content</div>
      </Modal>
    );

    modalContent = screen.getByRole('dialog').firstChild as HTMLElement;
    expect(modalContent).toHaveClass('max-w-[672px]');

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="large">
        <div>Modal content</div>
      </Modal>
    );

    modalContent = screen.getByRole('dialog').firstChild as HTMLElement;
    expect(modalContent).toHaveClass('max-w-[896px]');

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="fullscreen">
        <div>Modal content</div>
      </Modal>
    );

    modalContent = screen.getByRole('dialog').firstChild as HTMLElement;
    expect(modalContent).toHaveClass('w-screen');
  });

  it('applies custom className', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={mockOnClose} 
        title="Test Modal" 
        className="custom-modal-class"
      >
        <div>Modal content</div>
      </Modal>
    );

    const modalContent = screen.getByRole('dialog').firstChild as HTMLElement;
    expect(modalContent).toHaveClass('custom-modal-class');
  });

  it('has proper accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');

    const title = screen.getByText('Test Modal');
    expect(title).toHaveAttribute('id', 'modal-title');
  });

  it('focuses first focusable element when opened', async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <button>First button</button>
        <button>Second button</button>
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByText('First button')).toHaveFocus();
    });
  });
});