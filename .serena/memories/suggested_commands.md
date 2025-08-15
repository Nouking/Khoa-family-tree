# Essential Development Commands

## Setup & Development
```bash
# Navigate to app directory (IMPORTANT: Always work from family-tree/)
cd family-tree/

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing & Quality Assurance
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test ComponentName.test.tsx

# Run ESLint
npm run lint

# Validate UI backup (project-specific)
npm run validate:backup
```

## Authentication Setup
```bash
# Seed admin credentials (admin/admin)
node scripts/seed-admin.mjs --password=admin

# Change admin password
node scripts/seed-admin.mjs --password=newpassword
```

## Development URLs
- **Homepage**: http://localhost:3000
- **v2 UI (Recommended)**: http://localhost:3000/v2/view
- **v1 UI (Legacy)**: http://localhost:3000/view
- **Login**: http://localhost:3000/login

## Git Workflow
```bash
# Create feature branch for improvement tasks
git checkout -b improvement-e{epic}-t{task}-{description}
# Example: git checkout -b improvement-e12-t1-v2-home

# Create feature branch for original tasks
git checkout -b task{ID}-{description}
# Example: git checkout -b task3-1-share-system

# Commit with conventional format
git commit -m "type(scope): description"
# Example: git commit -m "feat(canvas): add drag-and-drop positioning"
```

## File System Navigation
- **App code**: `family-tree/app/`
- **Components**: `family-tree/app/components/`
- **v2 Components**: `family-tree/app/components-v2/`
- **Tests**: `family-tree/app/components/__tests__/`
- **Data**: `family-tree/data/`
- **Documentation**: `family-tree/docs/`

## System-Specific (Darwin/macOS)
- **Find files**: `find family-tree -name "*.tsx" -type f`
- **Search content**: `grep -r "searchTerm" family-tree/app/`
- **List directory**: `ls -la family-tree/`
- **Change directory**: `cd family-tree/`