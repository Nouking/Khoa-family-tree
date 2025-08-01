// TypeScript interface definitions for the Family Tree app

export interface FamilyMember {
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
  // New fields for design tool
  position: { x: number; y: number };
  size: { width: number; height: number };
  relationship: string;     // Father, Mother, Brother, etc.
}

export interface TreeSettings {
  canvasSize: { width: number; height: number };
  gridEnabled: boolean;
  snapToGrid: boolean;
  theme: 'light' | 'dark';
  layout: 'hierarchical' | 'radial' | 'custom';
}

export interface FamilyTreeData {
  id: string;
  name: string;
  members: FamilyMember[];
  settings: TreeSettings;
  metadata: {
    created: string;
    lastModified: string;
    version: string;
  };
}

export interface User {
  id: string;
  username: string;
  password: string;        // bcrypt hashed
  role: 'editor';
  createdAt: string;
  lastLogin?: string;
}

export interface UserData {
  users: User[];
}
