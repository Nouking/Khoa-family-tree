# Family Tree Design Tool - Project Overview

> **Consolidated Project Documentation** - Master reference for project vision, architecture, and implementation strategy

## 🤖 **AI Summary**
Transform Next.js 15 Family Tree into professional design tool with canvas-based editing, CRUD operations, sharing, and export capabilities for families to visualize and manage genealogical data.

**Core Stack**: Next.js 15 + TypeScript + Tailwind CSS + Canvas UI + JWT auth + JSON storage  
**Key Features**: Interactive canvas, professional toolbar, enhanced member banners, share/export system  
**Architecture**: Frontend-focused with JSON persistence, canvas layout system, React Context state management  
**Development Priority**: Enhanced UI foundation → CRUD operations → Share/Export → Mobile optimization

---

## 📋 **Project Vision & Objectives**

### **Primary Mission**
Transform the current family tree viewer into a **professional design tool** similar to Canva, with an intuitive canvas-based interface that enables families to:

- **🎨 Design**: Interactive canvas with drag-and-drop positioning
- **👥 Manage**: Enhanced member banners with relationship labels and professional styling
- **🔗 Share**: Generate secure shareable URLs with access controls
- **📤 Export**: Multiple formats (CSV data, PNG/JPG images) with quality options
- **💾 Preserve**: Robust data structure with version tracking and auto-save

### **Target Users & Personas**

#### **👴 Family Patriarch (Primary Designer)**
- **Age**: 45-65 | **Tech Level**: Moderate to Advanced
- **Goals**: Create professional family tree visualizations, organize complex family structures
- **Needs**: Canvas-based editing, drag-and-drop positioning, professional export options

#### **👨‍👩‍👧‍👦 Family Members (Viewers)**
- **Age**: 18-80 | **Tech Level**: Basic to Moderate  
- **Goals**: View family history, access shared content, download family information
- **Needs**: Easy viewing through shared links, mobile-optimized interface, export capabilities

#### **📚 Family Historian (Advanced Editor)**
- **Age**: 30-60 | **Tech Level**: Advanced
- **Goals**: Document detailed family stories, create professional visualizations
- **Needs**: Advanced editing features, high-quality exports, collaboration tools

---

## 🏗️ **Technical Architecture**

### **Technology Stack**

```yaml
# Core Framework
Frontend: Next.js 15.4.5 (App Router + Turbopack)
Language: TypeScript 5 (Full type safety)
Styling: Tailwind CSS 4 (Utility-first responsive design)
UI Components: React 19.1.0 (Latest features and hooks)

# Canvas & Interactions  
Drag-and-Drop: React DnD 16.0.1 (Canvas interactions)
Image Export: html2canvas 1.4.1 (Canvas-to-image conversion)
Performance: React Window 1.8.8 (Virtual scrolling for large trees)
Touch Support: React DnD Touch Backend (Mobile interactions)

# Authentication & Security
JWT Handling: jose 6.0.12 (Modern JWT library)
Password Hashing: bcryptjs 3.0.2 (Salt rounds for security)
Route Protection: Next.js middleware (Protected API endpoints)
Session Management: Client-side token storage with validation

# Data Management
Storage: JSON files (Local file-based storage)
  - family-tree-v2.json: Family member data (6 Vietnamese members)
  - users.json: User accounts with bcrypt-hashed passwords
Images: Base64 encoding (Embedded in JSON for portability)
State: React Context + useReducer (Global state with history)

# Development & Testing
Build Tool: Next.js with Turbopack (Fast bundler for development)
Linting: ESLint 9 (Code quality and formatting)
Testing: Jest 29.7.0 + React Testing Library (Comprehensive test coverage)
Type Checking: TypeScript Compiler (Strict mode enabled)
```

### **Enhanced Data Models**

