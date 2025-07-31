# Technical Context

## Technology Stack

### **Frontend Framework**
- **Next.js 15.4.5**: Latest version with App Router and Turbopack
- **TypeScript 5**: Full type safety throughout the application
- **Tailwind CSS 4**: Utility-first CSS framework for responsive design
- **React 19.1.0**: Latest React features and hooks

### **Canvas & Interaction Libraries**
- **React DnD**: Drag-and-drop functionality for canvas interactions
- **html2canvas**: Canvas-to-image conversion for export functionality
- **React Window**: Virtual scrolling for large family trees
- **Touch Backend**: Mobile touch event handling for React DnD

### **Authentication & Security**
- **JWT (JSON Web Tokens)**: Stateless authentication
- **bcryptjs 3.0.2**: Password hashing with salt rounds
- **jose 6.0.12**: Modern JWT library for token handling
- **Session Management**: Client-side token storage and validation
- **Route Protection**: Middleware for protected API endpoints

### **Data Storage**
- **JSON Files**: Local file-based storage
  - `family-tree.json`: Family member data with 6 Vietnamese family members
  - `users.json`: User account data with bcrypt-hashed passwords
- **Base64 Images**: Photo storage embedded in JSON
- **File System**: Node.js fs module for read/write operations
- **Local Storage**: Client-side caching for canvas state

### **Development Tools**
- **ESLint 9**: Code linting and formatting
- **Tailwind CSS 4**: Latest version with PostCSS integration
- **TypeScript Compiler**: Type checking
- **Next.js Dev Server**: Hot reloading with Turbopack
- **Turbopack**: Fast bundler for development
- **Jest**: Testing framework with comprehensive test coverage

## Architecture Decisions

### **Canvas-Based Approach**
- **Rationale**: Professional design tool interface with interactive editing
- **Benefits**: Intuitive drag-and-drop, precise positioning, visual feedback
- **Trade-offs**: More complex state management, performance considerations

### **JSON File Storage**
- **Advantages**: Simple, portable, version control friendly
- **Limitations**: No concurrent write support, file size limits
- **Mitigation**: Implement proper error handling and validation

### **Base64 Image Storage**
- **Advantages**: No external storage dependencies
- **Disadvantages**: Increased JSON file size
- **Optimization**: Image compression before Base64 conversion

### **JWT Authentication**
- **Advantages**: Stateless, scalable, secure
- **Implementation**: Server-side token generation and validation
- **Security**: Proper expiration and refresh token strategy

## File Structure

```
/app                    # Next.js App Router
  /api                  # API routes (planned)
    /auth              # Authentication endpoints
      /login/route.ts  # POST login
      /logout/route.ts # POST logout  
      /verify/route.ts # GET token verification
    /family            # Family tree CRUD
      /route.ts        # GET all members
      /[id]/route.ts   # GET/PUT/DELETE single member
  /components           # React components
    Canvas/            # Canvas-based components
      FamilyTreeCanvas.tsx
      MemberBanner.tsx
      ConnectionLines.tsx
      CanvasControls.tsx
    Toolbar/           # Professional toolbar
      MainToolbar.tsx
      ActionButtons.tsx
      UserSection.tsx
    Modals/            # Modal components
      AddMemberModal.tsx
      EditMemberModal.tsx
      DeleteConfirmModal.tsx
      ShareModal.tsx
    Export/            # Export functionality
      ExportModal.tsx
      ExportOptions.tsx
    Mobile/            # Mobile-specific components
      MobileActionBar.tsx
      MobileModals.tsx
    MemberCard.tsx     # Individual member display (✅ completed, to be enhanced)
    FamilyTree.tsx     # Main tree container (✅ completed, to be replaced)
    TreeConnection.tsx # SVG connection lines (✅ completed, to be enhanced)
    AuthForm.tsx       # Login form (planned)
  /lib                  # Utilities & helpers
    auth.ts            # JWT utilities (planned)
    data.ts            # JSON file operations (✅ completed)
    canvas.ts          # Canvas utilities (planned)
    export.ts          # Export functionality (planned)
    share.ts           # Share link generation (planned)
    crud.ts            # CRUD operations (planned)
  /contexts            # React Context providers
    FamilyTreeContext.tsx
    AuthContext.tsx
  /login               # Login page
    page.tsx           # Login page component (✅ completed)
  /view                # Tree view page
    page.tsx           # Tree view component (✅ completed)
  page.tsx             # Home page (public tree view) (✅ completed)
  layout.tsx           # Root layout with auth context (✅ completed)
  globals.css          # Global styles with Tailwind (✅ completed)
/data                   # JSON data storage
  family-tree.json     # Family tree data (6 members) (✅ completed)
  users.json           # User accounts (✅ completed)
/types                  # TypeScript definitions
  index.ts             # All interface definitions (✅ completed, to be enhanced)
  design-tool.ts       # Enhanced types for canvas system (planned)
middleware.ts          # Route protection (✅ completed)
```

