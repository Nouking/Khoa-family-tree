# Implementation Notes

> **Technical Details** - Code examples and implementation guidance for the canvas-based family tree design tool

## 🔧 Technical Implementation Notes

### Canvas-Based Layout System

```typescript
// FamilyTreeCanvas.tsx
import React, { useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FamilyMember, Position, Connection } from '@/types';

interface CanvasState {
  members: FamilyMember[];
  selectedMember: string | null;
  viewport: { x: number; y: number; zoom: number };
  connections: Connection[];
  isDragging: boolean;
  dragStart: Position | null;
}

export default function FamilyTreeCanvas() {
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
          />
        ))}
      </div>
    </div>
  );
}
```

### Member Banner Component

```typescript
// MemberBanner.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { FamilyMember } from '@/types';

interface MemberBannerProps {
  member: FamilyMember;
  onDrag: (id: string, position: Position) => void;
  isSelected: boolean;
}

export default function MemberBanner({ member, onDrag, isSelected }: MemberBannerProps) {
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
}
```

### Connection Line Component

```typescript
// ConnectionLine.tsx
import React from 'react';
import { Connection } from '@/types';

interface ConnectionLineProps extends Connection {
  className?: string;
}

export default function ConnectionLine({ 
  from, 
  to, 
  type,
  className = ''
}: ConnectionLineProps) {
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

  return (
    <path
      d={path}
      className={`stroke-current ${className}`}
      strokeWidth={2}
      fill="none"
      strokeDasharray={type === 'spouse' ? '0' : '0'}
    />
  );
}
```

### State Management with React Context

```typescript
// FamilyTreeContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { FamilyTreeState, FamilyTreeAction } from '@/types';

const FamilyTreeContext = createContext<{
  state: FamilyTreeState;
  dispatch: React.Dispatch<FamilyTreeAction>;
} | null>(null);

const initialState: FamilyTreeState = {
  members: [],
  selectedMember: null,
  viewport: { x: 0, y: 0, zoom: 1 },
  history: {
    past: [],
    present: null,
    future: []
  },
  settings: {
    gridEnabled: true,
    snapToGrid: true,
    theme: 'light',
    layout: 'hierarchical'
  }
};

function familyTreeReducer(state: FamilyTreeState, action: FamilyTreeAction): FamilyTreeState {
  switch (action.type) {
    case 'ADD_MEMBER':
      return {
        ...state,
        members: [...state.members, action.member]
      };
      
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(m => 
          m.id === action.member.id ? action.member : m
        )
      };
      
    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter(m => m.id !== action.memberId)
      };
      
    case 'SET_SELECTED_MEMBER':
      return {
        ...state,
        selectedMember: action.memberId
      };
      
    case 'UPDATE_VIEWPORT':
      return {
        ...state,
        viewport: action.viewport
      };
      
    case 'UNDO':
      if (state.history.past.length === 0) return state;
      return {
        ...state,
        history: {
          past: state.history.past.slice(0, -1),
          present: state.history.past[state.history.past.length - 1],
          future: [state.history.present!, ...state.history.future]
        }
      };
      
    case 'REDO':
      if (state.history.future.length === 0) return state;
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present!],
          present: state.history.future[0],
          future: state.history.future.slice(1)
        }
      };
      
    default:
      return state;
  }
}

export function FamilyTreeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(familyTreeReducer, initialState);
  
  return (
    <FamilyTreeContext.Provider value={{ state, dispatch }}>
      {children}
    </FamilyTreeContext.Provider>
  );
}

export function useFamilyTree() {
  const context = useContext(FamilyTreeContext);
  if (!context) {
    throw new Error('useFamilyTree must be used within a FamilyTreeProvider');
  }
  return context;
}
```

### Data Storage and Export

```typescript
// storage.ts
import { FamilyTreeData } from '@/types';

export async function saveTreeData(data: FamilyTreeData) {
  // Save to localStorage
  localStorage.setItem('family-tree-data', JSON.stringify(data));
  
  // Also save to JSON file for backup
  await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function loadTreeData(): Promise<FamilyTreeData | null> {
  try {
    // Try localStorage first
    const localData = localStorage.getItem('family-tree-data');
    if (localData) {
      return JSON.parse(localData);
    }
    
    // Fall back to server
    const response = await fetch('/api/load');
    return response.json();
  } catch (error) {
    console.error('Failed to load tree data:', error);
    return null;
  }
}

export function exportToCSV(members: FamilyMember[]) {
  const csvData = members.map(member => ({
    Name: member.name,
    Relationship: member.relationship,
    Gender: member.gender,
    BirthDate: member.birthDate || '',
    Email: member.email || '',
    Phone: member.phone || '',
    Address: member.address || '',
    Biography: member.biography || ''
  }));
  
  const headers = Object.keys(csvData[0]);
  const csvRows = [
    headers.join(','),
    ...csvData.map(row => 
      headers.map(header => `"${row[header]}"`).join(',')
    )
  ];
  
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'family-tree.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportToImage(format: 'png' | 'jpg' = 'png') {
  const canvas = document.getElementById('family-tree-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  
  try {
    const dataURL = canvas.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `family-tree.${format}`;
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
  }
}
```

