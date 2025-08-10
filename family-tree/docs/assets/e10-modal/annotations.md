# E10 Modal Redesign Annotations

Reference: reference-add-modal.jpg

- Header
  - Title uses `text-xl font-semibold`
  - Accent: thin bar `before:h-1 before:bg-(--color-primary)` (or left `border-l-4 border-(--color-primary)`) for subtle emphasis
  - Close button: `text-(--color-neutral-500) hover:text-(--color-neutral-700) focus-visible:outline-2 focus-visible:outline-(--color-primary) rounded-[var(--radius-sm)]`

- Backdrop
  - Overlay: `bg-black/50 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur`

- Container
  - Panel: `bg-(--surface-1) rounded-[var(--radius-lg)] shadow-[var(--elevation-3)] max-h-[90vh] overflow-y-auto`
  - Sizes: small 480px, medium 672px, large 896px, fullscreen screen width/height

- Sections (MemberForm)
  - Grouping: separators `border-t border-(--color-neutral-100) pt-4`
  - Labels: `text-sm font-medium text-(--color-neutral-700)`
  - Inputs: `border border-(--color-neutral-200) rounded-md focus:ring-2 focus:ring-(--color-primary)`
  - Errors: `border-(--color-error)/40` + `text-(--color-error)` below field

- Photo Uploader
  - Choose/Change: `.btn-outline`
  - Preview: `w-16 h-16 rounded-full object-cover`
  - Delete badge: `absolute -top-2 -right-2 bg-(--color-error) text-white rounded-full w-5 h-5`

- Actions Row
  - Container: `flex justify-end space-x-3 pt-6 border-t border-(--color-neutral-100)`
  - Buttons: `.btn-outline` (cancel), `.btn-primary` (submit)

- Mobile
  - Full-height: `max-sm:w-screen max-sm:h-[100dvh] max-sm:rounded-none`
  - Use safe-area padding if needed
  - Prefer container queries `@container` for internal grid shifts (e.g., one column on small)


