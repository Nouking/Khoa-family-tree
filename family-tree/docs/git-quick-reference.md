# Git Workflow Quick Reference

> **Essential Git Commands** - Quick reference for family tree project

## 🚀 Complete Workflow (Copy-Paste Ready)

### Before Starting Development
```bash
git checkout main
git pull origin main
git checkout -b task{ID}-{description}
```

### During Development
```bash
# Make changes, then:
git add .
git commit -m "type(scope): description"
git push origin task{ID}-{description}
```

### After Completing Task
```bash
git commit -m "feat(task{ID}): complete {description}

- [List of changes]
- [Testing performed]

Task ID: {ID}
Status: Completed"
git push origin task{ID}-{description}
# Create Pull Request
```

## 📝 Branch & Commit Examples

| Task | Branch Name | Commit Example |
|------|-------------|----------------|
| Setup Next.js | `task1-1-setup-nextjs-project` | `feat(task1-1): setup Next.js 15 project` |
| JWT Auth | `task2-3-jwt-token-system` | `feat(task2-3): implement JWT token generation` |
| Tree Layout | `task1-5-tree-layout-system` | `feat(task1-5): create horizontal tree layout` |

## 💬 Commit Type Reference

| Type | Use Case | Example |
|------|----------|---------|
| feat | New feature | `feat(auth): add login functionality` |
| fix | Bug fix | `fix(tree): resolve connection rendering` |
| test | Testing | `test(auth): add JWT validation tests` |
| docs | Documentation | `docs(api): update auth endpoints` |
| refactor | Refactoring | `refactor(card): improve component structure` |

## 🏷️ Pull Request Template

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

## 📚 Context7 Library IDs

| Technology | Library ID | Purpose |
|------------|------------|---------|
| Next.js 15 | `/vercel/next.js` | Async patterns, routing |
| TypeScript | `/microsoft/typescript` | Type definitions |
| Tailwind CSS | `/tailwindlabs/tailwindcss` | Styling |
| JWT | `/auth0/node-jsonwebtoken` | Authentication |
| React Testing | `/testing-library/react-testing-library` | Testing |

## 🚨 Best Practices

### ✅ Do This
- Always start from clean main branch
- Use descriptive commit messages
- Follow branch naming convention with task ID
- Keep commits atomic and focused
- Research Context7 patterns before implementing

### ❌ Avoid This
- Working directly on main branch
- Using vague commit messages
- Forgetting to pull latest changes
- Mixing unrelated changes in one commit
- Creating branches without task ID

---

**Remember**: Always follow this workflow for every task to maintain clean Git history. 