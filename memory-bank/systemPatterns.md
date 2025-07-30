# System Patterns

## Development Patterns

### **Component Architecture**
- **Atomic Design**: Build components from atoms to organisms
- **Composition**: Favor composition over inheritance
- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Design components for reuse across the application

### **State Management**
- **React Hooks**: Use useState, useEffect, useContext for local state
- **Component State**: Keep state as close to usage as possible
- **Context API**: Share authentication state across components
- **Local Storage**: Persist user preferences and session data

### **Data Flow**
- **Unidirectional**: Data flows down, events flow up
- **Props Drilling**: Minimize prop drilling with context
- **Event Handling**: Centralized event handling patterns
- **Error Boundaries**: Catch and handle component errors gracefully

## Code Organization Patterns

### **File Naming Conventions**
```
components/
  MemberCard.tsx          # PascalCase for components
  FamilyTree.tsx
  AuthForm.tsx
lib/
  auth.ts                 # camelCase for utilities
  data.ts
  utils.ts
types/
  index.ts               # Centralized type definitions
```

### **Import Organization**
```typescript
// External libraries
import React from 'react';
import { useState, useEffect } from 'react';

// Internal components
import { MemberCard } from '@/components/MemberCard';
import { FamilyTree } from '@/components/FamilyTree';

// Utilities and types
import { auth } from '@/lib/auth';
import { FamilyMember } from '@/types';
```

### **Component Structure**
```typescript
// 1. Imports
import React from 'react';
import { FamilyMember } from '@/types';

// 2. Interface definition
interface MemberCardProps {
  member: FamilyMember;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// 3. Component definition
export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onEdit,
  onDelete
}) => {
  // 4. Hooks
  const [isLoading, setIsLoading] = useState(false);

  // 5. Event handlers
  const handleEdit = () => {
    onEdit?.(member.id);
  };

  // 6. Render
  return (
    <div className="member-card">
      {/* Component JSX */}
    </div>
  );
};
```

## API Patterns

### **Route Handler Structure**
```typescript
// app/api/family/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from '@/lib/auth';
import { loadFamilyData, saveFamilyData } from '@/lib/data';

export async function GET() {
  try {
    const data = await loadFamilyData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load family data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validate authentication
    const token = request.headers.get('authorization');
    if (!token || !validateToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Validate input
    const body = await request.json();
    if (!body.name || !body.gender) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Process request
    const newMember = await saveFamilyData(body);

    // 4. Return response
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### **Error Handling Patterns**
```typescript
// Centralized error handling
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Error response helper
export const createErrorResponse = (error: AppError) => {
  return NextResponse.json(
    {
      error: error.message,
      code: error.code
    },
    { status: error.statusCode }
  );
};
```

## Authentication Patterns

### **JWT Token Management**
```typescript
// lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId, iat: Date.now() },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

### **Middleware Protection**
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Protect editing routes
  if (request.nextUrl.pathname.startsWith('/api/family') && 
      request.method !== 'GET') {
    const token = request.headers.get('authorization');
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}
```

## Data Management Patterns

### **JSON File Operations**
```typescript
// lib/data.ts
import fs from 'fs/promises';
import path from 'path';

export const loadFamilyData = async () => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'family-tree.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new AppError('Failed to load family data', 500);
  }
};

export const saveFamilyData = async (data: any) => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'family-tree.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    throw new AppError('Failed to save family data', 500);
  }
};
```

### **Data Validation Patterns**
```typescript
// lib/validation.ts
import { FamilyMember } from '@/types';

export const validateFamilyMember = (data: any): FamilyMember => {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (!data.gender || !['male', 'female', 'other'].includes(data.gender)) {
    errors.push('Gender must be male, female, or other');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join(', '), 400);
  }

  return data as FamilyMember;
};
```

## UI/UX Patterns

### **Responsive Design Patterns**
```typescript
// Tailwind responsive classes
const responsiveClasses = {
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  card: 'p-4 sm:p-6 lg:p-8',
  text: 'text-sm sm:text-base lg:text-lg'
};
```

### **Loading States**
```typescript
// Loading component pattern
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Loading state management
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async (data: any) => {
  setIsLoading(true);
  setError(null);
  
  try {
    await saveData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### **Form Patterns**
```typescript
// Controlled form components
export const MemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    email: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        className="form-input"
        placeholder="Full Name"
        required
      />
      {/* Other form fields */}
    </form>
  );
};
```

## Testing Patterns

### **Component Testing**
```typescript
// Component test pattern
import { render, screen, fireEvent } from '@testing-library/react';
import { MemberCard } from '@/components/MemberCard';

describe('MemberCard', () => {
  const mockMember = {
    id: '1',
    name: 'John Doe',
    gender: 'male' as const,
    birthDate: '1990-01-01'
  };

  it('renders member information correctly', () => {
    render(<MemberCard member={mockMember} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<MemberCard member={mockMember} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith('1');
  });
});
```

## Performance Patterns

### **Optimization Strategies**
- **Memoization**: Use React.memo for expensive components
- **Lazy Loading**: Load components and data on demand
- **Virtualization**: For large lists and trees
- **Image Optimization**: Compress and resize images
- **Caching**: Cache API responses and computed values

### **Bundle Optimization**
```typescript
// Dynamic imports for code splitting
const MemberForm = dynamic(() => import('@/components/MemberForm'), {
  loading: () => <LoadingSpinner />
});

// Tree component with virtualization
import { FixedSizeList as List } from 'react-window';
```

---
*This file contains development patterns and architectural decisions.* 