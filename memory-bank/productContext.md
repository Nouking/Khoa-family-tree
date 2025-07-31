# Product Context

## Product Vision
Create a beautiful, public family tree management tool that allows families to easily visualize, edit, and share their genealogical data with an intuitive, modern interface. The family tree is publicly viewable, while editing requires authentication.

## Target Users

### **Primary Users**
- **Family Patriarchs**: Managing and organizing family trees
- **Family Members**: Viewing family history and relationships
- **Family Historians**: Documenting biographies and photos
- **Extended Family**: Accessing family information without barriers

### **User Personas**

#### **Family Patriarch (Editor)**
- **Age**: 45-65
- **Tech Level**: Moderate
- **Goals**: Organize family structure, add new generations, manage family data
- **Pain Points**: Complex family tree software, difficult photo management
- **Needs**: Easy member addition, photo upload, family organization

#### **Family Member (Viewer)**
- **Age**: 18-80
- **Tech Level**: Basic to Moderate
- **Goals**: View family history, find relatives, understand family connections
- **Pain Points**: Login requirements, complex navigation
- **Needs**: Simple viewing, search functionality, mobile access

#### **Family Historian (Editor)**
- **Age**: 30-60
- **Tech Level**: Moderate to Advanced
- **Goals**: Document family stories, add biographies, preserve photos
- **Pain Points**: Limited editing capabilities, poor photo management
- **Needs**: Rich text editing, photo upload, detailed member profiles

## User Journey

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

## Key Features

### **Public Features (No Authentication Required)**
- **Family Tree Viewing**: Complete horizontal tree visualization ✅
- **Member Search**: Find family members by name or criteria ⏳
- **Member Details**: View detailed information and photos ✅
- **Data Export**: Download family tree in JSON/CSV formats ⏳
- **Share Links**: Generate shareable URLs for family members ⏳
- **Responsive Design**: Works on all devices (mobile/tablet/desktop) ⏳

### **Protected Features (Authentication Required)**
- **Add Members**: Create new family members (children, spouses, parents) ⏳
- **Edit Members**: Modify existing member details ⏳
- **Delete Members**: Remove members with confirmation ⏳
- **Photo Management**: Upload and manage member photos ⏳
- **Drag & Drop**: Reorder siblings and family structure ⏳
- **Bulk Operations**: Manage multiple members efficiently ⏳

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
- 🔄 **Responsive Design**: Mobile-first approach for tree layout
- 🔄 **Authentication System**: JWT-based login and protected routes

### **Planned Features**
- ⏳ **Authentication System**: JWT-based login and protected routes
- ⏳ **CRUD Operations**: Add, edit, delete family members
- ⏳ **Photo Management**: Base64 image upload and storage
- ⏳ **Search Functionality**: Find members by name or criteria
- ⏳ **Export Features**: Download family tree data
- ⏳ **Advanced Features**: Multiple layouts, timeline view, analytics

## User Experience Goals

### **Accessibility**
- **WCAG 2.1 AA Compliance**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Clear visual hierarchy
- **Touch Friendly**: Large touch targets for mobile
- **Font Scaling**: Support for larger text sizes

### **Performance**
- **Fast Loading**: Under 3 seconds for initial load
- **Smooth Interactions**: 60fps animations and transitions
- **Large Tree Support**: Handle 1000+ members efficiently
- **Mobile Optimization**: Touch-optimized interactions
- **Offline Capability**: Basic viewing without internet

### **Usability**
- **Intuitive Design**: No training required for basic viewing
- **Clear Navigation**: Easy-to-understand interface
- **Visual Feedback**: Loading states, success/error messages
- **Helpful Errors**: Clear error messages with solutions
- **Progressive Disclosure**: Show details on demand

## Design Principles

### **Visual Design**
- **Layout**: Horizontal compact tree (expandable to other layouts)
- **Design**: Based on provided UI sample with modern improvements
- **Responsive**: Mobile-first, tablet, and desktop support
- **Theme**: Light mode first, dark mode enhancement later

### **Information Architecture**
- **Hierarchical**: Clear family relationship structure
- **Searchable**: Easy member discovery
- **Scalable**: Support for large family trees
- **Organized**: Logical grouping of related information

### **Interaction Design**
- **Consistent**: Standardized interaction patterns
- **Efficient**: Minimal clicks to complete tasks
- **Forgiving**: Easy to undo mistakes
- **Responsive**: Immediate feedback to user actions

## Success Metrics

### **User Engagement**
- **Viewing Time**: Average time spent viewing family tree
- **Search Usage**: Frequency of member searches
- **Export Actions**: Number of data exports
- **Share Actions**: Number of shared links generated

### **Editor Adoption**
- **Login Rate**: Percentage of viewers who attempt to edit
- **Member Additions**: Number of new members added
- **Photo Uploads**: Number of photos uploaded
- **Edit Frequency**: How often editors make changes

### **Technical Performance**
- **Load Time**: Page load performance metrics
- **Search Speed**: Search response times
- **Mobile Usage**: Percentage of mobile users
- **Error Rate**: Application error frequency

## Competitive Analysis

### **Strengths**
- **Public Access**: No login required for viewing
- **Modern UI**: Clean, responsive design
- **Easy Sharing**: Simple link sharing
- **Mobile Friendly**: Optimized for all devices
- **Fast Performance**: Efficient loading and interactions

### **Differentiators**
- **Horizontal Layout**: Unique tree visualization
- **Base64 Storage**: No external dependencies
- **JWT Authentication**: Secure, stateless auth
- **JSON Export**: Easy data portability
- **Vietnamese Focus**: Cultural considerations

## Next Development Priorities

### **Immediate (Phase 1)**
1. **Responsive Design**: Implement mobile-first approach with Tailwind breakpoints
2. **Tree Layout Optimization**: Ensure tree layout works on all screen sizes
3. **SVG Connection Optimization**: Optimize connections for different screen sizes

### **Short-term (Phase 2)**
1. **Authentication System**: JWT-based login and session management
2. **Protected Routes**: Middleware for editing functionality
3. **User Management**: User registration and account management

### **Medium-term (Phase 3)**
1. **CRUD Operations**: Add, edit, delete family members
2. **Photo Management**: Upload and display member photos
3. **Search Functionality**: Find members by name or criteria

### **Long-term (Phase 4)**
1. **Export Features**: Download family tree data
2. **Advanced Layouts**: Multiple tree visualization options
3. **Analytics**: Family statistics and insights

## Future Enhancements

### **Phase 5: Advanced Features**
- Multiple tree layouts (vertical, radial)
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
*This file contains product requirements and user experience context.* 