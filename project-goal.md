# Family Tree Design Tool - Project Goals

## 🤖 **AI Summary**
**Transform Next.js 15 Family Tree into Professional Design Tool** with canvas-based editing, CRUD operations, sharing, and export capabilities.

**Core Tech**: Next.js 15 + TypeScript + Tailwind CSS + Canvas-based UI + JWT authentication + JSON storage  
**Key Features**: Interactive canvas editing, professional toolbar, enhanced member banners, share/export functionality  
**Architecture**: Frontend-only with JSON persistence, canvas-based layout system, state management with history  
**Priority**: Enhanced UI foundation → CRUD operations → Share/Export → Mobile optimization

---

## 🎯 **Project Vision**
Transform the current family tree viewer into a **professional design tool** similar to Canva, with an intuitive canvas-based interface that allows families to easily visualize, edit, and share their genealogical data. The tool combines the simplicity of public viewing with powerful editing capabilities for authenticated users.

---

## 📋 **Core Objectives**

### **Primary Goal**
Build a professional design tool for family trees using Next.js and Tailwind CSS that enables families to:
- **Design** their family tree with an interactive canvas interface
- **Manage** family member information with enhanced banners and relationship labels
- **Share** their family tree with customizable export options
- **Preserve** family history with a robust data structure and version tracking

### **Secondary Goals**
- Create a professional toolbar with essential design actions (undo/redo, share, export)
- Implement canvas-based editing with drag-and-drop positioning
- Enable comprehensive export options (CSV, PNG formats)
- Support large family trees with optimized canvas rendering
- Provide a mobile-optimized design tool experience

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
  /components          # React components
    /Canvas            # Canvas-based components
      FamilyTreeCanvas.tsx  # Interactive canvas container
      MemberBanner.tsx      # Enhanced member display
      ConnectionLines.tsx   # Dynamic SVG connections
      CanvasControls.tsx   # Pan/zoom controls
    /Toolbar           # Professional toolbar
      MainToolbar.tsx      # Main action toolbar
      ActionButtons.tsx    # Undo/redo, share, export
      UserSection.tsx      # User profile & settings
    /Modals            # Modal components
      AddMemberModal.tsx   # Add member form
      EditMemberModal.tsx  # Edit member form
      DeleteConfirmModal.tsx # Delete confirmation
      ShareModal.tsx       # Share options
    /Export            # Export functionality
      ExportModal.tsx      # Export options modal
      ExportOptions.tsx    # Format selection
    /Mobile            # Mobile-specific components
      MobileActionBar.tsx  # Bottom action bar
      MobileModals.tsx     # Touch-optimized modals
  /lib                 # Utilities & helpers
    canvas.ts          # Canvas operations
    export.ts          # Export functions
    share.ts           # Share functionality
    crud.ts           # Data operations
  page.tsx            # Home page (canvas view)
  layout.tsx          # Root layout with auth context
/data                 # JSON data storage
  family-tree.json    # Tree data with positions
  users.json          # User accounts
/types               # TypeScript definitions
  design-tool.ts     # Canvas/design interfaces
middleware.ts        # Route protection
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
  "settings": {
    "canvasSize": { "width": 2000, "height": 1500 },
    "gridEnabled": true,
    "snapToGrid": true,
    "theme": "light",
    "layout": "hierarchical"
  },
  "metadata": {
    "created": "2024-01-01",
    "lastModified": "2024-01-01",
    "version": "1.0"
  },
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
      "order": 1,
      "position": { "x": 100, "y": 100 },
      "size": { "width": 200, "height": 120 },
      "relationship": "Father"
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

### **Phase 1: Enhanced UI Foundation** (Priority: CRITICAL | Week 1)
**Goal**: Transform the basic viewer into a canvas-based design tool  
**Acceptance Criteria**: Users can interact with family tree on a professional canvas interface

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Update TypeScript interfaces with new fields (position, size, relationship)
2. **P1-CRITICAL** Create data migration utility for existing family tree data
3. **P1-CRITICAL** Implement basic canvas component with absolute positioning
4. **P1-CRITICAL** Add drag-and-drop functionality for member banners
5. **P2-HIGH** Implement viewport controls (pan, zoom)
6. **P2-HIGH** Enhance member banners with relationship labels
7. **P3-MEDIUM** Create basic toolbar with essential actions

