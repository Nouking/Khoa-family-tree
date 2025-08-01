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

**Task 1.13 (P2-HIGH): Viewport Controls (Pan & Zoom)**
- **Status**: Pending
- **Description**: Implement viewport controls for panning and zooming the canvas.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a loaded family tree on the canvas
    - WHEN the user clicks the zoom-in button
    - THEN the canvas zoom level increases by a set increment.
    - GIVEN a loaded family tree on the canvas
    - WHEN the user holds the mouse button and drags
    - THEN the canvas pans in the direction of the drag.
- **Details**: Use CSS transforms. Manage viewport state (`x`, `y`, `zoom`). Add UI controls for zoom and allow panning via mouse drag.

**Task 1.14 (P2-HIGH): Enhanced Member Banners**
- **Status**: Pending
- **Description**: Redesign the `MemberCard` into an enhanced `MemberBanner` component with relationship labels and professional styling.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a family member is displayed on the canvas
    - WHEN rendered
    - THEN it appears as a professionally styled banner with relationship labels, according to the design in `upgrade-plan.md`.
    - GIVEN a user hovers over a `MemberBanner`
    - THEN it displays a hover state.
- **Details**: Follow the design specs in `upgrade-plan.md`, including size, hover states, and context menu placeholders.

**Task 1.15 (P3-MEDIUM): Professional Toolbar**
- **Status**: Pending
- **Description**: Create the main `MainToolbar` component with essential actions like Home, Undo/Redo placeholders, Share, Export, and Add Member.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN the application is loaded
    - WHEN viewing the main canvas
    - THEN a `MainToolbar` is visible at the top of the screen.
    - GIVEN the `MainToolbar` is visible
    - THEN it contains buttons for Home, Undo/Redo (placeholders), Share, Export, and Add Member.
- **Details**: Structure the toolbar with left, center, and right sections as defined in the `upgrade-plan.md`.

---

## Phase 2: CRUD Operations & State Management (Week 2 | Priority: CRITICAL)
- **Goal**: Implement professional editing capabilities with history tracking.
- **Success Criteria**: Users can manage family members with undo/redo support.

**Task 2.1 (P1-CRITICAL): CRUD API Endpoints**
- **Status**: Pending
- **Description**: Create Next.js API routes to handle all CRUD operations for family members.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a `POST` request to `/api/members` with member data
    - THEN a new member is added to `family-tree-v2.json`.
    - GIVEN a `PUT` request to `/api/members/[id]` with updated data
    - THEN the corresponding member is updated in `family-tree-v2.json`.
    - GIVEN a `DELETE` request to `/api/members/[id]`
    - THEN the corresponding member is removed from `family-tree-v2.json`.
- **Details**: Implement API routes for `POST /api/members`, `PUT /api/members/[id]`, and `DELETE /api/members/[id]`. These routes will read and write to the `/data/family-tree-v2.json` file. Ensure proper error handling and authentication checks.

**Task 2.2 (P1-CRITICAL): Global State Management (React Context)**
- **Status**: Pending
- **Description**: Implement a global state management solution using React Context API to handle the family tree data.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN the application is loaded
    - WHEN a component accesses the family tree state
    - THEN it receives the current state from `FamilyTreeContext`.
    - GIVEN a state-changing action is dispatched
    - THEN the `useReducer` logic updates the state correctly.
- **Details**: Create `FamilyTreeContext` and `FamilyTreeDispatchContext`. Use `useReducer` for state logic. Define action types for all CRUD operations.

**Task 2.3 (P1-CRITICAL): CRUD Member Modals**
- **Status**: Pending
- **Description**: Create reusable modal components for Add, Edit, and Delete member operations.
- **Dependencies**: [2.1, 2.2]
- **Acceptance Criteria**:
    - GIVEN the "Add Member" button is clicked
    - WHEN the form is filled and submitted
    - THEN a `POST` request is sent to the API and the local state is updated on success.
    - GIVEN the "Edit" option is selected for a member
    - WHEN the form is updated and submitted
    - THEN a `PUT` request is sent to the API and the local state is updated on success.
- **Details**: Build a base modal and specific forms for adding and editing members, including validation and photo upload functionality as specified in `upgrade-plan.md`.

**Task 2.4 (P1-CRITICAL): Member Selection & Context Menu**
- **Status**: Pending
- **Description**: Implement a system for selecting single and multiple members on the canvas. Add a context menu for quick actions.
- **Dependencies**: [2.2]
- **Acceptance Criteria**:
    - GIVEN a user clicks on a member
    - THEN that member becomes selected.
    - GIVEN a user right-clicks on a selected member
    - THEN a context menu appears with "Edit" and "Delete" options.
