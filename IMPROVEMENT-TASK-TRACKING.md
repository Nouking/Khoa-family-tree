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
- Maintain v1 routes intact; add v2 under `app/v2` and `app/components-v2`.
- Tests must stay green after each task; update/add tests where specified.

---

### E12-T0: v2 Scaffolding & Tokens (P1-CRITICAL) ✅
- Status: Completed - 2025-08-13 | Branch: `improvement-e12-t0-v2-scaffold`
- Primary Agent: @architect (Winston) | Supporting: @dev (James), @sm (Bob), @po (Sarah)
- Description: Prepare v2 folder structure and extend tokens/utilities to support prompt-class mappings.
- Deliverables:
  - Folders: `family-tree/app/v2/`, `family-tree/app/components-v2/`, `family-tree/app/components-v2/shared/`
  - Route: `family-tree/app/v2/view/page.tsx` renders a minimal shell
  - Tokens/utilities added to `family-tree/app/globals.css`:
    - `.panel`, `.toolbar-rail`, `.u-header-accent--gradient`, `.input`, `.btn`, `.btn-primary`, `.btn-outline`, `.badge`, `.canvas-grid`, `.connections-layer`, `.connector`, `.ribbon`
  - Token docs section appended in `family-tree/docs/ui-improvement-plan.md` if new utilities are introduced
- Acceptance Criteria:
  - `/v2/view` boots with v2 header/shell and compiles
  - All mapped utility classes are available (no raw hex), AA contrast preserved
  - No changes to v1 routes/components
- Subtasks:
  - E12-T0.1 Create `app/v2` and `components-v2` directories
  - E12-T0.2 Add initial `/v2/view` route shell
  - E12-T0.3 Extend `globals.css` with prompt-class mappings
  - E12-T0.4 Update docs: list of utilities + usage examples
- Test Strategy:
  - Smoke test rendering of `/v2/view` (new test file)
  - Lint CSS for unknown classes; ensure no regressions in existing tests
  - Agent Prompt: "As @architect, @dev, @sm, @po: read CLAUDE.md 5–136 (AI Task Workflow) and 138–155 (UI v2 Workflow), and IMPROVEMENT-TASK-TRACKING.md 846–874 only; follow the AI Task Workflow; do E12-T0; confirm acceptance criteria, plan, implement, test, and update docs (incl. ui-improvement-plan.md when applicable); keep reasoning ≤400 tokens; v2-only; ensure /v2/view shell compiles, required token utilities exist in globals.css, and no v1 changes; use MCP Context7 only if external docs are needed."

Implementation Notes:
- Created `family-tree/app/v2/view/page.tsx` minimal shell using `u-header-accent--gradient` and `panel` utilities; verifies token mapping without raw hex.
- Verified required utilities exist in `family-tree/app/globals.css` (`.panel`, `.toolbar-rail`, `.u-header-accent--gradient`, `.input`, `.btn`, `.btn-primary`, `.btn-outline`, `.badge`, `.canvas-grid`, `.connections-layer`, `.connector`, `.ribbon`).
- Updated `family-tree/docs/ui-improvement-plan.md` to mark the route as scaffolded in E12-T0.
- Added smoke test `family-tree/app/components/__tests__/ViewPageV2.test.tsx` asserting v2 header and shell text.

---

