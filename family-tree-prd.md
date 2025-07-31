# Product Requirements Document (PRD)
## Family Tree Website - Next.js 15 Application

---

## 🤖 **Executive Summary for AI Development**

**Project**: Next.js 15 Family Tree Website with public viewing and authenticated editing  
**Current Status**: Phase 1 Foundation - 50% Complete (3/6 tasks done)  
**Tech Stack**: Next.js 15 + TypeScript + Tailwind CSS + JWT + JSON storage  
**Priority**: Public tree viewing → Authentication → CRUD operations → Advanced features  

**Key Context**: Vietnamese family tree application with realistic sample data, horizontal layout design, Base64 image storage, and frontend-only architecture using JSON files for persistence.

**⚠️ CRITICAL**: This project requires Next.js 15 async API patterns - see technical architecture section for breaking changes.

---

## 📋 **Product Overview**

### **Vision Statement**
Create a beautiful, accessible family tree management platform that enables Vietnamese families to visualize, manage, and share their genealogical data with an intuitive, modern web interface. The application prioritizes public accessibility while providing secure editing capabilities for authenticated users.

### **Product Goals**
- **Primary**: Enable public family tree viewing without authentication barriers
- **Secondary**: Provide secure member management for authenticated family historians
- **Tertiary**: Support large family trees (1000+ members) with excellent performance
- **Cultural**: Respectfully represent Vietnamese family structures and naming conventions

---

## 🎯 **Target Users & Personas**

### **Primary Users**

#### **Family Patriarch/Matriarch (Editor Role)**
- **Demographics**: Age 45-65, moderate tech skills
- **Goals**: Organize family structure, add new generations, preserve family history
- **Pain Points**: Complex genealogy software, difficult photo management
- **Key Needs**: Simple member addition, photo upload, family organization tools

#### **Family Members (Viewer Role)**
- **Demographics**: Age 18-80, basic to moderate tech skills
- **Goals**: View family history, understand relationships, find relatives
- **Pain Points**: Login barriers, complex navigation, poor mobile experience
- **Key Needs**: Easy viewing, search functionality, mobile accessibility

#### **Family Historians (Editor Role)**
- **Demographics**: Age 30-60, moderate to advanced tech skills
- **Goals**: Document family stories, add detailed biographies, preserve photos
- **Pain Points**: Limited editing capabilities, poor data organization
- **Key Needs**: Rich member profiles, photo management, detailed documentation

---

## 🏗️ **Technical Architecture**

### **Technology Stack**
```
Frontend Framework: Next.js 15 (App Router) ⚠️ ASYNC API BREAKING CHANGES
Language: TypeScript
Styling: Tailwind CSS v4
Authentication: JWT + bcryptjs
Data Storage: JSON files (family-tree.json, users.json)
Image Storage: Base64 encoding embedded in JSON
State Management: React hooks + local component state
Development: ESLint + Next.js dev server
```

### **⚠️ Next.js 15 Breaking Changes - CRITICAL**
```typescript
// BREAKING CHANGE: These APIs are now async in Next.js 15
// cookies(), headers(), draftMode() return Promises
// params and searchParams are Promise-wrapped

// ❌ OLD PATTERN (Next.js 14):
const cookieStore = cookies()
const headersList = headers()
const { slug } = params
const { query } = searchParams

// ✅ NEW PATTERN (Next.js 15):
const cookieStore = await cookies()
const headersList = await headers()
const { slug } = await params
const { query } = await searchParams

// OR use React's use() hook for client components:
import { use } from 'react'
const resolvedParams = use(params)
const { slug } = resolvedParams
```