- **Details**: Manage selection state in React Context. Use Shift/Ctrl for multi-select. The context menu should show Edit/Delete options.

**Task 2.5 (P1-CRITICAL): Dynamic Connection Recalculation**
- **Status**: Pending
- **Description**: Implement logic to dynamically recalculate and re-render the SVG connection lines when members are moved.
- **Dependencies**: [2.2]
- **Acceptance Criteria**:
    - GIVEN a member is dragged and dropped to a new position
    - WHEN the drop is complete
    - THEN the SVG connections to that member are redrawn to the new position.
- **Details**: This should be triggered after a drag-and-drop operation completes. Optimize to prevent performance issues on large trees.

**Task 2.6 (P2-HIGH): Undo/Redo History Stack**
- **Status**: Pending
- **Description**: Implement an undo/redo system for all state-changing actions.
- **Dependencies**: [2.2]
- **Acceptance Criteria**:
    - GIVEN a user performs a state-changing action (e.g., add member)
    - WHEN the "Undo" button is clicked
    - THEN the last action is reverted.
    - GIVEN an action has been undone
    - WHEN the "Redo" button is clicked
    - THEN the undone action is restored.
- **Details**: Manage a history of state snapshots (`past`, `present`, `future`). Connect this to the Undo/Redo buttons in the toolbar.

**Task 2.7 (P2-HIGH): Form Validation**
- **Status**: Pending
- **Description**: Add client-side validation for all forms in the CRUD modals.
- **Dependencies**: [2.3]
- **Acceptance Criteria**:
    - GIVEN a user is in the "Add Member" modal
    - WHEN they submit the form with a required field empty
    - THEN an error message is displayed and the form is not submitted.
- **Details**: Ensure required fields are filled, data formats are correct, and provide clear error messages to the user.

**Task 2.8 (P3-MEDIUM): Bulk Operations Support**
- **Status**: Pending
- **Description**: Add support for performing actions on multiple selected members.
- **Dependencies**: [2.4]
- **Acceptance Criteria**:
    - GIVEN multiple members are selected
    - WHEN the user chooses "Delete" from a context menu or toolbar
    - THEN all selected members are removed from the state.
- **Details**: Allow users to delete or apply certain changes to all selected members at once.

---

## Phase 3: Share & Export (Week 3 | Priority: HIGH)
- **Goal**: Enable comprehensive sharing and export capabilities.
- **Success Criteria**: Users can share and export family trees in multiple formats.

**Task 3.1 (P1-CRITICAL): Share Link System**
- **Status**: Pending
- **Description**: Implement a system to generate secure, shareable links for the family tree.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a user clicks the "Share" button
    - WHEN the `ShareModal` is open
    - THEN a unique, shareable link is generated and displayed.
    - GIVEN a user navigates to a share link (`/view/[shareCode]`)
    - THEN the corresponding family tree is loaded in a read-only view.
- **Details**: Create a `ShareModal` component. The link should encode the tree identifier. Implement the `/view/[shareCode]` page to load the shared tree.

**Task 3.2 (P1-CRITICAL): CSV Export**
- **Status**: Pending
- **Description**: Implement functionality to export the family tree data as a CSV file.
- **Dependencies**: [3.4]
- **Acceptance Criteria**:
    - GIVEN a user is in the "Export Options" modal
    - WHEN they select "CSV" and click "Export"
    - THEN a CSV file containing all member data is downloaded.
- **Details**: Include all relevant member fields. Create a utility function to convert the JSON data to a CSV string and trigger a download.

**Task 3.3 (P1-CRITICAL): PNG Image Export**
- **Status**: Pending
- **Description**: Implement functionality to export the current canvas view as a PNG image.
- **Dependencies**: [3.4]
- **Acceptance Criteria**:
    - GIVEN a user is in the "Export Options" modal
    - WHEN they select "PNG" and click "Export"
    - THEN a PNG image of the current canvas view is downloaded.
- **Details**: Use a library like `html2canvas` to capture the family tree container element and convert it to an image for download.

**Task 3.4 (P1-CRITICAL): Export Options Modal**
- **Status**: Pending
- **Description**: Create a modal to provide users with options for exporting, such as format (CSV/PNG), image dimensions, and quality.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a user clicks the "Export" button in the toolbar
    - THEN an "Export Options" modal appears.
    - GIVEN the modal is open
    - THEN it provides options to choose the export format (CSV/PNG).
- **Details**: This modal will be triggered by the 'Export' button in the toolbar.

**Task 3.5 (P2-HIGH): Share Link Validation**
- **Status**: Pending
- **Description**: Add validation for share links, with potential for expiry dates or password protection in the future.
- **Dependencies**: [3.1]
- **Acceptance Criteria**:
    - GIVEN a user tries to access a malformed or invalid share link
    - THEN they are shown a user-friendly error page.
