# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## AI Task Workflow

### 1. Project Understanding (Mandatory)
Before starting any task, you MUST read and understand the following documents to grasp the project's goals, scope, and current state.

- **Project Goal**: project-goal.md (root level)
- **Project Overview**: family-tree/docs/project-overview.md  
- **Success Criteria**: family-tree/docs/success-criteria.md

### 2. Task-Specific Instructions (Mandatory)
For any given task ID (e.g., "Task 1.1", "1.2"), you MUST:
1. Read the main task board to find the specific task:
   - family-tree/docs/task-tracking.md
2. Review the archive of completed work for relevant context:
   - family-tree/docs/completed-tasks.md
3. For the specific task, understand its:
   - Description
   - Status
   - Dependencies and prerequisites
   - Known issues or blockers
   - Any associated notes
4. Only proceed with implementation after you have a clear understanding of the task.

### 3. Task Status Updates (MANDATORY - DO NOT SKIP)
**CRITICAL**: You MUST complete ALL steps below in EXACT ORDER. Do NOT proceed to git operations without completing documentation updates first.

**Required Steps (Must Complete in Order):**
- [ ] **Step 1 - Complete Code Implementation**: Finish writing and testing all code changes for the task.
- [ ] **Step 2 - Update Documentation (MANDATORY BEFORE GIT)**: After code is complete but BEFORE any git operations, you MUST update the following:
  - [ ] Update the task's status in `family-tree/docs/task-tracking.md`
  - [ ] Move the completed task details to `family-tree/docs/completed-tasks.md`, including any implementation notes
  - [ ] Document any issues encountered or deviations from the original plan
  - [ ] Update documentation with your latest achievements
- [ ] **Step 3 - Perform Git Operations**: ONLY after ALL documentation is updated, proceed with git commits and pushes.

**WARNING**: Skipping Step 2 documentation updates is a critical workflow violation. Always verify documentation is updated before any git commit.

## Working Directory

The main application code is located in the `family-tree/` subdirectory. Always work from `/Users/nouking/Workspace/family-tree/Khoa-family-tree/family-tree` when running commands or editing application files.

## Development Workflow

### Git Workflow (Mandatory)
1. **Branch Management**: ALWAYS verify you're on the correct branch before any git operations.
   - **Before any git action**: Run `git status` to confirm current branch
   - **Switch branches**: Use `git checkout [branch-name]` if needed
   - **Create a Branch**: Before writing any code, create a feature branch.
   - **Format**: `task{ID}-{kebab-case-description}`
   - **Example**: `task1-1-setup-nextjs-project`
2. **Commit Changes**: Write clear and comprehensive commit messages.
   - **Format**: `type(scope): description`
   - **Example**: `feat(auth): implement jwt token generation`
   - **NO Claude branding**: Do NOT include Claude Code attribution or co-authored-by lines
   - **Comprehensive descriptions**: Include detailed explanation of changes made
3. **Create a Pull Request**: After pushing your changes, create a PR. The description should include task details and test results.

### Testing Protocol (Mandatory)
Follow a Test-Driven Development (TDD) approach.

1. **Before Coding**:
   - Run all existing tests to establish a baseline: `npm test`
   - Write new unit tests for the feature you are about to build
   - Confirm that the new tests fail as expected (Red)
2. **During Coding**:
   - Write the minimum amount of code required to make the new tests pass (Green)
   - Refactor your code for clarity and efficiency while ensuring all tests continue to pass (Refactor)
   - Run tests frequently
3. **After Coding**:
   - Run the entire test suite to ensure no regressions: `npm test`
   - Add tests for any edge cases you discovered
   - Check test coverage: `npm test -- --coverage`

## Development Commands & Architecture

For development commands, tech stack details, and architecture overview, refer to:
- **Development Commands**: See `family-tree/README.md` - Getting Started section
- **Architecture Overview**: See `family-tree/docs/project-overview.md` - comprehensive tech stack and structure
- **Project Goals**: See `project-goal.md` - detailed technical architecture and data models

## Task Status Values
- `Pending`: Not yet started
- `In Progress`: Currently being worked on
- `Completed`: Finished successfully
- `Blocked`: Unable to proceed
- `Error`: Task failed and needs resolution

## Documentation Structure
- **Project Documentation**: family-tree/docs/
  - index.md: Main documentation hub
  - project-overview.md: Project summary, tech stack, and architecture
  - task-tracking.md: Current tasks and their status
  - completed-tasks.md: Archive of finished tasks with implementation notes
  - implementation-notes.md: Technical implementation details
  - success-criteria.md: Project goals and metrics for success
- **Documentation Archive**: Previous project notes and reference materials

## Task Reference Format
- **Git Branch Name Format**: `task{ID}-{kebab-case-description}`
  - *Example*: `task1-1-setup-nextjs-project`
- **Task Reference Format**: "Task [ID] - [Title]"
  - *Example*: "Task 1.1 - Setup Next.js Project"

## Current Project Status (Last Updated: 2025-08-08)

### Recently Completed
- **Task 2.6**: Undo/Redo History Stack - Professional undo/redo system with keyboard shortcuts
- **Task 2.5**: Dynamic Connection Recalculation - Implemented real-time SVG connection system
- **Task 2.4**: Member Selection & Context Menu - Added multi-select and right-click functionality  
- **Task 2.3**: CRUD Member Modals - Complete add/edit/delete modal system
- **Task 2.2**: Global State Management - React Context implementation
- **Task 2.1**: CRUD API Endpoints - Full REST API for member management

### Key Technical Achievements
- ✅ Canvas-based family tree editing with drag-and-drop
- ✅ Dynamic SVG connection rendering system (`lib/connectionCalculator.ts`)
- ✅ Comprehensive state management with React Context
- ✅ Complete CRUD operations with authentication
- ✅ Professional toolbar and enhanced member banners
- ✅ Real-time connection updates when members are moved
- ✅ Professional undo/redo system with keyboard shortcuts
- ✅ Performance optimized for large family trees

### Current Phase: Phase 2 - CRUD Operations & State Management
**Status**: 100% Complete (6 of 6 P1-CRITICAL tasks completed)

**All P1-CRITICAL Tasks Completed**:
- ✅ Task 2.6: Undo/Redo History Stack (Completed)

**Next Phase**: Phase 3 - Share & Export (Share links, CSV/PNG export, export options)