### **Application Architecture**
```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
├─────────────────────────────────────────────────────────┤
│  React Components (Public View + Protected Editor)      │
│  ├── FamilyTree (Horizontal Layout)                    │
│  ├── MemberCard (Photo + Info Display) ⚠️ PARTIAL     │
│  ├── AuthForm (Login/Logout)                           │
│  └── MemberForm (Add/Edit Members)                     │
├─────────────────────────────────────────────────────────┤
│                     API LAYER                           │
├─────────────────────────────────────────────────────────┤
│  Next.js API Routes (⚠️ ASYNC PATTERNS REQUIRED)       │
│  ├── /api/family (CRUD operations)                     │
│  ├── /api/auth (JWT authentication)                    │
│  └── Middleware (Route protection)                     │
├─────────────────────────────────────────────────────────┤
│                   DATA LAYER                            │
├─────────────────────────────────────────────────────────┤
│  JSON File Storage                                      │
│  ├── family-tree.json (7 Members + Base64 photos) ✅   │
│  └── users.json (Hashed credentials) ✅               │
└─────────────────────────────────────────────────────────┘
```

### **File Structure**
```
/family-tree
├── /app                    # Next.js App Router
│   ├── /api               # API endpoints
│   │   ├── /auth          # Authentication routes
│   │   └── /family        # Family data CRUD
│   ├── /components        # React components
│   │   └── MemberCard.tsx # 🔄 Partially implemented
│   ├── /lib               # Utilities
│   │   ├── auth.ts        # ✅ JWT utilities ready
│   │   └── data.ts        # ✅ JSON operations ready
│   ├── /login             # Login page
│   ├── /view              # Public tree view
│   ├── layout.tsx         # ✅ Root layout
│   └── page.tsx           # ✅ Home page
├── /data                  # JSON storage
│   ├── family-tree.json   # ✅ Vietnamese sample data (7 members)
│   └── users.json         # ✅ User accounts ready
├── /types                 # TypeScript definitions
│   └── index.ts           # ✅ Complete interfaces
└── middleware.ts          # ✅ Route protection setup
```

---

## 📊 **Data Models**

### **Family Member Interface**
```typescript
interface FamilyMember {
  id: string;                    // Unique identifier
  name: string;                  // Full Vietnamese name
  gender: 'male' | 'female' | 'other';
  birthDate?: string;            // ISO date format
  deathDate?: string;            // ISO date format
  photo?: string;               // Base64 encoded image
  title?: string;               // Role in family (e.g., "Patriarch")
  email?: string;               // Contact information
  phone?: string;               // Contact information
  address?: string;             // Current address
  biography?: string;           // Life story and achievements
  parentId?: string;            // Reference to parent
  spouseIds: string[];          // Array of spouse references
  childrenIds: string[];        // Array of children references
  order: number;                // Sibling order for display
}
```

### **User Account Interface**
```typescript
interface User {
  id: string;                   // Unique user identifier
  username: string;             // Login username
  password: string;             // bcrypt hashed password
  role: 'editor';              // Permission level
  createdAt: string;           // Account creation date
  lastLogin?: string;          // Last login timestamp
}
```

### **Current Sample Data Status**
**✅ IMPLEMENTED** - Family tree contains realistic Vietnamese family data:
- **7 family members** across 3 generations (updated from 6 to 7)
- **Patriarch**: Lê Thành Công (born 1950)
- **Matriarch**: Nguyễn Thị Hương (born 1955)
- **Children**: Lê Minh Tuấn, Lê Thị Mai
- **Grandchildren**: Lê Minh Quân, Lê Thị Linh, Lê Văn Đức
- **Relationships**: Complete marriage connections, parent-child hierarchies

---

## 🔐 **Authentication & Security**

### **Authentication Flow**
```
Public User Journey:
Visit Site → View Tree → Search → Export → (Try Edit → Login Required)

Authenticated User Journey:
Login → JWT Token → Protected Routes → CRUD Operations → Auto-logout
```

