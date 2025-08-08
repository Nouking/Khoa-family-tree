'use client';

import React, { createContext, memo, ReactNode, useContext, useMemo, useReducer } from 'react';

import { FamilyMember, FamilyTreeData, TreeSettings } from '@/types';

// State interfaces
export interface ViewportState {
  x: number;
  y: number;
  zoom: number;
  width: number;
  height: number;
}

export interface FamilyTreeState {
  familyTree: FamilyTreeData | null;
  members: FamilyMember[];
  selectedMemberIds: string[];
  isEditing: boolean;
  viewport: ViewportState;
  settings: TreeSettings | null;
  loading: boolean;
  error: string | null;
}

export interface HistoryState {
  past: FamilyTreeState[];
  present: FamilyTreeState;
  future: FamilyTreeState[];
}

// Action types
export type FamilyTreeAction =
  | { type: 'SET_FAMILY_TREE'; payload: FamilyTreeData }
  | { type: 'SET_MEMBERS'; payload: FamilyMember[] }
  | { type: 'ADD_MEMBER'; payload: FamilyMember }
  | { type: 'UPDATE_MEMBER'; payload: { id: string; updates: Partial<FamilyMember> } }
  | { type: 'DELETE_MEMBER'; payload: string }
  | { type: 'DELETE_MULTIPLE_MEMBERS'; payload: string[] }
  | { type: 'SET_SELECTED_MEMBERS'; payload: string[] }
  | { type: 'SELECT_MEMBER'; payload: string }
  | { type: 'DESELECT_MEMBER'; payload: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'UPDATE_VIEWPORT'; payload: Partial<ViewportState> }
  | { type: 'SET_SETTINGS'; payload: TreeSettings }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

// History action types
export type HistoryAction =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'ADD_TO_HISTORY'; payload: FamilyTreeState }
  | { type: 'CLEAR_HISTORY' };

// Initial states
const initialViewportState: ViewportState = {
  x: 0,
  y: 0,
  zoom: 1,
  width: 0,
  height: 0,
};

const initialTreeSettings: TreeSettings = {
  canvasSize: { width: 2000, height: 1500 },
  gridEnabled: true,
  snapToGrid: true,
  theme: 'light',
  layout: 'hierarchical',
};

const initialState: FamilyTreeState = {
  familyTree: null,
  members: [],
  selectedMemberIds: [],
  isEditing: false,
  viewport: initialViewportState,
  settings: initialTreeSettings,
  loading: false,
  error: null,
};


const initialHistoryState: HistoryState = {
  past: [],
  present: initialState,
  future: [],
};

// Reducer for family tree state
function familyTreeReducer(state: FamilyTreeState, action: FamilyTreeAction): FamilyTreeState {
  switch (action.type) {
    case 'SET_FAMILY_TREE':
      return {
        ...state,
        familyTree: action.payload,
        members: action.payload.members,
        settings: action.payload.settings,
        error: null,
      };

    case 'SET_MEMBERS':
      return {
        ...state,
        members: action.payload,
      };

    case 'ADD_MEMBER':
      return {
        ...state,
        members: [...state.members, action.payload],
      };

    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id
            ? { ...member, ...action.payload.updates }
            : member
        ),
      };

    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter(member => member.id !== action.payload),
        selectedMemberIds: state.selectedMemberIds.filter(id => id !== action.payload),
      };

    case 'DELETE_MULTIPLE_MEMBERS':
      return {
        ...state,
        members: state.members.filter(member => !action.payload.includes(member.id)),
        selectedMemberIds: state.selectedMemberIds.filter(id => !action.payload.includes(id)),
      };

    case 'SET_SELECTED_MEMBERS':
      return {
        ...state,
        selectedMemberIds: action.payload,
      };

    case 'SELECT_MEMBER':
      return {
        ...state,
        selectedMemberIds: state.selectedMemberIds.includes(action.payload)
          ? state.selectedMemberIds
          : [...state.selectedMemberIds, action.payload],
      };

    case 'DESELECT_MEMBER':
      return {
        ...state,
        selectedMemberIds: state.selectedMemberIds.filter(id => id !== action.payload),
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedMemberIds: [],
      };

    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload,
      };

    case 'UPDATE_VIEWPORT':
      return {
        ...state,
        viewport: { ...state.viewport, ...action.payload },
      };

    case 'SET_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

// History reducer for undo/redo functionality
function historyReducer(historyState: HistoryState, action: HistoryAction | { type: 'UPDATE_PRESENT'; payload: FamilyTreeAction }): HistoryState {
  switch (action.type) {
    case 'UPDATE_PRESENT':
      const newPresent = familyTreeReducer(historyState.present, action.payload);
      // Don't add to history for viewport updates, loading, or error states
      const shouldAddToHistory = !['UPDATE_VIEWPORT', 'SET_LOADING', 'SET_ERROR'].includes(action.payload.type);
      
      if (shouldAddToHistory) {
        return {
          past: [...historyState.past, historyState.present],
          present: newPresent,
          future: [], // Clear future when new action is performed
        };
      } else {
        return {
          ...historyState,
          present: newPresent,
        };
      }

    case 'UNDO':
      if (historyState.past.length === 0) {
        return historyState;
      }
      const previous = historyState.past[historyState.past.length - 1];
      const newPast = historyState.past.slice(0, historyState.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [historyState.present, ...historyState.future],
      };

    case 'REDO':
      if (historyState.future.length === 0) {
        return historyState;
      }
      const next = historyState.future[0];
      const newFuture = historyState.future.slice(1);
      return {
        past: [...historyState.past, historyState.present],
        present: next,
        future: newFuture,
      };

    case 'ADD_TO_HISTORY':
      return {
        past: [...historyState.past, historyState.present],
        present: action.payload,
        future: [],
      };

    case 'CLEAR_HISTORY':
      return {
        past: [],
        present: historyState.present,
        future: [],
      };

    default:
      return historyState;
  }
}

