# Family Tree Website

A comprehensive family tree application built with Next.js 15, TypeScript, and Tailwind CSS. This project enables families to visualize their family structure in an attractive horizontal layout and allows authenticated users to manage family member information.

## 🌳 Project Overview

- **Public Access**: View complete family tree without authentication
- **Protected Management**: Secure member editing with JWT authentication
- **Horizontal Layout**: Compact tree visualization with connection lines
- **Photo Management**: Base64 image storage for member photos
- **Search & Export**: Find members and export family data
- **Responsive Design**: Works on all device sizes

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: JWT tokens with bcrypt password hashing
- **Data Storage**: JSON files (family-tree.json + users.json)
- **Image Handling**: Base64 encoded images embedded in JSON

## 🏗️ Project Structure

```
/app                    # Next.js App Router
  /api                  # API routes
    /auth              # Authentication endpoints
    /family            # Family tree CRUD
  /components           # React components
    MemberCard.tsx     # Individual member display
  /lib                  # Utilities & helpers
    auth.ts            # JWT utilities
    data.ts            # JSON file operations
  page.tsx             # Home page (public tree view)
/data                   # JSON data storage
  family-tree.json     # Family tree data
  users.json           # User accounts
/types                  # TypeScript definitions
  index.ts             # Interface definitions
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

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd family-tree

# Install dependencies
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the family tree visualization.

## 🔒 Authentication Flow

- **Public routes**: All viewing operations
- **Protected routes**: All editing operations (add/edit/delete)
- **API Endpoints**:
  - `POST /api/auth/login` - Login with username/password
  - `POST /api/auth/logout` - Logout and clear session
  - `GET /api/auth/verify` - Verify JWT token

## 🎯 Success Criteria

- **Functional**: Public users can view complete family tree without barriers
- **Secure**: Authenticated users can safely add/edit/delete members
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Fast**: Loads large trees (1000+ members) within 5 seconds
- **Accessible**: Meets WCAG 2.1 AA standards

## 📚 Learn More

For detailed implementation notes and technical guidance, see the [documentation](./docs).
