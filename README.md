# Family Tree Design Tool

A professional family tree design tool built with Next.js 15, TypeScript, and Tailwind CSS. Transform your family history into beautiful, interactive visualizations with a Canva-like editing experience.

## 🌳 Project Overview

- **Canvas Editor**: Interactive drag-and-drop family tree design
- **Professional Toolbar**: Complete design tools with undo/redo support
- **Multiple Layouts**: Hierarchical, radial, or custom arrangements
- **Share & Export**: Generate shareable links and export to CSV/PNG
- **Auto-save**: Automatic saving with version history
- **Touch Support**: Mobile-optimized interface with gesture controls

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: JWT tokens with bcrypt password hashing
- **Data Storage**: JSON files (family-tree.json + users.json)
- **Image Handling**: Base64 encoded images embedded in JSON

## 🏗️ Project Structure

```
/app                      # Next.js App Router
  /components/          # React components
    /Canvas/           # Canvas-based editor components
      FamilyTreeCanvas.tsx
      MemberBanner.tsx
      ConnectionLines.tsx
      CanvasControls.tsx
    /Toolbar/          # Professional toolbar components
      MainToolbar.tsx
      ActionButtons.tsx
      UserSection.tsx
    /Modals/           # CRUD and sharing modals
      AddMemberModal.tsx
      EditMemberModal.tsx
      ShareModal.tsx
    /Export/           # Export functionality
      ExportModal.tsx
      ExportOptions.tsx
    /Mobile/           # Mobile-specific components
      MobileActionBar.tsx
      MobileModals.tsx
  /lib/                # Utilities & helpers
    canvas.ts         # Canvas operations
    export.ts         # Export functions
    share.ts          # Share functionality
    crud.ts          # Data operations
  page.tsx             # Canvas editor page
/data                  # JSON data storage
  family-tree.json    # Tree data with positions
  users.json         # User accounts
/types                 # TypeScript definitions
  design-tool.ts     # Canvas interfaces
```

## 📊 Core Data Models

### Family Member

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
  // Canvas-specific fields
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

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd family-tree

# Install dependencies
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the family tree visualization.

## 🎨 Design Tool Features

- **Canvas Operations**:
  - Drag-and-drop member positioning
  - Pan and zoom controls
  - Grid system with snap-to-grid
  - Multiple layout options
  
- **Professional Tools**:
  - Undo/redo functionality
  - Auto-save and versioning
  - Share link generation
  - CSV and image export

## 🎯 Success Criteria

- **Functional**: Professional design tool experience with canvas editing
- **Performance**: Smooth handling of 100+ family members
- **Responsive**: Touch-optimized for mobile and tablet
- **Reliable**: Auto-save and data persistence
- **Accessible**: WCAG 2.1 AA compliant with keyboard support

## 📚 Learn More

For detailed implementation notes and technical guidance, see the [documentation](./docs).
