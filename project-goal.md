# Family Tree Website - Project Goals

## 🤖 **AI Summary**
**Build a Next.js 15 Family Tree Website** with public viewing and authenticated editing capabilities. 

**Core Tech**: Next.js 15 + TypeScript + Tailwind CSS + JWT authentication + JSON file storage  
**Key Features**: Public family tree viewing, protected member management, horizontal tree layout, search/export functionality  
**Architecture**: Frontend-only with JSON data persistence, Base64 image storage, bcrypt password hashing  
**Priority**: Public viewing first → Authentication system → CRUD operations → Advanced features  

---

## 🎯 **Project Vision**
Create a beautiful, public family tree management tool that allows families to easily visualize, edit, and share their genealogical data with an intuitive, modern interface. The family tree is publicly viewable, while editing requires authentication.

---

## 📋 **Core Objectives**

### **Primary Goal**
Build a comprehensive family tree application using Next.js and Tailwind CSS that enables families to:
- **Visualize** their family structure in an attractive horizontal layout (public access)
- **Manage** family member information with ease (authenticated access)
- **Share** their family tree publicly with relatives
- **Preserve** family history and relationships digitally

### **Secondary Goals**
- Create a responsive, accessible interface that works on all devices
- Provide efficient data management with JSON storage
- Enable easy export and backup of family data
- Support large family trees with thousands of members
- Implement secure authentication for editing operations

---

## 🏗️ **Technical Architecture**

### **Consolidated Tech Stack**
```
Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS
UI Library: Catalyst + Headless UI components
Authentication: JWT tokens + bcrypt password hashing
Data Storage: JSON files (family-tree.json + users.json)
Image Storage: Base64 encoding embedded in JSON
State Management: React hooks + local component state
```

### **File Structure & Naming Conventions**
```
/app                    # Next.js App Router
  /api                  # API routes
    /auth              # Authentication endpoints
      /login/route.ts  # POST login
      /logout/route.ts # POST logout  
      /verify/route.ts # GET token verification
    /family            # Family tree CRUD
      /route.ts        # GET all members
      /[id]/route.ts   # GET/PUT/DELETE single member
  /components           # React components
    FamilyTree.tsx     # Main tree container
    MemberCard.tsx     # Individual member display
    AuthForm.tsx       # Login form
    MemberForm.tsx     # Add/edit member form
  /lib                  # Utilities & helpers
    auth.ts            # JWT utilities
    data.ts            # JSON file operations
  page.tsx             # Home page (public tree view)
  layout.tsx           # Root layout with auth context
/data                   # JSON data storage
  family-tree.json     # Family tree data
  users.json           # User accounts
/types                  # TypeScript definitions
  index.ts             # All interface definitions
middleware.ts          # Route protection
```

### **Authentication & Security Architecture**
- **Public Routes**: All viewing operations (/, /api/family GET)
- **Protected Routes**: All editing operations (/api/family POST/PUT/DELETE)
- **Authentication Flow**: Login → JWT token → Session storage → Route protection
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: JWT tokens with expiration
- **Data Security**: Server-side validation for all mutations

---

## 📊 **Data Structure**

### **Family Tree Data**
```json
{
  "id": "family-tree-1",
  "name": "Lê Family Tree",
  "createdAt": "2024-01-01",
  "updatedAt": "2024-01-01",
  "members": [
    {
      "id": "member-1",
      "name": "Lê Thành Công",
      "gender": "male",
      "birthDate": "1950-01-01",
      "deathDate": null,
      "photo": "base64...",
      "title": "Patriarch",
      "email": "example@email.com",
      "phone": "+1234567890",
      "address": "Hanoi, Vietnam",
      "biography": "Founder of the family...",
      "parentId": null,
      "spouseIds": ["member-2"],
      "childrenIds": ["member-3", "member-4"],
      "order": 1
    }
  ]
}
```

