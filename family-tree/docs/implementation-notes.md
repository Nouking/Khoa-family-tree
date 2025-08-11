# Implementation Notes

> **Technical Details** - Code examples and implementation guidance for the canvas-based family tree design tool

## 🔧 Technical Implementation Notes

### Modal Redesign (E10-T1)

Spec for Add/Edit Member modals aligned to `example/UI-family-tree-09-08-2025_add_modal.jpg` and tokens in `app/globals.css`.

- Design intent
  - Create a more modern, colorful, and delightful modal than the current screenshot. Do not clone the mock 1:1; use it as a directional reference and improve it using our token system and accessibility standards.
  - Preserve existing behavior and flows; this is a visual/UX polish with accessibility upgrades, not a functional rewrite.

- Layout
  - Container: `bg-(--surface-1) rounded-[var(--radius-lg)] shadow-[var(--elevation-3)]` with `max-h-[90vh] overflow-y-auto`
  - Header: `p-6 border-b border-(--color-neutral-100)`; title `text-xl font-semibold`
  - Backdrop: `fixed inset-0 bg-black/50 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur`
  - Sizes: `small|max-w-[480px]`, `medium|max-w-[672px]`, `large|max-w-[896px]`, `fullscreen|max-w-none w-screen h-screen`
  - Mobile: `max-sm:w-screen max-sm:h-[100dvh] max-sm:rounded-none` and safe-area paddings if needed

- Header Accent
  - Add subtle accent element: `before:block before:h-1 before:bg-(--color-primary)` below title or left border `border-l-4 border-(--color-primary)`
  - Close button: `text-(--color-neutral-500) hover:text-(--color-neutral-700) focus-visible:outline-2 focus-visible:outline-(--color-primary) rounded-[var(--radius-sm)]`

- Visual language
  - Color usage: primary accents for header accent and focus, neutrals for surfaces and borders, accent color sparingly for highlights (`--color-accent`).
  - Elevation: use `--elevation-3` for the modal, avoid stacking higher than context menus.
  - Corners and spacing: prefer `--radius-lg` for container, `--radius-md` for controls; respect an 8px spacing grid.
  - Micro-interactions: hover/active/focus states use tokens; keep transitions short (100–200ms) and honor motion reduction.

- Sections (in `MemberForm`)
  - Group blocks with `border-t border-(--color-neutral-100) pt-4 mt-4` as separators
  - Section headers: `text-(--color-neutral-900) font-medium`
  - Inputs: base `border border-(--color-neutral-200) rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary)`
  - Error state: `border-(--color-error)/40` and helper `text-(--color-error)`
  - Actions row: `flex justify-end space-x-3 pt-6 border-t border-(--color-neutral-100)`; buttons `.btn-outline` and `.btn-primary`

- Tokens map (from `@theme` in `globals.css`)
  - Colors: `--color-primary`, `--color-accent`, `--color-neutral-100..900`, `--color-error`, `--color-success`
  - Radius: `--radius-sm|md|lg`; Elevation: `--elevation-1|2|3`
  - Typography: `--text-sm|base|lg|xl`, `--font-weight-medium|semibold|bold`

- States
  - Idle: default tokens as above
  - Loading: disable submit; button label swaps to "Adding…"/"Updating…"; keep focus-visible rings
  - Error: inline messages per field; global alert region optionally above form
  - Success: toast already implemented; no modal color change

- Accessibility (APG/WCAG)
  - Modal semantics: `role="dialog"` with `aria-modal="true"`; label the dialog via `aria-labelledby` pointing to the title id; optionally use `aria-describedby` for a short description if present (WAI-ARIA APG Modal Dialog pattern).
  - Focus: move initial focus into the dialog (first interactive control or close button), trap focus within, and return focus to the invoker on close. Support ESC to close and click on backdrop to dismiss when appropriate.
  - Focus visible: ensure visible rings for keyboard users; avoid outline removal. Maintain logical tab order (WCAG 2.2: 2.4.7 Focus Visible, 2.4.3 Focus Order).
  - Contrast: meet AA contrast for text and non-text UI components, including input borders and focus indicators (WCAG 1.4.3, 1.4.11).
  - Motion: respect `prefers-reduced-motion`; disable or reduce non-essential motion (WCAG 2.2: 2.3.3/2.2.2 context-appropriate).

