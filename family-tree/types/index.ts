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
  parentId?: string;
  spouseIds: string[];
  childrenIds: string[];
  order: number;
}

export interface FamilyTree {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: FamilyMember[];
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