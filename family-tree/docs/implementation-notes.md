# Implementation Notes

> **Technical Details** - Code examples and implementation guidance

## 🔧 Technical Implementation Notes

### JSON Data Storage

```typescript
// Save to JSON file
const saveToFile = async (data: any, filename: string) => {
  await fs.writeFile(`./data/${filename}`, JSON.stringify(data, null, 2));
};

// Load from JSON file
const loadFromFile = async (filename: string) => {
  const data = await fs.readFile(`./data/${filename}`, 'utf8');
  return JSON.parse(data);
};
```

### Base64 Image Handling

```typescript
// Convert file to Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};
```

### Tree Layout Algorithm

- Use CSS Grid or Flexbox for horizontal layout
- Calculate member positions based on generation level
- Implement connection lines with SVG or CSS borders
- Handle responsive breakpoints for mobile

### Authentication Implementation

```typescript
// JWT Token Generation
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';

export async function createToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  return token;
}
```

```typescript
// Password Hashing
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

### Middleware for Protected Routes

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Check for protected routes
  if (request.nextUrl.pathname.startsWith('/api/family') && 
      request.method !== 'GET') {
    
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/family/:path*'],
};
```

## Component Implementation Guidelines

### MemberCard Component

```tsx
// MemberCard.tsx
import Image from 'next/image';
import { FamilyMember } from '@/types';

interface MemberCardProps {
  member: FamilyMember;
  onClick?: (member: FamilyMember) => void;
}

export default function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <div 
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      onClick={() => onClick?.(member)}
    >
      <div className="flex items-center space-x-4">
        {member.photo ? (
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image 
              src={member.photo} 
              alt={`Photo of ${member.name}`}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xl">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
        
        <div>
          <h3 className="font-medium">{member.name}</h3>
          {member.title && (
            <p className="text-sm text-gray-600">{member.title}</p>
          )}
          {member.birthDate && (
            <p className="text-xs text-gray-500">
              {member.birthDate} - {member.deathDate || 'Present'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Tree Layout Component

```tsx
// FamilyTree.tsx
import { FamilyMember } from '@/types';
import MemberCard from './MemberCard';

interface FamilyTreeProps {
  members: FamilyMember[];
}

export default function FamilyTree({ members }: FamilyTreeProps) {
  // Group members by generation
  const groupedMembers = members.reduce((acc, member) => {
    const generation = getGeneration(member, members);
    if (!acc[generation]) acc[generation] = [];
    acc[generation].push(member);
    return acc;
  }, {} as Record<number, FamilyMember[]>);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {Object.entries(groupedMembers).map(([generation, genMembers]) => (
          <div key={generation} className="flex space-x-4 my-8">
            {genMembers.map(member => (
              <div key={member.id} className="flex-shrink-0">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to determine generation level
function getGeneration(member: FamilyMember, allMembers: FamilyMember[]): number {
  // Implementation logic here
  // This would recursively trace parentId to determine generation
  return 0; // Placeholder
}
```

---

*For more detailed component implementations, see the code in the repository.*