- Tailwind/Container queries
  - Use `@container` on modal content for responsive internal grids: e.g., `@lg:grid-cols-2`
  - Backdrop feature-detect with `supports-[backdrop-filter]:...`

- Mobile bottom sheet specifics
  - Use full-height `100dvh` variant on small screens, disable top rounding, and ensure bottom safe-area padding when needed (e.g., iOS home indicator).
  - Maintain tap target sizes ≥ 44px with ≥ 8px spacing; ensure keyboard avoidance so active inputs are not overlapped by the OS keyboard.

- Token application quick map
  - Header accent: `--color-primary`
  - Dividers/borders: `--color-neutral-100|200`
  - Text and labels: `--color-neutral-700|900`
  - Focus ring: `--color-primary`
  - Error text/border: `--color-error`
  - Container elevation: `--elevation-3`; Container radius: `--radius-lg`

#### Token Application (E10-T2)

The following table specifies exactly which tokens apply to each modal area and example utilities to use. No hardcoded colors should be added in components; use tokens exclusively.

| Area | Tokens | Example utilities/classes |
| --- | --- | --- |
| Modal container | `--surface-1`, `--radius-lg`, `--elevation-3` | `bg-(--surface-1) rounded-[var(--radius-lg)] shadow-[var(--elevation-3)]` |
| Modal header | `--color-primary`, `--color-neutral-100`, `--text-xl`, `--font-weight-semibold` | `p-6 border-b border-(--color-neutral-100) text-[var(--text-xl)] font-[var(--font-weight-semibold)] before:block before:h-1 before:bg-(--color-primary)` |
| Close button | `--color-neutral-500`, `--color-neutral-700`, `--radius-sm`, `--color-primary` | `text-(--color-neutral-500) hover:text-(--color-neutral-700) focus-visible:outline-2 focus-visible:outline-(--color-primary) rounded-[var(--radius-sm)]` |
| Backdrop | uses opacity tokens via color-mix (no hard hex) | `bg-black/50 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur` |
| Section dividers | `--color-neutral-100` | `border-t border-(--color-neutral-100)` |
| Labels | `--color-neutral-700`, `--text-sm`, `--font-weight-medium` | `text-(--color-neutral-700) text-[var(--text-sm)] font-[var(--font-weight-medium)]` |
| Inputs (default) | `--color-neutral-200`, `--radius-md` | `border border-(--color-neutral-200) rounded-[var(--radius-md)]` |
| Inputs (focus) | `--color-primary` | `focus:outline-none focus:ring-2 focus:ring-(--color-primary)` |
| Error states | `--color-error` | `border-(--color-error)/40 text-(--color-error)` |
| Primary button | `--color-primary`, `--color-primary-contrast`, `--radius-md` | `.btn-primary` (uses tokens) |
| Secondary/outline button | `--color-neutral-200`, `--radius-md` | `.btn-outline` (uses tokens) |
| Mobile (sheet) | `--radius-lg` (disabled on small) | `max-sm:w-screen max-sm:h-[100dvh] max-sm:rounded-none` |