### **User Authentication Data**
```json
{
  "users": [
    {
      "id": "user-1",
      "username": "admin",
      "password": "$2b$10$...", // bcrypt hash
      "role": "editor",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## 🔐 **Authentication & Access Control**

### **Public Access (No Login Required)**
- **View Family Tree**: Browse complete family structure
- **Search Members**: Find family members by name or criteria
- **Export Data**: Download family tree in various formats
- **View Member Details**: Click to see member information
- **Share Links**: Generate shareable URLs for family members

### **Protected Access (Login Required)**
- **Add Members**: Create new family members
- **Edit Members**: Modify existing member information
- **Delete Members**: Remove members with confirmation
- **Reorder Members**: Drag & drop to reorganize family structure
- **Upload Photos**: Add member photos with Base64 conversion

### **User Roles**
- **Public Users**: Can view, search, and export (no authentication)
- **Editor Users**: Can perform all operations (add/edit/delete/reorder)

---

## 🎨 **UI/UX Goals**

### **Visual Design**
- **Layout**: Horizontal compact tree (expandable to other layouts)
- **Design**: Based on provided UI sample with modern improvements
- **Responsive**: Mobile-first, tablet, and desktop support
- **Theme**: Light mode first, dark mode enhancement later

### **User Experience**
- **Intuitive**: Easy-to-use interface for all age groups
- **Fast**: Quick loading and smooth interactions
- **Accessible**: Screen reader friendly and keyboard navigation
- **Public-Friendly**: No barriers to viewing family tree
- **Edit-Prompted**: Smooth transition to login when editing

---

## 🚀 **Development Phases with Implementation Priority**

### **Phase 1: Foundation** (Priority: CRITICAL | Week 1-2)
**Goal**: Create the public family tree view and basic functionality  
**Acceptance Criteria**: Public users can view a complete family tree without authentication

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Setup Next.js + Tailwind + TypeScript project structure
2. **P1-CRITICAL** Create JSON data files with sample family data
3. **P1-CRITICAL** Build MemberCard component with photo display
4. **P1-CRITICAL** Implement horizontal tree layout with CSS Grid/Flexbox
5. **P2-HIGH** Add connection lines between family members (SVG or CSS)
6. **P2-HIGH** Create responsive design for mobile/tablet/desktop
7. **P3-MEDIUM** Add search and filter functionality

**Definition of Done**: 
- [ ] Family tree displays correctly on all screen sizes
- [ ] All family members visible with photos and basic info
- [ ] Tree connections are clear and visually appealing
- [ ] Performance is smooth with 100+ members

### **Phase 2: Authentication System** (Priority: CRITICAL | Week 2-3)
**Goal**: Implement secure authentication for editing operations  
**Acceptance Criteria**: Users can securely log in to access editing features

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Create users.json with bcrypt hashed passwords
2. **P1-CRITICAL** Build login/logout API routes with JWT
3. **P1-CRITICAL** Implement session management and token verification
4. **P1-CRITICAL** Create login form component with validation
5. **P2-HIGH** Add authentication middleware for protected routes
6. **P2-HIGH** Create logout functionality and session cleanup
7. **P3-MEDIUM** Add "Remember me" functionality

**Definition of Done**:
- [ ] Users can log in with username/password
- [ ] JWT tokens are properly generated and validated
- [ ] Protected routes are inaccessible without authentication
- [ ] Session management works across browser refreshes

### **Phase 3: Protected CRUD Operations** (Priority: HIGH | Week 3-4)
**Goal**: Enable secure member management capabilities  
**Acceptance Criteria**: Authenticated users can add/edit/delete family members

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Protect all editing API endpoints with authentication
2. **P1-CRITICAL** Create add member form with all required fields
3. **P1-CRITICAL** Build edit member functionality with pre-populated forms
4. **P1-CRITICAL** Implement delete with confirmation dialog
5. **P2-HIGH** Add photo upload with Base64 conversion
6. **P2-HIGH** Create form validation and error handling
7. **P3-MEDIUM** Add bulk edit capabilities

**Definition of Done**:
- [ ] All CRUD operations work securely for authenticated users
- [ ] Forms include proper validation and error messages
- [ ] Photo uploads convert to Base64 and store correctly
- [ ] Data persists correctly in JSON files

### **Phase 4: Advanced Features** (Priority: MEDIUM | Week 4-5)
**Goal**: Add interactive features and polish the application  
**Acceptance Criteria**: Application feels professional and handles edge cases

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Add drag & drop for reordering siblings
2. **P2-HIGH** Implement zoom and pan controls for large trees
3. **P2-HIGH** Create JSON export/import functionality
4. **P2-HIGH** Add performance optimization for 1000+ members
5. **P3-MEDIUM** Create shareable links for specific family members
6. **P3-MEDIUM** Add family statistics and analytics
7. **P4-LOW** Implement move members between branches

**Definition of Done**:
- [ ] Drag & drop works smoothly on all devices
- [ ] Large trees (1000+ members) load and perform well
- [ ] Export/import maintains data integrity
- [ ] All features work on mobile devices

---

## 🔧 **Feature Requirements**

### **📋 PLANNED Features**

#### **Public Features (No Authentication Required)**
- [ ] **P1-CRITICAL** View complete family tree with horizontal layout
- [ ] **P2-HIGH** Search and filter family members by name/criteria
- [ ] **P2-HIGH** View detailed member information and photos
- [ ] **P2-HIGH** Export family tree data (JSON/CSV formats)
- [ ] **P3-MEDIUM** Share family tree links with read-only access
- [ ] **P1-CRITICAL** Responsive design for all devices

#### **Protected Features (Authentication Required)**
- [ ] **P1-CRITICAL** Add new family members (children, spouses, parents)
- [ ] **P2-HIGH** Edit existing member details (name, photo, contact info, biography)
- [ ] **P2-HIGH** Delete members with soft delete and restore option
- [ ] **P2-HIGH** Upload and manage member photos with Base64 conversion
- [ ] **P3-MEDIUM** Drag & drop reordering of siblings
- [ ] **P3-MEDIUM** Support for multiple spouses per member
- [ ] **P4-LOW** Move members between different family branches

#### **Tree Visualization & Operations**
- [ ] **P1-CRITICAL** Horizontal compact tree layout
- [ ] **P2-HIGH** Connection lines between family members
- [ ] **P3-MEDIUM** Expandable/collapsible family branches
- [ ] **P3-MEDIUM** Zoom and pan controls for large trees
- [ ] **P2-HIGH** Search and filter functionality with highlighting
- [ ] **P3-MEDIUM** Performance optimization for 1000+ members

#### **Data Management & Storage**
- [ ] **P1-CRITICAL** Save/load from JSON files in codebase
- [ ] **P1-CRITICAL** Persist user accounts with secure password storage
- [ ] **P2-HIGH** Export family tree data in multiple formats
- [ ] **P3-MEDIUM** Import/merge family tree data from files
- [ ] **P3-MEDIUM** Backup and restore functionality
- [ ] **P2-HIGH** Data validation and error handling

#### **Authentication & Security**
- [ ] **P1-CRITICAL** JWT-based authentication system
- [ ] **P1-CRITICAL** bcrypt password hashing and validation
- [ ] **P1-CRITICAL** Protected API routes for editing operations
- [ ] **P2-HIGH** Session management across browser refreshes
- [ ] **P2-HIGH** Public read-only mode vs authenticated edit mode
- [ ] **P3-MEDIUM** Shareable links with access control

### **✅ COMPLETED Features**
*This section will be updated as development progresses*

- [ ] *No features completed yet - project in planning phase*

---

## 📱 **User Journey**

### **Public User Flow**
1. **Visit**: Open family tree website (no login required)
2. **Browse**: View horizontal tree layout
3. **Search**: Find specific members quickly
4. **Export**: Download family tree data
5. **Share**: Generate shareable link for family
6. **Edit Attempt**: Click edit → prompted to login

### **Editor User Flow**
1. **Login**: Authenticate to enable editing
2. **Edit**: Add/edit/delete family members
3. **Organize**: Drag & drop to reorder members
4. **Save**: Changes saved to JSON file
5. **Share**: Generate shareable links for family
6. **Export**: Download data for backup

### **Key User Scenarios**
- **Family Patriarch**: Adding new generations and managing the tree
- **Family Member**: Viewing family history and relationships (public)
- **Family Historian**: Documenting biographies and photos (authenticated)
- **Family Organizer**: Reordering and organizing family structure (authenticated)
- **Extended Family**: Viewing family tree without barriers

---

## 🎯 **Success Criteria with Clear Acceptance Criteria**

### **Functional Requirements**

#### **Public Family Tree Viewing**
**Acceptance Criteria:**
- [ ] **Family tree displays correctly** with all members visible in horizontal layout
- [ ] **Tree connections are clear** with visible lines between related members
- [ ] **Member photos display properly** with fallback for missing images
- [ ] **Search functionality works** and filters results in real-time
- [ ] **Export functionality** generates valid JSON/CSV files
- [ ] **Mobile responsive** design works on screens 320px+ wide
- [ ] **Loading performance** under 3 seconds for trees with 500+ members

#### **Authenticated Member Management**
**Acceptance Criteria:**
- [ ] **Login system works securely** with username/password validation
- [ ] **Add member functionality** creates new members with all required fields
- [ ] **Edit member functionality** updates existing members correctly
- [ ] **Delete functionality** removes members with confirmation dialog
- [ ] **Photo upload** converts images to Base64 and stores in JSON
- [ ] **Form validation** prevents invalid data submission
- [ ] **Data persistence** saves all changes to JSON files immediately

#### **User Interface & Experience**
**Acceptance Criteria:**
- [ ] **Intuitive navigation** requires no training for basic viewing
- [ ] **Drag & drop functionality** works on touch and desktop devices
- [ ] **Visual feedback** for all user actions (loading, success, error states)
- [ ] **Error messages** are clear and actionable
- [ ] **Accessibility compliance** passes WCAG 2.1 AA standards
- [ ] **Cross-browser compatibility** works in Chrome, Firefox, Safari, Edge

### **Performance Requirements**

#### **Large Tree Handling**
**Acceptance Criteria:**
- [ ] **1000+ member trees** load within 5 seconds
- [ ] **Smooth scrolling and panning** with no lag on mobile devices
- [ ] **Search results** return within 500ms for any query
- [ ] **Memory usage** stays under 100MB for trees with 1000+ members
- [ ] **Batch operations** (export/import) complete within 10 seconds

#### **Authentication Performance**
**Acceptance Criteria:**
- [ ] **Login process** completes within 2 seconds
- [ ] **Token verification** for protected routes under 100ms
- [ ] **Session persistence** works across browser refreshes
- [ ] **Logout process** clears all session data completely

### **Security & Quality Requirements**

#### **Data Security**
**Acceptance Criteria:**
- [ ] **Password hashing** uses bcrypt with minimum 10 salt rounds
- [ ] **JWT tokens** have proper expiration and validation
- [ ] **Protected API routes** reject unauthorized requests with 401 status
- [ ] **Data validation** prevents XSS and injection attacks
- [ ] **File operations** have proper error handling and rollback

#### **Code Quality**
**Acceptance Criteria:**
- [ ] **TypeScript compliance** with no type errors
- [ ] **ESLint/Prettier** formatting with no warnings
- [ ] **Component testing** for all major UI components
- [ ] **API testing** for all authentication and CRUD endpoints
- [ ] **Error boundaries** handle and display component errors gracefully

---

## 📈 **Future Enhancements**

### **Phase 5: Advanced Features** (Future)
- [ ] Multiple tree layouts (vertical, radial)
- [ ] Timeline view of family history
- [ ] Photo gallery for each member
- [ ] Family event calendar
- [ ] Advanced search with multiple criteria
- [ ] Family statistics and analytics

### **Phase 6: Collaboration** (Future)
- [ ] Multi-user editing with permissions
- [ ] Real-time collaboration
- [ ] Family chat/messaging
- [ ] Family photo sharing
- [ ] Family story contributions

---

## 🎉 **Project Success Metrics**

### **Technical Metrics**
- ✅ Tree renders correctly with 1000+ members
- ✅ All CRUD operations work smoothly for authenticated users
- ✅ Search returns results in <500ms
- ✅ Mobile performance is excellent
- ✅ Data integrity is maintained
- ✅ Authentication system is secure and fast

### **User Experience Metrics**
- ✅ Public users can view family tree without barriers
- ✅ Users can add a new member in <2 minutes (after login)
- ✅ Users can find any member in <10 seconds
- ✅ Users can share tree with family easily
- ✅ Users can export data without issues
- ✅ Login process is smooth and secure

### **Business Metrics**
- ✅ Family adoption rate
- ✅ User engagement (time spent)
- ✅ Feature usage statistics
- ✅ User feedback and satisfaction
- ✅ Public accessibility success

---

## 📋 **Project Deliverables**

### **Code Deliverables**
- [ ] Complete Next.js application with authentication
- [ ] TypeScript type definitions
- [ ] Component library documentation
- [ ] API documentation for authentication
- [ ] Deployment configuration
- [ ] Security documentation

### **Documentation Deliverables**
- [ ] User manual and guides
- [ ] Technical documentation
- [ ] API documentation
- [ ] Deployment instructions
- [ ] Maintenance guide
- [ ] Security guidelines

### **Testing Deliverables**
- [ ] Unit tests for core functions
- [ ] Integration tests for user flows
- [ ] Performance tests for large trees
- [ ] Accessibility tests
- [ ] Cross-browser compatibility tests
- [ ] Security tests for authentication

---

---

## 📋 **AI Development Summary**

### **What's Been Optimized for AI:**
✅ **Concise AI Summary** - Added 4-line technical overview at the top  
✅ **Consolidated Tech Stack** - All technology choices in one clear section  
✅ **Specific File Structure** - Exact file names and folder organization  
✅ **Priority Rankings** - P1-CRITICAL to P4-LOW for all tasks  
✅ **Clear Acceptance Criteria** - Measurable success criteria for each feature  
✅ **Separated Planned vs Completed** - Clear distinction between todo and done  
✅ **Implementation Priority** - CRITICAL/HIGH/MEDIUM/LOW phases  

### **Key AI-Friendly Improvements:**
- **Actionable Tasks** with specific priority levels (P1-P4)
- **Definition of Done** criteria for each development phase
- **Technical Implementation** details with specific technologies
- **Measurable Acceptance Criteria** for all major features
- **Clear File Naming Conventions** for consistent development
- **Structured Task Breakdown** for systematic implementation

---

**Project Status**: Ready for AI-Assisted Development  
**Timeline**: 5 weeks with prioritized phases  
**Next Action**: Begin Phase 1 - Foundation (Setup Next.js + Public Tree View)  
**Priority Order**: Public viewing → Authentication → CRUD Operations → Advanced Features  
**Success Definition**: Beautiful, functional family tree tool with secure editing that families love to use