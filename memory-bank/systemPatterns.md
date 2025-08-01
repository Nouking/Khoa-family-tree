# System Patterns

## Development Patterns

### **Component Architecture**
- **Atomic Design**: Build components from atoms to organisms
- **Composition**: Favor composition over inheritance
- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Design components for reuse across the application
- **Canvas-Based**: Interactive canvas with absolute positioning and drag-and-drop

### **State Management**
- **React Hooks**: Use useState, useEffect, useContext for local state
- **Component State**: Keep state as close to usage as possible
- **Context API**: Share authentication state across components
- **Local Storage**: Persist user preferences and session data
- **History Stack**: Implement undo/redo functionality with state management

### **Data Flow**
- **Unidirectional**: Data flows down, events flow up
- **Props Drilling**: Minimize prop drilling with context
- **Event Handling**: Centralized event handling patterns
- **Error Boundaries**: Catch and handle component errors gracefully
- **Canvas Events**: Handle drag-and-drop, pan, zoom, and selection events

## Code Organization Patterns

### **File Naming Conventions**
```
components/
  Canvas/
    FamilyTreeCanvas.tsx     # Main canvas component
    MemberBanner.tsx         # Enhanced member cards
    ConnectionLines.tsx      # Dynamic SVG connections
    CanvasControls.tsx       # Pan, zoom, grid controls
  Toolbar/
    MainToolbar.tsx          # Professional design tool header
    ActionButtons.tsx        # Undo/redo, share, export
    UserSection.tsx          # User avatar and settings
  Modals/
    AddMemberModal.tsx       # Add member form
    EditMemberModal.tsx      # Edit member form
    DeleteConfirmModal.tsx   # Delete confirmation
    ShareModal.tsx           # Share link generation
  Export/
    ExportModal.tsx          # Export options modal
    ExportOptions.tsx        # CSV and image export
  Mobile/
    MobileActionBar.tsx      # Touch-friendly action bar
    MobileModals.tsx        # Mobile-optimized modals
lib/
  canvas.ts                  # Canvas utilities and state
  export.ts                  # Export functionality
  share.ts                   # Share link generation
  crud.ts                    # CRUD operations
types/
  design-tool.ts            # Enhanced type definitions
```

### **Import Organization**
```typescript
// External libraries
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Internal components
import { FamilyTreeCanvas } from '@/components/Canvas/FamilyTreeCanvas';
import { MemberBanner } from '@/components/Canvas/MemberBanner';
import { MainToolbar } from '@/components/Toolbar/MainToolbar';

// Utilities and types
import { useFamilyTree } from '@/contexts/FamilyTreeContext';
import { FamilyMember, Position } from '@/types';
```

### **Component Structure**
```typescript
// 1. Imports
import React from 'react';
import { FamilyMember, Position } from '@/types';

// 2. Interface definition
interface MemberBannerProps {
  member: FamilyMember;
  onDrag: (id: string, position: Position) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

// 3. Component definition
export const MemberBanner: React.FC<MemberBannerProps> = ({
  member,
  onDrag,
  isSelected,
  onSelect
}) => {
  // 4. Hooks
  const [isDragging, setIsDragging] = useState(false);

  // 5. Event handlers
  const handleDrag = useCallback((newPosition: Position) => {
    onDrag(member.id, newPosition);
  }, [member.id, onDrag]);

  // 6. Render
  return (
    <div 
      className={`member-banner ${isSelected ? 'selected' : ''}`}
      style={{
        position: 'absolute',
        left: member.position.x,
        top: member.position.y,
        width: member.size.width,
        height: member.size.height
      }}
    >
      {/* Component JSX */}
    </div>
  );
};
```

## Current Component Patterns

### **Enhanced Data Structure (Completed)**
```typescript
// Enhanced FamilyMember interface with canvas support
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
  parentId?: string | null;
  spouseIds: string[];
  childrenIds: string[];
  order: number;
  // Canvas-specific fields (✅ implemented)
  position: { x: number; y: number };
  size: { width: number; height: number };
  relationship: string;     // Father, Mother, Brother, etc.
}
```