### E12-T1: Tree View Home (v2) – Layout, Sidebar, Toolbar, Canvas (P1-CRITICAL) ✅
- Status: Completed - 2025-08-15 | Branch: `main`
- Summary: Fully implemented v2 Home screen matching home-screen-prompt design. MainToolbarV2 includes proper gradient header with family icon and white text. SidebarV2 simplified to Add/Export/Help only. FamilyTreeCanvasV2 renders actual family member nodes with photos, relationship ribbons, and proper responsive behavior including connection hiding <480px.
- Details: See Completed Log → [E12-T1](family-tree/docs/completed-tasks.md#e12-t1)
- Primary Agent: @dev (James) | Supporting: @ux-expert (Sally), @qa (Quinn), @po (Sarah), @sm (Bob)
- References: `home-screen-prompt`, UI v2 Plan (“Tree View Home”) and prior E12‑T1 (Archived) implementation notes
- Description: Implement v2 Home screen using v2 shell, token utilities, and responsive rules. Sidebar exposes Add, Export, Help only. Toolbar groups Title, Search, Filters with tokenized focus and truncation. Canvas ensures connections are layered under member nodes and responsive behavior prevents overlaps at small sizes.
- Files to Add/Change:
  - `family-tree/app/v2/view/page.tsx` (page composition)
  - `family-tree/app/v2/view/ViewPageV2Client.tsx` (client wrapper, if needed)
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

### E12-T2: Add Member Modal (v2) (P1-HIGH) ✅
- Status: Completed - 2025-08-15 | Branch: `improvement-e12-t2-v2-add`
- Summary: v2 Add modal implemented with token-driven styling, APG semantics, mobile bottom-sheet support
- Details: See Completed Log → [E12-T2](family-tree/docs/completed-tasks.md#e12-t2)

---

### E12-T3: Edit Member Modal (v2) (P1-HIGH) ✅
- Status: Completed - 2025-08-15 | Branch: `improvement-e12-t3-v2-edit`
- Summary: EditMemberModalV2 implemented with canvas position/size fields, token-driven styling, APG semantics, mobile bottom-sheet support
- Details: See Completed Log → [E12-T3](family-tree/docs/completed-tasks.md#e12-t3)
- Primary Agent: @dev (James) | Supporting: @ux-expert (Sally), @qa (Quinn)
- References: `edit-screen-prompt`, UI v2 Plan ("Edit Member (v2)"), E10/E11 patterns

### **🎯 Pre-Implementation Analysis (MANDATORY - Complete Before Coding):**
1. **Reference Design Analysis:**
   - [ ] Read `edit-screen-prompt` file thoroughly
   - [ ] Compare with existing AddMemberModalV2 implementation
   - [ ] List specific differences: additional fields, layout changes, styling requirements
   - [ ] Identify all visual elements: headers, sections, buttons, form fields
2. **Gap Analysis:**
   - [ ] Document current EditMemberModal features vs. target design
   - [ ] List missing fields: Canvas Position (X, Y), Canvas Size (Width, Height)
   - [ ] Identify styling/token requirements from E10/E11 patterns
3. **Technical Requirements:**
   - [ ] Confirm MemberForm extension points for edit-only fields
   - [ ] Verify validation rules for position/size fields
   - [ ] Check responsive behavior requirements

### **📋 Detailed Acceptance Criteria:**
**Visual Requirements:**
- [ ] Modal header matches AddMemberModalV2 styling (gradient, icons, spacing)
- [ ] Form sections clearly grouped: Basic Info, Canvas Position & Size, Photo
- [ ] Canvas Position section with X/Y coordinate inputs (numeric, validation)
- [ ] Canvas Size section with Width/Height inputs (numeric, validation, minimums)
- [ ] All inputs use token-driven styling from `globals.css`
- [ ] Error states display with proper ARIA announcements
- [ ] Mobile: Bottom-sheet behavior matches AddMemberModalV2

**Functional Requirements:**
- [ ] Pre-populates all fields with current member data
- [ ] Validates position coordinates (numbers, within canvas bounds)
- [ ] Validates size dimensions (positive numbers, minimum thresholds)
- [ ] Save button disabled until valid changes made
- [ ] Cancel preserves original values
- [ ] Success/error toasts after save/cancel

**Accessibility Requirements:**
- [ ] All form fields properly labeled with `aria-label`
- [ ] Tab order: Basic fields → Position fields → Size fields → Actions
- [ ] Error messages announced via `aria-live="polite"`
- [ ] Modal focus trap active, Escape to close
- [ ] AA contrast ratios maintained for all text/backgrounds

**Responsive Requirements:**
- [ ] Desktop: Modal centered, max-width constraints
- [ ] Tablet (768px): Adjusted padding, readable form fields
- [ ] Mobile (<640px): Bottom-sheet pattern, full-width inputs
- [ ] No horizontal scrolling at any breakpoint
- [ ] Touch targets minimum 44px (buttons, inputs)

### **🔧 Implementation Details:**
- **Files to Create/Modify:**
  - `family-tree/app/components-v2/EditMemberModalV2.tsx` (new modal component)
  - `family-tree/app/components-v2/shared/MemberForm.tsx` (extend for edit-only fields)
- **Required Form Fields:**
  - Basic Info: Name, Gender, Birth Date, Death Date, Relationship, Biography
  - Canvas Position: X Position (number), Y Position (number)  
  - Canvas Size: Width (number), Height (number)
  - Photo: Upload/preview (reuse existing component)
- **Validation Rules:**
  - Position: X/Y must be numbers, within canvas bounds (0-3000 default)
  - Size: Width/Height must be positive numbers, minimum 100px
  - All other validations same as Add modal

### **🧪 Test Strategy:**
- **Test Files to Update:**
  - Mirror existing `EditMemberModal.test.tsx` structure
  - Add tests for new position/size field validation
  - Test responsive behavior at key breakpoints
- **Test Cases:**
  - Form pre-population with existing member data
  - Position/size field validation (positive/negative cases)
  - Mobile bottom-sheet behavior
  - Keyboard navigation and focus management
  - Error state handling and ARIA announcements

### **🤖 Agent Execution Instructions:**
**Step 1: Analysis Phase**
- Read `edit-screen-prompt` and document all visual/functional requirements
- Compare with AddMemberModalV2 to identify reusable patterns
- Create implementation plan with specific component changes needed

**Step 2: Implementation Phase**
- Extend MemberForm component to support edit-only fields conditionally
- Build EditMemberModalV2 using AddMemberModalV2 as template
- Apply all styling tokens consistently with existing modals
- Implement position/size validation with proper error handling

**Step 3: Verification Phase**
- Test modal at all responsive breakpoints (360px, 768px, 1024px+)
- Verify keyboard navigation and screen reader compatibility
- Validate all form fields work with proper validation
- Ensure visual consistency with design reference

As @dev, @ux-expert, @qa: read CLAUDE.md 1–136 (AI Task Workflow), 138–155 (UI v2 Workflow), and 274–331 (Task Status Updates); read IMPROVEMENT-TASK-TRACKING.md 923–1018 (E12-T3 complete specification); follow AI Task Workflow exactly; do E12-T3 Edit Member Modal 
  (v2); MANDATORY pre-implementation: complete Pre-Implementation Analysis checklists (928–941) documenting edit-screen-prompt requirements, AddMemberModalV2 patterns, and Canvas Position/Size field additions; extend MemberForm conditionally for edit-only fields (X/Y
  coordinates, Width/Height dimensions); implement validation (coordinates within 0-3000 bounds, dimensions minimum 100px); match AddMemberModalV2 styling with token-driven design; ensure mobile bottom-sheet behavior, APG modal semantics, AA contrast; comprehensive  
  tests for position/size validation and responsive breakpoints; update docs per workflow steps 1–3 in exact order (code → docs → git); keep reasoning ≤600 tokens; use MCP Context7 only if external docs needed.

---

### E12-T4: Login (v2) (P2-HIGH) ✅
- Status: Completed - 2025-08-15 | Branch: `improvement-e12-t4-v2-login`
- Summary: Implemented v2 login with warm theme tokens, E9-T1 auth integration, comprehensive accessibility
- Details: See Completed Log → [E12-T4](family-tree/docs/completed-tasks.md#e12-t4)

### **🎯 Pre-Implementation Analysis (MANDATORY - Complete Before Coding):**
1. **Reference Design Analysis:**
   - [ ] Read `login-screen-prompt` file and document all visual elements
   - [ ] Compare with existing v1 login page styling and layout
   - [ ] Identify warm theme color requirements and token mappings
   - [ ] Document form layout, field arrangement, button styling
2. **Authentication Flow Analysis:**
   - [ ] Review E9-T1 implementation notes for auth behavior requirements
   - [ ] Confirm POST endpoint, cookie handling, redirect logic
   - [ ] Identify error handling requirements (network, validation, server)
3. **Responsive & Accessibility Analysis:**
   - [ ] Document mobile layout requirements from prompt
   - [ ] List required ARIA attributes and keyboard navigation
   - [ ] Identify focus management and screen reader announcements

### **📋 Detailed Acceptance Criteria:**
**Visual Requirements:**
- [ ] Page uses warm theme colors from token system (not harsh blues)
- [ ] Header section matches prompt design (layout, spacing, typography)
- [ ] Login form centered with proper card styling and elevation
- [ ] Form fields use consistent token-driven styling (borders, focus rings)
- [ ] Submit button uses primary token colors with proper contrast
- [ ] Error messages display with consistent styling and positioning
- [ ] Loading states show appropriate feedback (spinner, disabled button)

**Functional Requirements:**
- [ ] Username/email and password fields with proper validation
- [ ] Form submits to correct endpoint with CSRF protection
- [ ] Success redirects to `/v2/view` (not v1 routes)
- [ ] Network errors display user-friendly messages
- [ ] Server validation errors show inline beneath relevant fields
- [ ] Remember me checkbox functionality (if in design)
- [ ] Login state persists correctly with HttpOnly cookies

**Accessibility Requirements:**
- [ ] Form has proper `<form>` element with `aria-label`
- [ ] All input fields properly labeled with `<label>` elements
- [ ] Error messages announced via `aria-live="polite"`
- [ ] Tab order logical: Username → Password → Submit → Remember Me
- [ ] Focus visible indicators using token-defined focus rings
- [ ] Error states use `aria-invalid` and `aria-describedby`
- [ ] Submit button properly disabled during loading with `aria-busy`

**Responsive Requirements:**
- [ ] Desktop: Centered card with max-width, proper margins
- [ ] Tablet (768px): Adjusted spacing, readable form elements  
- [ ] Mobile (<640px): Full-width card, larger touch targets
- [ ] No horizontal scrolling at any breakpoint
- [ ] Form fields minimum 44px touch target height
- [ ] Loading states work across all screen sizes

### **🔧 Implementation Details:**
- **Files to Create/Modify:**
  - `family-tree/app/v2/login/page.tsx` (new login page)
  - `family-tree/app/globals.css` (verify error/focus tokens exist)
- **Authentication Integration:**
  - Reuse existing `/api/auth/login` endpoint from E9-T1
  - Maintain same HttpOnly cookie behavior
  - Redirect to `/v2/view` on success (not `/view`)
- **Error Handling:**
  - Network errors: "Unable to connect. Please try again."
  - Invalid credentials: "Invalid username or password"
  - Server errors: Display server-provided message
  - Client validation: Required field messages

### **🧪 Test Strategy:**
- **Test Files to Create:**
  - `family-tree/app/v2/login/__tests__/page.test.tsx`
  - Mirror existing login test patterns with v2-specific assertions
- **Test Cases:**
  - Page renders with correct form elements and styling
  - Form validation (required fields, proper error display)
  - Successful login redirects to `/v2/view`
  - Error scenarios (network, server, validation)
  - Accessibility: ARIA attributes, keyboard navigation
  - Responsive: Form layout at different breakpoints

### **🤖 Agent Execution Instructions:**
**Step 1: Design Analysis**
- Read `login-screen-prompt` thoroughly and create visual specification
- Document all color, spacing, typography requirements
- Compare with v1 login to identify styling differences

**Step 2: Implementation**
- Create v2 login page with proper routing structure
- Implement form with token-driven styling throughout
- Add comprehensive error handling with proper ARIA announcements
- Ensure responsive behavior matches design requirements

**Step 3: Integration & Testing**
- Wire up authentication flow to existing API endpoints
- Test all error scenarios with proper user feedback
- Verify accessibility compliance and keyboard navigation
- Validate responsive behavior at all breakpoints
 As @ux-expert, @dev, @qa: read CLAUDE.md 1–136 (AI Task Workflow), 138–155 (UI v2 Workflow), and 274–331 (Task Status Updates); read IMPROVEMENT-TASK-TRACKING.md 1028–1128 (E12-T4 complete specification); follow AI Task Workflow exactly; do E12-T4 Login (v2);
  MANDATORY pre-implementation: complete Pre-Implementation Analysis checklists (1026–1039) documenting login-screen-prompt visual requirements, E9-T1 auth behavior, warm theme token mappings; create family-tree/app/v2/login/page.tsx with token-driven styling (warm      
  colors, not harsh blues); integrate existing /api/auth/login endpoint from E9-T1, redirect to /v2/view on success; implement comprehensive error handling (network, validation, server); ensure form accessibility (proper labels, ARIA announcements, logical tab order);     
   mobile-responsive with 44px touch targets; comprehensive tests for auth flow, error scenarios, accessibility, responsive behavior; update docs per workflow steps 1–3 in exact order (code → docs → git); keep reasoning ≤500 tokens; use MCP Context7 only if external       
  docs needed.
---

### E12-T5: Member Detail (v2) (P2-HIGH) ✅
- Status: Completed - 2025-08-16 | Branch: `improvement-e12-t5-v2-member-detail`
- Summary: Implemented dynamic member detail page with token-driven styling, ARIA compliance, and responsive design
- Details: See Completed Log → [E12-T5](family-tree/docs/completed-tasks.md#e12-t5)

### **🎯 Pre-Implementation Analysis (MANDATORY - Complete Before Coding):**
1. **Reference Design Analysis:**
   - [ ] Read `member-detail-prompt` file thoroughly and document all visual elements
   - [ ] Analyze profile card layout: photo, ribbon, badges, inline label-chips
   - [ ] Document section structure: About, Contact, Relations with dot indicators and keylines
   - [ ] Identify info-grid pattern for structured data display
   - [ ] List all styling classes: `.profile-card`, `.info-grid`, `.section-title`, `.relation-chip`, `.label-chip`, `.u-keyline`
2. **Component Architecture Analysis:**
   - [ ] Compare with existing v1 member detail/banner components
   - [ ] Identify reusable patterns from E11 chip/divider/icon implementations
   - [ ] Plan component breakdown: page vs banner vs info sections
3. **Data Integration Analysis:**
   - [ ] Review member data model for required fields (name, photo, bio, contact, relationships)
   - [ ] Plan relationship rendering logic (parent, spouses, children)
   - [ ] Identify navigation requirements (back button, breadcrumbs, edit actions)

### **📋 Detailed Acceptance Criteria:**
**Visual Requirements:**
- [ ] Header matches prompt: gradient background, back button, search input, user avatar
- [ ] Breadcrumb navigation with badge styling and action buttons (Edit/Delete)
- [ ] Profile summary section: circular photo, ribbon name, relationship badge, label-chips for gender/dates
- [ ] About section: dot indicator, keyline divider, 2-column info-grid, biography text
- [ ] Contact section: dot indicator, keyline divider, email/phone/address in info-grid
- [ ] Relations section: dot indicator, keyline divider, relation-chips with avatars for parent/spouses/children
- [ ] All styling uses token-driven classes from `globals.css`
- [ ] Color scheme matches pastel theme with consistent spacing

**Functional Requirements:**
- [ ] Dynamic member ID routing via `/v2/members/[id]` pattern
- [ ] Real member data integration from family tree context
- [ ] Relationship navigation (clicking relation chips navigates to that member)
- [ ] Edit/Delete action buttons functional (modal triggers or navigation)
- [ ] Back button returns to tree view or previous page
- [ ] Search functionality in header
- [ ] Proper error handling for missing member data

**Accessibility Requirements:**
- [ ] Page has proper heading hierarchy (h1 for page title, h2 for sections, h3 for subsections)
- [ ] All sections have proper ARIA landmarks (`<section>`, `<main>`, `<header>`)
- [ ] Images have descriptive alt text (member photos, avatars)
- [ ] Interactive elements keyboard-accessible with proper focus indicators
- [ ] Relationship chips announce destination when focused
- [ ] Form buttons properly labeled with `aria-label` attributes
- [ ] Content readable with screen readers (logical tab order)

**Responsive Requirements:**
- [ ] Desktop: Two-column info grids, horizontal profile layout
- [ ] Tablet (768px): Adjusted spacing, maintained readability
- [ ] Mobile (<640px): Single-column info grids, stacked profile layout
- [ ] Ultra-mobile (360-480px): Compact spacing, readable text size
- [ ] Touch targets minimum 44px for buttons and chips
- [ ] No horizontal scrolling at any breakpoint

### **🔧 Implementation Details:**
- **Files to Create/Modify:**
  - `family-tree/app/v2/members/[id]/page.tsx` (main member detail page)
  - `family-tree/app/components-v2/MemberBannerV2.tsx` (reusable profile summary component)
  - `family-tree/app/components-v2/MemberInfoGrid.tsx` (info grid component for About/Contact)
  - `family-tree/app/components-v2/RelationChips.tsx` (relationship display component)
- **Required Data Fields:**
  - Basic: name, photo, gender, title, relationship, birthDate, deathDate, biography
  - Contact: email, phone, address
  - Relations: parentId, spouseIds[], childrenIds[] with lookup logic
- **Token Classes to Use:**
  - Layout: `.panel`, `.u-header-accent--gradient`, `.badge`
  - Profile: `.profile-card`, `.node-photo`, `.ribbon`, `.ribbon-peach`
  - Structure: `.section-title`, `.u-keyline`, `.info-grid`, `.info-item`
  - Relations: `.relation-list`, `.relation-chip`, `.avatar`
  - Labels: `.label-chip`, `.value`, `.value-muted`

### **🧪 Test Strategy:**
- **Test Files to Create:**
  - `family-tree/app/v2/members/[id]/__tests__/page.test.tsx`
  - `family-tree/app/components-v2/__tests__/MemberBannerV2.test.tsx`
  - `family-tree/app/components-v2/__tests__/MemberInfoGrid.test.tsx`
- **Test Cases:**
  - Page renders with valid member ID parameter
  - Profile section displays all member information correctly
  - About/Contact sections show proper info-grid layout
  - Relations display correctly with clickable chips
  - Responsive behavior at key breakpoints (360px, 768px, 1024px)
  - Accessibility: heading structure, ARIA landmarks, keyboard navigation
  - Error handling: invalid member ID, missing data fields
  - Navigation: back button, edit actions, relation chip clicks

### **🤖 Agent Execution Instructions:**
**Step 1: Design Analysis & Planning**
- Analyze `member-detail-prompt` HTML structure and styling patterns
- Map design elements to required React components and token classes
- Plan data flow from family tree context to component props
- Document component hierarchy and reusability strategy

**Step 2: Implementation Phase**
- Create dynamic route page with member ID parameter handling
- Build MemberBannerV2 component with profile card layout
- Implement MemberInfoGrid for structured data display
- Build RelationChips component with navigation functionality
- Apply token-driven styling consistently throughout

**Step 3: Integration & Testing**
- Wire up family tree data context and member lookup logic
- Implement navigation between member detail pages
- Add comprehensive test coverage for all components
- Verify responsive behavior and accessibility compliance
- Test error scenarios and edge cases

As @ux-expert, @dev, @qa: read CLAUDE.md 1–136 (AI Task Workflow), 138–155 (UI v2 Workflow), and 274–331 (Task Status Updates); read IMPROVEMENT-TASK-TRACKING.md 1132–1240 (E12-T5 complete specification); follow AI Task Workflow exactly; do E12-T5 Member Detail (v2); MANDATORY pre-implementation: complete Pre-Implementation Analysis checklists (1138–1151) documenting member-detail-prompt visual elements, component architecture, and data integration; create family-tree/app/v2/members/[id]/page.tsx with dynamic routing and family-tree/app/components-v2/MemberBannerV2.tsx with profile layout; implement E11 chip/divider/icon patterns using token-driven styling (.profile-card, .info-grid, .section-title, .relation-chip, .label-chip); ensure proper ARIA landmarks, heading hierarchy, and keyboard navigation; mobile-responsive with single-column layout <640px and 44px touch targets; comprehensive tests for hierarchy, accessibility, responsive behavior, and navigation; update docs per workflow steps 1–3 in exact order (code → docs → git); keep reasoning ≤600 tokens; use MCP Context7 only if external docs needed.
---

### E12-T6: Help Panel (v2) (P2-MEDIUM) ✅
- Status: Completed - 2025-01-16 | Branch: `improvement-e12-t6-v2-help`
- Summary: Implemented v2 Help Panel with modal dialog structure, section reveal animations, and token-driven styling
- Details: See Completed Log → [E12-T6](family-tree/docs/completed-tasks.md#e12-t6)

### **🎯 Pre-Implementation Analysis (MANDATORY - Complete Before Coding):**
1. **Reference Design Analysis:**
   - [ ] Read `help-panel-prompt` file thoroughly and document all visual elements
   - [ ] Analyze modal structure: backdrop, dialog card, header with accent bar, content sections
   - [ ] Document section organization: Getting Started, Keyboard Shortcuts, Tips & Tour, More Help
   - [ ] Identify interactive elements: close button, action buttons (Start Tour, Show Tips)
   - [ ] List all styling classes: `.panel`, `.u-header-accent--gradient`, `.btn`, `.icon-btn`, `.u-section-reveal`
2. **Component Integration Analysis:**
   - [ ] Compare with existing v1 HelpPanel component patterns
   - [ ] Review E6 modal patterns for dialog behavior and focus management
   - [ ] Plan integration with sidebar Help button trigger
3. **Accessibility Pattern Analysis:**
   - [ ] Document required ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
   - [ ] Plan focus management: initial focus, focus trap, escape handling, return focus
   - [ ] Review heading hierarchy and landmark structure requirements

### **📋 Detailed Acceptance Criteria:**
**Visual Requirements:**
- [ ] Modal backdrop with blur effect covering full viewport
- [ ] Help dialog card centered with proper max-width and responsive constraints
- [ ] Header with subtle accent gradient bar on left edge
- [ ] Header content: icon, title "Help & Shortcuts", description, close button
- [ ] Content sections with proper spacing and visual hierarchy
- [ ] Section reveal animation with smooth entrance effects
- [ ] Action buttons with proper styling: "Start Tour" (primary gradient), "Show Tips" (outline)
- [ ] Mobile adaptation: full-height on small screens, rounded corners removed
- [ ] All styling uses token-driven classes from `globals.css`

**Functional Requirements:**
- [ ] Opens when Help button clicked in sidebar
- [ ] Modal closes on backdrop click, close button click, or Escape key
- [ ] Action buttons functional: "Start Tour" and "Show Tips" trigger appropriate handlers
- [ ] Smooth open/close animations using CSS transitions
- [ ] Focus returns to Help button when modal closes
- [ ] Content scrollable if it exceeds modal height
- [ ] Modal state properly managed in component hierarchy

**Accessibility Requirements:**
- [ ] Modal has `role="dialog"` and `aria-modal="true"`
- [ ] Header properly labeled with `aria-labelledby` pointing to title
- [ ] Description linked with `aria-describedby`
- [ ] Focus trap active: Tab/Shift+Tab contained within modal
- [ ] Initial focus on close button or first interactive element
- [ ] Escape key closes modal and returns focus to trigger
- [ ] Background content marked `aria-hidden="true"` when modal open
- [ ] All sections have proper heading hierarchy (h2 → h3)
- [ ] Interactive elements have proper labels and keyboard accessibility

**Responsive Requirements:**
- [ ] Desktop: Centered modal with max-width constraints and margin padding
- [ ] Tablet (768px): Adjusted modal size with appropriate spacing
- [ ] Mobile (<640px): Full-height modal, no border radius, full-width
- [ ] Content scrolling when exceeding available height
- [ ] Touch targets minimum 44px for all buttons
- [ ] No horizontal scrolling within modal content

### **🔧 Implementation Details:**
- **Files to Create/Modify:**
  - `family-tree/app/components-v2/HelpPanelV2.tsx` (main modal component)
  - `family-tree/app/components-v2/shared/Modal.tsx` (if not existing, base modal wrapper)
- **Required Features:**
  - Modal backdrop and dialog card structure
  - Help content sections: Getting Started, Shortcuts, Tips, More Help
  - Action buttons: Start Tour, Show Tips with proper handlers
  - Section reveal animation with intersection observer
  - Focus management and keyboard navigation
- **Token Classes to Use:**
  - Modal: `.panel`, backdrop blur utilities
  - Header: `.u-header-accent--gradient`, `.icon-btn`
  - Buttons: `.btn`, `.btn-primary`, `.btn-primary--gradient`, `.btn-outline`, `.btn-press`
  - Sections: `.u-section-reveal`, proper heading styles
  - Responsive: mobile-first breakpoint utilities

### **🧪 Test Strategy:**
- **Test Files to Create:**
  - `family-tree/app/components-v2/__tests__/HelpPanelV2.test.tsx`
- **Test Cases:**
  - Modal renders with correct structure and content sections
  - Open/close functionality works via button, backdrop, and Escape key
  - Focus management: initial focus, focus trap, return focus
  - Action buttons trigger appropriate handlers
  - Responsive behavior at key breakpoints (360px, 768px, 1024px)
  - Accessibility: ARIA attributes, heading structure, keyboard navigation
  - Section reveal animation triggers correctly
  - Modal state integration with parent components

### **🤖 Agent Execution Instructions:**
**Step 1: Design Analysis & Component Planning**
- Analyze `help-panel-prompt` HTML structure, particularly modal dialog pattern
- Map design elements to React components and token classes
- Plan modal state management and integration with sidebar Help button
- Document accessibility requirements and focus management strategy

**Step 2: Implementation Phase**
- Create HelpPanelV2 component with proper modal dialog structure
- Implement section content matching the prompt design exactly
- Add focus management and keyboard navigation
- Apply token-driven styling consistently with responsive behavior
- Implement section reveal animation with intersection observer

**Step 3: Integration & Testing**
- Wire up modal trigger from sidebar Help button
- Test modal behavior across all viewport sizes
- Verify accessibility compliance with screen readers
- Add comprehensive test coverage for modal functionality
- Test keyboard navigation and focus management

As @ux-expert, @dev, @qa: read CLAUDE.md 1–136 (AI Task Workflow), 138–155 (UI v2 Workflow), and 274–331 (Task Status Updates); read IMPROVEMENT-TASK-TRACKING.md 1246–1350 (E12-T6 complete specification); follow AI Task Workflow exactly; do E12-T6 Help Panel (v2); MANDATORY pre-implementation: complete Pre-Implementation Analysis checklists (1252–1265) documenting help-panel-prompt modal structure, E6 patterns, and accessibility requirements; create family-tree/app/components-v2/HelpPanelV2.tsx with proper modal dialog pattern (backdrop, focus trap, ARIA attributes); implement content sections (Getting Started, Shortcuts, Tips, More Help) with token-driven styling (.panel, .u-header-accent--gradient, .btn variants, .u-section-reveal); ensure APG modal semantics, keyboard navigation, and responsive behavior (full-height mobile, centered desktop); integrate with sidebar Help button trigger; comprehensive tests for modal functionality, accessibility, and responsive behavior similar to HelpPanel.test.tsx patterns; update docs per workflow steps 1–3 in exact order (code → docs → git); keep reasoning ≤500 tokens; use MCP Context7 only if external docs needed.
---

### E12-T7: QA Validation – Accessibility, Responsive, Performance (P1-CRITICAL)
- Status: Pending | Branch: `improvement-e12-t7-v2-qa`
- Primary Agent: @qa (Quinn) | Supporting: @dev (James), @ux-expert (Sally)
- References: UI v2 Plan "Validation Plan (QA)"

### **🎯 Pre-Validation Analysis (MANDATORY - Complete Before Testing):**
1. **Scope Definition:**
   - [ ] List all completed v2 components: ViewPageV2, MainToolbarV2, SidebarV2, FamilyTreeCanvasV2, AddMemberModalV2, EditMemberModalV2 (if completed)
   - [ ] Document reference designs for each component
   - [ ] Identify critical user flows to validate
2. **Test Environment Setup:**
   - [ ] Verify test data exists for comprehensive validation
   - [ ] Set up responsive testing tools/browser dev tools
   - [ ] Configure accessibility testing tools (axe-core, screen reader)
3. **Baseline Establishment:**
   - [ ] Document current v1 behavior to ensure no regressions
   - [ ] Record current performance metrics for comparison
   - [ ] List existing test suite status

### **📋 Detailed Validation Criteria:**

**🔍 Accessibility Validation:**
- **Modal Components (AddMemberModalV2, EditMemberModalV2 if ready):**
  - [ ] Focus trap works correctly (Tab/Shift+Tab contained within modal)
  - [ ] Escape key closes modal and returns focus to trigger
  - [ ] Modal has `role="dialog"` and `aria-labelledby` pointing to header
  - [ ] Background content marked `aria-hidden="true"` when modal open
  - [ ] All form fields have proper labels (`<label>` or `aria-label`)
  - [ ] Error messages announced via `aria-live="polite"`
  - [ ] Submit buttons disabled/enabled with `aria-disabled` states
  - [ ] Validation errors use `aria-invalid` and `aria-describedby`

- **Navigation Components (MainToolbarV2, SidebarV2):**
  - [ ] All buttons have descriptive labels or `aria-label`
  - [ ] Focus indicators visible on all interactive elements
  - [ ] Search input properly labeled with `aria-label`
  - [ ] Keyboard navigation follows logical tab order
  - [ ] Skip links provided for keyboard users (if applicable)

- **Canvas Component (FamilyTreeCanvasV2):**
  - [ ] Canvas has `role="application"` or appropriate landmark
  - [ ] Member nodes accessible via keyboard (Tab navigation)
  - [ ] Connection information available to screen readers
  - [ ] Zoom controls have proper labels and keyboard shortcuts

**📱 Responsive Validation:**
- **Breakpoint Testing (Required Viewports):**
  - [ ] 360px (Small mobile): No horizontal scroll, readable text, functional interactions
  - [ ] 480px (Large mobile): Connections hidden, member cards stacked properly
  - [ ] 768px (Tablet): Layout transitions properly, touch targets adequate
  - [ ] 1024px (Desktop): Full desktop layout with sidebar, proper spacing
  - [ ] 1440px+ (Large desktop): Content doesn't stretch awkwardly

- **Component-Specific Responsive Checks:**
  - [ ] MainToolbarV2: Title truncation works, search input resizes correctly
  - [ ] SidebarV2: Collapses/simplifies on mobile, icons remain visible
  - [ ] FamilyTreeCanvasV2: Pan/zoom works on touch, member cards don't overlap
  - [ ] Modals: Transform to bottom-sheet on mobile, keyboard avoidance
  - [ ] Text remains readable at all sizes (minimum 16px equivalent)

**⚡ Performance Validation:**
- **Rendering Performance:**
  - [ ] Initial page load <3 seconds on simulated 3G
  - [ ] Canvas interactions maintain ≥30fps (measure with dev tools)
  - [ ] Modal open/close animations smooth (≥60fps target)
  - [ ] No layout thrashing during responsive resize
  - [ ] Virtualization works with 20+ family members

- **Bundle & Loading Checks:**
  - [ ] v2 routes don't significantly increase bundle size
  - [ ] Code splitting working (v2 components only load when needed)
  - [ ] No memory leaks during extended usage
  - [ ] Image loading optimized (placeholder → actual image)

**🔄 Regression Validation:**
- **Critical v1 Flows (Must Remain Unaffected):**
  - [ ] v1 login flow works identically
  - [ ] v1 `/view` page fully functional
  - [ ] v1 Add/Edit modals work without changes
  - [ ] v1 search/filter functionality intact
  - [ ] v1 export functionality works
  - [ ] v1 test suite passes without modifications

### **🧪 Comprehensive Test Strategy:**
**Automated Testing:**
- [ ] Run full v1 test suite - ensure 100% pass rate
- [ ] Run new v2 tests - ensure all pass
- [ ] Accessibility automated tests (axe-core) on all v2 pages
- [ ] Responsive automated tests at key breakpoints

**Manual Testing Checklist:**
- [ ] Test all v2 user flows with keyboard only (no mouse)
- [ ] Test with screen reader (NVDA/JAWS) on Windows, VoiceOver on Mac
- [ ] Test on real mobile devices (iOS Safari, Android Chrome)
- [ ] Test with reduced motion settings enabled
- [ ] Test with high contrast mode enabled
- [ ] Test with 200% browser zoom

**Performance Testing:**
- [ ] Measure Core Web Vitals (LCP, FID, CLS) for v2 pages
- [ ] Profile memory usage during extended canvas interaction
- [ ] Test with simulated slow 3G network conditions
- [ ] Measure bundle size difference between v1 and v2 routes

### **📊 Success Metrics & Reporting:**
**Required Metrics:**
- Accessibility: 0 axe-core violations, keyboard navigation 100% functional
- Responsive: No layout breaks at any tested viewport
- Performance: <3s load time, >30fps interactions, Core Web Vitals in "Good" range
- Regression: 100% v1 test suite pass rate, all critical flows functional

**Documentation Requirements:**
- [ ] Update `family-tree/docs/completed-tasks.md` with comprehensive validation report
- [ ] Document any issues found and their resolution status
- [ ] Include performance metrics and comparison with baseline
- [ ] Add screenshots/videos of responsive behavior validation

### **🤖 Agent Execution Instructions:**
**Phase 1: Comprehensive Testing Setup**
- Set up testing environment with all required tools and data
- Create detailed test plan based on completed v2 components
- Establish performance baselines from current implementation

**Phase 2: Systematic Validation**
- Execute accessibility, responsive, and performance tests methodically
- Document all findings with specific reproduction steps
- Prioritize critical issues that block user workflows

**Phase 3: Regression & Reporting**
- Verify v1 functionality remains completely intact
- Compile comprehensive validation report with metrics
- Provide recommendations for any issues found

As @qa, @dev, @ux-expert: read CLAUDE.md 1–136 (AI Task Workflow), 138–155 (UI v2 Workflow), and 274–331 (Task Status Updates); read IMPROVEMENT-TASK-TRACKING.md 1162–1294 (E12-T7 complete validation specification); follow AI Task Workflow exactly; do E12-T7 QA
  Validation; MANDATORY pre-validation: complete Pre-Validation Analysis checklists (1167–1179) documenting all completed v2 components and critical user flows; execute comprehensive validation across three domains: (1) Accessibility - focus traps, ARIA compliance,        
  keyboard navigation, axe-core violations; (2) Responsive - breakpoint testing at 360px/480px/768px/1024px/1440px with no overlaps or layout breaks; (3) Performance - <3s load times, ≥30fps interactions, Core Web Vitals, bundle size analysis; verify zero v1
  regressions (all existing flows functional, 100% test suite pass rate); document findings with metrics, screenshots, reproduction steps in comprehensive validation report; update family-tree/docs/completed-tasks.md with performance comparisons and issue resolution       
  status; keep reasoning ≤800 tokens for this critical validation task; use MCP Context7 only if external docs needed.c