Accessibility/contrast notes:
- Primary on white: `--color-primary` (#0F62FE) on `--surface-1` (white) provides AA for normal text (> 4.5:1) and AAA for large text. Prefer using primary for accents, focus, and buttons with `--color-primary-contrast` text.
- Secondary on white: `--color-secondary` (#24A148) meets AA for normal text. Use for supportive accents; avoid using on low-contrast surfaces.
- Accent: `--color-accent` (#FF7EB6) is best for non-text accents (bars/badges). Do not use for body text on light surfaces unless contrast is verified ≥ 4.5:1.
- Input borders and focus rings must meet WCAG 1.4.11 (non-text contrast ≥ 3:1) against surrounding surfaces; the specified tokens satisfy this when used at default opacities.
- Maintain visible focus rings using `focus-visible:outline-(--color-primary)`/`focus:ring-(--color-primary)` per APG modal dialog pattern.

Confirmation: Tailwind v4 CSS-first tokens are already defined in `app/globals.css`; no `tailwind.config.js` changes are required for this plan.

- Do / Don’t
  - Do enhance clarity, warmth, and polish with tokens; do simplify dense areas into scannable sections.
  - Don’t introduce new logic or change flows; don’t hardcode colors; don’t clone the mock exactly.

- QA acceptance checklist (excerpt)
  - Semantics present (`role=dialog`, `aria-modal`, labeled title).
  - Initial focus, focus trap, ESC and click-out behaviors verified.
  - AA contrast on text and interactive elements; visible focus rings.
  - Mobile bottom-sheet variant respects dvh and safe areas; tap targets ≥ 44px.

Artifacts
- Annotated reference: `family-tree/docs/assets/e10-modal/annotations.md` with callouts corresponding to the spec items
- Reference image: `family-tree/docs/assets/e10-modal/reference-add-modal.jpg`

Spec Impact Summary (applies to downstream tasks E10-T3 → E10-T10)
- Header/backdrop classes and tokens defined here
- Section dividers, input focus/error styles standardized
  - MemberForm finalized (E10-T4): semantic `<section>` with `aria-labelledby`; errors linked via `aria-describedby` to `*-error` ids; inputs use tokenized focus/border and subtle `shadow-sm`

#### PO Acceptance (E10-T10)

- Review scope: E10-T1 spec + E10-T2 token plan applied across E10-T3 → E10-T9
- Verified items:
  - Modal semantics and keyboard flow per APG Modal Dialog: `role="dialog"`, `aria-modal`, labeled title via `aria-labelledby`, optional description via `aria-describedby`, focus trap, ESC and click-out enabled
  - Visual tokens applied: header accent uses `--color-primary`, borders `--color-neutral-100|200`, focus indicators `--color-primary`, error borders/text `--color-error`, container `--elevation-3` and `--radius-lg`
  - Mobile bottom-sheet behavior on small screens: `max-sm:h-[100dvh]`, `max-sm:rounded-none`, safe-area padding considered; tap targets ≥ 44px with ≥ 8px spacing
  - Tests updated (E10-T9) assert token-driven selectors instead of raw color values
- Artifacts for audit: `docs/assets/e10-modal/reference-add-modal.jpg`, `docs/assets/e10-modal/annotations.md`
- Conclusion: Acceptance criteria met; no follow-up gaps identified.

#### MemberForm Redesign (E10-T4)

- Goal: Apply the spec to `app/components/shared/MemberForm.tsx` without changing behavior.
- Implementation:
  - Grouped content into sections: Basic Information, Dates, Photo, Contact, Relations, Biography, and (edit-only) Canvas Position & Size
  - Each section uses `section[aria-labelledby]` and a tokenized header (`text-base font-medium text-(--color-neutral-900)`)
  - Inputs: `border-(--color-neutral-200) rounded-md shadow-sm focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)`
  - Errors: `aria-invalid` + `aria-describedby` to `<p id="*-error">…</p>`; classes `border-(--color-error)/40 text-(--color-error)`
  - Photo: button `.btn-outline`, preview `rounded-full`, delete badge `bg-(--color-error)`
  - Actions row unchanged: `.btn-outline` and `.btn-primary` inside `border-t border-(--color-neutral-100)` container
- Notes: DOM kept minimal; validation logic unchanged; a11y improved per WAI-ARIA APG patterns.

- Mobile bottom-sheet behaviors and safe-area notes included


### Notion‑Inspired Color & Motion Polish (Epic 11)

Reference inspiration: Notion’s clean, expressive style (directional only, not 1:1). See [Notion](https://www.notion.com).

#### Gradients & Accents (E11‑T1)
Tokens only; no hardcoded hex.

Approved minimal recipes (CSS utilities defined in `app/globals.css`):
- Header gradient: `.u-header-accent--gradient` → `linear-gradient(90deg, color-mix(in oklch, var(--color-primary), white 6%), var(--color-primary))`
- Primary CTA gradient: `.u-btn-primary--gradient` with same recipe, `text-(--color-primary-contrast)`
- Accent divider: `.u-divider--accent` → `border-(--color-accent)`
- Accent chip: `.u-chip--accent` → `bg-[color-mix(in_oklch,_var(--color-accent),_white_85%)] text-(--color-neutral-800)`

Example Tailwind v4 arbitrary values (when not using the CSS helper classes):
- Header bar (subtle gradient): `bg-[linear-gradient(90deg,_color-mix(in_oklch,_var(--color-primary),_white_6%),_var(--color-primary))]`
- CTA hover darken: `hover:bg-[color-mix(in_oklch,_var(--color-primary),_black_8%)]`

Token → usage map:

| Token | Usage Area |
| --- | --- |
| `--color-primary` | Header accent, focus rings, primary CTA base |
| `--color-accent` | Chips/badges highlights (sparingly); optional divider accents |
| `--color-neutral-100` · `--color-neutral-200` | Dividers/borders |

Contrast notes:
- Verify AA for text and WCAG 1.4.11 for non‑text UI (borders, focus indicators). Use warm blue primary on `--surface-1` with `--color-primary-contrast` for CTAs.

Research Log (E11‑T1)
- Tailwind v4 `@theme` tokens are addressable as native CSS variables; arbitrary value syntax supports `color-mix()` and `oklch()`.
- Subtle gradients (≤ 6–8% white mix) preserve readability and avoid banding.
- Accent chips use high-lightness mix (≈ 85% white) to ensure text contrast on light surfaces.

Research Log (E11‑T1)
- Collected 3–5 screenshots illustrating subtle gradients and expressive dividers/chips from Notion.
- Mapped visuals to our tokens/utilities; kept gradients ≤ 8% mix for subtlety.

#### Modal Header & Primary CTA Polish (E11‑T2)
- Header accent supports flat or gradient variant via a presentational prop/class.
- Button gradient variant:
  - `.btn-primary--gradient`: `bg-[color-mix(in_oklch,_var(--color-primary),_white_6%)] text-(--color-primary-contrast) focus-visible:outline-(--color-primary)`
  - States: `hover:bg-[color-mix(in_oklch,_var(--color-primary),_black_8%)] active:scale-[.98]`
- Files: `app/components/Modal.tsx`, `app/components/AddMemberModal.tsx`, `app/components/EditMemberModal.tsx`, `app/globals.css`.

#### Expressive Dividers, Chips, Section Icons (E11‑T3)
- Dividers: `border-t border-(--color-neutral-100) data-[accent=true]:border-(--color-accent)`
- Chips (e.g., “Required”): `inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-(--text-xs) bg-[color-mix(in_oklch,_var(--color-accent),_white_85%)] text-(--color-neutral-800)`
- Icons: decorative → `aria-hidden="true"`; if meaningful, use `role="img"` + `aria-label`.

Research Log (Notion references)
- Subtle divider accents improve section scanning without heavy borders
- Small rounded chips with light accent backgrounds communicate labels unobtrusively
- Lightweight 16px decorative icons next to section titles aid recognition

Spec Impact Summary (E11‑T3)
- Files: `app/components/shared/MemberForm.tsx`, `app/globals.css`
- Added optional decorative section icons (`aria-hidden="true"`), tokenized chips for labels, and accent-capable dividers using `data-accent="true"`
- Globals: introduced `[data-accent="true"].border-t { border-color: var(--color-accent) }` helper
- File: `app/components/shared/MemberForm.tsx`.

#### Micro‑Interactions & Motion Polish (E11‑T4)
- Transitions: `transition-[opacity,transform] duration-150 ease-out will-change-transform`.
- CTA pressed: `active:scale-[.98] active:shadow-[var(--elevation-2)]`.
- Respect motion preferences:
  - Use Tailwind utilities or wrap in `@media (prefers-reduced-motion: no-preference)`.
- Files: `Modal.tsx`, `MemberForm.tsx`, `globals.css`.

#### A11y/Contrast & Tests (E11‑T5)
- Tests assert presence of token/gradient classes, not raw hex.
- Validate focus/keyboard flows unchanged; mobile bottom‑sheet unaffected.
- Files: `app/components/__tests__/Modal.test.tsx`, `app/components/__tests__/AddMemberModal.test.tsx`, `app/components/__tests__/EditMemberModal.test.tsx`, `app/components/__tests__/MemberForm.test.tsx`.

#### PO/UX Acceptance & Docs (E11‑T6)
- Confirm: subtle accents; gradient header/CTA allowed; warm blue primary with pink accent highlights; expressive dividers/chips/icons; micro‑interactions added; AA contrast; motion‑reduce respected.
- Add before/after screenshots to this doc and/or `family-tree/docs/onboarding-help.md`.


### Canvas-Based Layout System

```typescript
// FamilyTreeCanvas.tsx
import React, { useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FamilyMember, Position, Connection } from '@/types';

interface CanvasState {
  members: FamilyMember[];
  selectedMember: string | null;
  viewport: { x: number; y: number; zoom: number };
  connections: Connection[];
  isDragging: boolean;
  dragStart: Position | null;
}

export default function FamilyTreeCanvas() {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    members: [],
    selectedMember: null,
    viewport: { x: 0, y: 0, zoom: 1 },
    connections: [],
    isDragging: false,
    dragStart: null
  });

  // Pan and zoom handlers
  const handlePan = useCallback((e: React.MouseEvent) => {
    if (!canvasState.isDragging) return;
    
    const dx = e.clientX - (canvasState.dragStart?.x || 0);
    const dy = e.clientY - (canvasState.dragStart?.y || 0);
    
    setCanvasState(prev => ({
      ...prev,
      viewport: {
        ...prev.viewport,
        x: prev.viewport.x + dx,
        y: prev.viewport.y + dy
      }
    }));
  }, [canvasState.isDragging, canvasState.dragStart]);

  // Member dragging handlers
  const handleMemberDrag = useCallback((memberId: string, newPosition: Position) => {
    setCanvasState(prev => ({
      ...prev,
      members: prev.members.map(m => 
        m.id === memberId 
          ? { ...m, position: newPosition }
          : m
      )
    }));
    
    // Recalculate connections
    recalculateConnections();
  }, []);

  return (
    <div 
      className="canvas-container relative w-full h-full overflow-hidden"
      onMouseMove={handlePan}
      style={{
        transform: `translate(${canvasState.viewport.x}px, ${canvasState.viewport.y}px) scale(${canvasState.viewport.zoom})`
      }}
    >
      <svg className="connection-layer absolute inset-0 pointer-events-none">
        {canvasState.connections.map(connection => (
          <ConnectionLine key={connection.id} {...connection} />
        ))}
      </svg>
      
      <div className="members-layer relative">
        {canvasState.members.map(member => (
          <MemberBanner 
            key={member.id}
            member={member}
            onDrag={handleMemberDrag}
            isSelected={member.id === canvasState.selectedMember}
          />
        ))}
      </div>
    </div>
  );
}
```

### Member Banner Component

```typescript
// MemberBanner.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { FamilyMember } from '@/types';

interface MemberBannerProps {
  member: FamilyMember;
  onDrag: (id: string, position: Position) => void;
  isSelected: boolean;
}

export default function MemberBanner({ member, onDrag, isSelected }: MemberBannerProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MEMBER',
    item: { id: member.id, type: 'MEMBER' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={drag}
      className={`member-banner rounded-lg bg-white shadow-md border-2 transition-all
        ${isSelected ? 'border-blue-500' : 'border-transparent'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:border-blue-300`}
      style={{
        position: 'absolute',
        left: member.position.x,
        top: member.position.y,
        width: member.size.width,
        height: member.size.height
      }}
    >
      <div className="banner-content p-4">
        <div className="photo-section">
          {member.photo ? (
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-xl">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="info-section mt-2">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.relationship}</p>
          {member.title && (
            <p className="text-xs text-gray-500">{member.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Connection Line Component

```typescript
// ConnectionLine.tsx
import React from 'react';
import { Connection } from '@/types';

interface ConnectionLineProps extends Connection {
  className?: string;
}

export default function ConnectionLine({ 
  from, 
  to, 
  type,
  className = ''
}: ConnectionLineProps) {
  // Calculate control points for curved lines
  const controlPoint = {
    x: (from.x + to.x) / 2,
    y: type === 'spouse' 
      ? from.y // Horizontal line for spouses
      : (from.y + to.y) / 2 // Curved line for parent-child
  };

  const path = type === 'spouse'
    ? `M ${from.x} ${from.y} L ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} Q ${controlPoint.x} ${controlPoint.y} ${to.x} ${to.y}`;

  return (
    <path
      d={path}
      className={`stroke-current ${className}`}
      strokeWidth={2}
      fill="none"
      strokeDasharray={type === 'spouse' ? '0' : '0'}
    />
  );
}
```

### State Management with React Context

```typescript
// FamilyTreeContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { FamilyTreeState, FamilyTreeAction } from '@/types';

const FamilyTreeContext = createContext<{
  state: FamilyTreeState;
  dispatch: React.Dispatch<FamilyTreeAction>;
} | null>(null);

const initialState: FamilyTreeState = {
  members: [],
  selectedMember: null,
  viewport: { x: 0, y: 0, zoom: 1 },
  history: {
    past: [],
    present: null,
    future: []
  },
  settings: {
    gridEnabled: true,
    snapToGrid: true,
    theme: 'light',
    layout: 'hierarchical'
  }
};

function familyTreeReducer(state: FamilyTreeState, action: FamilyTreeAction): FamilyTreeState {
  switch (action.type) {
    case 'ADD_MEMBER':
      return {
        ...state,
        members: [...state.members, action.member]
      };
      
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(m => 
          m.id === action.member.id ? action.member : m
        )
      };
      
    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter(m => m.id !== action.memberId)
      };
      
    case 'SET_SELECTED_MEMBER':
      return {
        ...state,
        selectedMember: action.memberId
      };
      
    case 'UPDATE_VIEWPORT':
      return {
        ...state,
        viewport: action.viewport
      };
      
    case 'UNDO':
      if (state.history.past.length === 0) return state;
      return {
        ...state,
        history: {
          past: state.history.past.slice(0, -1),
          present: state.history.past[state.history.past.length - 1],
          future: [state.history.present!, ...state.history.future]
        }
      };
      
    case 'REDO':
      if (state.history.future.length === 0) return state;
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present!],
          present: state.history.future[0],
          future: state.history.future.slice(1)
        }
      };
      
    default:
      return state;
  }
}

