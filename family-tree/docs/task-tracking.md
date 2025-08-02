# Task Tracking

> **Project Transformation** - Converting basic family tree viewer into professional design tool

*This document is aligned with [project-goal.md](../../project-goal.md) and [upgrade-plan.md](./upgrade-plan.md) and serves as the primary source for task management.*

## 📋 Task Status Legend
- **Pending**: Not yet started
- **In Progress**: Currently being worked on
- **Completed**: Finished successfully
- **In Review**: Ready for testing and review
- **Blocked**: Unable to proceed due to external factors
- **Error**: Task failed with issues that need resolution

## 🚀 Development Workflow
**BEFORE starting any task**, follow this Git workflow:

1. **Git Setup**: `git checkout main` → `git pull` → `git checkout -b task{ID}-{description}`
2. **TDD Flow**: Run tests → Write tests → Implement → Test again
3. **Document & Commit**: Update docs → Commit → Push → PR → Merge

**See [Git Workflow Guidelines](./git-workflow.md) for detailed procedures.**
**See [Memory Bank Tasks](../../memory-bank/tasks.md) for current task status.**

## Context7 Integration
Always use these library IDs for accurate documentation:

| Technology | Context7 ID | Use Case |
|------------|-------------|----------|
| Next.js 15 | `/vercel/next.js` | Async patterns, routing |
| TypeScript | `/microsoft/typescript` | Type definitions |
| Tailwind CSS | `/tailwindlabs/tailwindcss` | Styling |
| React DnD | `/react-dnd/react-dnd` | Canvas drag-and-drop |
| html2canvas | `/niklasvh/html2canvas` | Tree export |
| JWT | `/auth0/node-jsonwebtoken` | Authentication |
| React Testing | `/testing-library/react-testing-library` | Testing |

---

## Phase 1: Enhanced UI Foundation (Week 1 | Priority: CRITICAL)
- **Goal**: Transform the basic viewer into a canvas-based design tool.
- **Success Criteria**: Users can interact with family tree on a professional canvas interface.

**Task 1.12 (P1-CRITICAL): Drag-and-Drop Functionality**
- **Status**: Pending
- **Description**: Add drag-and-drop functionality for `MemberBanner` components on the canvas.
- **Details**: Use native browser events or a library like `react-dnd`. Update the member's `position` in the state and persist it.

**Task 1.13 (P2-HIGH): Viewport Controls (Pan & Zoom)**
- **Status**: Pending
- **Description**: Implement viewport controls for panning and zooming the canvas.
- **Details**: Use CSS transforms. Manage viewport state (`x`, `y`, `zoom`). Add UI controls for zoom and allow panning via mouse drag.

**Task 1.14 (P2-HIGH): Enhanced Member Banners**
- **Status**: Pending
- **Description**: Redesign the `MemberCard` into an enhanced `MemberBanner` component with relationship labels and professional styling.
- **Details**: Follow the design specs in `upgrade-plan.md`, including size, hover states, and context menu placeholders.

**Task 1.15 (P3-MEDIUM): Professional Toolbar**
- **Status**: Pending
- **Description**: Create the main `MainToolbar` component with essential actions like Home, Undo/Redo placeholders, Share, Export, and Add Member.
- **Details**: Structure the toolbar with left, center, and right sections as defined in the `upgrade-plan.md`.

---

## Phase 2: CRUD Operations & State Management (Week 2 | Priority: CRITICAL)
- **Goal**: Implement professional editing capabilities with history tracking.
- **Success Criteria**: Users can manage family members with undo/redo support.

**Task 2.2 (P1-CRITICAL): Global State Management (React Context)**
- **Status**: Pending
- **Description**: Implement a global state management solution using React Context API to handle the family tree data.
- **Details**: Create `FamilyTreeContext` and `FamilyTreeDispatchContext`. Use `useReducer` for state logic. Define action types for all CRUD operations.

**Task 2.3 (P1-CRITICAL): CRUD Member Modals**
- **Status**: Pending
- **Description**: Create reusable modal components for Add, Edit, and Delete member operations.
- **Details**: Build a base modal and specific forms for adding and editing members, including validation and photo upload functionality as specified in `upgrade-plan.md`.

**Task 2.4 (P1-CRITICAL): Member Selection & Context Menu**
- **Status**: Pending
- **Description**: Implement a system for selecting single and multiple members on the canvas. Add a context menu for quick actions.
- **Details**: Manage selection state in React Context. Use Shift/Ctrl for multi-select. The context menu should show Edit/Delete options.

**Task 2.5 (P1-CRITICAL): Dynamic Connection Recalculation**
- **Status**: Pending
- **Description**: Implement logic to dynamically recalculate and re-render the SVG connection lines when members are moved.
- **Details**: This should be triggered after a drag-and-drop operation completes. Optimize to prevent performance issues on large trees.

