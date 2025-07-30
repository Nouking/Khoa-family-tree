# AI Development Guide - Family Tree Website

> **Companion to project-goal.md** - This guide provides AI-optimized development instructions with task tracking

## 🎯 **Project Summary**
Build a **Next.js 15 Family Tree Website** with public viewing and authenticated editing.

- **Public**: View, search, export family tree (no auth)
- **Protected**: Add/edit/delete members (auth required)
- **Tech**: Next.js 15 + TypeScript + Tailwind + JWT + JSON storage

## 📋 **Task Status Tracking**

### **Status Legend**
- **Pending**: Not yet started
- **In Progress**: Currently being worked on
- **Completed**: Finished successfully
- **Blocked**: Unable to proceed due to external factors
- **Error**: Task failed with issues that need resolution

### **Task Log Format**
Each task entry includes:
- **Task ID**: Hierarchical identifier (e.g., 1.1, 2.3)
- **Status**: Current task status
- **Agent**: Responsible AI agent/role
- **Issues/Blockers**: Any problems preventing completion
- **Notes**: Additional context or observations

---

## 🏗️ **Tech Stack & Architecture**

```
Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS
UI: Catalyst components + Headless UI
Auth: JWT tokens + bcrypt password hashing
Data: JSON files (family-tree.json + users.json)
Storage: Base64 images embedded in JSON
```

### **File Structure**
```
/app                    # Next.js App Router
  /api                  # API routes
    /auth              # Authentication endpoints
    /family            # Family tree CRUD
  /components           # React components
  /lib                  # Utilities & helpers
/data                   # JSON data storage
  family-tree.json     # Family tree data
  users.json           # User accounts
/types                  # TypeScript definitions
```

---

## 📊 **Core Data Models**

### **Family Member**
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

### **User Account**
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

---

## 🔐 **Authentication Flow**

