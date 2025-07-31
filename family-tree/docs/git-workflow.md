# Git Workflow Guidelines

> **Development Workflow** - Standardized Git workflow for family tree project

## 🎯 Workflow Overview

Mandatory Git workflow for consistent development practices, clean history, and proper code review.

## 📋 Mandatory Git Protocol

### Phase 1: Pre-Development
1. **Checkout main branch**
   ```bash
   git checkout main
   ```

2. **Pull latest code**
   ```bash
   git pull origin main
   ```

3. **Verify clean working directory**
   ```bash
   git status
   ```

4. **Create task-specific branch**
   ```bash
   git checkout -b task{ID}-{description}
   ```
   Example: `git checkout -b task1-1-setup-nextjs-project`

### Phase 2: Development
1. **Commit frequently** with descriptive messages
   ```bash
   git commit -m "feat(task1-1): implement Next.js setup"
   ```

2. **Use conventional commit format**
   - Format: `type(scope): description`
   - Types: feat, fix, docs, style, refactor, test, chore, etc.

3. **Push to task branch regularly**
   ```bash
   git push origin task{ID}-{description}
   ```

### Phase 3: Completion
1. **Final commit** with comprehensive message
   ```bash
   git commit -m "feat(task1-1): complete Next.js project setup

   - Initialize Next.js 15 with App Router
   - Configure TypeScript and Tailwind CSS
   - Add ESLint and Prettier
   - Create basic project structure
   
   Task ID: 1.1
   Status: Completed"
   ```

2. **Create Pull Request** to main with:
   - Title: `Task {ID}: {Description}`
   - Description: Include task details, changes, testing
   - Use squash merge to maintain clean history

## 🏷️ Branch Naming

### Format
```
task{ID}-{kebab-case-description}
```

### Examples
- `task1-1-setup-nextjs-project`
- `task2-3-jwt-token-system`
- `task1-5-tree-layout-system`

## 📝 Commit Format

### Structure
```
type(scope): description
```

### Types
| Type | Use Case |
|------|----------|
| feat | New feature implementation |
| fix | Bug fix |
| docs | Documentation changes |
| style | Code style changes |
| refactor | Code refactoring |
| test | Adding/updating tests |
| chore | Maintenance tasks |

### Examples
```bash
feat(task1-1): setup Next.js 15 project with TypeScript
fix(auth): resolve JWT token expiration issue
test(family-tree): add unit tests for MemberCard component
```

## 🔄 Pull Request Template

```markdown
## Task Details
- **Task ID**: {ID}
- **Description**: {Full task description}
- **Status**: Completed

## Changes Made
- [List of specific changes]

## Testing
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Manual testing completed

## Context7 Research
- Used Context7 library: {library-id} for {purpose}
```

## 📚 Context7 Integration

### Required Usage
- **ALWAYS research latest patterns** before implementing features
- **Use specific library IDs** for accurate documentation

### Common Libraries
| Technology | Context7 ID |
|------------|-------------|
| Next.js 15 | `/vercel/next.js` |
| TypeScript | `/microsoft/typescript` |
| Tailwind CSS | `/tailwindlabs/tailwindcss` |
| JWT | `/auth0/node-jsonwebtoken` |
| React Testing | `/testing-library/react-testing-library` |

## ⚠️ Common Mistakes

- ❌ Starting without checking out main
- ❌ Not pulling latest changes
- ❌ Working directly on main branch
- ❌ Using vague commit messages
- ❌ Missing task ID in branch name

## 📖 Quick Reference

### Complete Workflow
```bash
# 1. Setup
git checkout main
git pull origin main
git checkout -b task1-1-setup-nextjs-project

# 2. Development
git add .
git commit -m "feat(task1-1): initialize Next.js 15 project"
git push origin task1-1-setup-nextjs-project

# 3. Completion
git add .
git commit -m "feat(task1-1): complete Next.js setup"
git push origin task1-1-setup-nextjs-project
# Create PR with detailed description
```

---

**Status**: Active - All development must follow this workflow 