**Definition of Done**: 
- [ ] Canvas renders family tree with draggable members
- [ ] Member banners show enhanced design with relationships
- [ ] Basic toolbar provides essential actions
- [ ] Smooth pan and zoom functionality

### **Phase 2: CRUD Operations & State Management** (Priority: CRITICAL | Week 2)
**Goal**: Implement professional editing capabilities with history tracking  
**Acceptance Criteria**: Users can manage family members with undo/redo support

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Implement React Context for global state management
2. **P1-CRITICAL** Create modal components for add/edit/delete operations
3. **P1-CRITICAL** Add member selection and context menu
4. **P1-CRITICAL** Implement dynamic connection recalculation
5. **P2-HIGH** Add undo/redo functionality with history stack
6. **P2-HIGH** Create form validation and error handling
7. **P3-MEDIUM** Add bulk operations support

**Definition of Done**:
- [ ] All CRUD operations work with state history
- [ ] Undo/redo functions properly for all actions
- [ ] Connections update dynamically with member movement
- [ ] Forms provide proper validation and feedback

### **Phase 3: Share & Export** (Priority: HIGH | Week 3)
**Goal**: Enable comprehensive sharing and export capabilities  
**Acceptance Criteria**: Users can share and export family trees in multiple formats

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Implement share link generation and modal
2. **P1-CRITICAL** Add CSV export functionality with all fields
3. **P1-CRITICAL** Create PNG export with canvas capture
4. **P1-CRITICAL** Add export options modal with settings
5. **P2-HIGH** Implement share link validation and expiry
6. **P2-HIGH** Add watermark options for exports
7. **P3-MEDIUM** Create batch export capabilities

**Definition of Done**:
- [ ] Share links work reliably with proper validation
- [ ] CSV exports include all member data
- [ ] PNG exports capture the entire tree accurately
- [ ] Export options provide necessary customization

### **Phase 4: Mobile Experience** (Priority: HIGH | Week 4)
**Goal**: Optimize the design tool for mobile devices  
**Acceptance Criteria**: Full functionality available on mobile with touch support

**Tasks with Priority Ranking:**
1. **P1-CRITICAL** Optimize for mobile with touch interactions
2. **P1-CRITICAL** Add mobile-specific action bar and gestures
3. **P1-CRITICAL** Create touch-friendly member selection
4. **P1-CRITICAL** Implement mobile-optimized modals
5. **P2-HIGH** Add pinch-to-zoom and pan gestures
6. **P2-HIGH** Optimize canvas performance for mobile
7. **P3-MEDIUM** Add offline support for mobile editing

**Definition of Done**:
- [ ] All features work smoothly on mobile devices
- [ ] Touch gestures feel natural and responsive
- [ ] Mobile UI provides easy access to all functions
- [ ] Performance is optimized for mobile browsers

---

## 🔧 **Feature Requirements**

### **📋 PLANNED Features**

#### **Canvas & Design Features**
- [ ] **P1-CRITICAL** Interactive canvas with drag-and-drop positioning
- [ ] **P1-CRITICAL** Professional toolbar with essential actions
- [ ] **P1-CRITICAL** Enhanced member banners with relationship labels
- [ ] **P2-HIGH** Pan and zoom controls with smooth transitions
- [ ] **P2-HIGH** Grid system with snap-to-grid functionality
- [ ] **P2-HIGH** Selection and multi-select capabilities
- [ ] **P3-MEDIUM** Custom layouts (hierarchical, radial, custom)

#### **Member Management**
- [ ] **P1-CRITICAL** Add/edit members with enhanced modal interface
- [ ] **P1-CRITICAL** Dynamic relationship management and labeling
- [ ] **P2-HIGH** Bulk operations for multiple members
- [ ] **P2-HIGH** Photo management with Base64 conversion
- [ ] **P2-HIGH** Context menu for quick actions
- [ ] **P3-MEDIUM** Member templates and presets
- [ ] **P4-LOW** Batch import from external sources

#### **State & History Management**
- [ ] **P1-CRITICAL** Global state management with React Context
- [ ] **P1-CRITICAL** Undo/redo functionality for all actions
- [ ] **P2-HIGH** Auto-save and version tracking
- [ ] **P2-HIGH** Local storage backup system
- [ ] **P3-MEDIUM** Conflict resolution for concurrent edits
- [ ] **P3-MEDIUM** Change history and audit logs
- [ ] **P4-LOW** Branch and merge tree versions

