'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';

import '../v2/v2-styles.css';

export interface ContextMenuItemV2 {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger';
}

interface ContextMenuV2Props {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  items: ContextMenuItemV2[];
  className?: string;
}

/**
 * ContextMenuV2 - v2 context menu component with portal rendering and accessibility
 * 
 * Features:
 * - Portal-based rendering for proper z-index management
 * - Automatic viewport boundary detection and positioning
 * - Keyboard navigation support (Escape, Arrow keys)
 * - Permission-based item visibility and states
 * - v2 CSS architecture with token-driven styling
 * - Smooth animations and transitions
 * - ARIA accessibility compliance
 */
const ContextMenuV2: React.FC<ContextMenuV2Props> = ({
  isOpen,
  position,
  onClose,
  items,
  className = ''
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle outside click and keyboard events
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        case 'ArrowDown':
          event.preventDefault();
          focusNextItem();
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusPreviousItem();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          const focusedElement = document.activeElement as HTMLButtonElement;
          if (focusedElement && focusedElement.click) {
            focusedElement.click();
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      // Focus first item when menu opens
      requestAnimationFrame(() => {
        const firstItem = menuRef.current?.querySelector('button:not([disabled])') as HTMLButtonElement;
        if (firstItem) {
          firstItem.focus();
        }
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Viewport positioning adjustment
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      // Adjust X position if menu would overflow right edge
      if (position.x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }

      // Adjust Y position if menu would overflow bottom edge
      if (position.y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }

      // Ensure menu doesn't go off-screen on the left or top
      adjustedX = Math.max(10, adjustedX);
      adjustedY = Math.max(10, adjustedY);

      menu.style.left = `${adjustedX}px`;
      menu.style.top = `${adjustedY}px`;
    }
  }, [isOpen, position]);

  // Keyboard navigation helpers
  const focusNextItem = () => {
    const items = menuRef.current?.querySelectorAll('button:not([disabled])') as NodeListOf<HTMLButtonElement>;
    if (!items || items.length === 0) return;

    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    items[nextIndex].focus();
  };

  const focusPreviousItem = () => {
    const items = menuRef.current?.querySelectorAll('button:not([disabled])') as NodeListOf<HTMLButtonElement>;
    if (!items || items.length === 0) return;

    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    items[previousIndex].focus();
  };

  if (!isOpen) return null;

  const getItemVariantClass = (variant: string = 'default', disabled: boolean = false) => {
    if (disabled) return 'v2-context-menu-item--disabled';
    
    switch (variant) {
      case 'primary':
        return 'v2-context-menu-item--primary';
      case 'danger':
        return 'v2-context-menu-item--danger';
      default:
        return 'v2-context-menu-item--default';
    }
  };

  const menu = (
    <div
      ref={menuRef}
      className={`v2-context-menu ${className}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      role="menu"
      aria-orientation="vertical"
      aria-label="Member actions menu"
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => {
            if (!item.disabled) {
              item.onClick();
              onClose();
            }
          }}
          disabled={item.disabled}
          className={`v2-context-menu-item ${getItemVariantClass(item.variant, item.disabled)}`}
          role="menuitem"
          tabIndex={-1}
          aria-describedby={item.disabled ? `${item.id}-disabled-reason` : undefined}
        >
          {item.icon && (
            <span className="v2-context-menu-item-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="v2-context-menu-item-label">{item.label}</span>
        </button>
      ))}
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(menu, document.body);
  }
  return menu;
};

// Utility function to create standard member context menu items
export const createMemberContextMenuItems = (
  memberId: string,
  memberName: string,
  isAuthenticated: boolean,
  onViewMember: (id: string) => void,
  onEditMember: (id: string) => void,
  onDeleteMember: (id: string) => void
): ContextMenuItemV2[] => {
  const items: ContextMenuItemV2[] = [
    {
      id: 'view',
      label: 'View Member Detail',
      icon: <Eye size={16} />,
      onClick: () => onViewMember(memberId),
      variant: 'default'
    }
  ];

  if (isAuthenticated) {
    items.push(
      {
        id: 'edit',
        label: 'Edit Member',
        icon: <Edit size={16} />,
        onClick: () => onEditMember(memberId),
        variant: 'primary'
      },
      {
        id: 'delete',
        label: 'Delete Member',
        icon: <Trash2 size={16} />,
        onClick: () => onDeleteMember(memberId),
        variant: 'danger'
      }
    );
  }

  return items;
};

export default ContextMenuV2;