```typescript
// Core Family Tree Structure
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

// Canvas-Ready Member Interface
interface FamilyMember {
  // Identity & Basic Info
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
  
  // Relationship Structure
  parentId?: string;
  spouseIds: string[];
  childrenIds: string[];
  order: number;
  
  // Canvas Design Tool Fields (NEW)
  position: { x: number; y: number };    // Absolute canvas positioning
  size: { width: number; height: number }; // Banner dimensions
  relationship: string;                   // Display label (Father, Mother, etc.)
}

// Canvas Settings & Configuration
interface TreeSettings {
  canvasSize: { width: number; height: number };
  gridEnabled: boolean;
  snapToGrid: boolean;
  theme: 'light' | 'dark';
  layout: 'hierarchical' | 'radial' | 'custom';
}

// User Account Structure
interface User {
  id: string;
  username: string;
  password: string;        // bcrypt hashed
  role: 'editor';
  createdAt: string;
  lastLogin?: string;
}
```

### **Component Architecture**

```
family-tree/app/
├── components/
│   ├── Canvas/                    # Interactive Canvas System
│   │   ├── FamilyTreeCanvas.tsx  # Main canvas container with drag-drop
│   │   ├── MemberBanner.tsx      # Enhanced member display with relationships
│   │   ├── ConnectionLines.tsx   # Dynamic SVG connections (parent-child, spouse)
│   │   ├── CanvasControls.tsx    # Pan/zoom/grid controls
│   │   └── VirtualizedConnections.tsx # Performance-optimized connection rendering
│   ├── Toolbar/                   # Professional Design Tool Interface
│   │   ├── MainToolbar.tsx       # Primary action toolbar (undo/redo/share/export)
│   │   ├── ActionButtons.tsx     # Clustered action controls
│   │   └── UserSection.tsx       # User avatar and settings
│   ├── Modals/                    # CRUD & Management Interfaces
│   │   ├── Modal.tsx             # Base modal with accessibility
│   │   ├── AddMemberModal.tsx    # Create new family members
│   │   ├── EditMemberModal.tsx   # Edit existing members with position controls
│   │   ├── DeleteMemberModal.tsx # Smart deletion with relationship warnings
│   │   ├── BulkDeleteModal.tsx   # Multi-member deletion operations
│   │   └── ShareModal.tsx        # Share link generation
│   ├── Export/                    # Export & Sharing System
│   │   ├── ExportModal.tsx       # Export options interface
│   │   └── ExportOptions.tsx     # Format selection (CSV/PNG)
│   └── Mobile/                    # Touch-Optimized Components
│       ├── MobileActionBar.tsx   # Bottom action bar for mobile
│       └── MobileModals.tsx      # Touch-friendly modal variants
├── contexts/                      # Global State Management
│   └── FamilyTreeContext.tsx     # React Context with useReducer + history
├── lib/                          # Utilities & Business Logic
│   ├── data.ts                   # JSON file operations (CRUD)
│   ├── authMiddleware.ts         # JWT authentication utilities
│   ├── connectionCalculator.ts  # Dynamic connection calculation
│   ├── canvas.ts                 # Canvas operations and utilities
│   ├── export.ts                 # Export functionality (CSV/PNG)
│   └── share.ts                  # Share link generation
└── api/                          # Next.js API Routes
    ├── members/
    │   ├── route.ts              # GET/POST operations
    │   └── [id]/route.ts         # GET/PUT/DELETE single member
    └── auth/
        ├── login/route.ts        # Authentication endpoint
        └── verify/route.ts       # Token validation
```

---

## 📊 **Current Implementation Status**

### **✅ Completed Foundation (Phase 1-2)**

**🎨 Canvas System & UI Foundation**
- ✅ Interactive `FamilyTreeCanvas` with drag-and-drop positioning (react-dnd)
- ✅ Enhanced `MemberBanner` components with relationship labels and professional styling
- ✅ Dynamic `ConnectionLines` with automatic recalculation (parent-child + spouse connections)
- ✅ Professional `MainToolbar` with undo/redo/share/export actions
- ✅ Viewport controls (pan, zoom, reset) with smooth CSS transforms
- ✅ Responsive design optimized for desktop, tablet, and mobile devices

**🔧 CRUD Operations & State Management**
- ✅ Complete API endpoints (`/api/members/*`) with JWT authentication and validation
- ✅ React Context global state management with useReducer and history tracking
- ✅ Comprehensive modal system (Add/Edit/Delete) with accessibility and validation
- ✅ Member selection system with context menus and multi-select support
- ✅ Bulk operations (delete multiple members) with relationship impact analysis
- ✅ Undo/redo history stack with keyboard shortcuts (Ctrl+Z, Ctrl+Y)