export function FamilyTreeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(familyTreeReducer, initialState);
  
  return (
    <FamilyTreeContext.Provider value={{ state, dispatch }}>
      {children}
    </FamilyTreeContext.Provider>
  );
}

export function useFamilyTree() {
  const context = useContext(FamilyTreeContext);
  if (!context) {
    throw new Error('useFamilyTree must be used within a FamilyTreeProvider');
  }
  return context;
}
```

### Data Storage and Export

```typescript
// storage.ts
import { FamilyTreeData } from '@/types';

export async function saveTreeData(data: FamilyTreeData) {
  // Save to localStorage
  localStorage.setItem('family-tree-data', JSON.stringify(data));
  
  // Also save to JSON file for backup
  await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function loadTreeData(): Promise<FamilyTreeData | null> {
  try {
    // Try localStorage first
    const localData = localStorage.getItem('family-tree-data');
    if (localData) {
      return JSON.parse(localData);
    }
    
    // Fall back to server
    const response = await fetch('/api/load');
    return response.json();
  } catch (error) {
    console.error('Failed to load tree data:', error);
    return null;
  }
}

export function exportToCSV(members: FamilyMember[]) {
  const csvData = members.map(member => ({
    Name: member.name,
    Relationship: member.relationship,
    Gender: member.gender,
    BirthDate: member.birthDate || '',
    Email: member.email || '',
    Phone: member.phone || '',
    Address: member.address || '',
    Biography: member.biography || ''
  }));
  
  const headers = Object.keys(csvData[0]);
  const csvRows = [
    headers.join(','),
    ...csvData.map(row => 
      headers.map(header => `"${row[header]}"`).join(',')
    )
  ];
  
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'family-tree.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportToImage(format: 'png' | 'jpg' = 'png') {
  const canvas = document.getElementById('family-tree-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  
  try {
    const dataURL = canvas.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `family-tree.${format}`;
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
  }
}
```

### Share Link System

```typescript
// share.ts
export function generateShareLink(treeId: string) {
  const shareData = {
    treeId,
    timestamp: Date.now(),
    version: '1.0'
  };
  
  const encoded = btoa(JSON.stringify(shareData));
  return `${window.location.origin}/view/${encoded}`;
}

export async function loadSharedTree(shareCode: string) {
  try {
    const shareData = JSON.parse(atob(shareCode));
    return loadTreeData(shareData.treeId);
  } catch (error) {
    console.error('Invalid share link');
    return null;
  }
}
```

### Mobile Touch Interactions

```typescript
// TouchHandler.tsx
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

const touchBackendOptions = {
  enableMouseEvents: true,
  enableTouchEvents: true,
  enableKeyboardEvents: true,
  delayTouchStart: 100,
  scrollAngleRanges: [
    { start: 30, end: 150 },
    { start: 210, end: 330 }
  ]
};

export function TouchProvider({ children }: { children: React.ReactNode }) {
  return (
    <DndProvider backend={TouchBackend} options={touchBackendOptions}>
      {children}
    </DndProvider>
  );
}
```

## Testing Guidelines

### Canvas Component Tests

```typescript
// FamilyTreeCanvas.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FamilyTreeCanvas from './FamilyTreeCanvas';

describe('FamilyTreeCanvas', () => {
  const renderWithDnd = (ui: React.ReactElement) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {ui}
      </DndProvider>
    );
  };

  it('renders empty canvas initially', () => {
    renderWithDnd(<FamilyTreeCanvas />);
    expect(screen.getByTestId('canvas-container')).toBeInTheDocument();
  });

  it('handles pan gesture correctly', () => {
    renderWithDnd(<FamilyTreeCanvas />);
    const canvas = screen.getByTestId('canvas-container');
    
    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);
    
    expect(canvas).toHaveStyle({
      transform: expect.stringContaining('translate(100px, 100px)')
    });
  });

  it('allows member dragging', async () => {
    const mockMember = {
      id: '1',
      name: 'John Doe',
      position: { x: 0, y: 0 }
    };
    
    renderWithDnd(<FamilyTreeCanvas initialMembers={[mockMember]} />);
    const memberCard = screen.getByText('John Doe');
    
    fireEvent.dragStart(memberCard);
    fireEvent.dragOver(canvas, { clientX: 200, clientY: 200 });
    fireEvent.drop(canvas);
    
    expect(memberCard).toHaveStyle({
      transform: expect.stringContaining('translate(200px, 200px)')
    });
  });
});
```

### Member Banner Tests

```typescript
// MemberBanner.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MemberBanner from './MemberBanner';

