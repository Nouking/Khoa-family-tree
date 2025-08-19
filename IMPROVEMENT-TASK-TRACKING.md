# Family Tree Improvement Task Tracking

> Policy: This tracker keeps full details only for Pending/In Progress tasks. Completed tasks are summarized here and linked to their full write-ups in `family-tree/docs/completed-tasks.md` to prevent file bloat.

> **Agent-Ready Implementation Plan** - Structured for @pm, @po, @sm workflow integration

This document tracks Epic 13: Critical UI & API Fixes based on reported issues in the `@Instruction` file. All reported problems have been mapped to specific, actionable tasks that AI agents can execute following the established project workflow.

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
- **Example**: `improvement-e13-t1-v2-login-sizing-fix`

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

## Epic 13: Critical UI & API Fixes 🚨
**Priority**: P1-CRITICAL | **Estimated Timeline**: 1-2 weeks
**Goal**: Resolve all reported issues from @Instruction file while maintaining existing functionality
**Success Criteria**: 100% visual parity with prompt files, zero API errors, enhanced UX functionality

### E13-T10: v2 CSS Architecture Consolidation (P0-BLOCKING) ✅
- **Status**: Completed - 2025-01-18 | Branch: `improvement-e13-t10-v2-css-consolidation`
- **Summary**: Successfully consolidated all v2-specific CSS into v2-styles.css, updated component imports, established v2- prefixed class naming architecture, and removed v2 dependencies from globals.css
- **Details**: See Completed Log → [E13-T10](family-tree/docs/completed-tasks.md#e13-t10)
- **Primary Agent**: @architect (Winston - CSS architecture and system design) - `.cursor/rules/architect.mdc`
- **Supporting Agents**: @dev (James - Implementation and file refactoring) - `.cursor/rules/dev.mdc`, @qa (Quinn - Visual regression testing) - `.cursor/rules/qa.mdc`
- **Description**: Consolidate all v2-specific CSS into dedicated `family-tree/app/v2/v2-styles.css` file to prevent conflicts and establish clean architectural separation from v1 styling system
- **Dependencies**: None (becomes prerequisite for all other v2 CSS-dependent tasks)
- **Reference Files**:
  - **Target CSS File**: `family-tree/app/v2/v2-styles.css` (consolidation destination)
  - **Source Files**: `family-tree/app/globals.css` (extract v2 styles), all v2 components for import updates
  - **Architecture Goal**: Complete separation between v1 and v2 styling systems
- **Acceptance Criteria**:
  - GIVEN all v2 components and pages exist
  - WHEN CSS architecture consolidation is complete
  - THEN all v2-specific styles are contained in `family-tree/app/v2/v2-styles.css`
  - AND no v2 component depends on `globals.css` for v2-specific styling
  - AND all v2 components import `v2-styles.css` using relative imports
  - AND no style conflicts exist between v1 and v2 systems
  - AND visual parity is maintained for all existing v2 components
  - AND clean architectural boundaries are established for future v2 development
- **Implementation Details**:
  - Audit `globals.css` to identify all v2-specific styles (warm theme tokens, v2 utilities)
  - Move v2-specific CSS custom properties and utility classes to `v2-styles.css`
  - Organize `v2-styles.css` with clear sections: tokens, utilities, components, responsive
  - Update all v2 component imports to use `import '../v2-styles.css'` or appropriate relative path
  - Replace global class dependencies with v2-specific class names (prefix with `v2-`)
  - Eliminate duplicate styles between global and v2 systems
  - Establish v2 CSS naming conventions and architectural standards
  - Ensure all v2 pages and components load styling correctly
- **CSS Architecture Requirements**:
  - All v2 styles must be self-contained in `v2-styles.css`
  - Use `v2-` prefix for all v2-specific CSS classes
  - Import pattern: `import '../v2-styles.css'` from v2 pages, `import '../../v2-styles.css'` from v2 components
  - No modification of `globals.css` for v2-specific needs
  - Maintain token-driven design system within v2 architecture
  - Preserve responsive design and accessibility features
- **Technical Requirements**:
  - CSS custom properties scoped to v2 system
  - Proper import hierarchy to prevent conflicts
  - Performance optimization (no duplicate CSS loading)
  - Cross-browser compatibility maintained
  - Build system integration (ensure CSS is properly bundled)
  - Documentation of v2 CSS patterns for future development
- **Files to Create/Modify**:
  - `family-tree/app/v2/v2-styles.css` (consolidation destination, enhance existing)
  - `family-tree/app/globals.css` (remove v2-specific styles)
  - All v2 components in `family-tree/app/components-v2/` (update imports)
  - All v2 pages in `family-tree/app/v2/` (update imports)
  - Documentation files (update CSS architecture guidelines)
- **Testing Requirements**:
  - Visual regression testing for all v2 components
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Responsive design validation across all viewport sizes
  - Performance testing (CSS load times and rendering)
  - Build system testing (ensure proper CSS bundling)
  - Accessibility testing (contrast, focus indicators maintained)
- **Branch**: `improvement-e13-t10-v2-css-architecture-consolidation`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T10. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 47-102 for E13-T10 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @architect (primary) = @.cursor\rules\architect.mdc + @dev = @.cursor\rules\dev.mdc + @qa = @.cursor\rules\qa.mdc collaboration. Consolidate all v2 CSS into family-tree/app/v2/v2-styles.css, update component imports, establish clean architectural separation from v1 system. Remove v2 dependencies from globals.css, use v2- prefixing, ensure visual parity maintained. Implement v2 CSS Architecture Standards from CLAUDE.md (156-170). This is BLOCKING task - all other v2 CSS-dependent tasks depend on clean CSS architecture. Complete in order: code → docs → git.
```

### E13-T1: v2 Login Page Sizing & Responsive Fix (P1-CRITICAL) ✅
- **Status**: Re-executed - 2025-08-18 | Branch: `improvement-e13-t1-v2-login-responsive-fixes`
- **Summary**: Implemented responsive fixes per user specifications: removed max-w-md constraint, changed button to full-width (w-full), migrated max-width to CSS custom property (--v2-container-login-max-width), and ensured v2 CSS architecture compliance.
- **Details**: See Completed Log → [E13-T1](family-tree/docs/completed-tasks.md#e13-t1)
- **Primary Agent**: @ux-expert (Sally - UI design analysis and responsive strategy) - `.cursor/rules/ux-expert.mdc`
- **Supporting Agents**: @dev (James - Implementation) - `.cursor/rules/dev.mdc`, @qa (Quinn - Cross-device testing) - `.cursor/rules/qa.mdc`
- **Description**: Fix v2 login page sizing to match `login-screen-prompt` specifications exactly across all viewport sizes
- **Dependencies**: None
- **Reference Files**:
  - **Target Design**: `login-screen-prompt` (HTML reference)
  - **Current Implementation**: `family-tree/app/v2/login/page.tsx` (React component)
  - **Current State Analysis**: Implementation is 85% aligned but needs container sizing and button layout adjustments
- **Acceptance Criteria**:
  - GIVEN the v2 login page is accessed at `/v2/login`
  - WHEN viewed on desktop (1024px+), tablet (768px), and mobile (360px+)
  - THEN the page layout matches `login-screen-prompt` visual specifications exactly
  - AND form elements maintain proper proportions and spacing
  - AND warm color theme tokens (mint, peach, lilac, sage) are applied correctly
  - AND touch targets are minimum 44px on mobile devices
  - AND no horizontal scrolling occurs at any supported viewport size
  - AND button width matches full-width approach from reference design
- **Specific Gap Analysis**:
  - **Container Sizing**: Current `max-w-md` (448px) → Update to match prompt's flexible approach
  - **Button Layout**: Current `w-1/2` → Change to full-width as per reference design
  - **Theme Tokens**: Current inline styles → Migrate to CSS custom properties system
  - **Error States**: Current styling differs → Align with prompt's color-mix approach
- **Implementation Details**:
  - Analyze `login-screen-prompt` HTML/CSS for exact specifications (lines 22-200)
  - Review current `family-tree/app/v2/login/page.tsx` implementation (current: 303 lines)
  - Identify responsive breakpoint issues and container sizing problems
  - Apply proper viewport units (dvh, vw) and container queries
  - Ensure warm theme tokens (mint, peach, lilac, sage) are properly applied via CSS variables
  - Validate gradient button styling matches prompt specifications exactly
  - Test form layout across all supported device sizes
  - Verify accessibility compliance (contrast, focus indicators, touch targets)
- **Technical Requirements**:
  - Container max-width adjustments: Remove `max-w-md` constraint, use flexible sizing
  - Button layout: Change from `w-1/2` to full-width approach with proper centering
  - CSS custom properties: Migrate from inline styles to `--color-*` token system
  - Gradient implementation: Match exact gradient stops from reference (mint → sun → lilac)
  - Mobile-first responsive design approach with proper breakpoints
  - Touch-friendly interaction areas (44px minimum) - already implemented
  - Form validation and error display alignment with prompt specifications
- **Files to Modify**:
  - `family-tree/app/v2/login/page.tsx` (primary implementation)
  - `family-tree/app/globals.css` (token adjustments if needed)
- **Testing Requirements**:
  - Cross-device testing (iOS Safari, Android Chrome, Desktop browsers)
  - Accessibility validation (screen reader, keyboard navigation)
  - Visual regression testing against `login-screen-prompt` reference
  - Form functionality validation with error states
  - Responsive behavior validation at breakpoints: 360px, 768px, 1024px+
- **Branch**: `improvement-e13-t1-v2-login-sizing-fix`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T1. Read CLAUDE.md sections 1–136, 138–155, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 47-173 for E13-T1 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @ux-expert (primary) = @.cursor\rules\ux-expert.mdc + @dev = @.cursor\rules\dev.mdc + @qa = @.cursor\rules\qa.mdc collaboration. Implement login page responsive fixes matching login-screen-prompt exactly across all viewports. Fix container sizing (remove max-w-md), change button from w-1/2 to full-width, migrate to CSS custom properties. Complete in order: code → docs → git.
```

### E13-T2: Admin Script Path Resolution (P1-CRITICAL) ✅
- **Status**: Completed - 2025-08-18 | Branch: `improvement-e13-t2-admin-script-path-fix`
- **Summary**: Fixed admin seed script path resolution by moving script to correct location and fixing dependency imports
- **Details**: See Completed Log → [E13-T2](family-tree/docs/completed-tasks.md#e13-t2)
- **Primary Agent**: @dev (James - File system and path resolution) - `.cursor/rules/dev.mdc`
- **Supporting Agents**: @po (Sarah - Documentation validation) - `.cursor/rules/po.mdc`, @architect (Winston - Build system) - `.cursor/rules/architect.mdc`
- **Description**: Fix admin seed script path error preventing password management functionality
- **Dependencies**: None
- **Reference Files**:
  - **Target Script**: `family-tree/scripts/seed-admin.mjs` (Node.js script)
  - **Documentation**: `family-tree/README.md` (line 146 - command reference)
  - **Current Error**: Double `family-tree` directory nesting in path resolution
- **Acceptance Criteria**:
  - GIVEN the command `node family-tree/scripts/seed-admin.mjs --password=admin`
  - WHEN run from project root directory
  - THEN the script executes successfully without path errors
  - AND admin password is updated in users.json
  - AND documentation reflects correct usage instructions
  - AND script can be run from any directory with proper relative paths
- **Implementation Details**:
  - Current error: `Cannot find module 'D:\...\family-tree\family-tree\scripts\seed-admin.mjs'`
  - Issue appears to be double `family-tree` directory nesting in path resolution
  - Investigate actual file location: `family-tree/scripts/seed-admin.mjs`
  - Fix path resolution in script or update documentation
  - Ensure script handles relative paths correctly
  - Validate script functionality with various password inputs
  - Update README.md line 146 with correct command syntax
- **Technical Requirements**:
  - Proper Node.js module resolution
  - Cross-platform path handling (Windows/Unix)
  - Input validation for password parameter
  - Idempotent script execution (safe to run multiple times)
  - Clear error messages for invalid inputs
- **Files to Investigate/Modify**:
  - `family-tree/scripts/seed-admin.mjs` (verify location and imports)
  - `family-tree/README.md` (line 146 command correction)
  - `family-tree/package.json` (script definitions if needed)
- **Testing Requirements**:
  - Test from project root directory
  - Test from family-tree subdirectory
  - Test with various password parameters
  - Verify users.json is updated correctly
  - Cross-platform testing (Windows/macOS/Linux)
- **Branch**: `improvement-e13-t2-admin-script-path-fix`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T2. Read CLAUDE.md sections 1–136, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 168-209 for E13-T2 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @dev (primary) = @.cursor\rules\dev.mdc + @po = @.cursor\rules\po.mdc + @architect = @.cursor\rules\architect.mdc collaboration. Fix admin script path error preventing password management. Resolve double family-tree directory nesting in path resolution for seed-admin.mjs script. Test cross-platform execution and update documentation. Complete in order: code → docs → git.
```

### E13-T3: API Fetch Error Resolution in v2/view (P1-CRITICAL) ✅
- **Status**: Completed - 2025-08-18 | Branch: `improvement-e13-t3-api-fetch-error-fix`
- **Primary Agent**: @architect (Winston - API architecture and debugging) - `.cursor/rules/architect.mdc`
- **Supporting Agents**: @dev (James - Frontend implementation) - `.cursor/rules/dev.mdc`, @qa (Quinn - Error handling testing) - `.cursor/rules/qa.mdc`
- **Summary**: Fixed API fetch errors in v2/view by implementing centralized API client with retry logic, error boundaries, and enhanced error handling
- **Details**: See Completed Log → [E13-T3](family-tree/docs/completed-tasks.md#e13-t3)
- **Description**: Resolve "Failed to fetch" errors occurring in `/v2/view` that break core functionality
- **Dependencies**: None
- **Reference Files**:
  - **Frontend Component**: `family-tree/app/v2/view/page.tsx` (React page component)
  - **API Routes**: `family-tree/app/api/members/route.ts`, `family-tree/app/api/auth/route.ts`
  - **Error Location**: Browser console stack traces pointing to form submission handlers
- **Acceptance Criteria**:
  - GIVEN a user navigates to `/v2/view`
  - WHEN the page loads and attempts API calls
  - THEN all fetch requests complete successfully
  - AND no "Failed to fetch" errors appear in console
  - AND family tree data loads and displays correctly
  - AND all interactive features (add, edit, delete) function properly
  - AND appropriate error handling is in place for actual network failures
- **Implementation Details**:
  - Error appears in browser console with stack trace pointing to form submission
  - Investigate API endpoint availability and routing
  - Check CORS configuration and headers
  - Verify authentication token handling
  - Examine network requests in browser dev tools
  - Test API endpoints independently (Postman/curl)
  - Identify specific failing endpoints from error stack trace
  - Implement proper error boundaries and fallback UI
  - Add comprehensive logging for debugging future issues
- **Technical Requirements**:
  - API endpoint health check and validation
  - Proper HTTP status code handling (200, 400, 401, 500)
  - CORS configuration for development and production
  - Authentication token validation and refresh
  - Error boundary implementation for graceful degradation
  - Retry logic for transient network failures
  - User-friendly error messages
- **Investigation Areas**:
  - `/api/members` endpoint functionality
  - `/api/auth` endpoint availability
  - Network request timing and timeout handling
  - Browser extension interference (noted in stack trace)
  - CSP (Content Security Policy) restrictions
- **Files to Examine/Modify**:
  - `family-tree/app/v2/view/page.tsx`
  - `family-tree/app/api/members/route.ts`
  - `family-tree/app/api/auth/route.ts`
  - Network configuration files
  - Error boundary components
- **Testing Requirements**:
  - API endpoint testing with various scenarios
  - Network failure simulation
  - Cross-browser testing
  - Error handling validation
  - Performance testing with slow connections
- **Branch**: `improvement-e13-t3-api-fetch-error-fix`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T3. Read CLAUDE.md sections 1–136, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 216-275 for E13-T3 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @architect (primary) = @.cursor\rules\architect.mdc + @dev = @.cursor\rules\dev.mdc + @qa = @.cursor\rules\qa.mdc collaboration. Resolve "Failed to fetch" errors in /v2/view breaking core functionality. Investigate API endpoints, CORS configuration, authentication token handling, and implement proper error boundaries. Complete in order: code → docs → git.
```

### E13-T4: v2 View UI Component Alignment with Home Prompt (P1-HIGH) ✅
- **Status**: Completed - 2025-08-18 | Branch: `improvement-e13-t4-v2-view-ui-alignment`
- **Summary**: Successfully aligned v2 view components with home-screen-prompt specifications, implementing proper gradient styling, warm theme ribbons, and responsive behavior
- **Details**: See Completed Log → [E13-T4](family-tree/docs/completed-tasks.md#e13-t4)

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T4. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 283-343 for E13-T4 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @ux-expert (primary) = @.cursor\rules\ux-expert.mdc + @dev = @.cursor\rules\dev.mdc + @po = @.cursor\rules\po.mdc collaboration. Align v2 view UI components to match home-screen-prompt exactly. Update MainToolbarV2, SidebarV2, FamilyTreeCanvasV2 with proper gradient styling, warm theme tokens, and responsive layouts. Ensure connections render behind nodes. CRITICAL: Follow v2 CSS Architecture Standards (CLAUDE.md 156-170) - all styling must use family-tree/app/v2/v2-styles.css with v2- prefixed classes. Dependencies: E13-T10 v2 CSS architecture consolidated, E13-T3 API errors resolved. Complete in order: code → docs → git.
```

### E13-T5: Modal Content Implementation (Add & Help) (P1-HIGH)
- **Status**: Pending
- **Primary Agent**: @ux-expert (Sally - Modal design and content structure) - `.cursor/rules/ux-expert.mdc`
- **Supporting Agents**: @dev (James - Implementation) - `.cursor/rules/dev.mdc`, @qa (Quinn - Accessibility validation) - `.cursor/rules/qa.mdc`
- **Description**: Implement proper modal content for Add Member and Help panels to match prompt specifications
- **Dependencies**: [E13-T10] v2 CSS architecture must be consolidated first, [E13-T4] UI alignment should be completed first
- **Reference Files**:
  - **Add Modal Design**: `add-screen-prompt` (HTML reference)
  - **Help Panel Design**: `help-panel-prompt` (HTML reference)
  - **Current Components**: `family-tree/app/components-v2/AddMemberModalV2.tsx`, `family-tree/app/components-v2/HelpPanelV2.tsx`
- **Acceptance Criteria**:
  - GIVEN a user clicks the "Add" button in sidebar
  - WHEN the Add Member modal opens
  - THEN it displays content matching `add-screen-prompt` specifications:
    - Proper form sections (Basic Info, Photo, Relations, Contact)
    - Token-driven styling with gradient accents
    - Validation states and error handling
    - Mobile bottom-sheet behavior
  - GIVEN a user clicks the "Help" button
  - WHEN the Help modal opens  
  - THEN it displays content matching `help-panel-prompt` specifications:
    - Getting Started section with instructions
    - Keyboard Shortcuts reference
    - Tips & Tour functionality
    - Proper modal dialog semantics
- **Add Member Modal Requirements**:
  - Complete form with all family member fields (name, gender, dates, relationships)
  - Photo upload functionality with preview
  - Relationship selection (parent, spouse) from existing members
  - Real-time validation with error states
  - Token-driven styling (gradients, colors, spacing)
  - Mobile-responsive bottom sheet adaptation
  - Accessibility compliance (ARIA labels, keyboard navigation)
- **Help Panel Modal Requirements**:
  - Content sections: Getting Started, Shortcuts, Tips, More Help
  - Interactive elements (Start Tour, Show Tips buttons)
  - Proper modal dialog structure with backdrop
  - Section reveal animations
  - Keyboard navigation and escape handling
  - Mobile-friendly content layout
- **Implementation Details**:
  - Analyze existing modal infrastructure and enhance as needed
  - Create comprehensive form layouts matching prompt designs
  - Implement proper modal state management
  - Add content sections with appropriate styling
  - Ensure modal accessibility (focus trap, ARIA attributes)
  - Test modal behavior across different viewport sizes
  - Integrate with existing family tree context and operations
- **Technical Requirements**:
  - **v2 CSS Architecture**: All modal styling must use `family-tree/app/v2/v2-styles.css` with `v2-` prefixed classes
  - **Import Pattern**: Modal components use `import '../../v2-styles.css'`
  - Modal base component enhancement if needed
  - Form validation and error handling
  - Photo upload and preview functionality
  - State management for modal content
  - Animation and transition effects using v2 CSS system
  - Mobile-responsive design patterns (bottom-sheet behavior)
  - Comprehensive accessibility support
- **Files to Modify**:
  - `family-tree/app/components-v2/AddMemberModalV2.tsx`
  - `family-tree/app/components-v2/HelpPanelV2.tsx`
  - `family-tree/app/components-v2/shared/MemberForm.tsx` (if exists)
  - `family-tree/app/v2/v2-styles.css` (add modal-specific styles)
  - Component test files
- **Testing Requirements**:
  - Modal functionality testing (open, close, form submission)
  - Content validation against prompt specifications
  - Accessibility testing (screen readers, keyboard navigation)
  - Mobile responsiveness validation
  - Cross-browser compatibility testing
- **Branch**: `improvement-e13-t5-modal-content-implementation`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T5. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 343-413 for E13-T5 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @ux-expert (primary) = @.cursor\rules\ux-expert.mdc + @dev = @.cursor\rules\dev.mdc + @qa = @.cursor\rules\qa.mdc collaboration. Implement Add Member and Help modal content matching add-screen-prompt and help-panel-prompt specifications. Create comprehensive forms, photo upload, validation states, mobile bottom-sheet behavior, and accessibility compliance. CRITICAL: Follow v2 CSS Architecture Standards (CLAUDE.md 156-170) - all modal styling must use family-tree/app/v2/v2-styles.css with v2- prefixed classes. Dependencies: E13-T10 v2 CSS architecture consolidated, E13-T4 UI alignment should be completed first. Complete in order: code → docs → git.
```

### E13-T6: Add/Export/Help Button Styling Enhancement (P2-HIGH) ✅
- **Status**: Completed - 2025-08-19 | Branch: `improvement-e13-t6-button-styling-enhancement`
- **Summary**: Enhanced Add/Export/Help buttons with token-driven styling, button variants, and smooth interaction states matching home-screen-prompt specifications
- **Details**: See Completed Log → [E13-T6](family-tree/docs/completed-tasks.md#e13-t6)
- **Primary Agent**: @ux-expert (Sally - Button design and interaction states) - `.cursor/rules/ux-expert.mdc`
- **Supporting Agents**: @dev (James - Implementation) - `.cursor/rules/dev.mdc`, @po (Sarah - Design validation) - `.cursor/rules/po.mdc`
- **Description**: Style Add/Export/Help buttons to match `home-screen-prompt` design specifications with proper token-driven styling
- **Dependencies**: [E13-T10] v2 CSS architecture must be consolidated first, [E13-T4] UI alignment provides foundation
- **Reference Files**:
  - **Button Design Reference**: `home-screen-prompt` (sidebar button specifications)
  - **Current Component**: `family-tree/app/components-v2/SidebarV2.tsx`
  - **Token System**: `family-tree/app/globals.css` (design token definitions)
- **Acceptance Criteria**:
  - GIVEN the sidebar buttons (Add, Export, Help) are rendered
  - WHEN compared with `home-screen-prompt` specifications
  - THEN all buttons match the design exactly:
    - Proper sizing and spacing within sidebar layout
    - Token-driven colors (background, text, borders)
    - Hover and active interaction states
    - Icon placement and styling
    - Accessibility indicators (focus rings)
  - AND buttons maintain consistency across all viewport sizes
  - AND interaction feedback is smooth and responsive
  - AND accessibility requirements are met
- **Implementation Details**:
  - Extract exact button specifications from `home-screen-prompt`
  - Create token-driven button utility classes
  - Implement hover and active state transitions
  - Add proper icon integration (Lucide icons)
  - Ensure consistent sizing and spacing
  - Apply accessibility enhancements (focus indicators, ARIA labels)
  - Test interaction states across different input methods
- **Button Specifications**:
  - **Add Button**: Primary styling with mint/peach gradient accents
  - **Export Button**: Secondary styling with proper contrast
  - **Help Button**: Tertiary styling with info icon
  - **Shared Properties**: Consistent sizing, radius, shadow, and spacing
- **Technical Requirements**:
  - **v2 CSS Architecture**: All button styling must use `family-tree/app/v2/v2-styles.css` with `v2-` prefixed classes
  - **Import Pattern**: SidebarV2 component uses `import '../../v2-styles.css'`
  - CSS utility classes for button variants within v2 system
  - Token-based color and spacing system from v2 CSS
  - Smooth transition animations using v2 CSS custom properties
  - Responsive sizing adjustments
  - Accessibility compliance (focus management, ARIA)
  - Performance optimization for animations
- **Files to Modify**:
  - `family-tree/app/components-v2/SidebarV2.tsx`
  - `family-tree/app/v2/v2-styles.css` (add button utility classes)
  - Button component tests
- **Testing Requirements**:
  - Visual testing against prompt specifications
  - Interaction testing (hover, focus, click)
  - Accessibility validation
  - Cross-browser compatibility
  - Mobile touch interaction testing
- **Branch**: `improvement-e13-t6-button-styling-enhancement`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T6. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 420-474 for E13-T6 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @ux-expert (primary) = @.cursor\rules\ux-expert.mdc + @dev = @.cursor\rules\dev.mdc + @po = @.cursor\rules\po.mdc collaboration. Style Add/Export/Help buttons to match home-screen-prompt specifications with token-driven styling. Create utility classes, implement hover/active states, proper icon integration, and accessibility enhancements. CRITICAL: Follow v2 CSS Architecture Standards (CLAUDE.md 156-170) - all button styling must use family-tree/app/v2/v2-styles.css with v2- prefixed classes. Dependencies: E13-T10 v2 CSS architecture consolidated, E13-T4 UI alignment provides foundation. Complete in order: code → docs → git.
```

### E13-T7: Right-Click Context Menu Implementation (P2-MEDIUM) ✅
- **Status**: Completed - 2025-01-20 | Branch: `improvement-e13-t7-context-menu-implementation`
- **Summary**: Successfully implemented context menu system with portal rendering, authentication-based permissions, and comprehensive accessibility support
- **Details**: See Completed Log → [E13-T7](family-tree/docs/completed-tasks.md#e13-t7)
- **Primary Agent**: @dev (James - Context menu functionality and event handling) - `.cursor/rules/dev.mdc`
- **Supporting Agents**: @architect (Winston - Permission system) - `.cursor/rules/architect.mdc`, @qa (Quinn - UX testing) - `.cursor/rules/qa.mdc`
- **Description**: Implement right-click context menu on family tree members with Edit/View/Delete functionality based on user permissions
- **Dependencies**: [E13-T10] v2 CSS architecture must be consolidated first, [E13-T3] API errors must be resolved, [E13-T5] Modal content needed for Edit functionality
- **Reference Files**:
  - **Target Components**: `family-tree/app/components-v2/MemberBannerV2.tsx` (context menu integration point)
  - **New Component**: `family-tree/app/components-v2/ContextMenuV2.tsx` (to be created)
  - **Permission System**: Authentication context and user state management
- **Acceptance Criteria**:
  - GIVEN a user right-clicks on a family tree member
  - WHEN the context menu appears
  - THEN it displays appropriate options based on user login status:
    - "View Member Detail" (always available)
    - "Edit Member" (only if user is logged in)
    - "Delete Member" (only if user is logged in and API supports deletion)
  - AND clicking "View Member Detail" opens member detail modal
  - AND clicking "Edit Member" opens edit modal with member data pre-populated
  - AND clicking "Delete Member" shows confirmation dialog
  - AND context menu dismisses on outside click or Escape key
  - AND menu positioning adjusts to stay within viewport boundaries
- **Implementation Details**:
  - Create context menu component with proper positioning logic
  - Implement right-click event handling on member components
  - Add permission-based menu item visibility
  - Integrate with existing modal system for Edit/View functionality
  - Create delete confirmation flow with API integration
  - Handle context menu dismissal and keyboard navigation
  - Ensure proper z-index layering and portal rendering
  - Add smooth animation for menu appearance/dismissal
- **Permission System**:
  - Check user authentication status for Edit/Delete options
  - Graceful degradation for non-authenticated users
  - API validation for deletion permissions
  - Clear visual indicators for available actions
- **Technical Requirements**:
  - **v2 CSS Architecture**: All context menu styling must use `family-tree/app/v2/v2-styles.css` with `v2-` prefixed classes
  - **Import Pattern**: ContextMenuV2 component uses `import '../../v2-styles.css'`
  - Portal-based rendering for proper z-index management
  - Event handling for right-click, outside click, and keyboard
  - Dynamic positioning with viewport boundary detection
  - Integration with existing authentication system
  - Smooth animations and transitions using v2 CSS system
  - Accessibility support (keyboard navigation, ARIA)
- **Files to Create/Modify**:
  - `family-tree/app/components-v2/ContextMenuV2.tsx`
  - `family-tree/app/components-v2/MemberBannerV2.tsx` (context menu integration)
  - `family-tree/app/v2/v2-styles.css` (add context menu styles)
  - Component test files
- **Testing Requirements**:
  - Context menu functionality testing
  - Permission-based visibility testing
  - Cross-browser compatibility (right-click behavior)
  - Accessibility testing (keyboard navigation)
  - Mobile adaptation (long-press support)
- **Branch**: `improvement-e13-t7-context-menu-implementation`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T7. Read CLAUDE.md sections 1–136, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 481-537 for E13-T7 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @dev (primary) = @.cursor\rules\dev.mdc + @architect = @.cursor\rules\architect.mdc + @qa = @.cursor\rules\qa.mdc collaboration. Implement right-click context menu on family tree members with View/Edit/Delete functionality based on user permissions. Create ContextMenuV2 component with proper positioning, portal rendering, and accessibility support. CRITICAL: Follow v2 CSS Architecture Standards (CLAUDE.md 156-170) - all context menu styling must use family-tree/app/v2/v2-styles.css with v2- prefixed classes. Dependencies: E13-T10 v2 CSS architecture consolidated, E13-T3 API errors resolved, E13-T5 modal content needed for Edit functionality. Complete in order: code → docs → git.
```

### E13-T8: Member Detail Modal Enhancement (P2-MEDIUM) ✅
- **Status**: Completed - 2025-08-19 | Branch: `improvement-e13-t8-member-detail-modal`
- **Summary**: Created comprehensive MemberDetailModalV2 component with profile header, about/contact/relations sections, relationship navigation, and responsive design
- **Details**: See Completed Log → [E13-T8](family-tree/docs/completed-tasks.md#e13-t8)
- **Primary Agent**: @ux-expert (Sally - Member detail design and layout) - `.cursor/rules/ux-expert.mdc`
- **Supporting Agents**: @dev (James - Implementation) - `.cursor/rules/dev.mdc`, @po (Sarah - Content validation) - `.cursor/rules/po.mdc`
- **Description**: Enhance member detail modal to match `member-detail-prompt` specifications with comprehensive member information display
- **Dependencies**: [E13-T10] v2 CSS architecture must be consolidated first, [E13-T7] Context menu implementation for access point
- **Reference Files**:
  - **Modal Design**: `member-detail-prompt` (HTML reference)
  - **Current Component**: `family-tree/app/components-v2/MemberDetailModalV2.tsx`
  - **Navigation Integration**: Family tree routing and member data context
- **Acceptance Criteria**:
  - GIVEN a user accesses member detail (via context menu or direct navigation)
  - WHEN the member detail modal opens
  - THEN it displays content matching `member-detail-prompt` specifications:
    - Profile header with photo, name, relationship ribbon
    - About section with birth/death dates, biography
    - Contact section with email, phone, address
    - Relations section with parent, spouse, children connections
    - Action buttons for Edit/Delete (if logged in)
  - AND all information is properly formatted and styled
  - AND navigation between related members works correctly
  - AND modal accessibility standards are maintained
- **Implementation Details**:
  - Create comprehensive member detail component layout
  - Implement information grid with proper spacing and typography
  - Add relationship navigation (clickable parent/spouse/children links)
  - Integrate with existing member data structure
  - Apply token-driven styling throughout
  - Add proper loading states and error handling
  - Ensure mobile responsive design
  - Implement accessibility features (ARIA labels, keyboard navigation)
- **Content Sections Required**:
  - **Profile Header**: Large photo, name, relationship, key dates
  - **About Section**: Biography, life events, additional details
  - **Contact Section**: Email, phone, address information
  - **Relations Section**: Family connections with navigation
  - **Actions Section**: Edit/Delete buttons with permissions
- **Technical Requirements**:
  - **v2 CSS Architecture**: All member detail styling must use `family-tree/app/v2/v2-styles.css` with `v2-` prefixed classes
  - **Import Pattern**: MemberDetailModalV2 component uses `import '../../v2-styles.css'`
  - Responsive grid layout for information display using v2 CSS system
  - Navigation integration with family tree routing
  - Proper data formatting and fallback values
  - Token-driven styling consistency within v2 architecture
  - Performance optimization for large family trees
  - Comprehensive accessibility support
- **Files to Create/Modify**:
  - `family-tree/app/components-v2/MemberDetailModalV2.tsx`
  - `family-tree/app/v2/v2-styles.css` (add member detail styles)
  - Navigation and routing integration
  - Component test files
- **Testing Requirements**:
  - Content display testing with various member data
  - Navigation testing between related members
  - Accessibility validation
  - Mobile responsiveness testing
  - Cross-browser compatibility
- **Branch**: `improvement-e13-t8-member-detail-enhancement`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T8. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 544-601 for E13-T8 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @ux-expert (primary) = @.cursor\rules\ux-expert.mdc + @dev = @.cursor\rules\dev.mdc + @po = @.cursor\rules\po.mdc collaboration. Enhance member detail modal to match member-detail-prompt specifications. Create comprehensive layout with profile header, about/contact/relations sections, relationship navigation, and responsive design. CRITICAL: Follow v2 CSS Architecture Standards (CLAUDE.md 156-170) - all member detail styling must use family-tree/app/v2/v2-styles.css with v2- prefixed classes. Dependencies: E13-T10 v2 CSS architecture consolidated, E13-T7 context menu implementation provides access point. Complete in order: code → docs → git.
```

### E13-T9: Comprehensive QA Validation & Regression Testing (P1-CRITICAL)
- **Status**: Pending
- **Primary Agent**: @qa (Quinn - Comprehensive testing and validation) - `.cursor/rules/qa.mdc`
- **Supporting Agents**: @po (Sarah - Acceptance criteria validation) - `.cursor/rules/po.mdc`, @ux-expert (Sally - Design compliance) - `.cursor/rules/ux-expert.mdc`
- **Description**: Perform comprehensive testing and validation of all Epic 13 implementations to ensure quality and prevent regressions
- **Dependencies**: [E13-T10] v2 CSS architecture consolidation, [E13-T1] through [E13-T8] All previous tasks must be completed
- **Reference Files**:
  - **All Prompt Files**: Login, home, add, help, member-detail screen prompts for visual regression
  - **All Modified Components**: Complete list of changed files from E13-T1 through E13-T8
  - **Test Suites**: Existing automated test coverage to ensure no regressions
- **Acceptance Criteria**:
  - GIVEN all Epic 13 tasks have been implemented
  - WHEN comprehensive testing is performed
  - THEN all reported issues from @Instruction file are resolved:
    - v2 login page matches `login-screen-prompt` exactly
    - Admin script runs without path errors
    - v2 view UI matches `home-screen-prompt` specifications
    - All modals display proper content per prompt files
    - Context menus function with appropriate permissions
    - API endpoints resolve without fetch errors
  - AND no regressions have been introduced in existing functionality
  - AND all accessibility standards are maintained
  - AND performance metrics are within acceptable ranges
- **Testing Strategy**:
  - **Visual Regression Testing**: Compare all components against prompt specifications
  - **Functional Testing**: Validate all user workflows and interactions
  - **Accessibility Testing**: Screen reader, keyboard navigation, contrast validation
  - **Performance Testing**: Load testing with large family trees
  - **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge compatibility
  - **Mobile Testing**: iOS Safari, Android Chrome responsive behavior
  - **API Testing**: Endpoint functionality and error handling
  - **Security Testing**: Authentication and authorization validation
- **Regression Prevention**:
  - Full test suite execution for existing functionality
  - User workflow validation for critical paths
  - Performance benchmark comparison
  - Accessibility audit with automated tools
  - Browser compatibility matrix validation
- **Documentation Requirements**:
  - Comprehensive test report with screenshots
  - Performance metrics comparison
  - Accessibility compliance report
  - Browser compatibility matrix
  - Issue tracking and resolution log
- **Files to Test**:
  - All modified components and pages
  - API endpoints and authentication
  - Build and deployment processes
  - Cross-platform script execution
- **Testing Tools**:
  - Automated testing suites (Jest, Testing Library)
  - Visual regression testing tools
  - Accessibility auditing tools (axe-core)
  - Performance monitoring tools
  - Cross-browser testing platforms
- **Deliverables**:
  - Complete test execution report
  - Issue resolution documentation
  - Performance metrics comparison
  - Accessibility compliance certification
  - Deployment readiness assessment
- **Branch**: `improvement-e13-t9-comprehensive-qa-validation`

- **Execution Prompt**: 
```
Use the template from @Instruction file to execute E13-T9. Read CLAUDE.md sections 1–136, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 608-669 for E13-T9 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @qa (primary) = @.cursor\rules\qa.mdc + @po = @.cursor\rules\po.mdc + @ux-expert = @.cursor\rules\ux-expert.mdc collaboration. Perform comprehensive testing and validation of all Epic 13 implementations. Conduct visual regression testing against all prompt files, functional testing, accessibility validation, performance testing, and cross-browser compatibility. Ensure no regressions and all acceptance criteria met. Validate v2 CSS Architecture Standards compliance (CLAUDE.md 156-170) across all v2 components. Dependencies: E13-T10 v2 CSS architecture consolidation and E13-T1 through E13-T8 must be completed. Complete in order: testing → docs → git.
```

---

## Implementation Guidelines 📋

### Pre-Implementation Checklist
- [ ] Review acceptance criteria with appropriate agent (@pm/@po/@sm)
- [ ] Create feature branch following naming convention
- [ ] Analyze relevant prompt files for exact specifications
- [ ] Establish test baseline for affected functionality
- [ ] Document current behavior before changes

### Implementation Protocol  
- [ ] **CSS Architecture First**: For v2 tasks, ensure E13-T10 (CSS consolidation) is completed before starting
- [ ] **v2 Styling Standards**: All v2 styling must use `family-tree/app/v2/v2-styles.css` with `v2-` prefixed classes
- [ ] Follow design-first approach for UI components
- [ ] Implement token-driven styling within v2 architecture (no hardcoded values)
- [ ] Maintain accessibility compliance throughout
- [ ] Test responsive behavior at all supported breakpoints
- [ ] Validate API integration and error handling
- [ ] Run comprehensive test suite after each significant change
- [ ] Update documentation as changes are made
- [ ] Validate with appropriate agent before marking complete

### Post-Implementation Validation
- [ ] Visual comparison against prompt specifications
- [ ] Cross-device testing (desktop, tablet, mobile)
- [ ] Accessibility validation (screen reader, keyboard)
- [ ] API functionality and error handling testing
- [ ] Performance metrics comparison
- [ ] Documentation accuracy verification
- [ ] Agent sign-off and quality gate approval
- [ ] Task marked complete only after all criteria met

---

## Success Metrics 📈

### Epic 13 - Critical UI & API Fixes
- 100% visual parity with prompt file specifications
- Zero API fetch errors or communication failures
- Enhanced user experience with full context menu functionality
- Comprehensive modal content matching design requirements
- Improved authentication and script management workflows
- Maintained accessibility and performance standards

---

*This tracking document provides comprehensive, AI-agent-ready task definitions for resolving all reported issues while maintaining project quality standards. Each task includes detailed acceptance criteria, implementation guidance, and validation requirements to ensure successful execution.*