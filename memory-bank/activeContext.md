# Active Context

## Current Focus

**Project Transformation**: Converting basic family tree viewer into professional design tool
- **Current Status**: Phase 1 - Next.js 15 migration and enhanced data structure
- **Foundation**: Basic family tree visualization completed, ready for canvas transformation
- **Next Steps**: Complete Next.js 15 migration tasks (1.10-1.12) before canvas implementation
- **Priority**: Establish enhanced data structure with position/size fields for canvas system

## Recent Changes

- ✅ **Completed Codemod Application (Task 1.9)**:
  - Applied `next-og-import`, `built-in-next-font`, `new-link`, and `metadata-to-viewport-export` codemods.
  - Ensured compatibility with Next.js 15.

- ✅ **Completed Foundation Tasks (1.1-1.8)** with comprehensive implementation:
  - Next.js 15 setup with TypeScript and Tailwind CSS
  - MemberCard component with photo display and responsive design
  - FamilyTree component with horizontal layout and SVG connections
  - TreeConnection component for parent-child and spouse relationships
  - Sample data with 6 Vietnamese family members and realistic relationships
  - Responsive design foundation with viewport detection and adaptive spacing
  - Complete data utilities with CRUD operations
  - Comprehensive unit tests with TDD principles
  - API and Page components migrated to Next.js 15

- 🔄 **In Progress - Next.js 15 Migration (Tasks 1.10-1.12)**:
  - Task 1.10: Enhanced Data Structure - Adding position, size, relationship fields
  - Task 1.11: Data Migration Utility - Converting existing JSON to new format
  - Task 1.12: Canvas Foundation - Basic canvas setup with drag-and-drop types

## Next Steps

1. **Immediate (Complete Phase 1 Migration)**:
   - Implement enhanced TypeScript interfaces with position/size fields (Task 1.10)
   - Create data migration utility for existing family tree data (Task 1.11)
   - Set up canvas foundation with drag-and-drop types (Task 1.12)

2. **Short-term (Phase 2 - Canvas & UI Enhancement)**:
   - Implement interactive canvas with drag-and-drop positioning (Task 2.1)
   - Create professional toolbar with essential actions (Task 2.2)
   - Enhance member cards to rounded banners with relationship labels (Task 2.3)
   - Add viewport controls (pan, zoom) for canvas navigation (Task 2.4)
   - Implement undo/redo functionality with history stack (Task 2.5)
   - Add professional grid system with snap functionality (Task 2.6)

3. **Medium-term (Phase 3 - CRUD Operations)**:
   - Set up React Context for global state management (Task 3.1)
   - Create modal components for add/edit/delete operations (Task 3.2)
   - Implement core CRUD operations with error handling (Task 3.3)
   - Add member selection and multi-select functionality (Task 3.4)
   - Implement position management on canvas (Task 3.5)
   - Create connection management system (Task 3.6)

## Active Decisions

- **Transformation Strategy**: Complete Next.js 15 migration before canvas implementation
- **Data Structure Enhancement**: Adding position, size, and relationship fields to FamilyMember interface
- **Canvas Approach**: Interactive canvas with absolute positioning and drag-and-drop
- **UI/UX Direction**: Professional design tool interface similar to Canva/Figma
- **Mobile Strategy**: Touch-optimized interface with mobile-specific action bar
- **Performance**: Virtual scrolling and memory optimization for large family trees

## Technical Considerations

- Next.js 15 migration must be completed before canvas implementation
- Enhanced data structure with position/size fields is critical for canvas system
- Canvas implementation will replace current horizontal tree layout
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