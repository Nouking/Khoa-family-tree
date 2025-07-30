# Technical Context

## Technology Stack

### **Frontend Framework**
- **Next.js 15**: Latest version with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **React 18**: Latest React features and hooks

### **Authentication & Security**
- **JWT (JSON Web Tokens)**: Stateless authentication
- **bcryptjs**: Password hashing with salt rounds
- **Session Management**: Client-side token storage and validation
- **Route Protection**: Middleware for protected API endpoints

### **Data Storage**
- **JSON Files**: Local file-based storage
  - `family-tree.json`: Family member data
  - `users.json`: User account data
- **Base64 Images**: Photo storage embedded in JSON
- **File System**: Node.js fs module for read/write operations

### **Development Tools**
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript Compiler**: Type checking
- **Next.js Dev Server**: Hot reloading and development

## Architecture Decisions

### **Frontend-Only Approach**
- **Rationale**: Simplified deployment and maintenance
- **Benefits**: No database setup required, easy to deploy
- **Trade-offs**: Limited concurrent users, no real-time updates

### **JSON File Storage**
- **Advantages**: Simple, portable, version control friendly
- **Limitations**: No concurrent write support, file size limits
- **Mitigation**: Implement proper error handling and validation

### **Base64 Image Storage**
- **Advantages**: No external storage dependencies
- **Disadvantages**: Increased JSON file size
- **Optimization**: Image compression before Base64 conversion

### **JWT Authentication**
- **Advantages**: Stateless, scalable, secure
- **Implementation**: Server-side token generation and validation
- **Security**: Proper expiration and refresh token strategy

## File Structure

```
/app                    # Next.js App Router
  /api                  # API routes
    /auth              # Authentication endpoints
      /login/route.ts  # POST login
      /logout/route.ts # POST logout  
      /verify/route.ts # GET token verification
    /family            # Family tree CRUD
      /route.ts        # GET all members
      /[id]/route.ts   # GET/PUT/DELETE single member
  /components           # React components
    FamilyTree.tsx     # Main tree container
    MemberCard.tsx     # Individual member display
    AuthForm.tsx       # Login form
    MemberForm.tsx     # Add/edit member form
  /lib                  # Utilities & helpers
    auth.ts            # JWT utilities
    data.ts            # JSON file operations
  page.tsx             # Home page (public tree view)
  layout.tsx           # Root layout with auth context
/data                   # JSON data storage
  family-tree.json     # Family tree data
  users.json           # User accounts
/types                  # TypeScript definitions
  index.ts             # All interface definitions
middleware.ts          # Route protection
```

## Data Models

### **Family Member Interface**
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

### **User Account Interface**
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

## Performance Considerations

### **Large Tree Handling**
- **Virtualization**: Implement virtual scrolling for 1000+ members
- **Lazy Loading**: Load member details on demand
- **Image Optimization**: Compress photos before Base64 conversion
- **Caching**: Client-side caching of tree data

### **Mobile Performance**
- **Touch Optimization**: Large touch targets for mobile
- **Responsive Images**: Optimize photo sizes for different screens
- **Smooth Scrolling**: CSS optimizations for mobile scrolling
- **Memory Management**: Efficient component rendering

## Security Measures

### **Authentication Security**
- **Password Hashing**: bcrypt with minimum 10 salt rounds
- **JWT Security**: Proper expiration and validation
- **Route Protection**: Middleware for all editing operations
- **Input Validation**: Server-side validation for all data

### **Data Security**
- **File Operations**: Proper error handling and rollback
- **XSS Prevention**: Sanitize all user inputs
- **CSRF Protection**: Token-based protection for mutations
- **Error Handling**: Secure error messages without data leakage

## Development Environment

### **Required Dependencies**
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

### **Environment Variables**
```env
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

---
*This file contains technical architecture and implementation details.* 