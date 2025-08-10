# Family Tree Improvement Task Tracking

> Policy: This tracker keeps full details only for Pending/In Progress tasks. Completed tasks are summarized here and linked to their full write-ups in `family-tree/docs/completed-tasks.md` to prevent file bloat.

> **Agent-Ready Implementation Plan** - Structured for @pm, @po, @sm workflow integration

This document breaks down the IMPROVEMENT-PLAN.md into actionable epics and tasks that AI agents can easily read and execute following the established project workflow.

## 📋 Task Status Legend
- **Pending**: Not yet started
- **In Progress**: Currently being worked on  
- **Completed**: Finished successfully
- **In Review**: Ready for testing and review
- **Blocked**: Unable to proceed due to external factors
- **Error**: Task failed with issues that need resolution

## 🎯 Agent Workflow Integration

### Git Branch Naming Convention
- **Format**: `improvement-{epic-id}-{task-id}-{kebab-case-description}`
- **Example**: `improvement-e1-t1-file-audit-documentation`

### Agent Responsibilities & Capabilities

**Core Project Management:**
- **@pm (John)**: Epic planning, PRD validation, strategic decisions, feature prioritization
- **@po (Sarah)**: Task validation, quality assurance, acceptance criteria verification, process adherence
- **@sm (Bob)**: Story creation, task breakdown, developer handoff preparation, agile facilitation

**Technical Implementation:**
- **@analyst (Mary)**: Market research, project discovery, competitive analysis, brainstorming sessions
- **@architect (Winston)**: System design, technology selection, architecture documentation, technical strategy
- **@dev (James)**: Code implementation, debugging, refactoring, development execution
- **@qa (Quinn)**: Code review, test planning, quality assurance, senior mentoring
- **@ux-expert (Sally)**: UI/UX design, wireframes, prototypes, user experience optimization

**Multi-Role Collaboration:**
Tasks are assigned primary agents with supporting agents based on expertise overlap. Complex tasks leverage 2-3 agents working together for comprehensive coverage.

---

## Epic 1: Technical Debt Resolution 🧹
**Priority**: Medium | **Estimated Timeline**: 1-2 weeks
**Goal**: Clean and optimize codebase while preserving all functionality
**Success Criteria**: Cleaner codebase with improved maintainability and zero functionality loss