### **API Endpoints**
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/verify` - Verify JWT token

### **Protection Strategy**
- **Public routes**: All viewing operations
- **Protected routes**: All editing operations (add/edit/delete)
- **Middleware**: JWT verification for protected API routes

---

## 🎨 **UI Components Hierarchy**

```
App Layout
├── Header (login/logout)
├── FamilyTreeView (public)
│   ├── TreeContainer
│   ├── MemberCard
│   ├── ConnectionLines
│   └── SearchFilter
├── EditControls (protected)
│   ├── AddMemberForm
│   ├── EditMemberForm
│   └── DeleteConfirmation
└── Footer
```

### **Key Components to Build**
1. **MemberCard** - Display member info with photo
2. **TreeLayout** - Horizontal tree visualization
3. **AuthForm** - Login form component
4. **MemberForm** - Add/edit member form
5. **SearchBar** - Filter and search functionality

---

## 🚀 **Development Phases with Task Tracking**

### **Phase 1: Foundation** (Priority 1)

**Task 1.1** - Setup Next.js Project  
**Status**: Pending | **Agent**: Setup_Specialist  
**Description**: Setup Next.js 15 + TypeScript + Tailwind  
**Issues/Blockers**: None  
**Notes**: Use latest stable versions

**Task 1.2** - Project Structure  
**Status**: Pending | **Agent**: Setup_Specialist  
**Description**: Create basic file structure and directories  
**Issues/Blockers**: None  
**Notes**: Follow APM file naming conventions

**Task 1.3** - Sample Data Setup  
**Status**: Pending | **Agent**: Data_Specialist  
**Description**: Setup JSON data files with sample family data  
**Issues/Blockers**: None  
**Notes**: Include realistic Vietnamese family data

**Task 1.4** - MemberCard Component  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Build MemberCard component with photo display  
**Issues/Blockers**: None  
**Notes**: Ensure responsive and accessible design

**Task 1.5** - Tree Layout System  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Create horizontal tree layout with connections  
**Issues/Blockers**: None  
**Notes**: Use CSS Grid or Flexbox, add SVG connections

**Task 1.6** - Responsive Design  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Add responsive design for mobile/tablet/desktop  
**Issues/Blockers**: None  
**Notes**: Mobile-first approach with Tailwind breakpoints

---

### **Phase 2: Authentication** (Priority 2)

**Task 2.1** - User Data Setup  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Create users.json with bcrypt hashed passwords  
**Issues/Blockers**: None  
**Notes**: Use minimum 10 salt rounds for bcrypt

**Task 2.2** - Auth API Routes  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Build login/logout/verify API routes (/api/auth/*)  
**Issues/Blockers**: None  
**Notes**: Implement proper error handling and status codes

**Task 2.3** - JWT Token System  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Create JWT token generation and verification  
**Issues/Blockers**: None  
**Notes**: Set appropriate expiration times

**Task 2.4** - Login Form Component  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Build login form component with validation  
**Issues/Blockers**: None  
**Notes**: Include error states and loading indicators

**Task 2.5** - Auth Middleware  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Add authentication middleware for protected routes  
**Issues/Blockers**: None  
**Notes**: Protect all editing endpoints

**Task 2.6** - Logout Functionality  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Implement logout and session cleanup  
**Issues/Blockers**: None  
**Notes**: Clear all client-side tokens and redirect

---

### **Phase 3: CRUD Operations** (Priority 3)

**Task 3.1** - Family API Routes  
**Status**: Pending | **Agent**: API_Developer  
**Description**: Build family member API routes (/api/family/*)  
**Issues/Blockers**: None  
**Notes**: Include proper validation and error handling

**Task 3.2** - Add Member Form  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Create add member form (protected)  
**Issues/Blockers**: Requires Task 2.5 completion  
**Notes**: Include all required family member fields

**Task 3.3** - Edit Member Form  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Create edit member form (protected)  
**Issues/Blockers**: Requires Task 3.2 completion  
**Notes**: Pre-populate form with existing data

**Task 3.4** - Delete Confirmation  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Add delete with confirmation dialog (protected)  
**Issues/Blockers**: None  
**Notes**: Include warning about cascading effects

**Task 3.5** - Photo Upload System  
**Status**: Pending | **Agent**: API_Developer  
**Description**: Implement photo upload with Base64 conversion  
**Issues/Blockers**: None  
**Notes**: Include file size and type validation

**Task 3.6** - Form Validation  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Add comprehensive form validation  
**Issues/Blockers**: None  
**Notes**: Client-side and server-side validation

---

### **Phase 4: Advanced Features** (Priority 4)

**Task 4.1** - Search & Filter  
**Status**: Pending | **Agent**: Feature_Developer  
**Description**: Add search and filter functionality  
**Issues/Blockers**: None  
**Notes**: Include real-time search with highlighting

**Task 4.2** - Drag & Drop  
**Status**: Pending | **Agent**: Feature_Developer  
**Description**: Implement drag & drop reordering  
**Issues/Blockers**: None  
**Notes**: Touch-friendly for mobile devices

**Task 4.3** - Export Functionality  
**Status**: Pending | **Agent**: Feature_Developer  
**Description**: Add JSON/CSV export functionality  
**Issues/Blockers**: None  
**Notes**: Include data integrity validation

**Task 4.4** - Zoom & Pan Controls  
**Status**: Pending | **Agent**: Feature_Developer  
**Description**: Create zoom/pan controls for large trees  
**Issues/Blockers**: None  
**Notes**: Smooth animations and touch gestures

**Task 4.5** - Mobile Optimizations  
**Status**: Pending | **Agent**: UI_Developer  
**Description**: Add mobile-specific optimizations  
**Issues/Blockers**: None  
**Notes**: Focus on touch interactions and performance

**Task 4.6** - Performance Optimization  
**Status**: Pending | **Agent**: Performance_Specialist  
**Description**: Performance optimization for large trees (1000+ members)  
**Issues/Blockers**: None  
**Notes**: Implement virtualization and lazy loading

---

## 📝 **Implementation Checklist with Task IDs**

### **Setup Tasks (Phase 1)**

**Task 1.1.1** - Create Next.js Project  
**Status**: Pending | **Agent**: Setup_Specialist  
**Command**: `npx create-next-app@latest family-tree --typescript --tailwind --app`  
**Issues/Blockers**: None  
**Notes**: Ensure latest stable versions

**Task 1.1.2** - Install Dependencies  
**Status**: Pending | **Agent**: Setup_Specialist  
**Command**: `npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken`  
**Issues/Blockers**: None  
**Notes**: Add to package.json devDependencies for types

**Task 1.2.1** - Create Data Directory  
**Status**: Pending | **Agent**: Setup_Specialist  
**Description**: Create `/data` folder with sample JSON files  
**Issues/Blockers**: None  
**Notes**: Include family-tree.json and users.json templates

**Task 1.2.2** - Setup TypeScript Types  
**Status**: Pending | **Agent**: Setup_Specialist  
**Description**: Setup TypeScript interfaces in `/types`  
**Issues/Blockers**: None  
**Notes**: Create index.ts with all interface definitions

---

### **Core Components (Phase 1 & 3)**

**Task 1.4.1** - MemberCard Component  
**Status**: Pending | **Agent**: UI_Developer  
**File**: `components/MemberCard.tsx`  
**Description**: Display member information with photo  
**Issues/Blockers**: None  
**Notes**: Include hover states and accessibility

**Task 1.5.1** - FamilyTree Container  
**Status**: Pending | **Agent**: UI_Developer  
**File**: `components/FamilyTree.tsx`  
**Description**: Main tree container with layout logic  
**Issues/Blockers**: None  
**Notes**: Handle large tree performance

**Task 2.4.1** - Authentication Form  
**Status**: Pending | **Agent**: UI_Developer  
**File**: `components/AuthForm.tsx`  
**Description**: Login form with validation  
**Issues/Blockers**: Requires Task 2.3 completion  
**Notes**: Include error states and loading

**Task 3.2.1** - Member Management Form  
**Status**: Pending | **Agent**: UI_Developer  
**File**: `components/MemberForm.tsx`  
**Description**: Add/edit member form (protected)  
**Issues/Blockers**: Requires auth system completion  
**Notes**: Include all family member fields

---

### **API Routes (Phase 2 & 3)**

**Task 2.2.1** - Login Endpoint  
**Status**: Pending | **Agent**: Auth_Specialist  
**File**: `app/api/auth/login/route.ts`  
**Description**: JWT login endpoint with bcrypt verification  
**Issues/Blockers**: None  
**Notes**: Include rate limiting consideration

**Task 2.2.2** - Token Verification  
**Status**: Pending | **Agent**: Auth_Specialist  
**File**: `app/api/auth/verify/route.ts`  
**Description**: JWT token verification endpoint  
**Issues/Blockers**: None  
**Notes**: Return user info on valid token

**Task 3.1.1** - Get All Members  
**Status**: Pending | **Agent**: API_Developer  
**File**: `app/api/family/route.ts`  
**Description**: Public endpoint to get all family members  
**Issues/Blockers**: None  
**Notes**: No authentication required

**Task 3.1.2** - Member CRUD Operations  
**Status**: Pending | **Agent**: API_Developer  
**File**: `app/api/family/[id]/route.ts`  
**Description**: Protected CRUD operations for single member  
**Issues/Blockers**: Requires auth middleware (Task 2.5)  
**Notes**: Include proper validation and error handling

---

### **Authentication System (Phase 2)**

**Task 2.3.1** - JWT Token Management  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: JWT token generation and verification utilities  
**Issues/Blockers**: None  
**Notes**: Include refresh token strategy

**Task 2.1.1** - Password Security  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Password hashing with bcrypt (10+ salt rounds)  
**Issues/Blockers**: None  
**Notes**: Store in users.json with proper structure

**Task 2.5.1** - Route Protection  
**Status**: Pending | **Agent**: Auth_Specialist  
**File**: `middleware.ts`  
**Description**: Protected route middleware for editing operations  
**Issues/Blockers**: None  
**Notes**: Protect all POST/PUT/DELETE family endpoints

**Task 2.6.1** - Session Management  
**Status**: Pending | **Agent**: Auth_Specialist  
**Description**: Client-side session management and persistence  
**Issues/Blockers**: None  
**Notes**: Handle token expiration and refresh

---

## 🔧 **Technical Implementation Notes**

### **JSON Data Storage**
```typescript
// Save to JSON file
const saveToFile = async (data: any, filename: string) => {
  await fs.writeFile(`./data/${filename}`, JSON.stringify(data, null, 2));
};

