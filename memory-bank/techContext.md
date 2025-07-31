# Technical Context

## Technology Stack

### **Frontend Framework**
- **Next.js 15.4.5**: Latest version with App Router and Turbopack
- **TypeScript 5**: Full type safety throughout the application
- **Tailwind CSS 4**: Utility-first CSS framework for responsive design
- **React 19.1.0**: Latest React features and hooks

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

### **Development Tools**
- **ESLint 9**: Code linting and formatting
- **Tailwind CSS 4**: Latest version with PostCSS integration
- **TypeScript Compiler**: Type checking
- **Next.js Dev Server**: Hot reloading with Turbopack
- **Turbopack**: Fast bundler for development
- **Jest**: Testing framework with comprehensive test coverage

## Architecture Decisions

### **Frontend-Only Approach**
- **Rationale**: Simplified deployment and maintenance
- **Benefits**: No database setup required, easy to deploy
- **Trade-offs**: Limited concurrent users, no real-time updates

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
    MemberCard.tsx     # Individual member display (✅ completed)
    FamilyTree.tsx     # Main tree container (✅ completed)
    TreeConnection.tsx # SVG connection lines (✅ completed)
    AuthForm.tsx       # Login form (planned)
    MemberForm.tsx     # Add/edit member form (planned)
  /lib                  # Utilities & helpers
    auth.ts            # JWT utilities (planned)
    data.ts            # JSON file operations (✅ completed)
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
  index.ts             # All interface definitions (✅ completed)
middleware.ts          # Route protection (✅ completed)
```

## Data Models

### **Family Member Interface**
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
  - Ready for tree layout integration

- ✅ **FamilyTree**: Completed with horizontal layout and SVG connections
  - Horizontal tree visualization with generation-based grouping
  - SVG connection lines for family relationships
  - Responsive container with horizontal scrolling
  - Integration with MemberCard component

- ✅ **TreeConnection**: Completed SVG connection component
  - Parent-child and spouse relationship connections
  - Different stroke colors and styles for relationship types
  - Proper SVG positioning and rendering

- ✅ **Data Utilities**: Complete CRUD operations
  - Load and save family tree data
  - Add, update, delete family members
  - User authentication data management
  - Proper error handling and validation

### **Planned Components**
- ⏳ **AuthForm**: Login form with validation
- ⏳ **MemberForm**: Add/edit member form
- ⏳ **API Routes**: Authentication and CRUD endpoints

## Performance Considerations

### **Large Tree Handling**
- **Virtualization**: Implement virtual scrolling for 1000+ members
- **Lazy Loading**: Load member details on demand
- **Image Optimization**: Compress photos before Base64 conversion
- **Caching**: Client-side caching of tree data

### **Mobile Performance**
- **Touch Optimization**: Large touch targets for mobile
- **Responsive Images**: Optimize photo sizes for different screens
- **Smooth Scrolling**: CSS optimizations for mobile scrolling
- **Memory Management**: Efficient component rendering

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
    "jose": "6.0.12"
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

### **User Accounts**
- **Bcrypt-hashed passwords** with 12 salt rounds
- **Test accounts** for development and verification
- **Proper user roles** and permissions structure

## Testing Infrastructure

### **Jest Setup**
- **Component Testing**: React Testing Library integration
- **Unit Testing**: Comprehensive test coverage for tree components
- **Mock Implementation**: Proper mocking for DOM measurements
- **Test Patterns**: TDD approach with proper test structure

### **Current Test Coverage**
- ✅ **FamilyTree Component**: Complete test suite with DOM mocking
- ✅ **TreeConnection Component**: SVG rendering tests
- ✅ **MemberCard Component**: Component rendering tests
- ✅ **Data Utilities**: CRUD operation tests

## Current Architecture Status

### **Frontend Components**
- ✅ **FamilyTree**: Horizontal tree layout with SVG connections
- ✅ **TreeConnection**: SVG connection lines for family relationships
- ✅ **MemberCard**: Photo display with fallback avatar and responsive design
- ✅ **Pages**: Home, View, and Login pages with responsive design

### **Backend Infrastructure**
- ✅ **Data Layer**: Complete CRUD operations for family members
- ✅ **File Storage**: JSON-based data storage with error handling
- ✅ **Type Safety**: Full TypeScript integration with proper interfaces
- ✅ **Testing**: Jest setup with comprehensive test coverage

### **Data Models**
- ✅ **FamilyMember**: Complete interface with all required fields
- ✅ **FamilyTree**: Tree structure with metadata
- ✅ **User**: Authentication data with bcrypt hashing
- ✅ **Sample Data**: 6 Vietnamese family members with realistic relationships

---
*This file contains technical architecture and implementation details.* 