### **⚠️ Next.js 15 Authentication Patterns**
```typescript
// JWT Token System with Async API
export async function verifyAuth() {
  try {
    // ✅ Next.js 15 pattern
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')
    
    if (!token) {
      throw new Error('No token found')
    }
    
    return jwt.verify(token.value, process.env.JWT_SECRET!)
  } catch (error) {
    throw new Error('Authentication failed')
  }
}

// Protected API Routes
export async function POST(request: NextRequest) {
  try {
    // ✅ Next.js 15 pattern
    const headersList = await headers()
    const authorization = headersList.get('authorization')
    
    if (!authorization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Process authenticated request
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

### **Security Measures**
- **Password Hashing**: bcryptjs with 12 salt rounds
- **JWT Tokens**: 24-hour expiration with proper validation
- **Route Protection**: Middleware guards all editing operations
- **Input Validation**: Server-side validation for all form data
- **XSS Prevention**: Sanitized user inputs and safe HTML rendering
- **CSRF Protection**: Token-based protection for mutations

### **Access Control**
```
Public Routes (No Authentication):
- GET /                    # Home page
- GET /view               # Family tree view
- GET /api/family         # Read family data

Protected Routes (Authentication Required):
- POST /api/family        # Create members
- PUT /api/family/[id]    # Update members
- DELETE /api/family/[id] # Delete members
- All member management operations
```

---

## 🎨 **User Experience Design**

### **Design Principles**
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile Responsive**: Works beautifully on all devices
- **Performance Optimized**: Fast loading for large family trees
- **Culturally Sensitive**: Appropriate for Vietnamese families
- **Public-Friendly**: No barriers to viewing family history

### **User Interface Components**

#### **MemberCard Component** 🔄 *Currently In Development*
```typescript
// ⚠️ IMPLEMENTATION STATUS: Partially complete - needs responsive design
interface MemberCardProps {
  member: FamilyMember;
  onEdit?: (id: string) => void;
  isEditable?: boolean;
}

export const MemberCard: React.FC<MemberCardProps> = async ({
  member,
  onEdit,
  isEditable = false
}) => {
  // Next.js 15 compatible implementation needed
  return (
    <div className="member-card">
      {/* Photo display with fallback avatar */}
      {/* Name and title prominence */}
      {/* Birth/death date display */}
      {/* Click interaction for details */}
      {/* Responsive design for all screens */}
    </div>
  );
};
```

#### **Family Tree Layout** ⏳ *Next Priority - Task 1.5*
```typescript
Features:
- Horizontal compact layout
- Generation-based grouping
- Connection lines between relatives
- Smooth scrolling and panning
- Touch-friendly mobile interactions
- Zoom controls for large trees
```

#### **Search & Filter** ⏳ *Future Implementation*
```typescript
Features:
- Real-time search by name
- Filter by generation, gender, location
- Search result highlighting
- Keyboard navigation support
- Mobile-optimized search interface
```

### **Responsive Design Strategy**
```css
Breakpoints:
- Mobile: 320px - 768px (Touch-optimized)
- Tablet: 768px - 1024px (Hybrid interaction)
- Desktop: 1024px+ (Mouse/keyboard optimized)

