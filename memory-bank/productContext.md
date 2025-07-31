# Product Context

## Product Vision
Transform the current basic family tree viewer into a **professional design tool** similar to Canva, with canvas-based editing, comprehensive CRUD operations, sharing capabilities, and export functionality. The tool will provide an intuitive, modern interface for creating and managing family trees with professional-grade features.

## Target Users

### **Primary Users**
- **Family Patriarchs**: Managing and organizing family trees with professional design tools
- **Family Members**: Viewing family history through shared links and exported content
- **Family Historians**: Documenting biographies and photos with advanced editing capabilities
- **Extended Family**: Accessing family information through secure shareable URLs
- **Design Professionals**: Using the tool for family tree visualization projects

### **User Personas**

#### **Family Patriarch (Design Tool User)**
- **Age**: 45-65
- **Tech Level**: Moderate to Advanced
- **Goals**: Create professional family tree visualizations, organize complex family structures
- **Pain Points**: Limited editing capabilities, poor design tools, difficult sharing
- **Needs**: Canvas-based editing, drag-and-drop positioning, professional export options

#### **Family Member (Viewer)**
- **Age**: 18-80
- **Tech Level**: Basic to Moderate
- **Goals**: View family history, access shared content, download family information
- **Pain Points**: Login requirements, poor mobile experience, limited access
- **Needs**: Easy viewing through shared links, mobile-optimized interface, export capabilities

#### **Family Historian (Advanced Editor)**
- **Age**: 30-60
- **Tech Level**: Advanced
- **Goals**: Document detailed family stories, create professional visualizations
- **Pain Points**: Limited design tools, poor photo management, difficult collaboration
- **Needs**: Advanced editing features, high-quality exports, collaboration tools

## User Journey

### **Design Tool User Flow**
1. **Access**: Open family tree design tool (login required for editing)
2. **Canvas**: Work on interactive canvas with drag-and-drop positioning
3. **Edit**: Add/edit/delete family members with modal interfaces
4. **Organize**: Use grid system and snap-to-grid for precise positioning
5. **Share**: Generate shareable URLs for family members
6. **Export**: Download high-quality images or CSV data
7. **Collaborate**: Work with multiple users on the same family tree

### **Viewer User Flow**
1. **Receive**: Get shared link from family member
2. **View**: Access family tree without login requirements
3. **Navigate**: Use pan/zoom controls to explore large family trees
4. **Search**: Find specific family members quickly
5. **Export**: Download family tree data or images
6. **Share**: Forward the link to other family members

## Key Features

### **Canvas-Based Design Tool Features**
- **Interactive Canvas**: Drag-and-drop positioning with absolute coordinates
- **Professional Toolbar**: Design tool header with undo/redo, share, export actions
- **Enhanced Member Banners**: Rounded banners with relationship labels and larger photos
- **Grid System**: Professional grid with snap-to-grid functionality
- **Viewport Controls**: Pan, zoom, and canvas navigation
- **History Stack**: Undo/redo support for all operations
- **State Management**: React Context with comprehensive state handling

### **CRUD Operations (Modal-Based)**
- **Add Members**: Modal form with photo upload and relationship selection
- **Edit Members**: Pre-filled modal with position and connection management
- **Delete Members**: Confirmation dialog with cascade delete options
- **Photo Management**: Base64 image upload with preview and optimization
- **Relationship Management**: Visual connection editor with validation

### **Share & Export Features**
- **Share Links**: Generate secure, shareable URLs with access controls
- **CSV Export**: Comprehensive data export with custom field selection
- **Image Export**: High-quality PNG/JPG export with size options
- **Mobile Export**: Optimized export features for mobile devices
- **QR Code Generation**: Easy sharing via QR codes

### **Mobile Experience**
- **Touch Interactions**: Optimized drag-and-drop for touch devices
- **Mobile Action Bar**: Bottom action bar with large touch targets
- **Responsive Canvas**: Adaptive canvas sizing for different screen sizes
- **Mobile Modals**: Touch-friendly modal interfaces
- **Gesture Support**: Pinch-to-zoom and swipe gestures