**Task 2.6 (P2-HIGH): Undo/Redo History Stack**
- **Status**: Pending
- **Description**: Implement an undo/redo system for all state-changing actions.
- **Details**: Manage a history of state snapshots (`past`, `present`, `future`). Connect this to the Undo/Redo buttons in the toolbar.

**Task 2.7 (P2-HIGH): Form Validation**
- **Status**: Pending
- **Description**: Add client-side validation for all forms in the CRUD modals.
- **Details**: Ensure required fields are filled, data formats are correct, and provide clear error messages to the user.

**Task 2.8 (P3-MEDIUM): Bulk Operations Support**
- **Status**: Pending
- **Description**: Add support for performing actions on multiple selected members.
- **Details**: Allow users to delete or apply certain changes to all selected members at once.

---

## Phase 3: Share & Export (Week 3 | Priority: HIGH)
- **Goal**: Enable comprehensive sharing and export capabilities.
- **Success Criteria**: Users can share and export family trees in multiple formats.

**Task 3.1 (P1-CRITICAL): Share Link System**
- **Status**: Pending
- **Description**: Implement a system to generate secure, shareable links for the family tree.
- **Details**: Create a `ShareModal` component. The link should encode the tree identifier. Implement the `/view/[shareCode]` page to load the shared tree.

**Task 3.2 (P1-CRITICAL): CSV Export**
- **Status**: Pending
- **Description**: Implement functionality to export the family tree data as a CSV file.
- **Details**: Include all relevant member fields. Create a utility function to convert the JSON data to a CSV string and trigger a download.

**Task 3.3 (P1-CRITICAL): PNG Image Export**
- **Status**: Pending
- **Description**: Implement functionality to export the current canvas view as a PNG image.
- **Details**: Use a library like `html2canvas` to capture the family tree container element and convert it to an image for download.

**Task 3.4 (P1-CRITICAL): Export Options Modal**
- **Status**: Pending
- **Description**: Create a modal to provide users with options for exporting, such as format (CSV/PNG), image dimensions, and quality.
- **Details**: This modal will be triggered by the 'Export' button in the toolbar.

**Task 3.5 (P2-HIGH): Share Link Validation**
- **Status**: Pending
- **Description**: Add validation for share links, with potential for expiry dates or password protection in the future.
- **Details**: For now, focus on robust encoding/decoding to prevent malformed links.

**Task 3.6 (P2-HIGH): Export Watermarking**
- **Status**: Pending
- **Description**: Add an option to include a watermark on exported images.
- **Details**: The watermark could be text or a logo, with configurable position and opacity.

**Task 3.7 (P3-MEDIUM): Batch Export**
- **Status**: Pending
- **Description**: Allow users to export data for a selection of members instead of the entire tree.
- **Details**: The export functions should be able to accept an array of member IDs to filter the data.

---

## Phase 4: Mobile Experience (Week 4 | Priority: HIGH)
- **Goal**: Optimize the design tool for mobile devices.
- **Success Criteria**: Full functionality available on mobile with touch support.

**Task 4.1 (P1-CRITICAL): Touch-Optimized Interface**
- **Status**: Pending
- **Description**: Adapt the canvas and controls for touch-based interactions.
- **Details**: Implement touch event handlers for drag-and-drop, panning, and selection.

**Task 4.2 (P1-CRITICAL): Mobile Action Bar**
- **Status**: Pending
- **Description**: Create a mobile-specific action bar at the bottom of the screen for key actions.
- **Details**: Follow the design in `upgrade-plan.md`, with large, touch-friendly buttons for Add, Share, and Export.

**Task 4.3 (P1-CRITICAL): Touch-Friendly Selection**
- **Status**: Pending
- **Description**: Implement intuitive touch gestures for selecting members.
- **Details**: Support tap-to-select and potentially tap-and-hold for multi-select or context menus.

**Task 4.4 (P1-CRITICAL): Mobile-Optimized Modals**
- **Status**: Pending
- **Description**: Ensure all modals are responsive and easy to use on small screens.
- **Details**: Modals should take up the full screen width, with larger form inputs and buttons.

**Task 4.5 (P2-HIGH): Pinch-to-Zoom Gesture**
- **Status**: Pending
- **Description**: Implement pinch-to-zoom functionality on the canvas for mobile devices.
- **Details**: Use touch events to calculate the distance between fingers and adjust the canvas zoom level.

**Task 4.6 (P2-HIGH): Mobile Performance Optimization**
- **Status**: Pending
- **Description**: Profile and optimize canvas performance on mobile browsers.
- **Details**: May involve throttling events, simplifying rendering during interactions, or using `requestAnimationFrame`.

**Task 4.7 (P3-MEDIUM): Offline Support (Future Consideration)**
- **Status**: Pending
- **Description**: Explore options for allowing offline editing on mobile devices.
- **Details**: Could involve using Service Workers and local storage to cache data and sync when back online. This is a lower priority.

---

*See [Completed Tasks](./completed-tasks.md) for finished work.*