Layout Adaptations:
- Mobile: Vertical scrolling tree
- Tablet: Compact horizontal view
- Desktop: Full horizontal layout with zoom
```

---

## 🚀 **Development Roadmap**

### **Current Status: Phase 1 Foundation - 50% Complete**

#### **✅ Completed Tasks (As of Current Status)**
- **Task 1.1**: Next.js 15 project setup with TypeScript and Tailwind CSS
- **Task 1.2**: Complete project structure with app/, data/, types/ directories
- **Task 1.3**: Sample Vietnamese family data with 7 members and realistic relationships

#### **🔄 In Progress**
- **Task 1.4**: MemberCard component (partially implemented, needs completion)

#### **📋 Upcoming Phase 1 Tasks**
- **Task 1.5**: Tree layout system with horizontal design and connection lines
- **Task 1.6**: Responsive design implementation for all devices

### **Phase 2: Authentication System** ⏳ *Pending*
**Timeline**: Week 2-3 | **Priority**: Critical | **Dependencies**: Phase 1 complete

#### **⚠️ Next.js 15 Migration Required**
All authentication code must be updated for Next.js 15 async patterns before implementation.

#### **Tasks**
1. **User Data Setup**: ✅ COMPLETE - users.json with bcrypt hashed passwords
2. **Auth API Routes**: Build /api/auth/login, /api/auth/logout, /api/auth/verify (⚠️ async patterns)
3. **JWT Token System**: Implement token generation and validation (⚠️ async cookies)
4. **Login Form Component**: Build login form with validation and error handling
5. **Auth Middleware**: Protect editing routes with authentication checks (⚠️ async headers)
6. **Logout Functionality**: Complete session cleanup and token management

#### **⚠️ Next.js 15 Migration Notes**
```typescript
// Required pattern for auth routes:
export async function POST(request: NextRequest) {
  const cookieStore = await cookies()  // ⚠️ MUST await
  const body = await request.json()
  
  // Authentication logic
  
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
}
```

#### **Acceptance Criteria**
- [ ] Users can login with username/password (✅ users.json ready)
- [ ] JWT tokens are generated and validated properly (⚠️ needs async update)
- [ ] Protected routes reject unauthorized access
- [ ] Session persists across browser refreshes
- [ ] Logout clears all authentication data

### **Phase 3: CRUD Operations** ⏳ *Pending*
**Timeline**: Week 3-4 | **Priority**: High | **Dependencies**: Phase 2 complete

#### **Tasks**
1. **Protected API Endpoints**: Secure all family data mutations (⚠️ async auth checks)
2. **Add Member Form**: Complete form with all fields and validation
3. **Edit Member Functionality**: Pre-populated forms with update capability
4. **Delete with Confirmation**: Safe deletion with confirmation dialogs
5. **Photo Upload System**: Base64 conversion and storage (✅ pattern established)
6. **Form Validation**: Client and server-side validation

#### **Acceptance Criteria**
- [ ] Authenticated users can add new family members
- [ ] All member information can be edited and updated
- [ ] Members can be safely deleted with confirmation
- [ ] Photos upload and convert to Base64 properly (✅ pattern ready)
- [ ] All changes persist to JSON files immediately (✅ data layer ready)

### **Phase 4: Advanced Features** ⏳ *Pending*
**Timeline**: Week 4-5 | **Priority**: Medium | **Dependencies**: Phase 3 complete

#### **Tasks**
1. **Search & Filter System**: Real-time search with multiple criteria
2. **Export Functionality**: JSON and CSV export options
3. **Drag & Drop Reordering**: Reorder siblings and family structure
4. **Performance Optimization**: Handle 1000+ members efficiently
5. **Zoom & Pan Controls**: Navigate large family trees easily
6. **Shareable Links**: Generate URLs for specific family members

---

## 📋 **Functional Requirements**

### **Public Features (No Authentication Required)**

#### **Family Tree Viewing** 
**Priority**: P1-Critical | **Status**: 🔄 In Development (Task 1.4-1.6)
- [ ] Display complete family tree in horizontal layout
- [ ] Show all member photos with fallback avatars
- [ ] Display member names, titles, and birth/death dates
- [ ] Connection lines showing family relationships
- [ ] Smooth scrolling and navigation
- [ ] Responsive design for all devices

#### **Member Search & Discovery**
**Priority**: P2-High | **Status**: ⏳ Pending
- [ ] Real-time search by member name
- [ ] Filter by generation, gender, birth year
- [ ] Search result highlighting in tree view
- [ ] Keyboard navigation support
- [ ] Mobile-optimized search interface

#### **Data Export**
**Priority**: P2-High | **Status**: ⏳ Pending  
- [ ] Export family tree as JSON file
- [ ] Export member list as CSV file
- [ ] Include photos in exported data (✅ Base64 ready)
- [ ] Maintain data integrity during export
- [ ] Progress indicators for large exports

### **Protected Features (Authentication Required)**

#### **Member Management**
**Priority**: P1-Critical | **Status**: ⏳ Pending Phase 2
- [ ] Add new family members with all details
- [ ] Edit existing member information
- [ ] Delete members with confirmation dialog
- [ ] Upload and manage member photos (✅ Base64 pattern ready)
- [ ] Set relationships (parents, spouses, children)
- [ ] Reorder siblings within families

#### **Family Structure Management**
**Priority**: P2-High | **Status**: ⏳ Pending
- [ ] Add marriage relationships between members
- [ ] Manage multiple spouses per member
- [ ] Create parent-child relationships
- [ ] Reorder children within families
- [ ] Move members between family branches

---

## ⚡ **Performance Requirements**

### **Loading Performance**
- **Initial Page Load**: < 3 seconds for home page
- **Tree Rendering**: < 5 seconds for trees with 500+ members
- **Search Results**: < 500ms response time
- **Image Loading**: Progressive loading with placeholders (✅ Base64 efficient)
- **Mobile Performance**: Smooth 60fps scrolling on devices

### **Scalability Targets**
- **Maximum Members**: Support 1000+ family members
- **Concurrent Users**: Handle 50+ simultaneous viewers
- **Data Size**: JSON files up to 10MB with Base64 images (✅ current: ~2MB)
- **Memory Usage**: < 100MB browser memory for large trees
- **Storage**: Efficient Base64 image compression (✅ implemented)

### **User Experience Performance**
- **Login Process**: < 2 seconds authentication
- **Form Submissions**: < 1 second save operations
- **Real-time Search**: Instant results as user types
- **Mobile Touch**: Responsive touch interactions
- **Navigation**: Smooth transitions between views

---

## 🔒 **Security Requirements**

### **Authentication Security**
- **Password Hashing**: bcryptjs with minimum 12 salt rounds (✅ implemented)
- **JWT Security**: 24-hour token expiration with proper validation
- **Session Management**: Secure token storage and automatic cleanup
- **Brute Force Protection**: Rate limiting on login attempts
- **Secure Headers**: Proper HTTP security headers

### **Data Protection**
- **Input Validation**: Server-side validation for all user inputs
- **XSS Prevention**: Sanitized HTML output and CSP headers
- **File Security**: Secure JSON file operations with error handling (✅ implemented)
- **Photo Security**: Validated and size-limited image uploads
- **Backup Strategy**: Regular JSON file backups

### **Access Control**
- **Route Protection**: Middleware guards all editing operations (✅ setup ready)
- **API Security**: Authentication required for all mutations
- **Permission Validation**: Role-based access control
- **Error Handling**: Secure error messages without data leakage
- **Audit Logging**: Track all member modifications

---

## 🧪 **Testing & Quality Assurance**

### **Testing Strategy**
```
Unit Tests:
- Component rendering and interactions
- Authentication utility functions (⚠️ async patterns)
- Data manipulation operations (✅ JSON layer ready)
- Form validation logic

