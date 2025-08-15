# UI v2 Plan

This document defines the UI v2 direction and implementation approach. We will build a fresh UI in parallel under a v2 namespace, reusing existing data logic and hooks, and mapping visuals to the provided prompt screens. Tasks and execution are tracked in `IMPROVEMENT-TASK-TRACKING.md` (Epic 12 – UI v2).

## Status & Source of Truth (Updated 2025-08-13)
- This plan defines UI direction. The authoritative tracker for tasks/epics is `IMPROVEMENT-TASK-TRACKING.md` at repo root.
- For modality/color/motion specifics see `family-tree/docs/implementation-notes.md` and `family-tree/docs/completed-tasks.md`.
- Archived prior plans: [UI-IMPROVEMENT-PLAN.md](mdc:family-tree/docs/archive/UI-IMPROVEMENT-PLAN.md), [IMPROVEMENT-PLAN.md](mdc:family-tree/docs/archive/IMPROVEMENT-PLAN.md)

## Decisions (Approved)
- Build v2 UI in parallel; keep v1 intact until parity
- Sidebar: Add, Export, Help only; no mobile FAB
- Color direction: modern warm, subtle gradients, token-driven

## References
- Home: `home-screen-prompt`
- Add: `add-screen-prompt`
- Edit: `edit-screen-prompt`
- Login: `login-screen-prompt`
- Member detail: `member-detail-prompt`
- Help panel: `help-panel-prompt`

## Global Design Principles
- Token-first styling via `app/globals.css` (OKLCH colors, radii, elevation, focus)
- Subtle gradients and accents; AA contrast; motion-reduce compliance
- Mobile-first; touch targets ≥ 44px; safe-area respect
- Maintain performance budgets (canvas, connectors, interactions)
- Accessibility: ARIA semantics, focus order, keyboard loops, SR labels

## v2 Structure (App Router)
- Routes
  - `app/(v2)/view/page.tsx` – Tree View Home (v2) — scaffolded in E12-T0
  - `app/(v2)/login/page.tsx` – Login (v2)
  - `app/(v2)/members/[id]/page.tsx` – Member Detail (v2)
- Components
  - `app/components-v2/` and `app/components-v2/shared/MemberForm.tsx`
- Styling
  - Extend tokens/utilities to map prompt classes: `.panel`, `.u-header-accent--gradient`, `.input`, `.btn*`, `.canvas-grid`, `.connector*`, `.ribbon*`, `.badge`, `.toolbar-rail`

## Agent Workflow Hooks (PO · SM · Architect)
- PO: Validate acceptance criteria per screen below; ensure tokens-only styling and AA contrast; no raw hex. Reference `family-tree/docs/success-criteria.md`.
- SM: Derive stories from each screen plan; keep dependencies minimal; map IDs in `IMPROVEMENT-TASK-TRACKING.md` when created.
- Architect: Enforce tech constraints section; verify perf budgets (canvas, connectors, virtualization) and a11y patterns.

## Screen Plans and Acceptance Criteria

### 1) Tree View Home (v2) — ✅ IMPLEMENTED (E12-T1)
- Match `home-screen-prompt` layout/visuals
- Sidebar: Add, Export, Help only; no mobile FAB
- Toolbar: Title, Search, Filters; tokenized focus + truncation
- Canvas: connectors behind cards; hide static connectors < 480px; no overlaps at 360–480px

Acceptance:
- ✅ Toolbar buttons group logically and are keyboard-accessible
- ✅ Sidebar contains only Add, Export, Help and adapts at small breakpoints
- ✅ No element overlap at 360–480px, connectors behind nodes
- ✅ No FAB on mobile; desktop unaffected

Implementation Status:
- Route: `/v2/view` fully functional with complete layout
- Components: SidebarV2, MainToolbarV2, FamilyTreeCanvasV2 implemented
- State: Reuses v1 hooks (FamilyTreeContext, useFamilyTreeOperations)
- Tests: Comprehensive test coverage for all components and responsive behavior