#### **Share & Export**
- [ ] **P1-CRITICAL** Share link generation with custom settings
- [ ] **P1-CRITICAL** CSV export with all member data
- [ ] **P1-CRITICAL** PNG export with canvas capture
- [ ] **P2-HIGH** Watermark and branding options
- [ ] **P2-HIGH** Custom export templates
- [ ] **P3-MEDIUM** Batch export capabilities
- [ ] **P4-LOW** Automated backup scheduling

#### **Mobile Experience**
- [ ] **P1-CRITICAL** Touch-optimized interface and gestures
- [ ] **P1-CRITICAL** Mobile-specific action bar
- [ ] **P2-HIGH** Pinch-to-zoom and pan gestures
- [ ] **P2-HIGH** Mobile-optimized modals and forms
- [ ] **P2-HIGH** Offline editing capabilities
- [ ] **P3-MEDIUM** Mobile-specific layout optimizations
- [ ] **P4-LOW** Progressive Web App features

### **✅ COMPLETED Features**
*This section will be updated as development progresses*

- [ ] *No features completed yet - project in planning phase*

---

## 📱 **User Journey**

### **Design Tool User Flow**
1. **Canvas View**: Open interactive canvas with family tree
2. **Design**: Drag and position members on canvas
3. **Edit**: Use professional toolbar for actions
4. **Organize**: Manage relationships and connections
5. **History**: Undo/redo changes as needed
6. **Share/Export**: Generate links or export formats

### **Mobile User Flow**
1. **Touch Interface**: Use mobile-optimized controls
2. **Quick Actions**: Access bottom action bar
3. **Gestures**: Pan, zoom, and select members
4. **Edit**: Use mobile-friendly modals
5. **Share**: Quick share options for mobile
6. **Export**: Mobile-optimized export process

### **Key User Scenarios**
- **Family Designer**: Creating and organizing tree layout
- **Content Manager**: Adding and updating member information
- **Mobile Editor**: Managing tree on-the-go
- **Data Curator**: Exporting and sharing tree data
- **Collaborative Editor**: Working with version history

---

## 🎯 **Success Criteria with Clear Acceptance Criteria**

### **Functional Requirements**

#### **Canvas Design Tool**
**Acceptance Criteria:**
- [ ] **Interactive canvas** with smooth drag-and-drop positioning
- [ ] **Professional toolbar** with all essential design actions
- [ ] **Enhanced member banners** with relationship labels and styling
- [ ] **Pan and zoom controls** work smoothly on all devices
- [ ] **Grid system** with snap-to-grid functionality
- [ ] **Selection tools** support single and multi-select operations
- [ ] **Custom layouts** (hierarchical, radial, custom) render correctly

#### **State Management & History**
**Acceptance Criteria:**
- [ ] **Global state** manages all tree data efficiently
- [ ] **Undo/redo** works for all user actions
- [ ] **Auto-save** prevents data loss
- [ ] **Version tracking** maintains edit history
- [ ] **Local storage** provides reliable backup
- [ ] **Conflict resolution** handles concurrent edits
- [ ] **Change history** logs all modifications

#### **User Interface & Experience**
**Acceptance Criteria:**
- [ ] **Professional design tool** interface is intuitive
- [ ] **Touch interactions** work smoothly on mobile
- [ ] **Visual feedback** for all actions (loading, success, error)
- [ ] **Mobile action bar** provides easy access to functions
- [ ] **Accessibility** passes WCAG 2.1 AA standards
- [ ] **Cross-browser** compatibility in Chrome, Firefox, Safari, Edge

### **Performance Requirements**

#### **Canvas Performance**
**Acceptance Criteria:**
- [ ] **Canvas operations** (drag, zoom) complete within 16ms
- [ ] **Member rendering** handles 1000+ members smoothly
- [ ] **Connection updates** recalculate within 100ms
- [ ] **Memory usage** stays under 100MB for large trees
- [ ] **State updates** process within 50ms
- [ ] **History operations** (undo/redo) execute within 100ms
- [ ] **Auto-save** completes within 500ms

#### **Export Performance**
**Acceptance Criteria:**
- [ ] **Share link generation** completes within 1 second
- [ ] **CSV export** processes within 3 seconds
- [ ] **PNG export** captures and saves within 5 seconds
- [ ] **Batch operations** complete within 10 seconds
- [ ] **Mobile export** optimizes for bandwidth