**⚡ Performance & Quality**
- ✅ Performance optimization with React.memo, virtualization, and connection caching
- ✅ Comprehensive test coverage (Jest + React Testing Library)
- ✅ TypeScript strict mode with full type safety
- ✅ Form validation with real-time feedback and accessibility compliance
- ✅ Mobile touch optimization with gesture support

### **⏳ Planned Features (Phase 3-4)**

**🔗 Share & Export System**
- Share link generation with secure access controls
- CSV export with comprehensive data fields
- PNG/JPG image export with quality settings
- Watermarking options for exported content

**📱 Mobile Experience Enhancement** 
- Touch-optimized interface with pinch-to-zoom gestures
- Mobile-specific action bar with large touch targets
- Offline editing capabilities with sync
- Progressive Web App features

---

## 🚀 **Development Phases & Implementation Strategy**

### **Phase 1: Enhanced UI Foundation** ✅ **COMPLETED**
**Timeline**: Week 1 | **Priority**: CRITICAL  
**Goal**: Transform basic viewer into canvas-based design tool

**Key Achievements**:
- Interactive canvas with drag-and-drop member positioning
- Professional toolbar with essential design actions
- Enhanced member banners with relationship labels
- Viewport controls (pan/zoom) with smooth interactions

### **Phase 2: CRUD Operations & State Management** ✅ **COMPLETED**  
**Timeline**: Week 2 | **Priority**: CRITICAL  
**Goal**: Professional editing capabilities with history tracking

**Key Achievements**:
- Complete API endpoints with JWT authentication
- React Context global state with undo/redo history
- Comprehensive modal system for member management
- Performance optimization for large family trees

### **Phase 3: Share & Export** 🔄 **IN PROGRESS**
**Timeline**: Week 3 | **Priority**: HIGH  
**Goal**: Comprehensive sharing and export capabilities

**Current Tasks**:
- Share link system with secure URL generation
- CSV export with customizable field selection  
- PNG image export with canvas capture
- Export options modal with quality settings

### **Phase 4: Mobile Experience** ⏳ **PENDING**
**Timeline**: Week 4 | **Priority**: HIGH  
**Goal**: Touch-optimized design tool for mobile devices

**Planned Features**:
- Touch-friendly drag-and-drop interactions
- Mobile action bar with large touch targets
- Pinch-to-zoom and swipe gestures
- Mobile-optimized modals and forms

---

## 🎯 **Success Criteria & Quality Standards**

### **Functional Requirements**
- **✅ Canvas Design Tool**: Interactive drag-and-drop with professional toolbar
- **✅ Member Management**: Complete CRUD operations with validation
- **✅ State History**: Undo/redo functionality for all operations
- **⏳ Share System**: Generate and validate shareable URLs
- **⏳ Export Capabilities**: CSV data and high-quality image exports
- **⏳ Mobile Experience**: Touch-optimized interface with gesture support

### **Performance Standards**
- **✅ Canvas Operations**: Smooth 30+ FPS during pan/zoom/drag operations
- **✅ Large Trees**: Support 100+ members with virtualization
- **✅ Responsive Design**: Optimized experience on all device sizes
- **✅ Memory Management**: Efficient state handling with cleanup
- **✅ Loading Performance**: Under 3 seconds for initial canvas load

### **Technical Quality**
- **✅ TypeScript**: Strict mode with comprehensive type safety
- **✅ Testing**: Jest with React Testing Library coverage
- **✅ Accessibility**: WCAG 2.1 AA compliance with keyboard navigation
- **✅ Security**: JWT authentication with bcrypt password hashing
- **✅ Code Quality**: ESLint enforcement with consistent patterns

---

## 📚 **Documentation & Context Integration**

### **AI-Optimized Documentation Structure**

