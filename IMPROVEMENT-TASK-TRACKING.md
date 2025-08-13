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

### E9-T9: Superdesign Prototype Sidebar Simplification (P2-MEDIUM) ✅
- Status: Completed - 2025-08-12 | Branch: n/a (design prototype only)
- Summary: Updated `.superdesign` prototype per request: left sidebar limited to Add, Export, Help; removed bottom “+ Add Member” button; removed Inspector panel; widened main content accordingly.
- Files: `.superdesign/design_iterations/family_tree_ui_1_1.html`
- Acceptance Confirmation: Visual matches requested layout; no functional code impacted.
 - Details: See Completed Log → [E9-T9](family-tree/docs/completed-tasks.md#e9-t9)

---

### E9-T10: Remove Mobile Floating “+” FAB (P3-LOW) ✅
- Status: Completed - 2025-08-12 | Branch: n/a (design prototype only)
- Summary: Removed the orange “+” floating action button from bottom-left on mobile in the `.superdesign` prototype.
- Files: `.superdesign/design_iterations/family_tree_ui_1_1.html`
- Acceptance Confirmation: No FAB present at small breakpoints; desktop unaffected.
 - Details: See Completed Log → [E9-T10](family-tree/docs/completed-tasks.md#e9-t10)

---

### E9-T12: Superdesign – Responsive Fixes for Overlap (P1-HIGH) ✅
- Status: Completed - 2025-08-12 | Branch: n/a (design prototype only)
- Summary: Implemented mobile-first responsive rules to prevent visual overlap on small screens in the `.superdesign` prototype. Ensured connectors are layered beneath nodes, stacked node layout on narrow widths, compacted legend, and hid static connectors on extra-small screens to avoid clutter.
- Files: `.superdesign/design_iterations/family_tree_theme_1_1.css`
- Implementation Notes:
  - Added stacking context rules so `.canvas-grid > svg` sits below node cards
  - Enabled `flex-wrap` and column layout for `.node-card` at small breakpoints; constrained ribbon widths
  - Introduced auto-fit `minmax(220px, 1fr)` grids for row sections inside `.canvas-grid` on very small screens
  - Hid SVG connectors under 480px; reduced legend size and spacing; tightened photo sizes
- Acceptance Confirmation: No element overlap at 360–480px; readable labels; legend accessible; desktop unchanged.
 - Details: See Completed Log → [E9-T12](family-tree/docs/completed-tasks.md#e9-t12)

---

### E9-T11: Add Member Search Textbox (P2-MEDIUM) ✅
- Status: Completed - 2025-08-12 | Branch: n/a (design prototype only)
- Summary: Added a search textbox and positioned it next to the filter dropdown in the context bar (moved from sidebar) for member name search.
- Files: `.superdesign/design_iterations/family_tree_ui_1_1.html`
- Acceptance Confirmation: Search field visible beside Filters; responsive width (`w-40` → `sm:w-56`); accessible label via `aria-label`/`sr-only`.
 - Details: See Completed Log → [E9-T11](family-tree/docs/completed-tasks.md#e9-t11)

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

### E10-T1: UX Audit & Front-End Spec (P1-CRITICAL) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e10-t1-modal-spec`
- Summary: Front-end spec completed per acceptance criteria; downstream tasks updated with Spec Impact Summaries.
- Details: See Completed Log → [E10-T1](family-tree/docs/completed-tasks.md#e10-t1)

### E10-T2: Visual Style & Token Application Plan (P1-HIGH) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e10-t2-token-plan`
- Summary: Token application plan documented with contrast notes; Tailwind v4 CSS-first tokens confirmed.
- Details: See Completed Log → [E10-T2](family-tree/docs/completed-tasks.md#e10-t2)

### E10-T3: Modal Shell Polish (Header/Backdrop/Layout) (P1-HIGH) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e10-t3-modal-shell-polish`
- Summary: Header accent, backdrop blur, container radius/elevation tokens applied; a11y preserved; tests green.
- Details: See Completed Log → [E10-T3](family-tree/docs/completed-tasks.md#e10-t3)

### E10-T4: MemberForm Layout & Sections Redesign (P1-CRITICAL) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e10-t4-memberform-redesign`
- Summary: MemberForm restructured into clear, tokenized sections; behavior preserved; a11y improved.
- Details: See Completed Log → [E10-T4](family-tree/docs/completed-tasks.md#e10-t4)

### E10-T5: Photo Uploader Polish (Preview/Actions) (P2-HIGH) ✅
- Status: Completed - 2025-08-10 | Branch: `improvement-e10-t5-photo-uploader-polish`
- Summary: .btn-outline trigger, tokenized focus, rounded avatar preview, accessible delete badge; no new deps.
- Details: See Completed Log → [E10-T5](family-tree/docs/completed-tasks.md#e10-t5)

### E10-T6: Validation & Error State Styling (P1-HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e10-t6-validation-states`
- Summary: Standardized invalid styles and ARIA wiring; eliminated layout shift; focus rings unchanged.
- Details: See Completed Log → [E10-T6](family-tree/docs/completed-tasks.md#e10-t6)


### E10-T7: Responsive & Mobile Bottom Sheet Variant (P1-HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e10-t7-mobile-bottom-sheet`
- Summary: Enforced dvh height, safe areas, no top rounding; tap targets sized; keyboard avoidance verified.
- Details: See Completed Log → [E10-T7](family-tree/docs/completed-tasks.md#e10-t7)

### E10-T8: A11y & Keyboard Flow Validation (P1-CRITICAL) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e10-t8-a11y-validation`
- Summary: Keyboard flows, labeling, and AA contrast validated; tokenized focus indicators asserted in tests.
- Details: See Completed Log → [E10-T8](family-tree/docs/completed-tasks.md#e10-t8)

### E10-T9: Tests & Regression Suite Update (P2-HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e10-t9-tests-update`
- Summary: Updated tests to assert token-driven UI and a11y flows; full suite green; stable selectors.
- Details: See Completed Log → [E10-T9](family-tree/docs/completed-tasks.md#e10-t9)

### E10-T10: PO Review & Acceptance (P1-HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e10-t10-po-acceptance`
- Summary: PO sign‑off complete; visuals and behavior match spec; artifacts added to docs.
- Details: See Completed Log → [E10-T10](family-tree/docs/completed-tasks.md#e10-t10)

---

## Epic 11: Notion‑Inspired Modal Color & Motion Polish ✨
**Priority**: High | **Estimated Timeline**: 2–4 days

**Goal**: Evolve the Add/Edit Member modals to feel more colorful, beautiful, and expressive while staying fully token‑driven, accessible, and performant. Design inspiration: Notion’s clean, expressive visual language (use as directional reference, not a 1:1 copy).

User preferences from `issue` (2025‑08‑11):
- Subtle accents (not overwhelming)
- Allow soft OKLCH gradients in headers/CTAs
- Keep primary (warm blue) as hero; allow accent pink for highlights
- More expressive vibe (chips, gradient headers, colored dividers)
- Add a few micro‑interactions (focus/press, subtle reveals)

### Dependencies
- [E10] ✅ Modal spec, token plan, mobile bottom‑sheet, a11y/tests complete
- [E5‑T1] ✅ Design tokens present in `app/globals.css`

### Mandatory Pre‑Work (applies to all E11 tasks)
- Before starting any E11 task, read `family-tree/docs/implementation-notes.md` → `Notion‑Inspired Color & Motion Polish (Epic 11)` and the corresponding subsection for your task to align on tokens, classes, a11y, and examples.

### E11‑T1: Gradient & Accent Token Mapping (P1‑CRITICAL) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e11-t1-gradient-accent-mapping`
- Summary: Minimal token‑first gradient/accent utilities defined and documented; enables E11‑T2/T3 without raw hex.
- Details: See Completed Log → [E11‑T1](family-tree/docs/completed-tasks.md#e11-t1)

### E11‑T2: Modal Header & Primary CTA Polish (P1‑HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e11-t2-modal-header-cta`
- Summary: Header accent supports flat/gradient via tokens; primary CTA supports gradient variant with tokenized hover/active/focus, motion‑reduce respected; tests updated; no color hardcoding.
- Details: See Completed Log → [E11‑T2](family-tree/docs/completed-tasks.md#e11-t2)

### E11‑T3: Expressive Dividers, Chips, and Section Icons (P2‑HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e11-t3-dividers-chips-icons`
- Summary: Added token-driven section dividers with optional accent, lightweight decorative icons, and subtle label chips in `MemberForm`; all styles map to `@theme` tokens and respect a11y.
- Details: See Completed Log → [E11‑T3](family-tree/docs/completed-tasks.md#e11-t3)

### E11‑T4: Micro‑Interactions & Motion Polish (P2‑HIGH) ✅
- **Status**: Completed - 2025-08-11 | Branch: `improvement-e11-t4-micro-interactions`
- **Description**: Add subtle elevation/scale on CTA press, refined focus rings, and section reveal 
- **Summary**: Added token-driven hover/pressed/focus behaviors, section reveal with motion-reduce support, and GPU-friendly transitions without JS changes.
- **Details**: See Completed Log → [E11‑T4](family-tree/docs/completed-tasks.md#e11-t4)

### E11‑T5: A11y/Contrast & Test Updates (P1‑CRITICAL) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e11-t5-a11y-tests`
- Summary: Extended tests to assert gradient/accent utilities, motion‑reduce behavior, AA contrast cues; validated keyboard flow and mobile bottom‑sheet; no regressions.
- Details: See Completed Log → [E11‑T5](family-tree/docs/completed-tasks.md#e11-t5)

### E11‑T6: PO/UX Acceptance & Docs (P1‑HIGH) ✅
- Status: Completed - 2025-08-11 | Branch: `improvement-e11-t6-po-ux-acceptance`
- Summary: PO/UX sign‑off complete. Acceptance checklist added; before/after screenshots linked; onboarding help updated. All visuals token‑driven; AA contrast and APG semantics preserved; motion‑reduce honored.
- Details: See Completed Log → [E11‑T6](family-tree/docs/completed-tasks.md#e11-t6)

### Non‑Dev Research Protocol (Applies to E11‑T1, T2, T3)
- If a non‑dev agent executes, first collect 3–5 reference screenshots from [Notion](https://www.notion.com) illustrating: subtle gradients, expressive dividers/chips, clean CTA styles.
- Add a "Research Log" sub‑section under the relevant spec area in `family-tree/docs/implementation-notes.md` with bullet summaries and how each reference maps to our tokens/utilities.
- After research, append a "Spec Impact Summary" bullet list to the corresponding E11 task describing which tokens/classes will be used and which files will be edited.


---

## Epic 12: UI v2 – Parallel Rebuild 🧭
**Priority**: High | **Estimated Timeline**: 1–2 weeks

**Goal**: Build a fresh UI v2 in parallel, based on the prompt screens, while keeping v1 logic intact. Deliver new routes and components under a v2 namespace with tokens-first styling and zero functional regressions.

**Source of Truth**: Detailed screen criteria in `family-tree/docs/ui-improvement-plan.md` (UI v2 Plan). Use it alongside the task details below.

**Success Criteria**: UI v2 routes exist and match prompts visually across desktop/mobile; AA contrast; APG semantics and keyboard flow preserved; no mobile overlaps (360–480px); SVG connectors under nodes; v1 routes remain functional until parity, then switch default.

### Global Dependencies
- [E5-T1] ✅ Design tokens in `app/globals.css`
- [E6-T2] ✅ Enhanced modal system (APG/dialog behavior)

### Git & Process
- Create feature branches per task (see each task’s `Branch`).
- Maintain v1 routes intact; add v2 under `app/(v2)` and `app/components-v2`.
- Tests must stay green after each task; update/add tests where specified.

---

### E12-T0: v2 Scaffolding & Tokens (P1-CRITICAL) ✅
- Status: Completed - 2025-08-13 | Branch: `improvement-e12-t0-v2-scaffold`
- Primary Agent: @architect (Winston) | Supporting: @dev (James), @sm (Bob), @po (Sarah)
- Description: Prepare v2 folder structure and extend tokens/utilities to support prompt-class mappings.
- Deliverables:
  - Folders: `family-tree/app/(v2)/`, `family-tree/app/components-v2/`, `family-tree/app/components-v2/shared/`
  - Route: `family-tree/app/(v2)/view/page.tsx` renders a minimal shell
  - Tokens/utilities added to `family-tree/app/globals.css`:
    - `.panel`, `.toolbar-rail`, `.u-header-accent--gradient`, `.input`, `.btn`, `.btn-primary`, `.btn-outline`, `.badge`, `.canvas-grid`, `.connections-layer`, `.connector`, `.ribbon`
  - Token docs section appended in `family-tree/docs/ui-improvement-plan.md` if new utilities are introduced
- Acceptance Criteria:
  - `/v2/view` boots with v2 header/shell and compiles
  - All mapped utility classes are available (no raw hex), AA contrast preserved
  - No changes to v1 routes/components
- Subtasks:
  - E12-T0.1 Create `app/(v2)` and `components-v2` directories
  - E12-T0.2 Add initial `/v2/view` route shell
  - E12-T0.3 Extend `globals.css` with prompt-class mappings
  - E12-T0.4 Update docs: list of utilities + usage examples
- Test Strategy:
  - Smoke test rendering of `/v2/view` (new test file)
  - Lint CSS for unknown classes; ensure no regressions in existing tests
  - Agent Prompt: "As @architect, @dev, @sm, @po: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 846–874 only; follow the AI Task Workflow; do E12-T0; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; ensure /v2/view shell compiles, required token utilities exist in globals.css, and no v1 changes; use MCP Context7 only if external docs are needed."

Implementation Notes:
- Created `family-tree/app/(v2)/view/page.tsx` minimal shell using `u-header-accent--gradient` and `panel` utilities; verifies token mapping without raw hex.
- Verified required utilities exist in `family-tree/app/globals.css` (`.panel`, `.toolbar-rail`, `.u-header-accent--gradient`, `.input`, `.btn`, `.btn-primary`, `.btn-outline`, `.badge`, `.canvas-grid`, `.connections-layer`, `.connector`, `.ribbon`).
- Updated `family-tree/docs/ui-improvement-plan.md` to mark the route as scaffolded in E12-T0.
- Added smoke test `family-tree/app/components/__tests__/ViewPageV2.test.tsx` asserting v2 header and shell text.

---

### E12-T1: Tree View Home (v2) – Layout, Sidebar, Toolbar, Canvas (P1-CRITICAL)
- Status: Pending | Branch: `improvement-e12-t1-v2-home`
- Primary Agent: @dev (James) | Supporting: @ux-expert (Sally), @qa (Quinn), @po (Sarah), @sm (Bob)
- References: `home-screen-prompt`, UI v2 Plan (“Tree View Home”) and prior E12‑T1 (Archived) implementation notes
- Description: Implement v2 Home screen using v2 shell, token utilities, and responsive rules. Sidebar exposes Add, Export, Help only. Toolbar groups Title, Search, Filters with tokenized focus and truncation. Canvas ensures connections are layered under member nodes and responsive behavior prevents overlaps at small sizes.
- Files to Add/Change:
  - `family-tree/app/(v2)/view/page.tsx` (page composition)
  - `family-tree/app/(v2)/view/ViewPageV2Client.tsx` (client wrapper, if needed)
  - `family-tree/app/components-v2/MainToolbarV2.tsx`
  - `family-tree/app/components-v2/SidebarV2.tsx`
  - `family-tree/app/components-v2/FamilyTreeCanvasV2.tsx`
  - `family-tree/app/globals.css` (ensure `.toolbar-rail`, `.panel`, `.canvas-grid`, `.connections-layer`, `.badge`, `.connector` mappings exist)
- Implementation Details:
  - Sidebar: Only Add, Export, Help. Keyboard-accessible, tokenized focus rings
  - Toolbar: Title truncation; Search width constraints; Filters grouped; focus styles via tokens
  - Canvas: Render nodes above connectors; mark connectors SVG as `.connections-layer` and apply `-z-10`; hide static connectors under 480px; ensure no element overlaps at 360–480px
  - Performance: Maintain virtualization and throttling policies from v1 where applicable
  - Accessibility: Landmarks and headings correct; keyboard navigation preserved
- Acceptance Criteria:
  - Visual parity with `home-screen-prompt` on desktop and mobile
  - Connectors render under nodes; no overlap at 360–480px; connectors hidden < 480px per rules
  - Toolbar/Sidebar behaviors align with tokens; AA contrast; APG semantics
  - v1 unaffected; tests green
- Subtasks:
  - E12-T1.1 Implement `SidebarV2` with Add/Export/Help
  - E12-T1.2 Implement `MainToolbarV2` with grouped Title/Search/Filters
  - E12-T1.3 Implement `FamilyTreeCanvasV2` with connectors-under-nodes layering and responsive hide < 480px
  - E12-T1.4 Wire page composition and state plumbing (reuse v1 hooks/data)
  - E12-T1.5 Add tests for toolbar content, layering, and responsive rules
- Test Strategy:
  - Update/add tests: toolbar items present (no Share), connectors under nodes, responsive checks (360/480)
  - Agent Prompt: "As @dev, @ux-expert, @qa, @po, @sm: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 878–911 only; follow the AI Task Workflow; do E12-T1; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; Sidebar=Add/Export/Help, Toolbar groups Title/Search/Filters with tokenized focus/truncation; connectors under nodes, hide <480px, no overlap at 360–480; reuse v1 hooks/data; use MCP Context7 only if external docs are needed."
  - Use existing patterns from `app/components/__tests__/MainToolbar.test.tsx` and canvas tests

---

### E12-T2: Add Member Modal (v2) (P1-HIGH)
- Status: Pending | Branch: `improvement-e12-t2-v2-add`
- Primary Agent: @dev (James) | Supporting: @ux-expert (Sally), @qa (Quinn), @po (Sarah)
- References: `add-screen-prompt`, UI v2 Plan (“Add Member (v2)”), E10/E11 specs
- Description: Build v2 Add modal using `components-v2/shared/MemberForm` with E10/E11 token and a11y patterns; bottom sheet on mobile.
- Files to Add/Change:
  - `family-tree/app/components-v2/shared/MemberForm.tsx` (copy or extract from v1 then adjust styles only)
  - `family-tree/app/components-v2/AddMemberModalV2.tsx`
  - `family-tree/app/globals.css` (ensure modal tokens/gradients are mapped; no raw hex)
- Acceptance Criteria:
  - APG modal dialog semantics; focus trap; escape/backdrop close
  - Section grouping, photo uploader, relations present; mobile bottom-sheet variant
  - Validation behavior matches v1 without layout shift; AA contrast; reduced motion honored
- Subtasks:
  - E12-T2.1 Create `MemberForm` v2 with token-only styles
  - E12-T2.2 Implement `AddMemberModalV2` shell and keyboard flow
  - E12-T2.3 Wire validation using existing utilities; keep TS types
  - E12-T2.4 Tests for a11y, validation, and mobile bottom-sheet
- Test Strategy:
  - Update/add tests similar to `AddMemberModal.test.tsx`, `MemberForm.test.tsx`, `Modal.test.tsx`
  - Agent Prompt: "As @dev, @ux-expert, @qa, @po: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 914–933 only; follow the AI Task Workflow; do E12-T2; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; APG modal semantics with focus trap/backdrop/ESC, bottom-sheet on mobile, token-only styles, validation matches v1, AA contrast and reduced-motion respected; use MCP Context7 only if external docs are needed."

---

### E12-T3: Edit Member Modal (v2) (P1-HIGH)
- Status: Pending | Branch: `improvement-e12-t3-v2-edit`
- Primary Agent: @dev (James) | Supporting: @ux-expert (Sally), @qa (Quinn)
- References: `edit-screen-prompt`, UI v2 Plan (“Edit Member (v2)”), E10/E11 patterns
- Description: Build v2 Edit modal with additional canvas position/size fields; same validation/a11y as Add.
- Files to Add/Change:
  - `family-tree/app/components-v2/EditMemberModalV2.tsx`
  - `family-tree/app/components-v2/shared/MemberForm.tsx` (extend for edit fields)
- Acceptance Criteria:
  - All Add modal criteria apply; additional fields validated; no layout shift
- Subtasks:
  - E12-T3.1 Extend MemberForm for edit-only fields
  - E12-T3.2 Build `EditMemberModalV2` and keyboard flow
  - E12-T3.3 Tests for edit fields and validation
- Test Strategy:
  - Add/update tests mirroring `EditMemberModal.test.tsx`
  - Agent Prompt: "As @dev, @ux-expert, @qa: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 938–953 only; follow the AI Task Workflow; do E12-T3; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; extend MemberForm for edit-only fields; same a11y/validation as Add; no layout shift; use MCP Context7 only if external docs are needed."

---

### E12-T4: Login (v2) (P2-HIGH)
- Status: Pending | Branch: `improvement-e12-t4-v2-login`
- Primary Agent: @ux-expert (Sally) | Supporting: @dev (James), @qa (Quinn)
- References: `login-screen-prompt`, UI v2 Plan (“Login (v2)”), E9-T1 behavioral notes
- Description: Implement login with warm theme and inline errors; maintain proper ARIA and keyboard flow.
- Files to Add/Change:
  - `family-tree/app/(v2)/login/page.tsx`
  - `family-tree/app/globals.css` (ensure focus rings, error tokens)
- Acceptance Criteria:
  - Labeled fields; inline errors announced via `aria-live`; correct tab order
  - Visual alignment to prompt style direction; no regressions to auth flow
- Subtasks:
  - E12-T4.1 Implement page layout and form
  - E12-T4.2 Error handling visuals + SR announcements
  - E12-T4.3 Tests for form labeling, focus order, and error announcements
- Test Strategy:
  - Add tests similar to `login` flow assertions; verify aria wiring
  - Agent Prompt: "As @ux-expert, @dev, @qa: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 958–974 only; follow the AI Task Workflow; do E12-T4; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; login with warm theme, labeled fields, aria-live inline errors, correct tab order; no auth regressions; use MCP Context7 only if external docs are needed."

---

### E12-T5: Member Detail (v2) (P2-HIGH)
- Status: Pending | Branch: `improvement-e12-t5-v2-member-detail`
- Primary Agent: @ux-expert (Sally) | Supporting: @dev (James), @qa (Quinn)
- References: `member-detail-prompt`, UI v2 Plan (“Member Detail (v2)”), E11 chip/divider/icon patterns
- Description: Implement detail page with clear hierarchy, chips/dividers/icons mapped to tokens; keyboard-accessible actions.
- Files to Add/Change:
  - `family-tree/app/(v2)/members/[id]/page.tsx`
  - `family-tree/app/components-v2/MemberBannerV2.tsx`
- Acceptance Criteria:
  - Readable at mobile sizes; keyboard-accessible actions; token-only styling
- Subtasks:
  - E12-T5.1 Layout structure and hierarchy
  - E12-T5.2 Chips/dividers/icons per tokens
  - E12-T5.3 Tests for hierarchy/accessibility
- Test Strategy:
  - Update/add tests similar to `MemberBanner.test.tsx`
  - Agent Prompt: "As @ux-expert, @dev, @qa: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 979–994 only; follow the AI Task Workflow; do E12-T5; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; member detail page with clear hierarchy, chips/dividers/icons mapped to tokens, keyboard-accessible actions, readable on mobile; use MCP Context7 only if external docs are needed."

---

### E12-T6: Help Panel (v2) (P2-MEDIUM)
- Status: Pending | Branch: `improvement-e12-t6-v2-help`
- Primary Agent: @ux-expert (Sally) | Supporting: @dev (James), @qa (Quinn)
- References: `help-panel-prompt`, UI v2 Plan (“Help Panel (v2)”), E6 patterns
- Description: Implement Help Panel with proper headings/landmarks; responsive layout and tokens.
- Files to Add/Change:
  - `family-tree/app/components-v2/HelpPanelV2.tsx`
- Acceptance Criteria:
  - Opens from Help; has correct landmarks/headings; responsive behavior validated
- Subtasks:
  - E12-T6.1 Structure and ARIA landmarks
  - E12-T6.2 Responsive layout per tokens
  - E12-T6.3 Tests for landmarks/headings
- Test Strategy:
  - Add tests similar to `HelpPanel.test.tsx` with a11y assertions
  - Agent Prompt: "As @ux-expert, @dev, @qa: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 999–1013 only; follow the AI Task Workflow; do E12-T6; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; Help Panel opens from Help, correct headings/landmarks, responsive tokenized layout; use MCP Context7 only if external docs are needed."

---

### E12-T7: QA Validation – Accessibility, Responsive, Performance (P1-CRITICAL)
- Status: Pending | Branch: `improvement-e12-t7-v2-qa`
- Primary Agent: @qa (Quinn) | Supporting: @dev (James), @ux-expert (Sally)
- References: UI v2 Plan “Validation Plan (QA)”
- Description: Validate a11y, responsive, performance across v2 screens; keep regression suite green; ensure v1 unaffected.
- Acceptance Criteria:
  - Modal APG checks pass; focus management correct; labels and reduced-motion compliance
  - Responsive checks pass at 360, 480, 768, 1024, 1440; no overlap; connectors under nodes
  - Interaction smoothness ∼60fps target; no layout thrash
  - Regression tests green for Add/Edit flows, search/filter, export entry points
- Subtasks:
  - E12-T7.1 A11y sweep (modal semantics, keyboard, SR labels, reduced motion)
  - E12-T7.2 Responsive sweep (breakpoints, connector layering)
  - E12-T7.3 Performance checks (FPS, bundle split sanity, virtualization intact)
  - E12-T7.4 Update docs in `family-tree/docs/completed-tasks.md` with outcomes
- Test Strategy:
  - Expand/adjust tests under `app/components/__tests__/` and `app/contexts/__tests__/`; ensure new v2 tests are added alongside v1 without breaking existing ones
  - Agent Prompt: "As @qa, @dev, @ux-expert: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 1018–1034 only; follow the AI Task Workflow; do E12-T7; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; validate APG modal checks, labels, reduced-motion; responsive at 360/480/768/1024/1440 with connectors under nodes and no overlap; interaction smoothness ~60fps; regression suite green; use MCP Context7 only if external docs are needed."



