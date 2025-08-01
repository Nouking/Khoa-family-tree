# Active Context

## Current Focus

**Project Transformation**: Converting basic family tree viewer into professional design tool
  - **Current Status**: Phase 1 - Next.js 15 migration complete, ready for canvas implementation
- **Foundation**: All migration tasks (1.1-1.12) completed successfully
- **Next Steps**: Implement canvas foundation (Task 1.11) and drag-and-drop functionality (Task 1.12)
- **Priority**: Establish canvas system with absolute positioning and interactive member banners

## Recent Changes

- ✅ **Completed All Migration Tasks (1.1-1.12)**:
  - Next.js 15 setup with TypeScript and Tailwind CSS
  - Enhanced data structure with position, size, and relationship fields
  - Data migration utility for converting existing JSON to new format
  - API routes and page components migrated to Next.js 15 patterns
  - Codemods applied for Next.js 15 compatibility
  - Foundation components (MemberCard, FamilyTree, TreeConnection) completed
  - Sample data with 6 Vietnamese family members and realistic relationships
  - Responsive design foundation with viewport detection and adaptive spacing
  - Complete data utilities with CRUD operations
  - Comprehensive unit tests with TDD principles

- 🔄 **In Progress - Canvas Foundation (Tasks 1.11-1.12)**:
  - Task 1.11: Basic Canvas Component - Implement canvas with absolute positioning
  - Task 1.12: Drag-and-Drop Functionality - Add drag-and-drop for member banners

## Next Steps

1. **Immediate (Complete Canvas Foundation)**:
   - Implement basic `FamilyTreeCanvas` component with absolute positioning
   - Add drag-and-drop functionality for `MemberBanner` components
   - Set up canvas state management with viewport controls
   - Create enhanced member banners with relationship labels

2. **Short-term (Phase 2 - Canvas & UI Enhancement)**:
   - Implement viewport controls (pan, zoom) for canvas navigation
   - Create professional toolbar with essential actions
   - Add undo/redo functionality with history stack
   - Implement professional grid system with snap functionality

3. **Medium-term (Phase 3 - CRUD Operations)**:
   - Set up React Context for global state management
   - Create modal components for add/edit/delete operations
   - Implement core CRUD operations with error handling
   - Add member selection and multi-select functionality
   - Implement position management on canvas
   - Create connection management system

## Active Decisions

- **Canvas Implementation Strategy**: Start with basic canvas component, then add drag-and-drop
- **Component Architecture**: Use absolute positioning for member banners on canvas
- **State Management**: Implement React Context for canvas state and member data
- **UI/UX Direction**: Professional design tool interface similar to Canva/Figma
- **Mobile Strategy**: Touch-optimized interface with mobile-specific action bar
- **Performance**: Virtual scrolling and memory optimization for large family trees

## Technical Considerations

- Canvas implementation will replace current horizontal tree layout
- Enhanced data structure with position/size fields is ready for canvas system
- Professional toolbar design will transform current basic header
- Mobile optimization requires touch event handling and responsive canvas
- State management with React Context and history stack needed for undo/redo
- Export functionality requires canvas-to-image conversion and CSV generation

## Current Implementation Status

### **Completed Components**
- ✅ **FamilyTree**: Horizontal tree layout with SVG connections (foundation for canvas)
- ✅ **TreeConnection**: SVG connection lines for family relationships (to be enhanced)
- ✅ **MemberCard**: Photo display with fallback avatar and responsive design (to become MemberBanner)
- ✅ **Data Utilities**: Complete CRUD operations for family members
- ✅ **Sample Data**: 6 Vietnamese family members with realistic relationships
- ✅ **Project Structure**: Complete Next.js 15 setup with proper organization

### **Current Architecture**
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Data Storage**: JSON files with proper error handling
- **Authentication**: JWT and bcrypt dependencies installed
- **Testing**: Jest setup with comprehensive test coverage
- **Tree Layout**: Horizontal layout with generation-based grouping (to be replaced with canvas)

## Resources

- [Project Overview](../family-tree/docs/project-overview.md) - Complete transformation plan
- [Upgrade Plan](../family-tree/docs/upgrade-plan.md) - Detailed implementation guidance
- [Implementation Notes](../family-tree/docs/implementation-notes.md) - Technical code examples
- [Task Tracking](../family-tree/docs/task-tracking.md) - Current task status and workflow
- [Success Criteria](../family-tree/docs/success-criteria.md) - Project goals and requirements

## Transformation Goals

- **From**: Static horizontal tree viewer with basic functionality
- **To**: Professional canvas-based design tool with full CRUD, share, and export capabilities
- **Architecture**: Maintain frontend-only approach with JSON storage
- **UI/UX**: Transform to modern design tool interface with professional toolbar
- **Performance**: Optimize for large family trees with virtual scrolling and efficient rendering

---

*This file tracks the current development focus and transformation progress.*