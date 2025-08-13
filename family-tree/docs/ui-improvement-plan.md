# UI Improvement Plan

This plan codifies the approved UI direction and will guide future stories/epics (to be created later). It references current prototypes and defines acceptance criteria, constraints, and validation.

## Status & Source of Truth (Updated 2025-08-13)
- This plan defines UI direction. The authoritative tracker for tasks/epics is `IMPROVEMENT-TASK-TRACKING.md` at repo root.
- For modality/color/motion specifics see `family-tree/docs/implementation-notes.md` and `family-tree/docs/completed-tasks.md`.
- Archived prior plans: [UI-IMPROVEMENT-PLAN.md](mdc:family-tree/docs/archive/UI-IMPROVEMENT-PLAN.md), [IMPROVEMENT-PLAN.md](mdc:family-tree/docs/archive/IMPROVEMENT-PLAN.md)

## Decisions (Approved)
- Canonical home layout: `.superdesign/design_iterations/family_tree_ui_1_1.html`
- Sidebar: Keep only Add, Export, Help (no other items)
- Color direction: Follow new design direction noted in `issue` (modern warm, subtle gradients, token-driven)

## References
- Home layout prototype: [family_tree_ui_1_1.html](mdc:.superdesign/design_iterations/family_tree_ui_1_1.html)
- Alternate home variant (reference only): [family_tree_ui_1_2.html](mdc:.superdesign/design_iterations/family_tree_ui_1_2.html)
- Add modal prototype: [add_family_member_1_0_1.html](mdc:.superdesign/design_iterations/add_family_member_1_0_1.html)
- Edit modal prototype: [edit_family_member_1_0_1.html](mdc:.superdesign/design_iterations/edit_family_member_1_0_1.html)
- Login prototype: [login_redesign_1.html](mdc:.superdesign/design_iterations/login_redesign_1.html)
- Member detail prototype: [member_detail_1_0_0.html](mdc:.superdesign/design_iterations/member_detail_1_0_0.html)
- Help panel prototype: [help_panel_1_0_1.html](mdc:.superdesign/design_iterations/help_panel_1_0_1.html)
- Theme/CSS assets: [family_tree_theme_1.css](mdc:.superdesign/design_iterations/family_tree_theme_1.css), [family_tree_theme_1_1.css](mdc:.superdesign/design_iterations/family_tree_theme_1_1.css), [family_tree_theme_1_2.css](mdc:.superdesign/design_iterations/family_tree_theme_1_2.css), [default_ui_darkmode.css](mdc:.superdesign/design_iterations/default_ui_darkmode.css)
- Modal redesign spec refs: [implementation-notes.md](mdc:family-tree/docs/implementation-notes.md), [annotations.md](mdc:family-tree/docs/assets/e10-modal/annotations.md)

## Global Design Principles
- Token-first styling (colors/spacing/typography via `app/globals.css` tokens)
- Subtle OKLCH gradients and accents (Epic 11 patterns), AA contrast, motion-reduce compliance
- Mobile-first responsiveness, touch targets ≥ 44px, safe-area respect on mobile
- Performance budgets maintained (canvas, connectors, interactions)
- Accessibility: ARIA semantics, focus order, keyboard loops, screen reader labels

## Agent Workflow Hooks (PO · SM · Architect)
- PO: Validate acceptance criteria per screen below; ensure tokens-only styling and AA contrast; no raw hex. Reference `family-tree/docs/success-criteria.md`.
- SM: Derive stories from each screen plan; keep dependencies minimal; map IDs in `IMPROVEMENT-TASK-TRACKING.md` when created.
- Architect: Enforce tech constraints section; verify perf budgets (canvas, connectors, virtualization) and a11y patterns.

## Screen Plans and Acceptance Criteria