## Data Models

### **Enhanced Family Member Interface**
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
  // New fields for canvas system
  position: { x: number; y: number };
  size: { width: number; height: number };
  relationship: string;     // Father, Mother, Brother, etc.
}
```

### **Canvas State Interface**
```typescript
interface CanvasState {
  members: FamilyMember[];
  selectedMember: string | null;
  viewport: { x: number; y: number; zoom: number };
  connections: Connection[];
  isDragging: boolean;
  dragStart: Position | null;
}

interface Connection {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'parent-child' | 'spouse';
}

interface Position {
  x: number;
  y: number;
}
```

### **User Account Interface**
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

## Current Implementation Status

### **Completed Components**
- ✅ **MemberCard**: Completed with photo display and responsive design
  - Photo display with fallback avatar
  - Responsive design with Tailwind CSS
  - TypeScript interfaces properly integrated
  - Ready for enhancement to MemberBanner

- ✅ **FamilyTree**: Completed with horizontal layout and SVG connections
  - Horizontal tree visualization with generation-based grouping
  - SVG connection lines for family relationships
  - Responsive container with horizontal scrolling
  - Integration with MemberCard component
  - Foundation for canvas implementation

- ✅ **TreeConnection**: Completed SVG connection component
  - Parent-child and spouse relationship connections
  - Different stroke colors and styles for relationship types
  - Proper SVG positioning and rendering
  - Ready for canvas enhancement

- ✅ **Data Utilities**: Complete CRUD operations
  - Load and save family tree data
  - Add, update, delete family members
  - User authentication data management
  - Proper error handling and validation

### **Planned Components**
- ⏳ **FamilyTreeCanvas**: Interactive canvas with drag-and-drop positioning
- ⏳ **MemberBanner**: Enhanced member cards with relationship labels
- ⏳ **MainToolbar**: Professional design tool header
- ⏳ **Modal Components**: Add/edit/delete member modals
- ⏳ **Export Components**: CSV and image export functionality
- ⏳ **Mobile Components**: Touch-optimized interface

## Performance Considerations

### **Large Tree Handling**
- **Virtualization**: Implement virtual scrolling for 100+ members
- **Lazy Loading**: Load member details on demand
- **Image Optimization**: Compress photos before Base64 conversion
- **Caching**: Client-side caching of canvas state
- **Throttling**: Throttle canvas operations during drag

### **Canvas Performance**
- **60fps Rendering**: Smooth canvas operations and animations
- **Efficient Re-renders**: Minimize unnecessary component updates
- **Memory Management**: Efficient canvas state management
- **Touch Optimization**: Responsive touch interactions
- **Connection Optimization**: Efficient connection recalculation

### **Mobile Performance**
- **Touch Optimization**: Large touch targets for mobile
- **Responsive Images**: Optimize photo sizes for different screens
- **Smooth Scrolling**: CSS optimizations for mobile scrolling
- **Memory Management**: Efficient component rendering
- **Gesture Support**: Pinch-to-zoom and swipe gestures

## Security Measures

### **Authentication Security**
- **Password Hashing**: bcrypt with minimum 10 salt rounds
- **JWT Security**: Proper expiration and validation
- **Route Protection**: Middleware for all editing operations
- **Input Validation**: Server-side validation for all data

### **Data Security**
- **File Operations**: Proper error handling and rollback
- **XSS Prevention**: Sanitize all user inputs
- **CSRF Protection**: Token-based protection for mutations
- **Error Handling**: Secure error messages without data leakage

## Development Environment

### **Required Dependencies**
```json
{
  "dependencies": {
    "next": "15.4.5",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "bcryptjs": "3.0.2",
    "jsonwebtoken": "9.0.2",
    "jose": "6.0.12",
    "react-dnd": "16.0.1",
    "react-dnd-html5-backend": "16.0.1",
    "react-dnd-touch-backend": "16.0.1",
    "html2canvas": "1.4.1",
    "react-window": "1.8.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "2.4.6",
    "@types/jsonwebtoken": "9.0.10",
    "@types/node": "20",
    "@types/react": "19",
    "@types/react-dom": "19",
    "typescript": "5",
    "tailwindcss": "4",
    "eslint": "9",
    "jest": "29.7.0",
    "@testing-library/react": "14.2.1",
    "@testing-library/jest-dom": "6.4.2"
  }
}
```

### **Environment Variables**
```env
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Current Sample Data