- **Details**: For now, focus on robust encoding/decoding to prevent malformed links.

**Task 3.6 (P2-HIGH): Export Watermarking**
- **Status**: Pending
- **Description**: Add an option to include a watermark on exported images.
- **Dependencies**: [3.3, 3.4]
- **Acceptance Criteria**:
    - GIVEN a user is in the "Export Options" modal
    - WHEN they enable the "Add Watermark" option before exporting as PNG
    - THEN the downloaded image includes the specified watermark.
- **Details**: The watermark could be text or a logo, with configurable position and opacity.

**Task 3.7 (P3-MEDIUM): Batch Export**
- **Status**: Pending
- **Description**: Allow users to export data for a selection of members instead of the entire tree.
- **Dependencies**: [2.4, 3.4]
- **Acceptance Criteria**:
    - GIVEN multiple members are selected on the canvas
    - WHEN the user opens the "Export Options" modal
    - THEN an option to "Export selected members only" is available.
- **Details**: The export functions should be able to accept an array of member IDs to filter the data.

---

## Phase 4: Mobile Experience (Week 4 | Priority: HIGH)
- **Goal**: Optimize the design tool for mobile devices.
- **Success Criteria**: Full functionality available on mobile with touch support.

**Task 4.1 (P1-CRITICAL): Touch-Optimized Interface**
- **Status**: Pending
- **Description**: Adapt the canvas and controls for touch-based interactions.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a user is on a touch device
    - WHEN they drag a member on the canvas
    - THEN the member moves smoothly with their finger.
- **Details**: Implement touch event handlers for drag-and-drop, panning, and selection.

**Task 4.2 (P1-CRITICAL): Mobile Action Bar**
- **Status**: Pending
- **Description**: Create a mobile-specific action bar at the bottom of the screen for key actions.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a user is on a mobile device
    - WHEN the application loads
    - THEN an action bar is visible at the bottom of the screen.
    - GIVEN the action bar is visible
    - THEN it contains large, touch-friendly buttons for Add, Share, and Export.
- **Details**: Follow the design in `upgrade-plan.md`, with large, touch-friendly buttons for Add, Share, and Export.

**Task 4.3 (P1-CRITICAL): Touch-Friendly Selection**
- **Status**: Pending
- **Description**: Implement intuitive touch gestures for selecting members.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a user is on a touch device
    - WHEN they tap on a member
    - THEN that member becomes selected.
    - GIVEN a user taps and holds on a member
    - THEN a context menu or multi-select mode is activated.
- **Details**: Support tap-to-select and potentially tap-and-hold for multi-select or context menus.

**Task 4.4 (P1-CRITICAL): Mobile-Optimized Modals**
- **Status**: Pending
- **Description**: Ensure all modals are responsive and easy to use on small screens.
- **Dependencies**: [2.3, 3.4]
- **Acceptance Criteria**:
    - GIVEN a user on a mobile device opens any modal
    - WHEN the modal is displayed
    - THEN it takes up the full screen width and has large, touch-friendly inputs and buttons.
- **Details**: Modals should take up the full screen width, with larger form inputs and buttons.

**Task 4.5 (P2-HIGH): Pinch-to-Zoom Gesture**
- **Status**: Pending
- **Description**: Implement pinch-to-zoom functionality on the canvas for mobile devices.
- **Dependencies**: [1.13]
- **Acceptance Criteria**:
    - GIVEN a user is on a touch device
    - WHEN they use a two-finger pinch gesture on the canvas
    - THEN the canvas zooms in or out accordingly.
- **Details**: Use touch events to calculate the distance between fingers and adjust the canvas zoom level.

**Task 4.6 (P2-HIGH): Mobile Performance Optimization**
- **Status**: Pending
- **Description**: Profile and optimize canvas performance on mobile browsers.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN a user is interacting with a large family tree on a mobile device
    - WHEN panning, zooming, or dragging
    - THEN the interactions remain smooth and responsive (e.g., maintain >30fps).
- **Details**: May involve throttling events, simplifying rendering during interactions, or using `requestAnimationFrame`.

**Task 4.7 (P3-MEDIUM): Offline Support (Future Consideration)**
- **Status**: Pending
- **Description**: Explore options for allowing offline editing on mobile devices.
- **Dependencies**: None
- **Acceptance Criteria**:
    - GIVEN the device goes offline while the user is editing
    - WHEN changes are made
    - THEN the changes are saved locally and synced when the connection is restored.
- **Details**: Could involve using Service Workers and local storage to cache data and sync when back online. This is a lower priority.

---

*See [Completed Tasks](./completed-tasks.md) for finished work.*