### 2) Add Member (v2) — ✅ IMPLEMENTED (E12-T2)
- Follow `add-screen-prompt`; section grouping, validation, photo, relations
- APG modal dialog pattern; bottom-sheet variant on mobile

Implementation Status:
- Component: AddMemberModalV2 with shared MemberForm v2
- Features: Token-driven styling, APG semantics, mobile bottom-sheet, focus trap
- Tests: Comprehensive accessibility and validation coverage

### 3) Edit Member (v2)
- Follow `edit-screen-prompt`; include canvas position/size fields
- Same a11y/validation as Add

Acceptance:
- Keyboard flow matches APG modal dialog; escape/backdrop close works
- Validation states are consistent and cause no layout shift
- Gradient/accent utilities map to tokens (no raw hex)

### 4) Login (v2) ✅
- Follow `login-screen-prompt`; warm theme; inline errors; proper aria
- Status: Completed - 2025-08-15 | Branch: `improvement-e12-t4-v2-login`
- Implementation: `family-tree/app/v2/login/page.tsx` with comprehensive accessibility and warm theme integration

Acceptance:
- ✅ Form labeled; errors announced; tab sequence correct
- ✅ Visual matches prototype style direction without regressions
- ✅ Warm theme colors applied (mint, peach, lilac gradient button)
- ✅ Accessibility: 44px touch targets, ARIA live regions, logical tab order
- ✅ Comprehensive tests covering auth flow, error scenarios, responsive behavior

### 5) Member Detail (v2)
- Follow `member-detail-prompt` (or interim spec); hierarchy (photo, name, relationships, life dates); token chips/dividers/icons

Acceptance:
- Readable at mobile sizes; keyboard-accessible actions; tokens only

### 6) Help Panel (v2)
- Follow `help-panel-prompt`; accessible headings/landmarks; responsive

Acceptance:
- Opens from Help; accessible headings/landmarks; responsive

## Technical Constraints (Architect)
- No heavy new deps; prefer CSS gradients; maintain virtualization; throttle drag/zoom; rAF; GPU-friendly transforms

## Validation Plan (QA)
- Accessibility: Modal APG, focus loops, labels, reduced motion
- Responsive: 360, 480, 768, 1024, 1440; no overlap; connectors behind nodes
- Performance: ~60fps interactions; no layout thrash
- Regression: Add/Edit flows, search/filter, export entry points

## Rollout Sequence
1. Scaffold v2 foundation (routes, tokens, utilities)
2. Home
3. Add/Edit
4. Login
5. Member Detail
6. Help Panel

## Risks & Mitigations
- Visual polish increasing CSS size → Audit utilities; remove dead styles
- Gradient/perf risk → Prefer lightweight CSS gradients; avoid expensive SVG filters
- A11y regressions → Automated + manual checks per QA plan

## MCP Context7
- Use these library IDs:

| Technology | Context7 ID | Primary Use Case |
| --- | --- | --- |
| Next.js | /vercel/next.js | App Router patterns, API routes, middleware, performance |
| Tailwind CSS | /tailwindlabs/tailwindcss | Tokens, responsive design, motion-reduce, container queries |
| TypeScript | /microsoft/typescript | Strict typing, interfaces, utility types |
| Testing Library | /testing-library/react-testing-library | Component testing patterns, a11y assertions |
| React DnD | /react-dnd/react-dnd | Canvas drag-and-drop implementation |
| html2canvas | /niklasvh/html2canvas | PNG export of canvas view |
| jsonwebtoken | /auth0/node-jsonwebtoken | Auth token handling, security notes |

Example:
```text
use context7 "/vercel/next.js" topic="App Router parallel v2 routes and modal patterns"
use context7 "/tailwindlabs/tailwindcss" topic="token-first OKLCH utilities, responsive, focus rings"
use context7 "/testing-library/react-testing-library" topic="modal a11y tests (focus trap, aria)"
```
