# Task Completion Protocol

## MANDATORY Steps (Complete in Order)

### Step 1: Complete Code Implementation
- Finish writing all code changes for the task
- Ensure all functionality works as expected
- Run tests to verify no regressions

### Step 2: Update Documentation (BEFORE Git Operations)
**CRITICAL**: Must complete ALL documentation updates before any git commits

#### Required Documentation Updates:
1. **Update task status** in `IMPROVEMENT-TASK-TRACKING.md`
2. **Add completed task entry** in `family-tree/docs/completed-tasks.md` with:
   - Anchor: `<a id="e{epic}-t{task}"></a>`
   - Full summary of work done
   - Files changed/added
   - Tests updated
   - Acceptance verification
3. **Update UI v2 plans** in `family-tree/docs/ui-improvement-plan.md` (if applicable)
4. **Document any issues** or deviations from original plan

#### Standard Completion Format:
```markdown
### E{epic}-T{task}: {Title} (P{priority}-{level}) ✅
- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}`
- Summary: {One-two lines; what changed and impact}
- Details: See Completed Log → [E{epic}-T{task}](family-tree/docs/completed-tasks.md#e{epic}-t{task})
```

### Step 3: Git Operations (Only After Documentation)
```bash
# Add all changes
git add .

# Commit with conventional format
git commit -m "type(scope): description"

# Push to remote
git push origin {branch-name}
```

## Quality Checks Before Completion
- [ ] All tests pass (`npm test`)
- [ ] ESLint clean (`npm run lint`)
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser
- [ ] Acceptance criteria verified
- [ ] Documentation updated
- [ ] v1 functionality unaffected (for v2 work)

## Branch Naming Convention
- **Improvement tasks**: `improvement-e{epic}-t{task}-{kebab-description}`
- **Original tasks**: `task{ID}-{kebab-description}`

## WARNING
Skipping Step 2 documentation updates is a critical workflow violation. Always verify documentation is updated before any git commit.