# Style Guide

## Design System

### **Color Palette**
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-900: #1e3a8a;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### **Typography**
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Sizes */
text-xs: 0.75rem;    /* 12px */
text-sm: 0.875rem;   /* 14px */
text-base: 1rem;     /* 16px */
text-lg: 1.125rem;   /* 18px */
text-xl: 1.25rem;    /* 20px */
text-2xl: 1.5rem;    /* 24px */
text-3xl: 1.875rem;  /* 30px */

/* Font Weights */
font-light: 300;
font-normal: 400;
font-medium: 500;
font-semibold: 600;
font-bold: 700;
```

### **Spacing System**
```css
/* Spacing Scale (Tailwind) */
space-0: 0;
space-1: 0.25rem;   /* 4px */
space-2: 0.5rem;    /* 8px */
space-3: 0.75rem;   /* 12px */
space-4: 1rem;      /* 16px */
space-6: 1.5rem;    /* 24px */
space-8: 2rem;      /* 32px */
space-12: 3rem;     /* 48px */
space-16: 4rem;     /* 64px */
```

## Component Design

### **Card Components**
```typescript
// MemberCard component styling
const memberCardClasses = {
  container: `
    bg-white rounded-lg shadow-sm border border-gray-200
    hover:shadow-md transition-shadow duration-200
    p-4 sm:p-6
  `,
  photo: `
    w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover
    border-2 border-gray-200
  `,
  name: `
    text-lg font-semibold text-gray-900 truncate
  `,
  details: `
    text-sm text-gray-600 space-y-1
  `,
  actions: `
    flex space-x-2 mt-4 pt-4 border-t border-gray-100
  `
};
```

### **Button Styles**
```typescript
// Button component variants
const buttonVariants = {
  primary: `
    bg-blue-600 hover:bg-blue-700 text-white
    px-4 py-2 rounded-md font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  `,
  secondary: `
    bg-gray-200 hover:bg-gray-300 text-gray-900
    px-4 py-2 rounded-md font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
  `,
  danger: `
    bg-red-600 hover:bg-red-700 text-white
    px-4 py-2 rounded-md font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
  `,
  ghost: `
    text-gray-600 hover:text-gray-900 hover:bg-gray-100
    px-3 py-2 rounded-md font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
  `
};
```

### **Form Components**
```typescript
// Form input styling
const formClasses = {
  input: `
    w-full px-3 py-2 border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    placeholder-gray-400
  `,
  label: `
    block text-sm font-medium text-gray-700 mb-1
  `,
  error: `
    text-sm text-red-600 mt-1
  `,
  help: `
    text-sm text-gray-500 mt-1
  `
};
```

## Layout Patterns

### **Container Layouts**
```typescript
// Page container
const pageContainer = `
  min-h-screen bg-gray-50
  px-4 sm:px-6 lg:px-8 py-8
`;

// Content container
const contentContainer = `
  max-w-7xl mx-auto
  bg-white rounded-lg shadow-sm
  p-6 sm:p-8
`;

// Tree container
const treeContainer = `
  w-full overflow-auto
  p-4 sm:p-6
  bg-white rounded-lg shadow-sm
`;
```

### **Grid Systems**
```typescript
// Responsive grid patterns
const gridPatterns = {
  // 1 column on mobile, 2 on tablet, 3 on desktop
  responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
  
  // Tree layout grid
  tree: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
  
  // Form layout
  form: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'
};
```

## Interactive Elements

### **Hover States**
```typescript
// Hover effect patterns
const hoverEffects = {
  card: 'hover:shadow-md transition-shadow duration-200',
  button: 'hover:scale-105 transition-transform duration-200',
  link: 'hover:text-blue-600 transition-colors duration-200',
  image: 'hover:opacity-80 transition-opacity duration-200'
};
```

### **Focus States**
```typescript
// Focus ring patterns
const focusRings = {
  default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  error: 'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  success: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
};
```

## Responsive Design

### **Breakpoint System**
```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### **Mobile-First Approach**
```typescript
// Mobile-first responsive patterns
const responsivePatterns = {
  // Text sizes
  text: 'text-sm sm:text-base lg:text-lg',
  
  // Spacing
  padding: 'p-4 sm:p-6 lg:p-8',
  
  // Grid columns
  columns: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  
  // Navigation
  nav: 'flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'
};
```

