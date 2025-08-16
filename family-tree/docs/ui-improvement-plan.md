# UI v2 Improvement Plan

This document defines the strategic approach to resolve reported UI/UX issues and enhance the v2 interface. Implementation details are tracked in `IMPROVEMENT-TASK-TRACKING.md` (Epic 13 – Critical UI & API Fixes).

## Status & Source of Truth (Updated 2025-08-16)
- This plan defines UI strategy and technical solutions for reported issues
- Task execution tracked in `IMPROVEMENT-TASK-TRACKING.md` at repo root (Epic 13)
- Previous plans archived: [ui-improvement-plan-2025-08-16.md](archive/ui-improvement-plan-2025-08-16.md)

## 🚨 Critical Issues Identified

### Authentication & Scripts
1. **v2 Login Page Sizing Issue**: Page doesn't match `login-screen-prompt` specifications
2. **Admin Script Path Error**: `node family-tree/scripts/seed-admin.mjs` failing with path resolution

### UI Component Alignment  
3. **v2 View Layout Mismatch**: Components don't match `home-screen-prompt` design
4. **Add/Export/Help Button Styling**: Missing proper token-driven styling
5. **Modal Content Missing**: Add/Help modals display nothing vs. prompt requirements

### Functionality Gaps
6. **Right-Click Context Menu**: Missing Edit/View/Delete functions on family tree members
7. **API Communication Errors**: "Failed to fetch" errors in `/v2/view`

## 🎯 Technical Solution Architecture

### Design System Alignment Strategy
- **Token-First Approach**: All styling must use design tokens from `app/globals.css`
- **Prompt Parity**: Visual components must match reference prompt files exactly
- **Responsive Consistency**: Maintain design integrity across all viewport sizes
- **Accessibility Compliance**: Preserve AA contrast and APG semantics

### Component Enhancement Framework
- **Modal System Overhaul**: Implement proper content per `add-screen-prompt`, `help-panel-prompt`
- **Context Menu Implementation**: Right-click functionality with permission-based actions
- **API Error Handling**: Robust error handling and fallback mechanisms
- **Authentication Flow**: Streamlined login experience matching design specifications

## 📊 Epic Structure & Implementation Strategy

### Epic 13: Critical UI & API Fixes
**Priority**: P1-CRITICAL | **Timeline**: 1-2 weeks
**Goal**: Resolve all reported issues while maintaining existing functionality
**Success Criteria**: 100% visual parity with prompt files, zero API errors, enhanced UX

#### Technical Approach
1. **Foundation Phase**: Fix critical path issues (login, scripts, API errors)
2. **Component Phase**: Align UI components with design specifications  
3. **Enhancement Phase**: Implement missing functionality (context menus, modal content)
4. **Validation Phase**: Comprehensive testing and quality assurance

## 🤖 Agent Role Distribution

### Primary Agents
- **@sm (Bob)**: Epic breakdown and story preparation for complex UI fixes
- **@po (Sarah)**: Quality validation and acceptance criteria verification
- **@architect (Winston)**: API architecture and error handling design
- **@ux-expert (Sally)**: UI/UX design alignment with prompt specifications
- **@dev (James)**: Implementation across all complexity levels
- **@qa (Quinn)**: Testing, validation, and regression prevention

### Collaboration Patterns
- **Design-First Approach**: @ux-expert leads component analysis before @dev implementation
- **Quality Gates**: @po validates before @qa comprehensive testing
- **Architecture Review**: @architect validates API and system design decisions

## 🔧 Reference Materials

### Design Specifications
- **Login**: `login-screen-prompt` - Responsive form with warm color theme
- **Home**: `home-screen-prompt` - Main toolbar, sidebar, canvas layout
- **Add Modal**: `add-screen-prompt` - Member creation form with validation
- **Help Panel**: `help-panel-prompt` - Modal dialog with content sections
- **Member Detail**: `member-detail-prompt` - Profile display with actions

### Technical Constraints
- **Performance**: Maintain existing virtualization and optimization
- **Accessibility**: No regressions in ARIA semantics or keyboard navigation
- **Mobile-First**: Responsive design principles across all components
- **Token-Driven**: Zero hardcoded colors or styling values

## 📋 Implementation Sequence

### Phase 1: Critical Path (Week 1)
1. **E13-T1**: Fix v2 login page sizing and responsive behavior
2. **E13-T2**: Resolve admin script path errors and documentation
3. **E13-T3**: Address API fetch errors in v2/view

### Phase 2: UI Alignment (Week 1-2)  
4. **E13-T4**: Align v2 view components with home-screen-prompt
5. **E13-T5**: Implement proper modal content for Add/Help panels
6. **E13-T6**: Style Add/Export/Help buttons per design specifications

### Phase 3: Enhancement (Week 2)
7. **E13-T7**: Implement right-click context menu functionality
8. **E13-T8**: Add member detail modal with prompt parity
9. **E13-T9**: Final validation and regression testing

## 🎨 Design System Enhancements

### Color Token Extensions
```css
/* Warm Theme Additions */
--color-mint: oklch(0.92 0.09 170);
--color-peach: oklch(0.91 0.12 55);
--color-lilac: oklch(0.92 0.09 300);
--color-sage: oklch(0.92 0.07 150);
```

### Component Token Mapping
- **Modals**: `.panel` with proper shadows and radius tokens
- **Buttons**: `.btn-primary`, `.btn-outline` with gradient variants
- **Inputs**: `.input` with focus ring and validation states
- **Cards**: `.node-card` with elevation and responsive behavior

## 📊 Success Metrics

### Visual Compliance
- ✅ 100% visual parity with prompt file specifications
- ✅ Consistent token-driven styling across all components
- ✅ No hardcoded colors or spacing values
- ✅ Responsive behavior at all supported breakpoints

### Functional Requirements
- ✅ All modals display proper content and functionality
- ✅ Context menus work with appropriate permissions
- ✅ API endpoints resolve without errors
- ✅ Admin scripts run successfully from any directory

### Quality Assurance
- ✅ Zero accessibility regressions
- ✅ Comprehensive test coverage for new functionality
- ✅ Performance metrics maintained or improved
- ✅ Cross-browser compatibility verified

## 🔄 Continuous Improvement

### Documentation Updates
- Real-time updates to `IMPROVEMENT-TASK-TRACKING.md` as tasks complete
- Implementation notes in `completed-tasks.md` with technical details
- Agent feedback integration for process optimization

### Quality Monitoring
- Automated testing integration for visual regression detection
- Performance monitoring for large family tree rendering
- Accessibility auditing with axe-core integration

This plan provides a comprehensive roadmap for resolving all reported issues while maintaining the high quality standards established in previous epic implementations.