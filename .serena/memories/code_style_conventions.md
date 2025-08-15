# Code Style & Conventions

## TypeScript Configuration
- **Strict mode enabled**: Full type safety enforcement
- **Target**: ES2017 with modern lib support
- **Module resolution**: Bundler (Next.js optimized)
- **Path aliases**: `@/*` maps to project root

## Code Quality
- **ESLint**: Next.js core-web-vitals + TypeScript rules
- **File naming**: camelCase for files, PascalCase for components
- **Import order**: External libraries first, then internal modules
- **Type definitions**: Comprehensive interfaces in `/types`

## Component Patterns
- **React components**: Functional components with hooks
- **State management**: React Context + useReducer for global state
- **Props typing**: Strict TypeScript interfaces
- **Event handlers**: Descriptive names (handleMemberClick, onPositionChange)

## Styling Approach
- **Tailwind CSS 4**: Utility-first classes
- **Responsive design**: Mobile-first approach
- **Component variants**: Conditional classes for different states
- **CSS custom properties**: For design tokens and themes

## Testing Standards
- **Jest + React Testing Library**: Component and integration tests
- **Test file naming**: `*.test.tsx` in `__tests__` directories
- **Mock setup**: react-dnd and HTML5 backend mocked
- **Coverage**: Comprehensive test coverage expected

## API Design
- **REST endpoints**: `/api/members/*` with proper HTTP methods
- **JWT authentication**: Protected routes with middleware
- **Error handling**: Consistent error responses
- **Validation**: Input validation on both client and server

## Performance Considerations
- **React.memo**: Prevent unnecessary re-renders
- **Virtualization**: For large family trees
- **Connection caching**: Optimize SVG connection rendering
- **Bundle optimization**: Code splitting and tree shaking