describe('MemberBanner', () => {
  const mockMember = {
    id: '1',
    name: 'John Doe',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 }
  };

  const renderWithDnd = (ui: React.ReactElement) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {ui}
      </DndProvider>
    );
  };

  it('renders member information correctly', () => {
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={jest.fn()}
        isSelected={false}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows selection state correctly', () => {
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={jest.fn()}
        isSelected={true}
      />
    );
    
    const banner = screen.getByTestId('member-banner');
    expect(banner).toHaveClass('border-blue-500');
  });

  it('calls onDrag when dragged', () => {
    const handleDrag = jest.fn();
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={handleDrag}
        isSelected={false}
      />
    );
    
    const banner = screen.getByTestId('member-banner');
    fireEvent.dragStart(banner);
    fireEvent.dragOver(document.body, { clientX: 200, clientY: 200 });
    fireEvent.drop(document.body);
    
    expect(handleDrag).toHaveBeenCalledWith(
      mockMember.id,
      expect.objectContaining({ x: 200, y: 200 })
    );
  });
});
```

### Connection Line Tests
### Onboarding & Help Tests

```typescript
// Onboarding.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingProvider } from '../components/OnboardingProvider';
import OnboardingTour from '../components/OnboardingTour';
import HelpPanel from '../components/HelpPanel';