### E1-T1: File System Audit & Cleanup (P2-MEDIUM) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e1-t1-file-audit-documentation`
- Summary: Audit completed; minimal cleanup; `.next/` ignored; `.DS_Store` safe to remove
- Details: See Completed Log → [E1-T1](family-tree/docs/completed-tasks.md#e1-t1)

### E1-T2: Library Structure Consolidation (P3-LOW) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e1-t2-library-consolidation`
- Summary: Already consolidated; imports correct; tests pass
- Details: See Completed Log → [E1-T2](family-tree/docs/completed-tasks.md#e1-t2)

### E1-T3: Import Statement Optimization (P3-LOW) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e1-t3-import-optimization`
- Summary: Standardized imports, removed unused, TS clean
- Details: See Completed Log → [E1-T3](family-tree/docs/completed-tasks.md#e1-t3)

### E1-T4: Component Structure Analysis (P3-LOW) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e1-t4-component-analysis`
- Summary: Architecture analyzed; reusable patterns and refactor recs documented
- Link: [Completed Log → E1-T4](family-tree/docs/completed-tasks.md#e1-t4)

### E1-T5: Create Shared Form Component (P1-HIGH)
- **Status**: Pending
- **Primary Agent**: @dev (James - Form component implementation)
- **Supporting Agents**: @ux-expert (Sally - Form UX consistency), @qa (Quinn - Testing strategy)
- **Description**: Extract shared form logic from AddMemberModal and EditMemberModal into reusable component
- **Dependencies**: [E1-T4] ✅ **COMPLETED**
- **Acceptance Criteria**:
  - GIVEN AddMemberModal and EditMemberModal have 95% duplicate form code
  - WHEN creating shared MemberForm component
  - THEN eliminate 600+ lines of duplicate code
  - AND maintain exact same functionality and validation
  - AND improve form consistency across modals
- **Implementation Details**:
  - Create `app/components/shared/MemberForm.tsx` with unified form logic
  - Extract validation logic to `app/lib/validation/memberValidation.ts`
  - Update AddMemberModal and EditMemberModal to use shared component
  - Ensure all existing functionality is preserved
  - Add comprehensive tests for shared component
- **Branch**: `improvement-e1-t5-shared-form-component`

### E1-T6: Consolidate Member Display Components (P1-HIGH) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e1-t6-member-display-consolidation`
- Summary: Removed unused `MemberCard`; standardized on `MemberBanner`; tests pass
- Link: [Completed Log → E1-T6](family-tree/docs/completed-tasks.md#e1-t6)

### E1-T7: Extract Member Validation Logic (P2-HIGH)
- **Status**: Pending  
- **Primary Agent**: @dev (James - Utility extraction)
- **Supporting Agents**: @qa (Quinn - Testing validation), @sm (Bob - Task preparation)
- **Description**: Extract identical validation logic from modal forms into shared utility
- **Dependencies**: [E1-T4] ✅ **COMPLETED**
- **Acceptance Criteria**:
  - GIVEN identical validation exists in AddMemberModal and EditMemberModal
  - WHEN creating shared validation utility
  - THEN centralize all member validation logic
  - AND make validation easily testable in isolation
  - AND maintain existing validation behavior
- **Implementation Details**:
  - Create `app/lib/validation/memberValidation.ts` with validation functions
  - Extract form validation rules and error messages
  - Update modals to use shared validation
  - Add comprehensive unit tests for validation logic
  - Ensure TypeScript types are properly exported
- **Branch**: `improvement-e1-t7-validation-extraction`

---

## Epic 2: Documentation Enhancement 📚
**Priority**: High | **Estimated Timeline**: 1 week  
**Goal**: Consolidate and optimize documentation for better AI readability and developer experience
**Success Criteria**: Unified, well-structured documentation system optimized for AI analysis

### E2-T1: Documentation Inventory & Analysis (P1-CRITICAL) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e2-t1-documentation-inventory`
- Summary: Comprehensive docs audit; overlaps identified; AI readability assessed
- Link: [Completed Log → E2-T1](family-tree/docs/completed-tasks.md#e2-t1)

### E2-T2: Documentation Consolidation Strategy (P1-CRITICAL) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e2-t2-documentation-strategy`
- Summary: Strategy defined to merge overlaps, standardize formatting, improve organization
- Link: [Completed Log → E2-T2](family-tree/docs/completed-tasks.md#e2-t2)

### E2-T3: AI-Optimized Documentation Structure (P1-CRITICAL) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e2-t3-ai-optimized-docs`
- Summary: Consolidated docs implemented with AI-optimized formatting and navigation
- Link: [Completed Log → E2-T3](family-tree/docs/completed-tasks.md#e2-t3)

### E2-T4: Documentation Validation & Testing (P2-HIGH) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e2-t4-documentation-validation`
- Summary: Validated consolidated docs with agent workflows; feedback incorporated
- Link: [Completed Log → E2-T4](family-tree/docs/completed-tasks.md#e2-t4)

---

## Epic 3: Feature Completion 🚀  
**Priority**: High | **Estimated Timeline**: 2 weeks
**Goal**: Complete remaining features from existing task-tracking.md
**Success Criteria**: Full implementation of share/export system and mobile optimization

### E3-T1: Share Link System Implementation (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @dev (James - Backend implementation)
- **Supporting Agents**: @sm (Bob - Story preparation), @architect (Winston - Security design), @qa (Quinn - Security validation)
- **Description**: Implement secure shareable links for family trees (from Task 3.1 in task-tracking.md)
- **Dependencies**: None
- **Acceptance Criteria**:
  - GIVEN a user clicks the "Share" button
  - WHEN the ShareModal is open  
  - THEN a unique, shareable link is generated and displayed
  - GIVEN a user navigates to a share link (`/view/[shareCode]`)
  - THEN the corresponding family tree is loaded in read-only view
- **Implementation Details**:
  - Create ShareModal component with link generation
  - Implement `/view/[shareCode]` page route
  - Add secure share code generation and validation
  - Create read-only view for shared family trees
- **Branch**: `improvement-e3-t1-share-link-system`

### E3-T2: Export Options Modal (P1-CRITICAL)
- **Status**: Pending  
- **Primary Agent**: @ux-expert (Sally - UI/UX design)
- **Supporting Agents**: @sm (Bob - Story preparation), @dev (James - Implementation), @qa (Quinn - Usability validation)
- **Description**: Create export options modal for CSV and PNG exports (from Task 3.4 in task-tracking.md)
- **Dependencies**: None
- **Acceptance Criteria**:
  - GIVEN a user clicks the "Export" button in toolbar
  - THEN an "Export Options" modal appears
  - GIVEN the modal is open
  - THEN it provides options to choose export format (CSV/PNG)
- **Implementation Details**:
  - Create ExportModal component with format selection
  - Add export options for CSV and PNG formats
  - Include quality and dimension settings for PNG
  - Integrate with existing toolbar export button
- **Branch**: `improvement-e3-t2-export-options-modal`

### E3-T3: CSV Export Implementation (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @dev (James - Data processing implementation)
- **Supporting Agents**: @sm (Bob - Story preparation), @architect (Winston - Data format design), @qa (Quinn - Export validation)
- **Description**: Implement CSV export functionality (from Task 3.2 in task-tracking.md)
- **Dependencies**: [E3-T2] ✅
- **Acceptance Criteria**:
  - GIVEN a user is in "Export Options" modal
  - WHEN they select "CSV" and click "Export"
  - THEN a CSV file containing all member data is downloaded
- **Implementation Details**:
  - Create CSV conversion utility function
  - Include all relevant member fields in export
  - Implement file download trigger mechanism
  - Add progress indication for large exports
- **Branch**: `improvement-e3-t3-csv-export-implementation`

### E3-T4: PNG Image Export Implementation (P1-CRITICAL)  
- **Status**: Pending
- **Primary Agent**: @dev (James - Canvas export implementation)
- **Supporting Agents**: @sm (Bob - Story preparation), @architect (Winston - Technical approach), @qa (Quinn - Quality validation)
- **Description**: Implement PNG image export of canvas view (from Task 3.3 in task-tracking.md)
- **Dependencies**: [E3-T2] ✅
- **Acceptance Criteria**:
  - GIVEN a user is in "Export Options" modal
  - WHEN they select "PNG" and click "Export"  
  - THEN a PNG image of current canvas view is downloaded
- **Implementation Details**:
  - Integrate html2canvas library for image capture
  - Capture family tree container element as image
  - Include quality and dimension options
  - Handle large canvas export optimization
- **Branch**: `improvement-e3-t4-png-export-implementation`

### E3-T5: Mobile Touch Interface (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Mobile UX design)
- **Supporting Agents**: @dev (James - Touch implementation), @sm (Bob - Story preparation), @qa (Quinn - Cross-device testing)
- **Description**: Implement touch-optimized interface for mobile devices (from Tasks 4.1-4.3 in task-tracking.md)  
- **Dependencies**: None
- **Acceptance Criteria**:
  - GIVEN a user is on a touch device
  - WHEN they interact with the canvas
  - THEN touch gestures work for drag, select, and navigation
  - AND mobile action bar is visible with touch-friendly buttons
- **Implementation Details**:
  - Implement touch event handlers for drag-and-drop
  - Create mobile-specific action bar component
  - Add touch-friendly selection mechanisms
  - Optimize modal display for mobile screens
- **Branch**: `improvement-e3-t5-mobile-touch-interface`

---

## Epic 4: Performance & Scalability 📊
**Priority**: Medium | **Estimated Timeline**: 1 week
**Goal**: Optimize application performance for larger family trees and better user experience  
**Success Criteria**: Improved performance metrics and scalability for 500+ members

### E4-T1: Performance Baseline & Analysis (P2-HIGH)
- **Status**: Pending  
- **Primary Agent**: @analyst (Mary - Performance research & analysis)
- **Supporting Agents**: @qa (Quinn - Quality metrics validation), @architect (Winston - Technical bottleneck analysis)
- **Description**: Establish performance baselines and identify optimization opportunities
- **Dependencies**: None
- **Acceptance Criteria**:
  - GIVEN the application needs performance optimization
  - WHEN analyzing current performance metrics
  - THEN establish baseline metrics for key operations
  - AND identify specific performance bottlenecks
  - AND create optimization priority list
- **Implementation Details**:
  - Profile canvas rendering performance
  - Measure memory usage with large family trees
  - Analyze bundle size and loading performance
  - Document performance with 100+ and 500+ members
- **Branch**: `improvement-e4-t1-performance-baseline`

### E4-T2: Canvas Rendering Optimization (P2-HIGH)
- **Status**: Pending
- **Primary Agent**: @dev (James - Performance optimization implementation)
- **Supporting Agents**: @architect (Winston - Technical approach), @sm (Bob - Task preparation), @qa (Quinn - Performance validation)
- **Description**: Optimize canvas rendering for larger family trees  
- **Dependencies**: [E4-T1] ✅
- **Acceptance Criteria**:
  - GIVEN large family trees cause performance issues
  - WHEN implementing canvas optimizations
  - THEN rendering performance improves for 500+ members
  - AND smooth interactions maintained during pan/zoom
- **Implementation Details**:
  - Implement virtualization for off-screen members
  - Optimize SVG connection rendering
  - Add throttling for drag and zoom events
  - Use requestAnimationFrame for smooth animations
- **Branch**: `improvement-e4-t2-canvas-optimization`

### E4-T3: Bundle Size Optimization (P3-MEDIUM)
- **Status**: Pending
- **Primary Agent**: @architect (Winston - Bundle analysis & optimization)
- **Supporting Agents**: @dev (James - Implementation), @sm (Bob - Task preparation), @qa (Quinn - Build validation)
- **Description**: Analyze and optimize application bundle size
- **Dependencies**: [E4-T1] ✅
- **Acceptance Criteria**:
  - GIVEN application bundle needs optimization
  - WHEN analyzing bundle composition
  - THEN identify opportunities for size reduction
  - AND implement code splitting where beneficial
- **Implementation Details**:
  - Analyze current bundle size with webpack-bundle-analyzer
  - Implement code splitting for large components
  - Review and remove unnecessary dependencies
  - Optimize image and asset loading
- **Branch**: `improvement-e4-t3-bundle-optimization`

### E4-T4: Memory Management Enhancement (P3-MEDIUM)
- **Status**: Pending
- **Primary Agent**: @dev (James - Memory optimization implementation)
- **Supporting Agents**: @architect (Winston - Memory architecture), @qa (Quinn - Memory leak testing), @sm (Bob - Task preparation)
- **Description**: Improve memory management for large family trees
- **Dependencies**: [E4-T2] ✅
- **Acceptance Criteria**:
  - GIVEN large family trees cause memory issues
  - WHEN implementing memory optimizations
  - THEN memory usage remains stable with 500+ members
  - AND no memory leaks during extended usage
- **Implementation Details**:
  - Implement proper cleanup in useEffect hooks
  - Optimize state management for large datasets
  - Add memory usage monitoring and alerts
  - Implement efficient data structures for relationships
- **Branch**: `improvement-e4-t4-memory-optimization`

---

## Implementation Guidelines 📋

### Pre-Implementation Checklist
- [ ] Review acceptance criteria with appropriate agent (@pm/@po/@sm)
- [ ] Create feature branch following naming convention
- [ ] Establish test baseline for affected functionality
- [ ] Document current behavior before changes

### Implementation Protocol  
- [ ] Follow TDD approach: write tests first, then implement
- [ ] Make incremental changes with frequent commits
- [ ] Run full test suite after each significant change
- [ ] Update documentation as changes are made
- [ ] Validate with appropriate agent before marking complete

### Post-Implementation Validation
- [ ] All tests pass (unit, integration, e2e if applicable)
- [ ] Performance metrics maintained or improved
- [ ] Documentation updated and accurate
- [ ] Code review completed with appropriate agent
- [ ] Task marked complete only after all criteria met

---

## Success Metrics 📈

### Epic 1 - Technical Debt Resolution
- Zero functionality regressions after cleanup
- Improved code maintainability scores
- Reduced build warnings and errors
- Cleaner project structure with consistent patterns

### Epic 2 - Documentation Enhancement  
- Improved AI agent task completion rates
- Faster developer onboarding times
- Consolidated documentation with no information loss
- Enhanced searchability and navigation

### Epic 3 - Feature Completion
- 100% implementation of share/export system
- Fully functional mobile experience
- User satisfaction with new features
- Stable performance across all platforms

### Epic 4 - Performance & Scalability
- Support for 500+ family members without performance degradation
- Improved loading times and responsiveness
- Reduced memory usage and bundle size
- Smooth interactions on all devices

---

## Epic 5: Visual Design System Enhancement 🎨
**Priority**: High | **Estimated Timeline**: 2-3 weeks  
**Goal**: Transform the visual design from functional to delightful while maintaining usability
**Success Criteria**: Modern, warm design system that enhances family connection experience

### E5-T1: Design System Foundation (P1-CRITICAL) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e5-t1-design-system-foundation`
- Summary: Tokens added to `globals.css`; docs authored; verified
- Link: [Completed Log → E5-T1](family-tree/docs/completed-tasks.md#e5-t1)

### E5-T2: Enhanced Member Card Design (P1-CRITICAL) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e5-t2-enhanced-member-cards`
- Summary: Applied tokens and states to `MemberBanner`; accessibility preserved
- Link: [Completed Log → E5-T2](family-tree/docs/completed-tasks.md#e5-t2)

### E5-T3: Navigation & Toolbar Enhancement (P1-CRITICAL) ✅
- Status: Completed - 2025-08-08 | Branch: `improvement-e5-t3-navigation-enhancement`
- Summary: Tokenized toolbar with responsive/mobile-first layout and focus rings
- Link: [Completed Log → E5-T3](family-tree/docs/completed-tasks.md#e5-t3)

### E5-T4: Canvas & Connection Visual Enhancement (P2-HIGH) ✅
- Status: Completed - 2025-08-09 | Branch: `improvement-e5-t4-canvas-enhancement`
- Summary: Layered background, tokenized connection styles, double-line spouse; tests updated
- Link: [Completed Log → E5-T4](family-tree/docs/completed-tasks.md#e5-t4)

---

## Epic 6: User Experience & Interaction Enhancement 💫
**Priority**: High | **Estimated Timeline**: 2-3 weeks
**Goal**: Improve user interactions, feedback systems, and overall usability following modern UX patterns
**Success Criteria**: Intuitive, delightful user experience with clear feedback and easy navigation

### E6-T1: Interactive Feedback System (P1-CRITICAL) ✅
- Status: Completed - 2025-08-09 | Branch: `improvement-e6-t1-interactive-feedback`
- Summary: Buttons, skeletons, toasts; tokenized and accessible
- Link: [Completed Log → E6-T1](family-tree/docs/completed-tasks.md#e6-t1)

### E6-T2: Enhanced Modal System (P1-CRITICAL) ✅
- Status: Completed - 2025-08-09 | Branch: `improvement-e6-t2-enhanced-modals`
- Summary: Animations, responsive variants, focus trap; tests updated
- Link: [Completed Log → E6-T2](family-tree/docs/completed-tasks.md#e6-t2)

### E6-T3: Search & Filter Interface (P2-HIGH) ✅
- Status: Completed - 2025-08-09 | Branch: `improvement-e6-t3-search-filter-interface`
- Summary: Toolbar search, FiltersPanel, fuzzy results + highlight; persisted history
- Link: [Completed Log → E6-T3](family-tree/docs/completed-tasks.md#e6-t3)

### E6-T4: Onboarding & Help System (P2-HIGH) ✅
- Status: Completed - 2025-08-09 | Branch: `improvement-e6-t4-onboarding-help`
- Summary: Tour, tips, help panel, empty-state; persisted preferences
- Link: [Completed Log → E6-T4](family-tree/docs/completed-tasks.md#e6-t4)

---

## Epic 7: Mobile & Responsive Enhancement 📱
**Priority**: High | **Estimated Timeline**: 2-3 weeks
**Goal**: Create excellent mobile experience with touch-optimized interactions following mobile-first principles
**Success Criteria**: Fully functional, intuitive mobile interface with native-like touch gestures

### E7-T1: Mobile-First Layout System (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Mobile UX design)
- **Supporting Agents**: @dev (James - Responsive implementation), @architect (Winston - Performance optimization)
- **Description**: Design comprehensive mobile layout system that applies E5-T1 spacing and typography tokens across breakpoints for consistent scale and readability (mobile-first)
- **Dependencies**: [E5-T1] ✅, [E5-T3] ✅
- **Acceptance Criteria**:
  - GIVEN mobile users need optimized experience
  - WHEN implementing mobile-first design
  - THEN interface adapts seamlessly across all device sizes (320px to 4K)
  - AND touch targets meet accessibility guidelines (44px minimum with 8px spacing)
  - AND mobile navigation is intuitive and efficient with thumb-friendly zones
  - AND text remains readable without horizontal scrolling on all devices
- **Implementation Details**:
  - Design mobile toolbar with collapsible/expandable sections using CSS Grid
  - Create touch-friendly button sizing: small (32px), medium (40px), large (48px)
  - Implement swipe gestures for common actions using touch event handlers
  - Design mobile-specific modal layouts with bottom sheet patterns
  - Add mobile zoom and pan controls for canvas with pinch-to-zoom support
  - Use CSS Container Queries where supported with flexbox fallbacks
- **Branch**: `improvement-e7-t1-mobile-layout-system`

### E7-T2: Touch Gesture Implementation (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @dev (James - Touch implementation)
- **Supporting Agents**: @ux-expert (Sally - Gesture design), @qa (Quinn - Cross-device testing)
- **Description**: Implement touch gestures with token-driven visual feedback (hover/active/selected colors, elevation on press) ensuring consistency with E5-T1 design system
- **Dependencies**: [E7-T1] ✅
- **Acceptance Criteria**:
  - GIVEN mobile users interact through touch
  - WHEN implementing touch gestures
  - THEN pinch-to-zoom works smoothly on canvas with momentum and boundaries
  - AND drag-and-drop works with touch events and provides visual feedback
  - AND long-press triggers context menus with haptic feedback where available
  - AND gestures follow platform conventions (iOS/Android)
- **Implementation Details**:
  - Implement pinch-to-zoom for canvas navigation using touch events and transform matrices
  - Add touch-based drag and drop for member positioning with momentum and snap-to-grid
  - Create long-press context menu activation (500ms threshold) with visual feedback
  - Add swipe gestures for modal navigation and dismissal
  - Implement touch-based selection (tap to select, double-tap for actions)
  - Use passive event listeners for better scroll performance
- **Branch**: `improvement-e7-t2-touch-gestures`

### E7-T3: Mobile Action System (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Mobile action design)
- **Supporting Agents**: @dev (James - Implementation), @po (Sarah - Mobile UX validation)
- **Description**: Create mobile-optimized action system styled with E5-T1 tokens (FAB brand colors, contrast text, elevation, radii, spacing) using native mobile patterns
- **Dependencies**: [E7-T2] ✅
- **Acceptance Criteria**:
  - GIVEN mobile interface needs efficient action access
  - WHEN designing mobile action system
  - THEN floating action button provides quick access to primary actions
  - AND context-sensitive bottom sheets show relevant options
  - AND actions are easily discoverable and accessible with one-handed operation
  - AND action system works in both portrait and landscape orientations
- **Implementation Details**:
  - Design floating action button (FAB) for primary actions with expansion menu
  - Create bottom sheet interface for action menus with drag handles and momentum scrolling
  - Implement slide-up panels for editing forms with keyboard-aware positioning
  - Add quick actions overlay for selected members with radial menu pattern
  - Design mobile-friendly bulk operation interface with selection modes
  - Use CSS transforms for smooth sheet animations and backdrop filters
- **Branch**: `improvement-e7-t3-mobile-actions`

### E7-T4: Mobile Performance Optimization (P2-HIGH)
- **Status**: Pending
- **Primary Agent**: @architect (Winston - Mobile performance)
- **Supporting Agents**: @dev (James - Implementation), @qa (Quinn - Performance testing)
- **Description**: Optimize mobile performance ensuring token-based styles (colors, elevations) remain efficient; maintain smooth interactions and minimal layout shift when tokens or themes change
- **Dependencies**: [E7-T3] ✅
- **Acceptance Criteria**:
  - GIVEN mobile devices have performance constraints
  - WHEN optimizing for mobile
  - THEN touch interactions are smooth and responsive (60fps target)
  - AND canvas rendering performs well on lower-end devices (maintain 30fps minimum)
  - AND app loading time is minimized on mobile networks (< 3s on 3G)
  - AND memory usage remains stable during extended usage
- **Implementation Details**:
  - Implement touch-optimized rendering pipeline with requestAnimationFrame
  - Add mobile-specific virtualization strategies for large family trees
  - Optimize bundle size for mobile delivery with code splitting and tree shaking
  - Implement progressive loading for large family trees with skeleton states
  - Add offline capability for mobile usage using service workers
  - Use Web Workers for heavy computations to keep main thread responsive
- **Branch**: `improvement-e7-t4-mobile-performance`

---

## Epic 8: Advanced Visual Features ✨
**Priority**: Medium | **Estimated Timeline**: 2-3 weeks
**Goal**: Add advanced visual features that enhance the family tree experience using modern web technologies
**Success Criteria**: Rich visual experience with customization options and advanced display modes

### E8-T1: Theme System Implementation (P2-HIGH)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Theme design)
- **Supporting Agents**: @dev (James - Theme implementation), @architect (Winston - Theme architecture)
- **Description**: Build theme variants (light, dark, high-contrast, sepia) by overriding E5-T1 `@theme` tokens with CSS custom properties; ensure seamless runtime switching and persistence
- **Dependencies**: [E5-T1] ✅, [E5-T4] ✅
- **Acceptance Criteria**:
  - GIVEN users may prefer different visual styles
  - WHEN implementing theme system
  - THEN multiple themes are available (light, dark, high contrast, sepia)
  - AND themes can be switched seamlessly without layout shift
  - AND theme preference is persisted and syncs across devices
  - AND themes follow system preferences where available (prefers-color-scheme)
- **Implementation Details**:
  - Create light, dark, and high-contrast theme variants using CSS custom properties
  - Design theme-aware component system with semantic color tokens
  - Implement theme toggle in user interface with smooth transitions
  - Add seasonal or family-specific theme options with custom accent colors
  - Create theme preview system with live updating components
  - Use CSS color-scheme property for browser UI consistency
- **Branch**: `improvement-e8-t1-theme-system`

### E8-T2: Advanced Member Visualization (P2-HIGH)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Visualization design)
- **Supporting Agents**: @dev (James - Implementation), @architect (Winston - Data visualization)
- **Description**: Enhanced member display with photos, advanced information, and visual indicators using modern image handling
- **Dependencies**: [E5-T2] ✅
- **Acceptance Criteria**:
  - GIVEN users want richer member representation
  - WHEN enhancing member visualization
  - THEN members can display photos or avatars with optimized loading
  - AND visual indicators show important information (age, status, relationships)
  - AND different view modes are available (compact, detailed, timeline, genealogy chart)
  - AND photos handle loading states and errors gracefully
- **Implementation Details**:
  - Add photo upload and display system with WebP support and fallbacks
  - Create visual indicators for living/deceased status using semantic colors
  - Design age and generation visual indicators with data-driven styling
  - Implement different member card sizes and layouts with CSS Grid
  - Add timeline view for member life events with interactive scrolling
  - Use intersection observer for lazy loading photos and smooth animations
- **Branch**: `improvement-e8-t2-advanced-member-visualization`

### E8-T3: Interactive Family Statistics (P3-MEDIUM)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Data visualization design)
- **Supporting Agents**: @dev (James - Charts implementation), @analyst (Mary - Statistics analysis)
- **Description**: Add family statistics dashboard with interactive charts and insights using modern charting libraries
- **Dependencies**: [E8-T2] ✅
- **Acceptance Criteria**:
  - GIVEN users want insights about their family data
  - WHEN implementing statistics dashboard
  - THEN family metrics are displayed in clear, interactive charts
  - AND statistics update dynamically as tree changes with smooth transitions
  - AND insights help users understand their family structure and patterns
  - AND charts are accessible with keyboard navigation and screen reader support
- **Implementation Details**:
  - Create family statistics dashboard (generations, age distribution, geographic spread)
  - Add interactive charts using D3.js or Chart.js with custom themes
  - Implement family timeline with major events and historical context
  - Design generation-based family tree views with collapsible branches
  - Add export functionality for statistics in multiple formats (PDF, CSV, PNG)
  - Use Canvas API for high-performance chart rendering with large datasets
- **Branch**: `improvement-e8-t3-family-statistics`

### E8-T4: Animation & Transition System (P3-MEDIUM)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Animation design)
- **Supporting Agents**: @dev (James - Animation implementation), @architect (Winston - Performance considerations)
- **Description**: Add smooth animations and transitions throughout the interface using modern animation techniques
- **Dependencies**: [E6-T1] ✅
- **Acceptance Criteria**:
  - GIVEN animations enhance user experience when done purposefully
  - WHEN implementing animation system
  - THEN transitions are smooth and purposeful with consistent timing
  - AND animations can be disabled for accessibility (prefers-reduced-motion)
  - AND performance remains optimal with animations (60fps target)
  - AND animations follow material design or similar established principles
- **Implementation Details**:
  - Design page and modal transition animations using CSS transitions and transforms
  - Add member appearance/removal animations with spring-based easing
  - Create connection drawing animations with SVG path morphing
  - Implement zoom and pan easing with momentum and boundary constraints
  - Add option to reduce motion for accessibility compliance
  - Use CSS will-change property and GPU acceleration for smooth performance
- **Branch**: `improvement-e8-t4-animation-system`

---

## Epic 9: Bugfix & UI Polish (Issues File) 🛠️
**Priority**: High | **Estimated Timeline**: 2–4 days
**Goal**: Resolve the concrete UX and functionality issues identified in `issue` and align UI with the desired mock (`example/image.png`) while preserving performance and accessibility.

### E9-T1: Wire Up Real Login Flow (Client) (P1-CRITICAL) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e9-t1-login-wireup`
- Summary: Real POST to login; HttpOnly cookie; redirects; inline error handling
- Details: See Completed Log → [E9-T1](family-tree/docs/completed-tasks.md#e9-t1)

### E9-T2: Admin Dev Password Seeding & Change Path (P1-CRITICAL) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e9-t2-admin-credential-seed`
- Summary: Seed/update script, docs, idempotent update of `users.json`
- Details: See Completed Log → [E9-T2](family-tree/docs/completed-tasks.md#e9-t2)

### E9-T3: Remove Duplicate Help Button (Toolbar) (P1-HIGH) ✅
- Status: Completed | Branch: `improvement-e9-t3-toolbar-help-dup`
- Summary: Removed duplicate Help; shortcut preserved; mobile access unaffected
- Details: See Completed Log → [E9-T3](family-tree/docs/completed-tasks.md#e9-t3)

### E9-T4: Fix Title/Search Overlap in Toolbar (Responsive) (P1-HIGH) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e9-t4-toolbar-layout`
- Summary: Title truncation and search width constraints with tokenized focus
- Details: See Completed Log → [E9-T4](family-tree/docs/completed-tasks.md#e9-t4)

### E9-T5: Separate Member Drag vs Canvas Pan (P1-HIGH) ✅
- Status: Completed | Branch: `improvement-e9-t5-drag-pan-behavior`
- Summary: Guard prevents accidental panning when dragging member; preserves multi-select
- Details: See Completed Log → [E9-T5](family-tree/docs/completed-tasks.md#e9-t5)

### E9-T6: Context Menu Visibility & Layering (P2-MEDIUM) ✅
- Status: Completed | Branch: `improvement-e9-t6-context-menu-visibility`
- Summary: Portal to body with elevated z-index; ESC/click-out; keyboard cycling
- Details: See Completed Log → [E9-T6](family-tree/docs/completed-tasks.md#e9-t6)

### E9-T7: Shared Member Form + Modal Polish (P1-HIGH) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e9-t7-shared-member-form-ui`
- Summary: Shared `MemberForm` extracted; tokens applied; tests pass; accessibility intact
- Details: See Completed Log → [E9-T7](family-tree/docs/completed-tasks.md#e9-t7)

### E9-T8: UI Alignment to Desired Mock (Toolbar/Cards/Canvas) (P2-MEDIUM) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e9-t8-ui-alignment`
- Summary: Tokenized alignment across toolbar/cards/canvas; no perf or accessibility regressions
- Details: See Completed Log → [E9-T8](family-tree/docs/completed-tasks.md#e9-t8)

---

*This task tracking document aligns with existing project workflow and is optimized for AI agent implementation following @pm, @po, @sm persona guidelines. Enhanced with modern design system patterns from Carbon Design System and Cloudscape for industry-standard UI/UX implementations.*

---

## Epic 10: Add/Edit Modal UI Redesign 🎨
**Priority**: High | **Estimated Timeline**: 3–5 days

**Goal**: Redesign the Add/Edit Member modals to be modern, colorful, and delightful while preserving functionality and accessibility. Use `example/UI-family-tree-09-08-2025_add_modal.jpg` as a directional reference (not a 1:1 copy). Apply our design tokens in `app/globals.css` and follow APG/WCAG guidance.

**Success Criteria**: Clear visual hierarchy, token-driven accent colors, improved section grouping, polished inputs, consistent validation/error states, accessible keyboard flow (APG modal dialog pattern), WCAG AA contrast, responsive (desktop → mobile bottom-sheet pattern), and zero regressions.

### Dependencies
- [E6-T2] ✅ Enhanced Modal System (animations, focus trap)
- [E5-T1] ✅ Design System Foundation (tokens)

### E10-T1: UX Audit & Front-End Spec (P1-CRITICAL)
- **Status**: Completed - 2025-08-10
- **Primary Agent**: @ux-expert (Sally)
- **Supporting Agents**: @pm (John), @po (Sarah), @architect (Winston)
- **Description**: Perform a quick UX audit of current modals, then author a precise front-end spec mapping the reference mock to implementable components, tokens, and states.
- **Acceptance Criteria**:
  - GIVEN the current Add/Edit modals
  - WHEN the audit is completed
  - THEN a front-end spec exists with: layout structure, spacing, typography, color usage (primary/accent), section groupings, and state diagrams (idle/loading/error/success), APG/WCAG a11y notes, and mobile bottom-sheet specifics
  - AND annotated screenshots referencing `example/UI-family-tree-09-08-2025_add_modal.jpg`
  - AND explicit mapping to existing tokens in `globals.css` (header accent, borders, focus rings, errors, elevation, radii)
  - AND all downstream tasks (E10-T3 → E10-T10) are updated with concrete implementation notes derived from the spec (classes/tokens/screenshots refs) by appending to each task's description
- **Implementation Details**:
  - Document in `family-tree/docs/implementation-notes.md` under a new "Modal Redesign" section
  - Specify class utilities and token variables to be applied
  - Note any token gaps (propose additions if truly needed)
  - Output artifacts: Spec doc section link, annotated screenshots, token map, QA acceptance checklist excerpt
  - Mandatory update cascade: After spec approval, update the descriptions of E10-T3 → E10-T10 with specific directives and references taken from the spec
  - Tracking: Add a short "Spec Impact Summary" bullet list to each affected task
- **Spec Artifacts (created)**:
  - Doc: `family-tree/docs/implementation-notes.md` → section "Modal Redesign (E10-T1)"
  - Image: `family-tree/docs/assets/e10-modal/reference-add-modal.jpg`
  - Annotations: `family-tree/docs/assets/e10-modal/annotations.md`
- **Summary**: Front-end spec completed per acceptance criteria (layout, spacing, typography, color/tokens map, sections, states, APG/WCAG notes, mobile bottom sheet). Downstream tasks E10-T3 → E10-T10 updated with Spec Impact Summaries.
- **Branch**: `improvement-e10-t1-modal-spec`

### E10-T2: Visual Style & Token Application Plan (P1-HIGH)
- **Status**: Completed - 2025-08-10
- **Primary Agent**: @architect (Winston)
- **Supporting Agents**: @ux-expert (Sally), @dev (James)
- **Description**: Define how brand, accent, and neutral tokens will be applied to the modal shell, section headers, inputs, buttons, and focus states for consistent theming.
- **Acceptance Criteria**:
  - Plan lists specific token variables (e.g., `--color-primary`, `--color-accent`, `--radius-lg`, `--elevation-3`) and where they apply (header accent, dividers, inputs, buttons, focus ring, errors, elevation)
  - No hardcoded colors in components beyond tokens
  - Accessibility contrast verified (AA minimum)
- **Implementation Details**:
  - Add a short "Token Application" table in the spec from E10-T1
  - Confirm no Tailwind config changes are required (Tailwind v4 CSS-first already in use)
  - Output artifacts: Token application table, a11y contrast notes
  - Mandatory update cascade: Append token usage guidance and a11y notes to E10-T3 → E10-T9 task descriptions so implementation is aligned
  - Tracking: Include a "Token Notes" sub-bullet in each affected task listing exact tokens per area (header, inputs, buttons)
- **Artifacts**:
  - Spec update: `family-tree/docs/implementation-notes.md` → section "Token Application (E10-T2)"
  - Contrast and AA notes included; Tailwind v4 `@theme` tokens confirmed
- **Branch**: `improvement-e10-t2-token-plan`

### E10-T3: Modal Shell Polish (Header/Backdrop/Layout) (P1-HIGH)
- **Status**: Pending
- **Primary Agent**: @dev (James)
- **Supporting Agents**: @ux-expert (Sally), @qa (Quinn)
- **Description**: Update `app/components/Modal.tsx` styling to match spec: colorful but tasteful header, refined close button, backdrop blur, consistent paddings, and size variants.
- **Acceptance Criteria**:
  - Header uses tokenized color accents (e.g., subtle bottom border or left accent bar using `--color-primary`)
  - Close button hover/focus styles use token colors and visible focus ring
  - Backdrop uses blur and opacity tokens without hurting readability
  - Spacing scales correctly at all sizes (`small|medium|large|fullscreen`)
  - All modal a11y behaviors remain (focus trap, ESC, click-out); ensure `aria-modal`, labeled title, and initial focus placement
- **Implementation Details**:
  - Keep logic intact; adjust classes only
  - Add header accent element via tokens (no new deps)
  - Confirm motion-reduce behavior unaffected
  - Spec Impact Summary: Apply header accent `border-(--color-primary)` or `before:bg-(--color-primary)`; backdrop `supports-[backdrop-filter]:backdrop-blur bg-black/50`; container `rounded-[var(--radius-lg)] shadow-[var(--elevation-3)]`
- **Token Notes**:
  - Header: `--color-primary`; Border/Divider: `--color-neutral-100`; Title: `--text-xl` + `--font-weight-semibold`
  - Close button focus: `focus-visible:outline-(--color-primary)`; radius: `--radius-sm`
  - Container: `--surface-1`, `--radius-lg`, `--elevation-3`
- **Branch**: `improvement-e10-t3-modal-shell-polish`

### E10-T4: MemberForm Layout & Sections Redesign (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @dev (James)
- **Supporting Agents**: @ux-expert (Sally), @qa (Quinn)
- **Description**: Redesign `app/components/shared/MemberForm.tsx` with clear sections and tasteful color usage: Basic Info, Dates, Photo, Contact, Relations, Biography, and (edit-only) Canvas Position & Size.
- **Acceptance Criteria**:
  - Section headers styled with neutral typography and a thin accent divider using tokens
  - Inputs have improved focus states, subtle shadows, and rounded corners per tokens; maintain `aria-invalid` and helper associations
  - Visual hierarchy matches the mock; form remains compact and readable
  - No functionality removed; validation preserved
- **Implementation Details**:
  - Group sections with `border-(--color-neutral-100)` and tokenized titles
  - Use existing `.btn-primary` and `.btn-outline` for actions
  - Keep DOM minimal; prefer class updates to logic
  - Spec Impact Summary: Use section separators `border-t border-(--color-neutral-100) pt-4`; inputs `focus:ring-(--color-primary) border-(--color-neutral-200)`; errors `border-(--color-error)/40 text-(--color-error)`
- **Token Notes**:
  - Labels: `--color-neutral-700` `--text-sm` `--font-weight-medium`
  - Inputs: default `--color-neutral-200`; focus `--color-primary`; radius `--radius-md`
  - Errors: `--color-error` (border/text)
- **Branch**: `improvement-e10-t4-memberform-redesign`

### E10-T5: Photo Uploader Polish (Preview/Actions) (P2-HIGH)
- **Status**: Pending
- **Primary Agent**: @dev (James)
- **Supporting Agents**: @ux-expert (Sally)
- **Description**: Refine the photo upload area with clearer affordances and tidy preview/delete affordance aligned to tokens.
- **Acceptance Criteria**:
  - Choose/Change Photo button uses `.btn-outline`; hover/active match tokens
  - Preview avatar uses rounded, consistent size; delete affordance is visible, accessible, token-colored
  - Validation errors appear beneath with `--color-error` and are announced to screen readers when applicable
- **Implementation Details**:
  - Maintain existing base64 approach; no new dependencies
  - Ensure button/controls are keyboard-accessible
  - Spec Impact Summary: Use `.btn-outline` for choose/change, preview `rounded-full` sizing, delete badge uses `bg-(--color-error)`; errors `text-(--color-error)`
- **Token Notes**:
  - Buttons: `.btn-outline`
  - Delete badge: `--color-error`
  - Preview radius: `--radius-full` via `rounded-full`
- **Branch**: `improvement-e10-t5-photo-uploader-polish`

### E10-T6: Validation & Error State Styling (P1-HIGH)
- **Status**: Pending
- **Primary Agent**: @qa (Quinn)
- **Supporting Agents**: @dev (James), @po (Sarah)
- **Description**: Standardize error text, borders, and helper messages across the form using semantic tokens.
- **Acceptance Criteria**:
  - Invalid fields: border uses `--color-error` (with subtle transparency) and message in `--color-error`
  - Screen reader announcements for error summaries maintained; ensure error regions are programmatically associated
  - No layout shift on error appearance
- **Implementation Details**:
  - Review `MemberFormErrors` rendering and class names
  - Add aria-invalid and aria-describedBy where appropriate
  - Spec Impact Summary: Standardize invalid borders `border-(--color-error)/40`, helper `text-(--color-error)`, preserve screen reader announcements, no layout shift
- **Token Notes**:
  - Error border/text: `--color-error`
  - Help text: `--color-error`; focus ring remains `--color-primary`
- **Branch**: `improvement-e10-t6-validation-states`

### E10-T7: Responsive & Mobile Bottom Sheet Variant (P1-HIGH)
- **Status**: Pending
- **Primary Agent**: @dev (James)
- **Supporting Agents**: @ux-expert (Sally), @qa (Quinn)
- **Description**: Ensure modals adapt to small screens with a bottom-sheet feel (already partially supported). Polish paddings, full-height behavior, and safe-area respect.
- **Acceptance Criteria**:
  - On small screens, modal uses full height with proper `dvh` handling and rounded top corners disabled
  - Paddings and tap targets meet mobile guidelines (≥ 44px targets; ≥ 8px spacing)
  - Keyboard avoidance verified (no hidden inputs under OS keyboard)
- **Implementation Details**:
  - Leverage existing `max-sm:w-screen max-sm:h-[100dvh] max-sm:rounded-none`
  - Add safe-area paddings if needed
  - Spec Impact Summary: Ensure tap target sizing, dvh height, safe-area padding, container query-based internal layout using `@container`, and keyboard avoidance
- **Token Notes**:
  - Small screens remove top radius (`rounded-none`); maintain focus ring `--color-primary`
  - Surfaces remain `--surface-1`; borders `--color-neutral-100`
- **Branch**: `improvement-e10-t7-mobile-bottom-sheet`

### E10-T8: A11y & Keyboard Flow Validation (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @qa (Quinn)
- **Supporting Agents**: @po (Sarah)
- **Description**: Validate all keyboard and screen reader flows after redesign. Confirm labels, roles, and announcements are correct.
- **Acceptance Criteria**:
  - Tab order correct; focus trap working; ESC and click-out behave
  - Labels and descriptions present for all inputs; error messages associated
  - Meets WCAG AA color contrast (text and non-text UI); APG modal behavior verified
- **Implementation Details**:
  - Update or add unit/integration tests for focus and a11y where feasible
- Spec Impact Summary: Use spec "Accessibility (APG/WCAG)" for verification: ensure `role="dialog"`, `aria-modal`, labeled title (`aria-labelledby`), proper `aria-describedby` where used; verify visible focus rings using `--color-primary`; confirm AA contrast for text and non-text UI; validate error association patterns from spec (invalid borders `border-(--color-error)/40`, helper `text-(--color-error)`); include mobile bottom-sheet checks (full-height `100dvh`, safe-area padding, tap target sizes ≥ 44px).
- **Token Notes**:
  - Focus indicators: `--color-primary`
  - Non-text UI contrast: borders `--color-neutral-200`, errors `--color-error`
- **Branch**: `improvement-e10-t8-a11y-validation`

### E10-T9: Tests & Regression Suite Update (P2-HIGH)
- **Status**: Pending
- **Primary Agent**: @qa (Quinn)
- **Supporting Agents**: @dev (James)
- **Description**: Update component tests in `app/components/__tests__` for `AddMemberModal`, `EditMemberModal`, and `MemberForm` to reflect the new UI and preserve behavior.
- **Acceptance Criteria**:
  - All existing tests pass with updated snapshots/selectors
  - New tests cover key interactions (open/close, submit, validation, photo upload)
  - No flaky tests introduced
- **Implementation Details**:
  - Validate aria attributes and visible labels in tests
- Spec Impact Summary: Update tests to assert tokenized UI per spec: header accent element present (either `before:bg-(--color-primary)` bar or `border-l-4 border-(--color-primary)`), backdrop blur classes `supports-[backdrop-filter]:backdrop-blur bg-black/50`, container radius/elevation `rounded-[var(--radius-lg)] shadow-[var(--elevation-3)]`, inputs `focus:ring-(--color-primary) border-(--color-neutral-200)`, error states `border-(--color-error)/40 text-(--color-error)`, and mobile bottom-sheet behavior (`max-sm:h-[100dvh]`, no top rounding). Prefer stable, token-based selectors over hardcoded colors.
- **Token Notes**:
  - Test selectors should target presence of token-driven classes rather than raw hex values.
- **Branch**: `improvement-e10-t9-tests-update`

### E10-T10: PO Review & Acceptance (P1-HIGH)
- **Status**: Pending
- **Primary Agent**: @po (Sarah)
- **Supporting Agents**: @pm (John), @ux-expert (Sally)
- **Description**: Review the implemented modals against the spec and the reference mock; verify acceptance criteria; sign-off.
- **Acceptance Criteria**:
  - PO checklist satisfied; acceptance criteria met across tasks E10-T1 → E10-T9
  - Screenshots captured for docs and added to `family-tree/docs/onboarding-help.md` or implementation notes
- **Implementation Details**:
  - If gaps exist, open follow-up subtask(s) before closure
- Spec Impact Summary: Review against spec artifacts: `family-tree/docs/implementation-notes.md#modal-redesign-e10-t1` and annotated image notes. Verify token usage throughout (header accent uses `--color-primary`, borders `--color-neutral-100|200`, focus ring `--color-primary`, error `--color-error`, elevation/radii tokens) and that behaviors match the spec (focus trap, ESC/click-out, mobile bottom-sheet specifics). Confirm E10-T3 → E10-T9 implementations reflect the spec.
- **Branch**: `improvement-e10-t10-po-acceptance`

---