// Load from JSON file
const loadFromFile = async (filename: string) => {
  const data = await fs.readFile(`./data/${filename}`, 'utf8');
  return JSON.parse(data);
};
```

### **Base64 Image Handling**
```typescript
// Convert file to Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};
```

### **Tree Layout Algorithm**
- Use CSS Grid or Flexbox for horizontal layout
- Calculate member positions based on generation level
- Implement connection lines with SVG or CSS borders
- Handle responsive breakpoints for mobile

---

## 🎯 **Key Success Criteria**

### **Functional**
- [ ] Public users can view complete family tree
- [ ] Authenticated users can add/edit/delete members
- [ ] Tree displays correctly on mobile and desktop
- [ ] Search functionality works efficiently
- [ ] Data persists correctly in JSON files

### **Technical**
- [ ] TypeScript with no errors
- [ ] Responsive design with Tailwind CSS
- [ ] Secure authentication with JWT
- [ ] Performance optimized for 1000+ members
- [ ] Accessible UI components

### **User Experience**
- [ ] Intuitive navigation and interactions
- [ ] Fast loading and smooth animations
- [ ] Clear visual hierarchy in family tree
- [ ] Easy member management for authenticated users
- [ ] Seamless login/logout flow

---

## 📚 **Quick Reference**

### **Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # Check TypeScript
```