### 1) Tree View Home
- Layout: Use `family_tree_ui_1_1.html` as the canonical structure
- Sidebar: Only Add, Export, Help; no bottom floating "+" FAB
- Toolbar: Title, Search, Filters; no duplication; truncation and focus states tokenized
- Canvas: Connections layered beneath cards; avoid overlaps at narrow widths
- Responsive: Mobile-first, stacked/auto-fit grids for narrow screens

Acceptance:
- Toolbar buttons group logically and are keyboard-accessible
- Sidebar contains only Add, Export, Help and adapts at small breakpoints
- No element overlap at 360–480px, connectors behind nodes
- No FAB on mobile; desktop unaffected

### 2) Add/Edit Member Modal
- Follow modal and form prototypes; preserve current functionality
- MemberForm sections clearly grouped; validation and error states consistent
- Header/CTA allow subtle gradient accents via tokens (Epic 11 direction)
- Mobile bottom-sheet variant with dvh/safe areas; focus trap maintained

Acceptance:
- Keyboard flow matches APG modal dialog; escape/backdrop close works
- Validation states are consistent and cause no layout shift
- Gradient/accent utilities map to tokens (no raw hex)

### 3) Login
- Apply modern warm theme; clear hierarchy; inline errors
- Accessible labels, correct focus order, and tokenized focus rings

Acceptance:
- Form labeled; errors announced; tab sequence correct
- Visual matches prototype style direction without regressions

### 4) Member Detail
- Improve information hierarchy (photo, name, relationships, life dates)
- Consistent chips/dividers/icons per token rules

Acceptance:
- Readable at mobile sizes; keyboard-accessible actions; tokens only

### 5) Help Panel
- Contextual help and shortcuts; responsive layout

Acceptance:
- Opens from Help; accessible headings/landmarks; responsive

## Technical Constraints (Architect)
- Keep SVG connectors performant; avoid heavy shadow filters; prefer CSS for effects
- Maintain virtualization; throttle drag/zoom; use rAF; ensure mobile GPU-friendly transforms
- Bundle hygiene: no new heavy deps for visuals; reuse tokens/utilities

## Validation Plan (QA)
- Accessibility: Modal APG checks, focus management, labels, reduced motion
- Responsive: 360px, 480px, 768px, 1024px, 1440px visual checks; no overlap
- Performance: Interaction smoothness (target 60fps), no excessive layout thrash
- Regression: Add/Edit flows, search/filter, export entry points

## Rollout Sequence
1. Tree view home
2. Add/Edit Member modal
3. Login
4. Member detail
5. Help panel

## Risks & Mitigations
- Visual polish increasing CSS size → Audit utilities; remove dead styles
- Gradient/perf risk → Prefer lightweight CSS gradients; avoid expensive SVG filters
- A11y regressions → Automated + manual checks per QA plan

## Context7 Integration Protocol (MCP)
- Always research using Context7 before implementation to stay current. Use these library IDs:

| Technology | Context7 ID | Primary Use Case |
| --- | --- | --- |
| Next.js | /vercel/next.js | App Router patterns, API routes, middleware, performance |
| Tailwind CSS | /tailwindlabs/tailwindcss | Tokens, responsive design, motion-reduce, container queries |
| TypeScript | /microsoft/typescript | Strict typing, interfaces, utility types |
| Testing Library | /testing-library/react-testing-library | Component testing patterns, a11y assertions |
| React DnD | /react-dnd/react-dnd | Canvas drag-and-drop implementation |
| html2canvas | /niklasvh/html2canvas | PNG export of canvas view |
| jsonwebtoken | /auth0/node-jsonwebtoken | Auth token handling, security notes |

Example MCP invocations during implementation:

```text
use context7 "/vercel/next.js" topic="App Router patterns for modals and layout"
use context7 "/tailwindlabs/tailwindcss" topic="token-first gradients, motion-reduce, responsive"
use context7 "/testing-library/react-testing-library" topic="modal a11y tests (focus trap, aria)"
use context7 "/niklasvh/html2canvas" topic="performance and quality settings for PNG export"
```
