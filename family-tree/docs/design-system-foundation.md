---
title: Design System Foundation
task: E5-T1 (P1-CRITICAL)
status: Draft v1
date: 2025-08-08
owner: @ux-expert (Sally)
---

## Purpose
Establish a cohesive, warm, and accessible design system for the Family Tree app. Defines color tokens, typography, spacing, elevation, and component standards with Tailwind CSS v4 `@theme` tokens and CSS custom properties for maintainability.

## Principles
- Inclusive and readable (WCAG 2.1 AA)
- Warm, family-friendly aesthetic
- Token-first, CSS-variable driven
- 8px spacing grid; consistent radii and elevation

## Color System (5 categories)
- Primary: Warm blue for key actions
- Secondary: Soft green accents
- Accent: Supportive highlight
- Neutral: Warm gray scale for UI
- Semantic: Success, Warning, Error, Info

Recommended bases (inspired by Carbon):
- Primary: `#0F62FE`
- Secondary: `#24A148`
- Accent: `#FF7EB6`
- Neutral base text: `#161616`, surfaces `#F4F4F4` / `#FFFFFF`
- Success `#24A148`, Warning `#F1C21B`, Error `#DA1E28`, Info `#0F62FE`

### Token definitions (CSS-first with Tailwind v4)
Add this `@theme` block to `app/globals.css` (see Implementation):

```css
@theme {
  /* Brand */
  --color-primary: #0F62FE;
  --color-primary-contrast: #ffffff;
  --color-secondary: #24A148;
  --color-accent: #FF7EB6;

  /* Neutral (warm grays) */
  --color-neutral-50: #F4F4F4;
  --color-neutral-100: #E0E0E0;
  --color-neutral-200: #C6C6C6;
  --color-neutral-300: #A8A8A8;
  --color-neutral-400: #8D8D8D;
  --color-neutral-500: #6F6F6F;
  --color-neutral-600: #525252; /* warm gray */
  --color-neutral-700: #393939;
  --color-neutral-800: #262626;
  --color-neutral-900: #161616;

  /* Semantic */
  --color-success: #24A148;
  --color-warning: #F1C21B;
  --color-error: #DA1E28;
  --color-info: #0F62FE;

  /* Background layers */
  --surface-1: #FFFFFF;
  --surface-2: #F4F4F4;
  --surface-3: #E0E0E0;
}
```

Usage examples (Tailwind v4 arbitrary/variable syntax):
```html
<button class="bg-(--color-primary) text-(--color-primary-contrast) hover:bg-[color-mix(in_oklch,_var(--color-primary),_black_10%)] focus-visible:outline-2 focus-visible:outline-(--color-primary)">
  Add Member
  </button>
<p class="text-(--color-neutral-700)">Secondary text</p>
<div class="border border-(--color-neutral-200) bg-(--surface-1)"></div>
```

## Typography
- Base size: 16px, modular ratio ≈ 1.125
- Font family: Inter (system fallback)

Tokens:
```css
@theme {
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;

  --text-xs: 0.75rem;      /* 12 */
  --text-sm: 0.875rem;     /* 14 */
  --text-base: 1rem;       /* 16 */
  --text-lg: 1.125rem;     /* 18 */
  --text-xl: 1.25rem;      /* 20 */
  --text-2xl: 1.5rem;      /* 24 */
  --text-3xl: 1.875rem;    /* 30 */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

Guidelines:
- Headings use `font-semibold`; body `font-regular`; UI labels `font-medium`
- Ensure contrast AA: large text ≥ 3:1, normal text ≥ 4.5:1

## Spacing & Layout
- 8px grid: use 8, 16, 24, 32, 40, 48, 64...
- Tailwind spacing aligns (2 → 0.5rem = 8px). Prefer multiples of `2` in spacing classes.

Tokens (optional helpers):
```css
@theme {
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --elevation-1: 0 1px 2px rgb(0 0 0 / 0.06);
  --elevation-2: 0 2px 6px rgb(0 0 0 / 0.08);
  --elevation-3: 0 6px 16px rgb(0 0 0 / 0.12);
}
```

Usage:
```html
<div class="rounded-[var(--radius-md)] shadow-[var(--elevation-2)] p-4 sm:p-6"></div>
```

## Iconography
- Size steps: 16, 20, 24, 32
- Consistent stroke width; semantic colors via tokens

## Component Standards (initial)
- Buttons: min height 40px, 12px horizontal padding, 4px focus ring offset
- Cards: radius `--radius-md`, elevation-1/2, 16–24px padding
- Modals: sizes sm 480px, md 672px, lg 896px, fullscreen; focus trap, ESC close

## Accessibility
- Focus visible outlines using brand primary
- Touch targets ≥ 44×44px, spacing ≥ 8px
- State colors must meet AA on surfaces

## Implementation
1) Edit `family-tree/app/globals.css` and add the `@theme` token blocks above beneath `@import 'tailwindcss';`.
2) Use tokens via Tailwind arbitrary values, e.g. `bg-(--color-primary)` / `text-(--color-neutral-900)` / `ring-(--color-primary)`.
3) Prefer spacing steps aligned to the 8px grid (`p-2`, `p-3`, `p-4`, etc.).

## Context7 references
- Tailwind v4 CSS-first tokens via `@theme` and CSS variables
- OKLCH-ready color tokens for neutral scales

## Next Steps (E5 roadmap)
- E5-T2: Apply tokens to Member banners/cards
- E5-T3: Update MainToolbar and navigation with tokens
- E5-T4: Canvas background and connection visuals using semantic tokens