// Context creation with performance optimizations
const FamilyTreeContext = createContext<FamilyTreeState | null>(null);
const FamilyTreeDispatchContext = createContext<React.Dispatch<FamilyTreeAction> | null>(null);
const FamilyTreeHistoryContext = createContext<{
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
} | null>(null);

// Provider component
interface FamilyTreeProviderProps {
  children: ReactNode;
  initialData?: FamilyTreeData;
}

export const FamilyTreeProvider = memo<FamilyTreeProviderProps>(function FamilyTreeProvider({ children, initialData }) {
  const [historyState, historyDispatch] = useReducer(historyReducer, {
    ...initialHistoryState,
    present: initialData ? {
      ...initialState,
      familyTree: initialData,
      members: initialData.members,
      settings: initialData.settings,
    } : initialState,
  });

  // Memoized dispatch function that integrates with history
  const dispatch = React.useCallback((action: FamilyTreeAction) => {
    historyDispatch({ type: 'UPDATE_PRESENT', payload: action });
  }, []);

  // Memoized history management functions to prevent re-renders
  const historyValue = useMemo(() => ({
    canUndo: historyState.past.length > 0,
    canRedo: historyState.future.length > 0,
    undo: () => historyDispatch({ type: 'UNDO' }),
    redo: () => historyDispatch({ type: 'REDO' }),
    clearHistory: () => historyDispatch({ type: 'CLEAR_HISTORY' }),
  }), [historyState.past.length, historyState.future.length]);

  // Debounced persistence to avoid excessive localStorage writes
  const persistState = React.useCallback(
    React.useMemo(() => {
      let timeoutId: NodeJS.Timeout;
      return (state: FamilyTreeState) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (typeof window !== 'undefined' && !state.loading) {
            try {
              localStorage.setItem(
                'familyTreeState',
                JSON.stringify({
                  ...state,
                  loading: false,
                  error: null,
                  selectedMemberIds: [],
                })
              );
            } catch (error) {
              console.warn('Failed to persist state to localStorage:', error);
            }
          }
        }, 300); // 300ms debounce
      };
    }, []),
    []
  );

  React.useEffect(() => {
    persistState(historyState.present);
  }, [historyState.present, persistState]);

  // Memoize context values to prevent unnecessary re-renders
  const contextValue = useMemo(() => historyState.present, [historyState.present]);

  return (
    <FamilyTreeContext.Provider value={contextValue}>
      <FamilyTreeDispatchContext.Provider value={dispatch}>
        <FamilyTreeHistoryContext.Provider value={historyValue}>
          {children}
        </FamilyTreeHistoryContext.Provider>
      </FamilyTreeDispatchContext.Provider>
    </FamilyTreeContext.Provider>
  );
});

// Custom hooks with performance optimizations
export function useFamilyTree(): FamilyTreeState {
  const context = useContext(FamilyTreeContext);
  
  if (!context) {
    throw new Error('useFamilyTree must be used within a FamilyTreeProvider');
  }
  return context;
}

// Optimized selector hooks with shallow equality checks
export function useFamilyMembers() {
  const { members } = useFamilyTree();
  return useMemo(() => members, [members]);
}

export function useTreeSettings() {
  const { settings } = useFamilyTree();
  return useMemo(() => settings, [settings]);
}

export function useSelectedMembers() {
  const { selectedMemberIds } = useFamilyTree();
  return useMemo(() => selectedMemberIds, [selectedMemberIds]);
}

// High-performance member lookup hook
export function useMemberById(memberId: string | undefined) {
  const { members } = useFamilyTree();
  return useMemo(() => {
    if (!memberId) return undefined;
    return members.find(member => member.id === memberId);
  }, [members, memberId]);
}

// Optimized selected members data hook
export function useSelectedMembersData() {
  const { members, selectedMemberIds } = useFamilyTree();
  return useMemo(() => {
    if (selectedMemberIds.length === 0) return [];
    const memberMap = new Map(members.map(m => [m.id, m]));
    return selectedMemberIds.map(id => memberMap.get(id)).filter(Boolean) as FamilyMember[];
  }, [members, selectedMemberIds]);
}

export function useFamilyTreeDispatch(): React.Dispatch<FamilyTreeAction> {
  const context = useContext(FamilyTreeDispatchContext);
  if (!context) {
    throw new Error('useFamilyTreeDispatch must be used within a FamilyTreeProvider');
  }
  return context;
}

export function useFamilyTreeHistory() {
  const context = useContext(FamilyTreeHistoryContext);
  if (!context) {
    throw new Error('useFamilyTreeHistory must be used within a FamilyTreeProvider');
  }
  return context;
}

// Combined hook for convenience with memoization
export function useFamilyTreeWithDispatch() {
  const state = useFamilyTree();
  const dispatch = useFamilyTreeDispatch();
  const history = useFamilyTreeHistory();
  
  return useMemo(() => ({
    state,
    dispatch,
    history,
  }), [state, dispatch, history]);
}