### **Family Tree Structure**
- **6 Vietnamese family members** with realistic names and relationships
- **Complete family hierarchy** with parents, children, and spouses
- **Proper data validation** against TypeScript interfaces
- **Base64 photo support** ready for implementation
- **Ready for position/size enhancement** for canvas system

### **User Accounts**
- **Bcrypt-hashed passwords** with 12 salt rounds
- **Test accounts** for development and verification
- **Proper user roles** and permissions structure

## Testing Infrastructure

### **Jest Setup**
- **Component Testing**: React Testing Library integration
- **Canvas Testing**: Drag-and-drop testing with React DnD
- **Unit Testing**: Comprehensive test coverage for canvas components
- **Mock Implementation**: Proper mocking for canvas operations
- **Test Patterns**: TDD approach with proper test structure

### **Current Test Coverage**
- ✅ **FamilyTree Component**: Complete test suite with DOM mocking
- ✅ **TreeConnection Component**: SVG rendering tests
- ✅ **MemberCard Component**: Component rendering tests
- ✅ **Data Utilities**: CRUD operation tests

## Current Architecture Status

### **Frontend Components**
- ✅ **FamilyTree**: Horizontal tree layout with SVG connections (foundation for canvas)
- ✅ **TreeConnection**: SVG connection lines for family relationships (to be enhanced)
- ✅ **MemberCard**: Photo display with fallback avatar and responsive design (to become MemberBanner)
- ✅ **Pages**: Home, View, and Login pages with responsive design

### **Backend Infrastructure**
- ✅ **Data Layer**: Complete CRUD operations for family members
- ✅ **File Storage**: JSON-based data storage with error handling
- ✅ **Type Safety**: Full TypeScript integration with proper interfaces
- ✅ **Testing**: Jest setup with comprehensive test coverage

### **Data Models**
- ✅ **FamilyMember**: Complete interface with all required fields (to be enhanced with position/size)
- ✅ **FamilyTree**: Tree structure with metadata
- ✅ **User**: Authentication data with bcrypt hashing
- ✅ **Sample Data**: 6 Vietnamese family members with realistic relationships

## Canvas System Architecture

### **Core Canvas Components**
- **FamilyTreeCanvas**: Main canvas container with drag-and-drop
- **MemberBanner**: Enhanced member cards with relationship labels
- **ConnectionLines**: Dynamic SVG connections for relationships
- **CanvasControls**: Pan, zoom, and grid controls

### **Professional Toolbar**
- **MainToolbar**: Design tool header with essential actions
- **ActionButtons**: Undo/redo, share, export buttons
- **UserSection**: User avatar and settings

### **Modal System**
- **AddMemberModal**: Form for adding new family members
- **EditMemberModal**: Form for editing existing members
- **DeleteConfirmModal**: Confirmation dialog for deletions
- **ShareModal**: Share link generation interface

### **Export System**
- **ExportModal**: Export options interface
- **ExportOptions**: CSV and image export functionality
- **Mobile Export**: Touch-optimized export features

---

*This file contains technical architecture and implementation details for the canvas-based design tool.* 