describe('Onboarding system', () => {
  test('tour opens on first load and can be skipped', () => {
    window.localStorage.removeItem('onboardingCompleted');
    render(
      <OnboardingProvider>
        <OnboardingTour />
      </OnboardingProvider>
    );
    expect(screen.getByText(/Welcome to Family Tree/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Skip/i));
    expect(window.localStorage.getItem('onboardingCompleted')).toBe('true');
  });

  test('help panel renders with shortcuts and can start tour', () => {
    render(
      <OnboardingProvider>
        <HelpPanel />
        <OnboardingTour />
      </OnboardingProvider>
    );
    fireEvent.keyDown(document, { key: '/', shiftKey: true });
    expect(screen.getByText(/Help & Shortcuts/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Start Tour/i));
    expect(screen.getByText(/Welcome to Family Tree/i)).toBeInTheDocument();
  });
});
```


```typescript
// ConnectionLine.test.tsx
import { render } from '@testing-library/react';
import ConnectionLine from './ConnectionLine';

describe('ConnectionLine', () => {
  it('renders spouse connection as straight line', () => {
    const { container } = render(
      <ConnectionLine
        from={{ x: 0, y: 0 }}
        to={{ x: 100, y: 0 }}
        type="spouse"
      />
    );
    
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('d', 'M 0 0 L 100 0');
  });

  it('renders parent-child connection as curved line', () => {
    const { container } = render(
      <ConnectionLine
        from={{ x: 0, y: 0 }}
        to={{ x: 100, y: 100 }}
        type="parent-child"
      />
    );
    
    const path = container.querySelector('path');
    expect(path).toHaveAttribute(
      'd',
      expect.stringContaining('Q') // Should be a quadratic curve
    );
  });
});
```

## Development Workflow

1. Start development server:
   ```bash
   npm run dev
   ```

2. Run tests in watch mode:
   ```bash
   npm test -- --watch
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run production build locally:
   ```bash
   npm start
   ```

5. Run type checking:
   ```bash
   npm run type-check
   ```