### **Canvas Component Pattern (Ready for Implementation)**
```typescript
// FamilyTreeCanvas.tsx
interface CanvasState {
  members: FamilyMember[];
  selectedMember: string | null;
  viewport: { x: number; y: number; zoom: number };
  connections: Connection[];
  isDragging: boolean;
  dragStart: Position | null;
}

export const FamilyTreeCanvas: React.FC = () => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    members: [],
    selectedMember: null,
    viewport: { x: 0, y: 0, zoom: 1 },
    connections: [],
    isDragging: false,
    dragStart: null
  });

  // Pan and zoom handlers
  const handlePan = useCallback((e: React.MouseEvent) => {
    if (!canvasState.isDragging) return;
    
    const dx = e.clientX - (canvasState.dragStart?.x || 0);
    const dy = e.clientY - (canvasState.dragStart?.y || 0);
    
    setCanvasState(prev => ({
      ...prev,
      viewport: {
        ...prev.viewport,
        x: prev.viewport.x + dx,
        y: prev.viewport.y + dy
      }
    }));
  }, [canvasState.isDragging, canvasState.dragStart]);

  // Member dragging handlers
  const handleMemberDrag = useCallback((memberId: string, newPosition: Position) => {
    setCanvasState(prev => ({
      ...prev,
      members: prev.members.map(m => 
        m.id === memberId 
          ? { ...m, position: newPosition }
          : m
      )
    }));
    
    // Recalculate connections
    recalculateConnections();
  }, []);

  return (
    <div 
      className="canvas-container relative w-full h-full overflow-hidden"
      onMouseMove={handlePan}
      style={{
        transform: `translate(${canvasState.viewport.x}px, ${canvasState.viewport.y}px) scale(${canvasState.viewport.zoom})`
      }}
    >
      <svg className="connection-layer absolute inset-0 pointer-events-none">
        {canvasState.connections.map(connection => (
          <ConnectionLine key={connection.id} {...connection} />
        ))}
      </svg>
      
      <div className="members-layer relative">
        {canvasState.members.map(member => (
          <MemberBanner 
            key={member.id}
            member={member}
            onDrag={handleMemberDrag}
            isSelected={member.id === canvasState.selectedMember}
            onSelect={(id) => setCanvasState(prev => ({ ...prev, selectedMember: id }))}
          />
        ))}
      </div>
    </div>
  );
};
```

### **Enhanced Member Banner Pattern (Ready for Implementation)**
```typescript
// MemberBanner.tsx
interface MemberBannerProps {
  member: FamilyMember;
  onDrag: (id: string, position: Position) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const MemberBanner: React.FC<MemberBannerProps> = ({
  member,
  onDrag,
  isSelected,
  onSelect
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MEMBER',
    item: { id: member.id, type: 'MEMBER' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={drag}
      className={`member-banner rounded-lg bg-white shadow-md border-2 transition-all
        ${isSelected ? 'border-blue-500' : 'border-transparent'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:border-blue-300`}
      style={{
        position: 'absolute',
        left: member.position.x,
        top: member.position.y,
        width: member.size.width,
        height: member.size.height
      }}
      onClick={() => onSelect(member.id)}
    >
      <div className="banner-content p-4">
        <div className="photo-section">
          {member.photo ? (
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-xl">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="info-section mt-2">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.relationship}</p>
          {member.title && (
            <p className="text-xs text-gray-500">{member.title}</p>
          )}
        </div>
      </div>
    </div>
  );
};
```

### **Professional Toolbar Pattern (Ready for Implementation)**
```typescript
// MainToolbar.tsx
interface MainToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onShare: () => void;
  onExport: () => void;
  onAddMember: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const MainToolbar: React.FC<MainToolbarProps> = ({
  onUndo,
  onRedo,
  onShare,
  onExport,
  onAddMember,
  canUndo,
  canRedo
}) => {
  return (
    <header className="toolbar bg-white shadow-sm border-b h-16 flex items-center px-6">
      <div className="toolbar-left flex items-center space-x-4">
        <button className="btn-home text-gray-600 hover:text-gray-900">
          ← Home
        </button>
        <button className="btn-resize text-gray-600 hover:text-gray-900">
          Resize
        </button>
        <div className="undo-redo flex space-x-2">
          <button 
            className={`btn-undo p-2 rounded ${canUndo ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400'}`}
            onClick={onUndo}
            disabled={!canUndo}
          >
            ↶
          </button>
          <button 
            className={`btn-redo p-2 rounded ${canRedo ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400'}`}
            onClick={onRedo}
            disabled={!canRedo}
          >
            ↷
          </button>
        </div>
      </div>
      
      <div className="toolbar-center flex-1 flex justify-center">
        <h1 className="title text-xl font-semibold text-gray-900">Family Tree</h1>
      </div>
      
      <div className="toolbar-right flex items-center space-x-4">
        <button 
          className="btn-share px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onShare}
        >
          Share
        </button>
        <button 
          className="btn-export px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onExport}
        >
          Export
        </button>
        <button 
          className="btn-add-member w-10 h-10 bg-purple-600 text-white rounded-full text-xl hover:bg-purple-700"
          onClick={onAddMember}
        >
          +
        </button>
        <div className="user-section">
          <div className="user-avatars flex space-x-2">
            {/* User avatars for collaboration */}
          </div>
        </div>
      </div>
    </header>
  );
};
```

### **Modal Component Pattern (Ready for Implementation)**
```typescript
// Base Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="modal-header flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            className="close-button text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Add Member Modal
export const AddMemberModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: Partial<FamilyMember>) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as const,
    birthDate: '',
    relationship: '',
    photo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Family Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={formData.gender}
          onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' | 'other' }))}
          className="w-full p-2 border rounded"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          value={formData.birthDate}
          onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <select
          value={formData.relationship}
          onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Relationship</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Spouse">Spouse</option>
          <option value="Child">Child</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setFormData(prev => ({ ...prev, photo: e.target?.result as string }));
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-2 border rounded"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Member
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
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
    const filePath = path.join(process.cwd(), 'data', 'family-tree-v2.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new AppError('Failed to load family data', 500);
  }
};