## Current Implementation Status

### **Completed Features**
- ✅ **Project Foundation**: Next.js 15 setup with TypeScript and Tailwind CSS
- ✅ **Sample Data**: 6 Vietnamese family members with realistic relationships
- ✅ **MemberCard Component**: Photo display with fallback avatar and responsive design
- ✅ **Core Pages**: Home, View, and Login pages with responsive design
- ✅ **Project Structure**: Complete with proper directory organization
- ✅ **Authentication Dependencies**: JWT and bcrypt libraries installed
- ✅ **Tree Layout System**: Horizontal tree visualization with SVG connections
- ✅ **Family Tree Visualization**: Parent-child and spouse relationships
- ✅ **Horizontally Scrollable Tree**: Support for large families
- ✅ **Comprehensive Unit Tests**: TDD approach with proper test coverage
- ✅ **Data Utilities**: Complete CRUD operations for family members
- ✅ **TypeScript Integration**: Full type safety throughout the application

### **In Progress**
- 🔄 **Next.js 15 Migration**: Updating API routes and page components to Next.js 15 patterns
- 🔄 **Enhanced Data Structure**: Adding position, size, and relationship fields to TypeScript interfaces

### **Planned Features**
- ⏳ **Canvas System**: Interactive canvas with drag-and-drop positioning
- ⏳ **Professional Toolbar**: Design tool header with essential actions
- ⏳ **Enhanced Member Banners**: Rounded banners with relationship labels
- ⏳ **CRUD Modals**: Modal-based add/edit/delete operations
- ⏳ **Share System**: Generate and manage shareable URLs
- ⏳ **Export Features**: CSV and high-quality image export
- ⏳ **Mobile Optimization**: Touch interactions and mobile-specific UI
- ⏳ **State Management**: React Context with history stack
- ⏳ **Grid System**: Professional grid with snap functionality

## User Experience Goals

### **Design Tool Experience**
- **Professional Interface**: Modern design tool UI similar to Canva/Figma
- **Intuitive Editing**: Drag-and-drop positioning with visual feedback
- **Efficient Workflow**: Quick access to common actions via toolbar
- **Visual Hierarchy**: Clear relationship visualization with connection lines
- **Responsive Canvas**: Adaptive canvas that works on all screen sizes

### **Accessibility**
- **WCAG 2.1 AA Compliance**: Screen reader friendly with proper ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility for all canvas operations
- **High Contrast**: Clear visual hierarchy with proper color contrast
- **Touch Friendly**: Large touch targets for mobile interactions
- **Font Scaling**: Support for larger text sizes and accessibility preferences

### **Performance**
- **Fast Loading**: Under 3 seconds for initial canvas load
- **Smooth Interactions**: 60fps animations and transitions
- **Large Tree Support**: Handle 100+ members efficiently with virtual scrolling
- **Mobile Optimization**: Touch-optimized interactions with responsive performance
- **Memory Management**: Efficient rendering and state management

### **Usability**
- **No Training Required**: Intuitive interface for basic family tree creation
- **Clear Navigation**: Easy-to-understand canvas controls and toolbar
- **Visual Feedback**: Loading states, success/error messages, selection highlights
- **Helpful Errors**: Clear error messages with solutions and recovery options
- **Progressive Disclosure**: Show advanced features on demand

## Design Principles

### **Visual Design**
- **Layout**: Canvas-based with absolute positioning and drag-and-drop
- **Design**: Professional design tool interface with modern UI patterns
- **Responsive**: Mobile-first approach with touch optimization
- **Theme**: Light mode first, dark mode enhancement planned

### **Information Architecture**
- **Hierarchical**: Clear family relationship structure with visual connections
- **Searchable**: Easy member discovery with search functionality
- **Scalable**: Support for large family trees with performance optimization
- **Organized**: Logical grouping of related information and actions