### **Key Files**
- `data/family-tree.json` - Family tree data
- `data/users.json` - User accounts
- `types/index.ts` - TypeScript definitions
- `lib/auth.ts` - Authentication utilities
- `middleware.ts` - Route protection

### **Environment Variables**
```env
JWT_SECRET=your-secret-key
NODE_ENV=development
```

---

## 📊 **Task Completion Log**

*This section will be updated as tasks are completed*

### **Completed Tasks**
*No tasks completed yet - project in planning phase*

### **In Progress Tasks**
*No tasks currently in progress*

### **Blocked Tasks**
*No tasks currently blocked*

### **Error Tasks**
*No tasks with errors*

---

## 🎯 **Current Project Status**

**Overall Status**: Ready for Phase 1 Development  
**Next Action**: Begin Task 1.1.1 - Setup Next.js project  
**Focus**: Build public viewing first, then add authentication  
**Priority Tasks**: Tasks 1.1.1 through 1.6 (Foundation Phase)

### **Phase Progress**
- **Phase 1 (Foundation)**: 0/6 tasks completed
- **Phase 2 (Authentication)**: 0/6 tasks completed  
- **Phase 3 (CRUD Operations)**: 0/6 tasks completed
- **Phase 4 (Advanced Features)**: 0/6 tasks completed

### **Agent Assignment Overview**
- **Setup_Specialist**: 4 pending tasks (1.1.1, 1.1.2, 1.2.1, 1.2.2)
- **UI_Developer**: 6 pending tasks across phases
- **Auth_Specialist**: 6 pending tasks in Phase 2
- **API_Developer**: 3 pending tasks in Phase 3
- **Data_Specialist**: 1 pending task (1.3)
- **Feature_Developer**: 4 pending tasks in Phase 4
- **Performance_Specialist**: 1 pending task (4.6)

### **Dependencies & Critical Path**
- **Critical**: Tasks 1.1-1.3 must be completed before UI development
- **Blocking**: Authentication tasks (Phase 2) must complete before protected CRUD operations
- **High Priority**: Public viewing features (Phase 1) for MVP demonstration

---

**Project Status**: ✅ Ready for AI-Assisted Development  
**Timeline**: 4-5 weeks with prioritized phases  
**Success Metrics**: All tasks completed with proper status tracking