export const saveFamilyData = async (data: any) => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'family-tree-v2.json');
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

## Canvas Layout Patterns

### **Interactive Canvas Layout**
```typescript
// Canvas layout utility functions
export const calculateMemberPosition = (
  member: FamilyMember,
  canvasSize: { width: number; height: number }
): Position => {
  // Calculate optimal position based on relationships
  const parent = members.find(m => m.id === member.parentId);
  if (parent) {
    return {
      x: parent.position.x + 200, // Offset from parent
      y: parent.position.y
    };
  }
  
  // Default position for root members
  return {
    x: canvasSize.width / 2,
    y: 100
  };
};

export const recalculateConnections = (members: FamilyMember[]): Connection[] => {
  const connections: Connection[] = [];
  
  // Add parent-child connections
  members.forEach(member => {
    if (member.parentId) {
      const parent = members.find(m => m.id === member.parentId);
      if (parent) {
        connections.push({
          id: `parent-${member.id}`,
          from: { x: parent.position.x + parent.size.width / 2, y: parent.position.y + parent.size.height },
          to: { x: member.position.x + member.size.width / 2, y: member.position.y },
          type: 'parent-child'
        });
      }
    }
  });
  
  // Add spouse connections
  members.forEach(member => {
    member.spouseIds.forEach(spouseId => {
      const spouse = members.find(m => m.id === spouseId);
      if (spouse && member.id < spouseId) { // Only add once per pair
        connections.push({
          id: `spouse-${member.id}-${spouseId}`,
          from: { x: member.position.x + member.size.width, y: member.position.y + member.size.height / 2 },
          to: { x: spouse.position.x, y: spouse.position.y + spouse.size.height / 2 },
          type: 'spouse'
        });
      }
    });
  });
  
  return connections;
};
```

### **SVG Connection Patterns**
```typescript
// SVG connection component for canvas lines
interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'parent-child' | 'spouse';
  className?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  from,
  to,
  type,
  className = ''
}) => {
  // Calculate control points for curved lines
  const controlPoint = {
    x: (from.x + to.x) / 2,
    y: type === 'spouse' 
      ? from.y // Horizontal line for spouses
      : (from.y + to.y) / 2 // Curved line for parent-child
  };

  const path = type === 'spouse'
    ? `M ${from.x} ${from.y} L ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} Q ${controlPoint.x} ${controlPoint.y} ${to.x} ${to.y}`;

  const strokeColor = type === 'parent-child' ? '#3b82f6' : '#10b981';
  const strokeWidth = type === 'parent-child' ? 2 : 1;

  return (
    <path
      d={path}
      className={`stroke-current ${className}`}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={type === 'spouse' ? '5,5' : 'none'}
    />
  );
};
```

## UI/UX Patterns

