# Project Overview

> **Project Summary** - Next.js 15 Family Tree Website with public viewing and authenticated editing

## 🎯 Project Summary

Build a **Next.js 15 Family Tree Website** with public viewing and authenticated editing.

- **Public**: View, search, export family tree (no auth)
- **Protected**: Add/edit/delete members (auth required)
- **Tech**: Next.js 15 + TypeScript + Tailwind + JWT + JSON storage

## 🏗️ Tech Stack & Architecture

```
Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS
UI: Catalyst components + Headless UI
Auth: JWT tokens + bcrypt password hashing
Data: JSON files (family-tree.json + users.json)
Storage: Base64 images embedded in JSON
```

### File Structure

```
/app                    # Next.js App Router
  /api                  # API routes
    /auth              # Authentication endpoints
    /family            # Family tree CRUD
  /components           # React components
  /lib                  # Utilities & helpers
/data                   # JSON data storage
  family-tree.json     # Family tree data
  users.json           # User accounts
/types                  # TypeScript definitions
```

## 📊 Core Data Models

### Family Member

```typescript
interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate?: string;
  deathDate?: string;
  photo?: string;          // Base64 encoded
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  biography?: string;
  parentId?: string;
  spouseIds: string[];
  childrenIds: string[];
  order: number;
}
```

### User Account

```typescript
interface User {
  id: string;
  username: string;
  password: string;        // bcrypt hashed
  role: 'editor';
  createdAt: string;
  lastLogin?: string;
}
```

## 🔐 Authentication Flow

### API Endpoints

- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/verify` - Verify JWT token

### Protection Strategy

- **Public routes**: All viewing operations
- **Protected routes**: All editing operations (add/edit/delete)
- **Middleware**: JWT verification for protected API routes

## 🎨 UI Components Hierarchy

```
App Layout
├── Header (login/logout)
├── FamilyTreeView (public)
│   ├── TreeContainer
│   ├── MemberCard
│   ├── ConnectionLines
│   └── SearchFilter
├── EditControls (protected)
│   ├── AddMemberForm
│   ├── EditMemberForm
│   └── DeleteConfirmation
└── Footer
```

### Key Components to Build

1. **MemberCard** - Display member info with photo
2. **TreeLayout** - Horizontal tree visualization
3. **AuthForm** - Login form component
4. **MemberForm** - Add/edit member form
5. **SearchBar** - Filter and search functionality

## Environment Variables

```env
JWT_SECRET=your-secret-key
NODE_ENV=development
```

---

*See [Implementation Notes](./implementation-notes.md) for detailed technical guidance.*