### Share Link System

```typescript
// share.ts
export function generateShareLink(treeId: string) {
  const shareData = {
    treeId,
    timestamp: Date.now(),
    version: '1.0'
  };
  
  const encoded = btoa(JSON.stringify(shareData));
  return `${window.location.origin}/view/${encoded}`;
}

export async function loadSharedTree(shareCode: string) {
  try {
    const shareData = JSON.parse(atob(shareCode));
    return loadTreeData(shareData.treeId);
  } catch (error) {
    console.error('Invalid share link');
    return null;
  }
}
```

### Mobile Touch Interactions

```typescript
// TouchHandler.tsx
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

const touchBackendOptions = {
  enableMouseEvents: true,
  enableTouchEvents: true,
  enableKeyboardEvents: true,
  delayTouchStart: 100,
  scrollAngleRanges: [
    { start: 30, end: 150 },
    { start: 210, end: 330 }
  ]
};

export function TouchProvider({ children }: { children: React.ReactNode }) {
  return (
    <DndProvider backend={TouchBackend} options={touchBackendOptions}>
      {children}
    </DndProvider>
  );
}
```

## Testing Guidelines

### Canvas Component Tests

```typescript
// FamilyTreeCanvas.test.tsx
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
      position: { x: 0, y: 0 }
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

### Member Banner Tests

```typescript
// MemberBanner.test.tsx
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
    size: { width: 200, height: 120 }
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
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows selection state correctly', () => {
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={jest.fn()}
        isSelected={true}
      />
    );
    
    const banner = screen.getByTestId('member-banner');
    expect(banner).toHaveClass('border-blue-500');
  });

  it('calls onDrag when dragged', () => {
    const handleDrag = jest.fn();
    renderWithDnd(
      <MemberBanner 
        member={mockMember}
        onDrag={handleDrag}
        isSelected={false}
      />
    );
    
    const banner = screen.getByTestId('member-banner');
    fireEvent.dragStart(banner);
    fireEvent.dragOver(document.body, { clientX: 200, clientY: 200 });
    fireEvent.drop(document.body);
    
    expect(handleDrag).toHaveBeenCalledWith(
      mockMember.id,
      expect.objectContaining({ x: 200, y: 200 })
    );
  });
});
```

### Connection Line Tests
### Onboarding & Help Tests

```typescript
// Onboarding.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingProvider } from '../components/OnboardingProvider';
import OnboardingTour from '../components/OnboardingTour';
import HelpPanel from '../components/HelpPanel';

describe('Onboarding system', () => {
  test('tour opens on first load and can be skipped', () => {
    window.localStorage.removeItem('onboardingCompleted');
    render(
      <OnboardingProvider>
        <OnboardingTour />
      </OnboardingProvider>
    );
    expect(screen.getByText(/Welcome to Family Tree/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Skip/i));
    expect(window.localStorage.getItem('onboardingCompleted')).toBe('true');
  });

  test('help panel renders with shortcuts and can start tour', () => {
    render(
      <OnboardingProvider>
        <HelpPanel />
        <OnboardingTour />
      </OnboardingProvider>
    );
    fireEvent.keyDown(document, { key: '/', shiftKey: true });
    expect(screen.getByText(/Help & Shortcuts/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Start Tour/i));
    expect(screen.getByText(/Welcome to Family Tree/i)).toBeInTheDocument();
  });
});
```


```typescript
// ConnectionLine.test.tsx
import { render } from '@testing-library/react';
import ConnectionLine from './ConnectionLine';

describe('ConnectionLine', () => {
  it('renders spouse connection as straight line', () => {
    const { container } = render(
      <ConnectionLine
        from={{ x: 0, y: 0 }}
        to={{ x: 100, y: 0 }}
        type="spouse"
      />
    );
    
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('d', 'M 0 0 L 100 0');
  });

  it('renders parent-child connection as curved line', () => {
    const { container } = render(
      <ConnectionLine
        from={{ x: 0, y: 0 }}
        to={{ x: 100, y: 100 }}
        type="parent-child"
      />
    );
    
    const path = container.querySelector('path');
    expect(path).toHaveAttribute(
      'd',
      expect.stringContaining('Q') // Should be a quadratic curve
    );
  });
});
```

## Development Workflow

1. Start development server:
   ```bash
   npm run dev
   ```

2. Run tests in watch mode:
   ```bash
   npm test -- --watch
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run production build locally:
   ```bash
   npm start
   ```

5. Run type checking:
   ```bash
   npm run type-check
   ```