### **Responsive Design Patterns**
```typescript
// Tailwind responsive classes for canvas
const responsiveClasses = {
  canvas: 'w-full h-full overflow-hidden',
  toolbar: 'h-16 md:h-20 lg:h-16',
  memberBanner: 'w-48 h-32 md:w-56 md:h-36 lg:w-64 lg:h-40',
  modal: 'max-w-md w-full mx-4 md:max-w-lg lg:max-w-xl',
  actionBar: 'fixed bottom-0 left-0 right-0 md:hidden'
};
```

### **Loading States**
```typescript
// Loading component pattern for canvas
export const CanvasLoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Loading state management for canvas operations
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleCanvasOperation = async (operation: () => Promise<void>) => {
  setIsLoading(true);
  setError(null);
  
  try {
    await operation();
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### **Form Patterns**
```typescript
// Controlled form components for modals
export const MemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as const,
    birthDate: '',
    relationship: '',
    photo: ''
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
        className="form-input w-full p-2 border rounded"
        placeholder="Full Name"
        required
      />
      {/* Other form fields */}
    </form>
  );
};
```

## Testing Patterns

### **Canvas Component Testing**
```typescript
// Canvas component test pattern
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FamilyTreeCanvas from './FamilyTreeCanvas';

describe('FamilyTreeCanvas', () => {
  const renderWithDnd = (ui: React.ReactElement) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {ui}
      </DndProvider>
    );
  };

  it('renders empty canvas initially', () => {
    renderWithDnd(<FamilyTreeCanvas />);
    expect(screen.getByTestId('canvas-container')).toBeInTheDocument();
  });

  it('handles pan gesture correctly', () => {
    renderWithDnd(<FamilyTreeCanvas />);
    const canvas = screen.getByTestId('canvas-container');
    
    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);
    
    expect(canvas).toHaveStyle({
      transform: expect.stringContaining('translate(100px, 100px)')
    });
  });

  it('allows member dragging', async () => {
    const mockMember = {
      id: '1',
      name: 'John Doe',
      position: { x: 0, y: 0 },
      size: { width: 200, height: 120 }
    };
    
    renderWithDnd(<FamilyTreeCanvas initialMembers={[mockMember]} />);
    const memberCard = screen.getByText('John Doe');
    
    fireEvent.dragStart(memberCard);
    fireEvent.dragOver(canvas, { clientX: 200, clientY: 200 });
    fireEvent.drop(canvas);
    
    expect(memberCard).toHaveStyle({
      transform: expect.stringContaining('translate(200px, 200px)')
    });
  });
});
```

### **Member Banner Testing**
```typescript
// Member banner test pattern
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MemberBanner from './MemberBanner';

describe('MemberBanner', () => {
  const mockMember = {
    id: '1',
    name: 'John Doe',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 },
    relationship: 'Father'
  };

  const renderWithDnd = (ui: React.ReactElement) => {
    return render(
      <DndProvider backend={HTML5Backend}>
        {ui}
      </DndProvider>
    );
  };

  it('renders member information correctly', () => {
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={jest.fn()}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Father')).toBeInTheDocument();
  });

  it('shows selection state correctly', () => {
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={jest.fn()}
        isSelected={true}
        onSelect={jest.fn()}
      />
    );
    
    const banner = screen.getByTestId('member-banner');
    expect(banner).toHaveClass('border-blue-500');
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn();
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={jest.fn()}
        isSelected={false}
        onSelect={handleSelect}
      />
    );
    
    const banner = screen.getByTestId('member-banner');
    fireEvent.click(banner);
    
    expect(handleSelect).toHaveBeenCalledWith('1');
  });
});
```

## Performance Patterns

### **Optimization Strategies**
- **Memoization**: Use React.memo for expensive canvas components
- **Lazy Loading**: Load canvas components and data on demand
- **Virtualization**: For large family trees with many members
- **Image Optimization**: Compress and resize member photos
- **Caching**: Cache canvas state and computed values
- **Throttling**: Throttle canvas operations during drag

### **Bundle Optimization**
```typescript
// Dynamic imports for code splitting
const MemberForm = dynamic(() => import('@/components/Modals/MemberForm'), {
  loading: () => <LoadingSpinner />
});

// Canvas component with virtualization
import { FixedSizeList as List } from 'react-window';
```

---

*This file contains development patterns and architectural decisions for the canvas-based design tool.* 