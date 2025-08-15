# Tech Stack & Architecture

## Core Framework
- **Next.js 15.4.5**: App Router with Turbopack for fast development
- **React 19.1.0**: Latest React features and hooks
- **TypeScript 5**: Strict mode with comprehensive type safety
- **Tailwind CSS 4**: Utility-first responsive design

## Canvas & Interactions
- **React DnD 16.0.1**: Canvas drag-and-drop interactions
- **html2canvas**: (Planned) Canvas-to-image conversion for exports
- **React DnD Touch Backend**: Mobile gesture support

## Authentication & Security  
- **jose 6.0.12**: Modern JWT library for authentication
- **bcryptjs 3.0.2**: Password hashing with salt rounds
- **Next.js middleware**: Protected API endpoints
- **Client-side token storage**: Session management with validation

## Data Management
- **JSON files**: Local file-based storage
  - `family-tree-v2.json`: Family member data
  - `users.json`: User accounts with hashed passwords
- **Base64 images**: Embedded in JSON for portability
- **React Context + useReducer**: Global state management with history

## Development & Testing
- **Turbopack**: Fast bundler for development
- **ESLint 9**: Code quality and formatting
- **Jest 29.7.0 + React Testing Library**: Comprehensive test coverage
- **TypeScript Compiler**: Strict mode type checking

## Project Structure
```
/app                      # Next.js App Router
  /components/          # React components
  /(v2)/               # v2 UI routes
  /components-v2/      # v2 components
  /lib/                # Utilities & helpers
  /api/                # API routes
/data                  # JSON data storage
/types                 # TypeScript definitions
```