## Animation Guidelines

### **Transition Durations**
```css
/* Standard transition durations */
duration-75: 75ms;    /* Very fast */
duration-100: 100ms;  /* Fast */
duration-200: 200ms;  /* Normal */
duration-300: 300ms;  /* Slow */
duration-500: 500ms;  /* Very slow */
```

### **Easing Functions**
```css
/* Tailwind easing */
ease-linear: linear;
ease-in: cubic-bezier(0.4, 0, 1, 1);
ease-out: cubic-bezier(0, 0, 0.2, 1);
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## Accessibility Standards

### **WCAG 2.1 AA Compliance**
```typescript
// Accessibility patterns
const accessibilityPatterns = {
  // Focus indicators
  focusVisible: 'focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2',
  
  // Screen reader text
  srOnly: 'sr-only',
  
  // High contrast
  highContrast: 'text-gray-900 bg-white',
  
  // Touch targets
  touchTarget: 'min-h-[44px] min-w-[44px]'
};
```

### **Semantic HTML**
```typescript
// Semantic element usage
const semanticElements = {
  // Navigation
  nav: '<nav role="navigation" aria-label="Main navigation">',
  
  // Main content
  main: '<main role="main" id="main-content">',
  
  // Form labels
  label: '<label for="input-id" class="block text-sm font-medium">',
  
  // Button types
  button: '<button type="button" aria-label="Action description">'
};
```

## Code Style Guidelines

### **CSS Class Organization**
```typescript
// Class ordering (Tailwind CSS)
const classOrder = [
  // Layout
  'block', 'inline', 'flex', 'grid',
  
  // Positioning
  'relative', 'absolute', 'fixed',
  
  // Spacing
  'p-4', 'm-2', 'space-x-4',
  
  // Sizing
  'w-full', 'h-16', 'max-w-md',
  
  // Typography
  'text-lg', 'font-bold', 'text-center',
  
  // Colors
  'bg-white', 'text-gray-900',
  
  // Effects
  'shadow-lg', 'rounded-lg',
  
  // Transitions
  'transition-all', 'duration-200'
];
```

### **Component Structure**
```typescript
// Component file structure
const componentStructure = `
// 1. Imports
import React from 'react';
import { ComponentProps } from './types';

// 2. Interface definition
interface ComponentProps {
  // Props definition
}

// 3. Component definition
export const Component: React.FC<ComponentProps> = ({ props }) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleEvent = () => {};
  
  // 6. Render
  return (
    <div className="component-classes">
      {/* JSX content */}
    </div>
  );
};
`;
```

## Icon Usage

### **Icon Guidelines**
```typescript
// Icon sizing
const iconSizes = {
  xs: 'w-3 h-3',      /* 12px */
  sm: 'w-4 h-4',      /* 16px */
  md: 'w-5 h-5',      /* 20px */
  lg: 'w-6 h-6',      /* 24px */
  xl: 'w-8 h-8',      /* 32px */
  '2xl': 'w-12 h-12'  /* 48px */
};

// Icon colors
const iconColors = {
  primary: 'text-blue-600',
  secondary: 'text-gray-500',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600'
};
```

## Loading States

### **Loading Patterns**
```typescript
// Loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Skeleton loading
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-32"></div>
    <div className="space-y-3 mt-4">
      <div className="bg-gray-200 h-4 rounded"></div>
      <div className="bg-gray-200 h-4 rounded w-5/6"></div>
    </div>
  </div>
);
```

---
*This file contains design system guidelines and coding standards.* 