### **Technical Requirements**

#### **Code Architecture**
**Acceptance Criteria:**
- [ ] **TypeScript** strict mode with no errors
- [ ] **React Context** optimized for performance
- [ ] **Canvas system** follows best practices
- [ ] **Component structure** maintains clear hierarchy
- [ ] **State management** follows immutable patterns
- [ ] **Mobile architecture** optimizes for touch

#### **Quality Assurance**
**Acceptance Criteria:**
- [ ] **Unit tests** cover all core components
- [ ] **Integration tests** verify canvas operations
- [ ] **Performance tests** validate rendering speed
- [ ] **Mobile testing** confirms touch functionality
- [ ] **Cross-browser testing** ensures compatibility
- [ ] **Error handling** manages all edge cases

---

## 📈 **Future Enhancements**

### **Phase 5: Advanced Canvas Features** (Future)
- [ ] Multiple simultaneous tree views
- [ ] Advanced animation and transitions
- [ ] Custom member banner templates
- [ ] AI-assisted layout suggestions
- [ ] Advanced connection styling
- [ ] 3D tree visualization

### **Phase 6: Collaboration & Real-time** (Future)
- [ ] Real-time collaborative editing
- [ ] Version control and branching
- [ ] Comments and annotations
- [ ] Design history playback
- [ ] Team workspaces
- [ ] Live preview sharing

---

## 🎉 **Project Success Metrics**

### **Technical Metrics**
- ✅ Canvas operations complete within performance targets
- ✅ State management handles 1000+ members efficiently
- ✅ History tracking works reliably for all actions
- ✅ Mobile touch interactions are smooth and responsive
- ✅ Export functions handle large trees successfully
- ✅ Component architecture maintains clean separation

### **User Experience Metrics**
- ✅ Users can design trees without training
- ✅ Canvas interactions feel natural and responsive
- ✅ Mobile experience matches desktop quality
- ✅ Share and export functions work intuitively
- ✅ Undo/redo provides confidence in editing
- ✅ Professional toolbar enhances productivity

### **Design Tool Metrics**
- ✅ Canvas rendering performance
- ✅ Tool adoption rate
- ✅ Feature utilization statistics
- ✅ Export format preferences
- ✅ Mobile vs desktop usage
- ✅ User satisfaction with design capabilities

---

## 📋 **Project Deliverables**

### **Design Tool Deliverables**
- [ ] Canvas-based family tree editor
- [ ] Professional toolbar implementation
- [ ] Enhanced member banner system
- [ ] State management with history
- [ ] Share and export functionality
- [ ] Mobile-optimized interface

### **Documentation Deliverables**
- [ ] Design tool user guide
- [ ] Canvas interaction documentation
- [ ] Component architecture guide
- [ ] State management documentation
- [ ] Mobile interaction guide
- [ ] Performance optimization guide

### **Testing Deliverables**
- [ ] Canvas operation tests
- [ ] State management tests
- [ ] Touch interaction tests
- [ ] Export functionality tests
- [ ] Performance benchmarks
- [ ] Cross-browser compatibility tests

---

---

## 📋 **AI Development Summary**

### **What's Been Optimized for AI:**
✅ **Concise AI Summary** - Added 4-line technical overview at the top  
✅ **Canvas Architecture** - Detailed component structure for design tool  
✅ **State Management** - Clear patterns for history and undo/redo  
✅ **Priority Rankings** - P1-CRITICAL to P4-LOW for all features  
✅ **Performance Metrics** - Specific timing targets for canvas operations  
✅ **Mobile Strategy** - Touch-optimized interface specifications  
✅ **Implementation Phases** - Focused on design tool transformation  

### **Key AI-Friendly Improvements:**
- **Canvas Components** with clear responsibilities and interfaces
- **State Patterns** for efficient history management
- **Performance Targets** with specific millisecond metrics
- **Mobile Patterns** for touch-based interactions
- **Export Specifications** for multiple formats
- **Component Architecture** for design tool structure

---

**Project Status**: Ready for Design Tool Transformation  
**Timeline**: 4 weeks with focused phases  
**Next Action**: Begin Phase 1 - Enhanced UI Foundation  
**Priority Order**: Canvas UI → State Management → Share/Export → Mobile  
**Success Definition**: Professional design tool that makes family tree creation intuitive and enjoyable