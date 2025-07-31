# Family Tree Website Documentation

> **Documentation Index** - Central hub for project documentation

## Overview
Next.js 15 Family Tree Website with public viewing and authenticated editing capabilities.

## Documentation Sections

| Document | Description |
|----------|-------------|
| [Project Overview](./project-overview.md) | Project summary, tech stack, architecture |
| [Task Tracking](./task-tracking.md) | Current tasks and status |
| [Completed Tasks](./completed-tasks.md) | Archive of finished tasks |
| [Implementation Notes](./implementation-notes.md) | Technical details and code examples |
| [Git Workflow](./git-workflow.md) | Mandatory Git workflow procedures |
| [Git Quick Reference](./git-quick-reference.md) | Copy-paste ready Git commands |
| [Success Criteria](./success-criteria.md) | Project goals and metrics |

## Project Status

- **Current Phase**: Foundation (Phase 1)
- **Progress**: 83% complete (5/6 tasks in Phase 1)
- **Next Task**: Responsive Design (Task 1.6)
- **Recent Completion**: Tree Layout System (Task 1.5)
- **Development Process**: TDD with Git workflow

## Development Workflow

```bash
# 1. Git Setup
git checkout main
git pull origin main
git checkout -b task{ID}-{description}

# 2. Development
npm test                    # Run existing tests
# ... implement feature ...
npm test                    # Verify tests pass

# 3. Completion
git commit -m "feat(task{ID}): {description}"
git push origin task{ID}-{description}
# Create Pull Request
```

## Key Commands

| Category | Command | Purpose |
|----------|---------|---------|
| **Development** | `npm run dev` | Start dev server |
| | `npm run build` | Build for production |
| | `npm run type-check` | Check TypeScript |
| **Testing** | `npm test` | Run unit tests |
| | `npm test -- --watch` | Watch mode tests |
| | `npm test -- --coverage` | Coverage report |
| **Git** | `git checkout main` | Switch to main |
| | `git pull origin main` | Pull latest |
| | `git checkout -b task{ID}-{description}` | Create branch |

## Context7 Integration

| Technology | Context7 ID | Use Case |
|------------|-------------|----------|
| Next.js 15 | `/vercel/next.js` | Async patterns, routing |
| TypeScript | `/microsoft/typescript` | Type definitions |
| Tailwind CSS | `/tailwindlabs/tailwindcss` | Styling |
| JWT | `/auth0/node-jsonwebtoken` | Authentication |
| React Testing | `/testing-library/react-testing-library` | Testing |

---

*Documentation maintained as part of development process*