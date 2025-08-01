# Project Overview

> **Project Transformation** - Converting basic family tree viewer into professional design tool

## 🎯 Project Summary

Transform the current **Next.js 15 Family Tree** project into a **professional design tool** similar to Canva, with canvas-based editing, CRUD operations, sharing, and export capabilities.

### Core Requirements
- **CRUD Operations**: Add, edit, delete family members via API routes.
- **Share Link**: Generate shareable URLs for family trees.  
- **Export**: CSV and image export functionality.
- **API-based JSON Storage**: Utilize existing Next.js API routes for all data interactions with `family-tree.json`. No external database required.
- **Design Tool UI**: Canvas-based interface with professional toolbar.

## 🏗️ Technical Architecture

### Current State Analysis
**✅ Existing Foundation:**
- Next.js 15 + TypeScript + Tailwind CSS
- Basic family tree visualization with horizontal layout
- MemberCard component with responsive design
- SVG connection lines for parent-child and spouse relationships
- JSON data storage (family-tree.json, users.json)
- Authentication foundation (JWT, bcrypt)
- Responsive design with viewport detection
- Unit tests for key components

**🎯 Target Features:**
- Interactive canvas with drag-and-drop positioning
- Professional toolbar with essential actions (undo/redo, share, export)
- Enhanced member banners with relationship labels
- CRUD operations with modal interfaces
- Share link generation and export functions (CSV, image)
- Mobile-optimized design tool experience with touch interactions
- State management with history for undo/redo
- Dynamic connection recalculation

### New Component Structure

```
app/
├── components/
│   ├── Canvas/
│   │   ├── FamilyTreeCanvas.tsx
│   │   ├── MemberBanner.tsx
│   │   ├── ConnectionLines.tsx
│   │   └── CanvasControls.tsx
│   ├── Toolbar/
│   │   ├── MainToolbar.tsx
│   │   ├── ActionButtons.tsx
│   │   └── UserSection.tsx
│   ├── Modals/
│   │   ├── AddMemberModal.tsx
│   │   ├── EditMemberModal.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   └── ShareModal.tsx
│   ├── Export/
│   │   ├── ExportModal.tsx
│   │   └── ExportOptions.tsx
│   └── Mobile/
│       ├── MobileActionBar.tsx
│       └── MobileModals.tsx
├── lib/
│   ├── canvas.ts
│   ├── export.ts
│   ├── share.ts
│   └── crud.ts
└── types/
    └── design-tool.ts
```

## 📊 Enhanced Data Structure

### Family Tree Data

```typescript
interface FamilyTreeData {
  id: string;
  name: string;
  members: FamilyMember[];
  settings: TreeSettings;
  metadata: {
    created: string;
    lastModified: string;
    version: string;
  };
}

interface TreeSettings {
  canvasSize: { width: number; height: number };
  gridEnabled: boolean;
  snapToGrid: boolean;
  theme: 'light' | 'dark';
  layout: 'hierarchical' | 'radial' | 'custom';
}
```

### Family Member

```typescript
interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate?: string;
  deathDate?: string;
  photo?: string;          // Base64 encoded
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  biography?: string;
  parentId?: string;
  spouseIds: string[];
  childrenIds: string[];
  order: number;
  // New fields for design tool
  position: { x: number; y: number };
  size: { width: number; height: number };
  relationship: string;     // Father, Mother, Brother, etc.
}
```

### User Account

```typescript
interface User {
  id: string;
  username: string;
  password: string;        // bcrypt hashed
  role: 'editor';
  createdAt: string;
  lastLogin?: string;
}
```

## 🛠️ State Management

```typescript
// Use React Context for state management
interface FamilyTreeState {
  members: FamilyMember[];
  selectedMember: string | null;
  isEditing: boolean;
  viewport: ViewportState;
  history: HistoryState; // For undo/redo
  settings: TreeSettings;
}

interface ViewportState {
  x: number;
  y: number;
  zoom: number;
  width: number;
  height: number;
}

interface HistoryState {
  past: FamilyTreeState[];
  present: FamilyTreeState;
  future: FamilyTreeState[];
}
```