```
📁 Project Documentation/
├── 📄 PROJECT-OVERVIEW.md        # This master document (consolidated)
├── 📄 IMPROVEMENT-TASK-TRACKING.md # Current improvement tasks
├── 📄 CLAUDE.md                  # AI workflow and development rules
├── 📁 family-tree/docs/          # Technical implementation details
│   ├── 📄 index.md               # Documentation navigation hub
│   ├── 📄 task-tracking.md       # Original development tasks
│   ├── 📄 completed-tasks.md     # Historical implementation archive
│   ├── 📄 implementation-notes.md # Technical details and code examples
│   ├── 📄 success-criteria.md    # Goals and metrics
│   └── 📄 git-workflow.md        # Development procedures
└── 📁 memory-bank/               # AI context and reference materials
    ├── 📄 activeContext.md       # Current project state
    ├── 📄 systemPatterns.md      # Technical patterns and conventions
    └── 📄 progress.md            # Development progress tracking
```

### **Context7 Integration References**

| Technology | Context7 ID | Primary Use Case |
|------------|-------------|------------------|
| **Next.js 15** | `/vercel/next.js` | App Router patterns, API routes, middleware |
| **TypeScript** | `/microsoft/typescript` | Interface design, strict mode configuration |
| **Tailwind CSS** | `/tailwindlabs/tailwindcss` | Component styling, responsive design |
| **React DnD** | `/react-dnd/react-dnd` | Canvas drag-and-drop implementation |
| **html2canvas** | `/niklasvh/html2canvas` | Image export functionality |
| **JWT** | `/auth0/node-jsonwebtoken` | Authentication and security |
| **React Testing** | `/testing-library/react-testing-library` | Component testing patterns |

### **Cross-Reference Navigation**

**Quick Access Links:**
- **Task Management**: @IMPROVEMENT-TASK-TRACKING.md for current epic/task status
- **Development Rules**: @CLAUDE.md for AI workflow and development protocols  
- **Technical Details**: @family-tree/docs/implementation-notes.md for code examples
- **Git Procedures**: @family-tree/docs/git-workflow.md for branch and commit standards
- **Historical Context**: @family-tree/docs/completed-tasks.md for implementation archive

---

## 🔮 **Future Enhancements & Roadmap**

### **Phase 5: Advanced Canvas Features** (Future)
- Multiple simultaneous tree views and layouts
- Advanced animation and transition effects
- Custom member banner templates and themes
- AI-assisted layout suggestions and optimization
- 3D tree visualization with WebGL

### **Phase 6: Collaboration & Real-time** (Future)  
- Real-time collaborative editing with conflict resolution
- Version control and branching for family trees
- Comments and annotations system
- Design history playback and timeline
- Team workspaces with role-based permissions

### **Phase 7: Enterprise Features** (Future)
- Integration with genealogy services (Ancestry.com, FamilySearch)
- Advanced export formats (PDF, GEDCOM, family reports)
- Custom branding and white-label options
- Analytics and usage insights
- API for third-party integrations

---

## 📋 **Quick Reference & Commands**

### **Development Workflow**
```bash
# Setup & Development
cd family-tree/                    # Always work from app directory
npm install                        # Install dependencies
npm run dev                        # Start development server
npm run build                      # Production build
npm run type-check                 # TypeScript validation

# Testing & Quality
npm test                           # Run unit tests
npm test -- --watch               # Watch mode for tests
npm test -- --coverage            # Test coverage report
npm run lint                       # ESLint code quality check

# Git Workflow
git checkout main                  # Switch to main branch
git pull origin main               # Pull latest changes
git checkout -b task{ID}-{desc}    # Create feature branch
git commit -m "type(scope): desc"  # Commit with conventional format
```

### **Project Navigation**
- **🏠 Application**: `http://localhost:3000` (Public family tree view)
- **🔐 Login**: `http://localhost:3000/login` (Editor authentication)
- **👀 Canvas View**: `http://localhost:3000/view` (Interactive design tool)
- **📚 Documentation**: `/family-tree/docs/` (Technical implementation details)
- **🧪 Tests**: `/family-tree/app/components/__tests__/` (Component test suites)

---

*📝 **Document Status**: Master consolidated documentation combining project-goal.md, docs/project-overview.md, and memory-bank context files*  
*🔄 **Last Updated**: 2025-08-08 | Epic 2: Documentation Enhancement*  
*🤖 **AI-Optimized**: Structured for @pm, @po, @sm agent workflows with Context7 integration*