'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  className?: string;
  // E11-T2: Presentational style for header accent
  headerStyle?: 'flat' | 'gradient';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = '',
  headerStyle = 'flat'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Mount for enter, keep mounted for exit animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const t = window.setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, shouldRender]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Capture last focused element before opening and return focus on close
  useLayoutEffect(() => {
    if (isOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Prefer focusing first focusable element inside content area, if present
      const content = modalRef.current.querySelector('[data-modal-content]') as HTMLElement | null;
      const containerForQuery = content ?? modalRef.current;
      const focusable = containerForQuery.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      } else {
        // Fallback to close button to ensure focus is trapped inside modal
        const closeBtn = modalRef.current.querySelector('[aria-label="Close modal"]') as HTMLElement | null;
        closeBtn?.focus();
      }
    }
    // Return focus when we transition to closed
    if (!isOpen && lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
      lastActiveElementRef.current = null;
    }
  }, [isOpen]);

  // Focus trap within modal
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (!isOpen || !modalRef.current) return;
      if (e.key !== 'Tab') return;
      const container = modalRef.current;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (active === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleTabKey);
    }
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!shouldRender) return null;

  const sizeClasses = {
    small: 'max-w-[480px]',
    medium: 'max-w-[672px]',
    large: 'max-w-[896px]',
    fullscreen: 'max-w-none w-screen h-screen sm:h-auto sm:w-full'
  };

  return (
    <div
      ref={backdropRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className={`
          bg-(--surface-1) text-(--color-neutral-900) rounded-[var(--radius-lg)] shadow-[var(--elevation-3)] w-full ${sizeClasses[size]}
          max-h-[90vh] overflow-y-auto transform-gpu transition-opacity transition-transform duration-300 ease-out motion-reduce:transition-none
          ${isClosing ? 'opacity-0 translate-y-2 sm:translate-y-0 scale-95' : 'opacity-100 translate-y-0 scale-100'}
          max-sm:w-screen max-sm:h-[100dvh] max-sm:rounded-none
          ${className}
        `}
      >
        {/* Modal Header */}
        <div className={`relative flex items-center justify-between p-6 border-b border-(--color-neutral-100) before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full before:pointer-events-none ${
            headerStyle === 'gradient' ? 'before:u-header-accent--gradient' : 'before:bg-(--color-primary)'
          }`}>
          {/* Optional left accent bar for visual emphasis using tokens */}
          <span aria-hidden="true" className={`absolute left-0 top-0 h-full w-1 rounded-l-[var(--radius-lg)] max-sm:hidden ${
              headerStyle === 'gradient' ? 'u-header-accent--gradient' : 'bg-(--color-primary)'
            }`} />
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-(--color-neutral-500) hover:text-(--color-neutral-700) transition-colors focus-visible:outline-2 focus-visible:outline-(--color-primary) rounded-[var(--radius-sm)] focus-visible:outline-offset-2"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 @container" data-modal-content id="modal-description">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;