Integration Tests:
- Complete user authentication flow (⚠️ async APIs)
- Family member CRUD operations
- Search and filter functionality
- Export/import operations

Performance Tests:
- Large family tree rendering (1000+ members)
- Search performance with large datasets
- Image loading and compression (✅ Base64 efficient)
- Mobile device performance

Security Tests:
- Authentication bypass attempts
- XSS and injection attacks
- File upload security
- JWT token validation (⚠️ async patterns)
```

### **Browser Compatibility**
- **Primary**: Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Testing**: Cross-browser automated testing
- **Fallbacks**: Progressive enhancement for older browsers

### **Accessibility Testing**
- **Screen Readers**: NVDA, JAWS, VoiceOver compatibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG 2.1 AA compliance
- **Touch Targets**: Minimum 44px touch targets
- **Focus Management**: Logical tab order and focus indicators

---

## 📈 **Success Metrics & KPIs**

### **User Engagement Metrics**
- **Family Tree Views**: Monthly unique family tree visitors
- **Search Usage**: Percentage of users who use search functionality
- **Export Actions**: Number of data exports per month
- **Session Duration**: Average time spent viewing family tree
- **Mobile Usage**: Percentage of mobile vs desktop users

### **Technical Performance Metrics**
- **Page Load Speed**: Average load time < 3 seconds
- **Search Performance**: Search response time < 500ms
- **Uptime**: 99.9% application availability
- **Error Rate**: < 1% of user interactions result in errors
- **Mobile Performance**: 60fps scrolling on mobile devices

### **Feature Adoption Metrics**
- **Login Rate**: Percentage of viewers who attempt to edit
- **Member Additions**: Number of new members added monthly
- **Photo Uploads**: Number of photos uploaded monthly (✅ Base64 ready)
- **Edit Frequency**: How often authenticated users make changes
- **Feature Usage**: Usage statistics for search, export, editing

---

## 🔮 **Future Enhancements**

### **Phase 5: Advanced Visualization** *(Future)*
- Multiple tree layouts (vertical, radial, timeline)
- Interactive family timeline view
- Photo gallery for each member
- Family statistics and analytics
- Advanced search with multiple criteria
- Member relationship mapping

### **Phase 6: Collaboration Features** *(Future)*
- Multi-user editing with permissions
- Real-time collaboration on family trees
- Family member photo sharing
- Comment system for family stories
- Email notifications for family updates
- Social sharing integration

### **Phase 7: Cultural Enhancement** *(Future)*
- Vietnamese cultural holidays and events
- Traditional Vietnamese naming conventions
- Family ceremony and milestone tracking
- Multiple language support (Vietnamese/English)
- Cultural context for family relationships
- Integration with Vietnamese genealogy standards

---

## 📊 **Technical Debt & Known Issues**

### **Current Technical Debt**
- **⚠️ CRITICAL**: Next.js 15 migration required for all async APIs
- **MemberCard Component**: Needs completion and responsive design (🔄 in progress)
- **Tree Layout System**: Complete horizontal layout implementation needed
- **Authentication**: JWT system needs async pattern updates
- **Error Handling**: Comprehensive error boundaries needed
- **Performance**: Large tree optimization pending

### **Next.js 15 Migration Checklist**
```typescript
// ⚠️ REQUIRED UPDATES:
□ Update all cookies() calls to await cookies()
□ Update all headers() calls to await headers()  
□ Update all draftMode() calls to await draftMode()
□ Update page components to handle Promise<params>
□ Update layout components to handle Promise<params>
□ Update route handlers for async params
□ Run Next.js 15 codemod: npx @next/codemod@canary upgrade latest
□ Update serverComponentsExternalPackages → serverExternalPackages
□ Update bundlePagesExternals → bundlePagesRouterDependencies
```

### **Known Limitations**
- **Concurrent Editing**: JSON file storage doesn't support concurrent writes
- **Real-time Updates**: No real-time collaboration capability
- **Backup System**: Manual backup process for JSON files (✅ structure ready)
- **Image Size**: Base64 storage increases JSON file size (✅ optimized)
- **Search Performance**: Linear search through JSON data (✅ efficient for current size)

### **Migration Considerations**
- **Database Migration**: Future move from JSON to database
- **Image Storage**: Migration to cloud storage for better performance
- **Authentication**: Potential upgrade to OAuth or SSO
- **Real-time Features**: WebSocket implementation for collaboration
- **Performance**: Caching and database optimization

---

## 📋 **Development Guidelines**

### **⚠️ Next.js 15 Code Quality Standards**
```typescript
// Component Structure Example - Next.js 15 Compatible
import React from 'react';
import { cookies } from 'next/headers';
import { FamilyMember } from '@/types';