### **Interaction Design**
- **Consistent**: Standardized interaction patterns across all components
- **Efficient**: Minimal clicks to complete common tasks
- **Forgiving**: Easy to undo mistakes with comprehensive history stack
- **Responsive**: Immediate feedback to user actions with visual cues

## Success Metrics

### **User Engagement**
- **Canvas Usage**: Time spent editing on canvas
- **Member Operations**: Frequency of add/edit/delete operations
- **Export Actions**: Number of CSV and image exports
- **Share Actions**: Number of shared links generated
- **Mobile Usage**: Percentage of mobile users and engagement

### **Design Tool Adoption**
- **Login Rate**: Percentage of viewers who attempt to edit
- **Member Additions**: Number of new members added via canvas
- **Photo Uploads**: Number of photos uploaded and managed
- **Edit Frequency**: How often users make changes and save
- **Export Usage**: Frequency of export operations

### **Technical Performance**
- **Canvas Performance**: Smooth 60fps canvas operations
- **Load Time**: Page load performance metrics
- **Mobile Performance**: Touch interaction responsiveness
- **Export Speed**: Time to generate exports
- **Error Rate**: Application error frequency and recovery

## Competitive Analysis

### **Strengths**
- **Canvas-Based**: Unique canvas approach for family tree editing
- **Professional UI**: Modern design tool interface
- **Easy Sharing**: Simple link sharing with access controls
- **Mobile Optimized**: Touch-friendly interface for all devices
- **Export Capabilities**: Multiple export formats with high quality

### **Differentiators**
- **Canvas Layout**: Interactive canvas with drag-and-drop positioning
- **Professional Toolbar**: Design tool interface with essential actions
- **Enhanced Banners**: Rounded member banners with relationship labels
- **Grid System**: Professional grid with snap-to-grid functionality
- **Mobile-First**: Touch-optimized interface with mobile-specific actions
- **Export Quality**: High-quality image export with multiple formats

## Next Development Priorities

### **Immediate (Phase 1)**
1. **Next.js 15 Migration**: Complete API routes and page component updates
2. **Enhanced Data Structure**: Implement new TypeScript interfaces with position/size fields
3. **Data Migration**: Create utility to convert existing JSON to new format
4. **Canvas Foundation**: Basic canvas setup with drag-and-drop types

### **Short-term (Phase 2)**
1. **Canvas Implementation**: Interactive canvas with absolute positioning
2. **Professional Toolbar**: Design tool header with essential actions
3. **Enhanced Member Banners**: Rounded banners with relationship labels
4. **Viewport Controls**: Pan, zoom, and canvas navigation

### **Medium-term (Phase 3)**
1. **CRUD Operations**: Modal-based add/edit/delete with form validation
2. **State Management**: React Context with history stack for undo/redo
3. **Member Selection**: Single and multi-select functionality
4. **Connection Management**: Visual relationship editor

### **Long-term (Phase 4)**
1. **Share System**: Generate and manage shareable URLs
2. **Export Features**: CSV and high-quality image export
3. **Mobile Optimization**: Touch interactions and mobile-specific UI
4. **Performance**: Virtual scrolling and memory optimization

## Future Enhancements

### **Phase 5: Advanced Features**
- Multiple canvas layouts (hierarchical, radial, custom)
- Timeline view of family history
- Photo gallery for each member
- Family event calendar
- Advanced search with multiple criteria
- Family statistics and analytics

### **Phase 6: Collaboration**
- Multi-user editing with permissions
- Real-time collaboration
- Family chat/messaging
- Family photo sharing
- Family story contributions
- Version control for family trees

## Current Architecture Status

### **Frontend Components**
- ✅ **FamilyTree**: Horizontal tree layout with SVG connections (to be replaced with canvas)
- ✅ **TreeConnection**: SVG connection lines for family relationships (to be enhanced)
- ✅ **MemberCard**: Photo display with fallback avatar and responsive design (to be enhanced to MemberBanner)
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

---

*This file contains product requirements and user experience context for the design tool transformation.* 