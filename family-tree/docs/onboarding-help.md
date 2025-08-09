# Onboarding & Help System

> Guided tour and contextual help to introduce users to the Family Tree app. Implements E6-T4 (Onboarding & Help System).

## Features
- First-run welcome tour with progressive steps (Toolbar → Canvas → Search & Filters)
- Spotlight highlight around current focus area
- Contextual Help panel with tips and keyboard shortcuts
- Keyboard shortcut: Shift+? opens Help anywhere
- Local persistence: onboarding completion stored in `localStorage`

## Usage
- First visit: the tour opens automatically
- Open Help: press Shift+? or click the Help button in the toolbar
- Start/Repeat Tour: open Help and click “Start Tour”
- Skip/Finish: closes the tour and marks it completed

## Components & Integration
- `app/components/OnboardingProvider.tsx` — Context and state (tour/help, steps, persistence)
- `app/components/OnboardingTour.tsx` — Modal-based stepper with spotlight overlay
- `app/components/HelpPanel.tsx` — Help modal with tips and shortcuts
- `app/layout.tsx` — Wraps app in `OnboardingProvider` and mounts `OnboardingTour` + `HelpPanel`
- `app/components/MainToolbar.tsx` — Adds Help button (Shift+?)

## Accessibility & Tokens
- Uses existing design tokens for colors, radii, and elevation
- Modals preserve role="dialog", focus management, and Escape/Backdrop close
- Motion kept minimal and respects reduced-motion (via Modal behavior)

## Troubleshooting
- Tour not showing on first visit: ensure browser allows localStorage in this context
- Reset tour: run in console `localStorage.removeItem('onboardingCompleted')` and refresh
- Spotlight visibility depends on browser clip-path support; graceful fallback dims background

## Related Tasks
- IMPROVEMENT-TASK-TRACKING: E6-T4 — Onboarding & Help System (In Progress)