interface MemberCardProps {
  member: FamilyMember;
  onEdit?: (id: string) => void;
  isEditable?: boolean;
}

export const MemberCard: React.FC<MemberCardProps> = async ({
  member,
  onEdit,
  isEditable = false
}) => {
  // ✅ Next.js 15 pattern - await async APIs
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token');
  
  return (
    <div className="member-card">
      {/* Component implementation */}
    </div>
  );
};

// Page Component Example - Next.js 15 Compatible
export default async function Page({ 
  params, 
  searchParams 
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // ✅ Next.js 15 pattern - await Promise params
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { slug } = resolvedParams;
  const { query } = resolvedSearchParams;
  
  return <div>{/* Page content */}</div>;
}
```

### **Naming Conventions**
- **Components**: PascalCase (e.g., `MemberCard.tsx`)
- **Utilities**: camelCase (e.g., `auth.ts`, `data.ts`)
- **Types**: PascalCase interfaces (e.g., `FamilyMember`)
- **API Routes**: kebab-case (e.g., `/api/family-tree`)
- **CSS Classes**: Tailwind utility classes

### **Git Workflow**
```
Branch Strategy:
- main: Production-ready code
- develop: Integration branch for features
- feature/*: Individual feature development
- hotfix/*: Critical bug fixes

Commit Messages:
- feat: New feature implementation
- fix: Bug fixes
- docs: Documentation updates
- style: Code formatting changes
- refactor: Code structure improvements
- migrate: Next.js 15 compatibility updates
```

---

## 🎯 **Definition of Done**

### **Phase 1 Completion Criteria**
- [ ] Family tree displays correctly on all screen sizes
- [ ] All 7 sample family members visible with proper information (✅ data ready)
- [ ] MemberCard component fully functional and responsive (🔄 in progress)
- [ ] Horizontal tree layout with connection lines
- [ ] Performance smooth with current sample data (✅ efficient)
- [ ] Mobile touch interactions work properly

### **Phase 2 Completion Criteria**
- [ ] Users can log in with username and password (✅ users.json ready)
- [ ] JWT tokens generated and validated correctly (⚠️ needs async update)
- [ ] Protected routes inaccessible without authentication
- [ ] Session management works across browser refreshes
- [ ] Login form includes validation and error handling
- [ ] Logout functionality clears all session data

### **Phase 3 Completion Criteria**
- [ ] All CRUD operations work securely for authenticated users
- [ ] Add member form includes all required fields with validation
- [ ] Edit functionality pre-populates forms correctly
- [ ] Delete operations include confirmation dialogs
- [ ] Photo uploads convert to Base64 and store properly (✅ pattern ready)
- [ ] All changes persist immediately to JSON files (✅ layer ready)

### **⚠️ Next.js 15 Migration Completion Criteria**
- [ ] All async API patterns implemented correctly
- [ ] No synchronous access to cookies(), headers(), draftMode()
- [ ] All page/layout components handle Promise params
- [ ] Route handlers use async patterns
- [ ] Codemod applied and verified
- [ ] No deprecation warnings in development

### **Overall Project Success Criteria**
- [ ] Public users can view complete family tree without barriers
- [ ] Authenticated users can manage family members securely
- [ ] Application works perfectly on mobile, tablet, and desktop
- [ ] Performance remains excellent with large family trees
- [ ] Application meets WCAG 2.1 AA accessibility standards
- [ ] Cultural sensitivity maintained for Vietnamese families
- [ ] ✅ Next.js 15 compatibility fully implemented

---

## 📞 **Stakeholder Information**

### **Project Stakeholders**
- **Primary Beneficiaries**: Vietnamese families seeking digital genealogy
- **Technical Team**: Full-stack developers with Next.js 15 expertise
- **QA Team**: Testing specialists for web applications
- **UX Designer**: User experience specialist for family applications
- **Cultural Consultant**: Vietnamese cultural context advisor

### **Communication Plan**
- **Daily Standups**: Development progress and blocker discussion
- **Weekly Reviews**: Feature demonstration and stakeholder feedback
- **Sprint Planning**: Bi-weekly planning for upcoming development
- **User Testing**: Regular testing sessions with Vietnamese families
- **Cultural Review**: Ongoing cultural sensitivity evaluation

---

*This PRD serves as the comprehensive guide for developing the Family Tree application with clear priorities, technical specifications, and cultural considerations for Vietnamese families.*

**Last Updated**: January 2025  
**Version**: 2.0 - Next.js 15 Compatible  
**Status**: Ready for AI-Assisted Development with Next.js 15 Async Patterns  
**Next Action**: Complete Task 1.4 - MemberCard Component with Next.js 15 compatibility  
**Critical Note**: ⚠️ All development must follow Next.js 15 async API patterns - see technical architecture section 