## 🔐 Authentication & Data Storage

### Protection Strategy
- **Public routes**: All viewing operations
- **Protected routes**: All editing operations (add/edit/delete)
- **Middleware**: JWT verification for protected API routes

### Data Storage Strategy
```typescript
// Call API to save data, which then writes to JSON file
const saveTreeData = async (data: FamilyTreeData) => {
  try {
    const response = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to save tree data');
    }
  } catch (error) {
    console.error('Error saving data:', error);
    // Fallback to localStorage if API fails
    localStorage.setItem('family-tree-data-backup', JSON.stringify(data));
  }
};
```

## 🎨 UI/UX Design System

### Color Palette
- **Primary**: Purple/blue theme (#6366f1, #8b5cf6)
- **Secondary**: Gray scale (#f8fafc, #e2e8f0, #64748b)
- **Accent**: Green for success (#10b981)
- **Warning**: Orange for warnings (#f59e0b)
- **Error**: Red for errors (#ef4444)

### Typography
- **Headings**: Inter, font-weight 600-700
- **Body**: Inter, font-weight 400-500
- **UI Elements**: Inter, font-weight 500-600

### Component Specifications
- **Member Banners**: 200px × 120px (desktop), 160px × 100px (mobile)
- **Toolbar Height**: 64px (desktop), 56px (mobile)
- **Modal Width**: 480px (desktop), 100% (mobile)
- **Border Radius**: 8px (cards), 4px (buttons)

## 📋 Key Components to Build

1. **Canvas System**
   - FamilyTreeCanvas - Interactive canvas with drag-and-drop
   - ConnectionLines - Dynamic SVG connections
   - CanvasControls - Pan, zoom, grid controls

2. **Toolbar & Actions**
   - MainToolbar - Professional design tool header
   - ActionButtons - Undo/redo, share, export
   - MobileActionBar - Touch-friendly bottom action bar

3. **Member Management**
   - MemberBanner - Enhanced member cards with relationship labels
   - AddMemberModal - Form with relationship selection
   - EditMemberModal - Position and connection management

4. **Share & Export**
   - ShareModal - Generate and copy shareable links
   - ExportOptions - CSV and image export with settings

## 📋 Implementation Timeline

### Week 1: Foundation & Data Structure
- [ ] Update TypeScript interfaces with new fields (position, size, relationship)
- [ ] Create data migration utility for existing family tree data
- [ ] Implement basic canvas component with absolute positioning
- [ ] Add drag-and-drop functionality for member banners

### Week 2: Canvas & UI Enhancement
- [ ] Implement viewport controls (pan, zoom)
- [ ] Enhance member banners with relationship labels
- [ ] Create basic toolbar with essential actions
- [ ] Add undo/redo functionality with history stack

### Week 3: CRUD Operations & State Management
- [ ] Implement React Context for global state management
- [ ] Create modal components for add/edit/delete operations
- [ ] Add member selection and context menu
- [ ] Implement dynamic connection recalculation

### Week 4: Share, Export & Mobile
- [ ] Implement share link generation and modal
- [ ] Add CSV and image export functionality
- [ ] Optimize for mobile with touch interactions
- [ ] Add mobile-specific action bar and gestures

## 🎯 Success Criteria

### Functional Requirements
- [ ] Users can add, edit, delete members seamlessly
- [ ] Generate and share family tree links
- [ ] Export to CSV and PNG formats
- [ ] Works smoothly on mobile devices
- [ ] Handles 100+ members without lag

### Technical Requirements
- [ ] TypeScript with no errors
- [ ] Responsive design with Tailwind CSS
- [ ] Performance optimized for large trees
- [ ] Accessible UI components
- [ ] Cross-browser compatibility

---

*See [Upgrade Plan](./upgrade-plan.md) for detailed implementation guidance and technical specifications.*