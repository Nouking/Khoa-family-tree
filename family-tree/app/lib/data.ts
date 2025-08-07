import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { FamilyTreeData, FamilyMember, UserData, User } from '../../types';

const DATA_DIR = path.join(process.cwd(), 'data');
const FAMILY_TREE_FILE = path.join(DATA_DIR, 'family-tree-v2.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Load family tree data
export async function loadFamilyTree(): Promise<FamilyTreeData> {
  try {
    const data = await fs.readFile(FAMILY_TREE_FILE, 'utf8');
    return JSON.parse(data) as FamilyTreeData;
  } catch (error) {
    console.error('Error loading family tree data:', error);
    throw new Error('Failed to load family tree data');
  }
}

// Save family tree data
export async function saveFamilyTree(data: FamilyTreeData): Promise<void> {
  try {
    await fs.writeFile(FAMILY_TREE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving family tree data:', error);
    throw new Error('Failed to save family tree data');
  }
}

// Load users data
export async function loadUsers(): Promise<UserData> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data) as UserData;
  } catch (error) {
    console.error('Error loading users data:', error);
    throw new Error('Failed to load users data');
  }
}

// Save users data
export async function saveUsers(data: UserData): Promise<void> {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving users data:', error);
    throw new Error('Failed to save users data');
  }
}

// Get all family members
export async function getAllMembers(): Promise<FamilyMember[]> {
  const familyTree = await loadFamilyTree();
  return familyTree.members;
}

// Get a single family member by ID
export async function getMemberById(id: string): Promise<FamilyMember | null> {
  const familyTree = await loadFamilyTree();
  return familyTree.members.find(member => member.id === id) || null;
}

// Add a new family member
export async function addMember(member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
  const familyTree = await loadFamilyTree();
  
  // Validate required fields
  if (!member.name || !member.position || !member.size) {
    throw new Error('Missing required member fields: name, position, and size are required');
  }
  
  // Generate a secure random ID
  const newMember: FamilyMember = {
    ...member,
    id: `member-${randomUUID()}`,
    spouseIds: member.spouseIds || [],
    childrenIds: member.childrenIds || [],
    relationship: member.relationship || 'Unspecified',
  };
  
  familyTree.members.push(newMember);
  familyTree.metadata.lastModified = new Date().toISOString();
  
  await saveFamilyTree(familyTree);
  return newMember;
}

// Update a family member
export async function updateMember(id: string, updates: Partial<FamilyMember>): Promise<FamilyMember | null> {
  const familyTree = await loadFamilyTree();
  
  const memberIndex = familyTree.members.findIndex(member => member.id === id);
  if (memberIndex === -1) return null;
  
  // Prevent updating the ID
  const { id: _, ...allowedUpdates } = updates;
  
  const updatedMember = {
    ...familyTree.members[memberIndex],
    ...allowedUpdates,
  };
  
  familyTree.members[memberIndex] = updatedMember;
  familyTree.metadata.lastModified = new Date().toISOString();
  
  await saveFamilyTree(familyTree);
  return updatedMember;
}

// Delete a family member
export async function deleteMember(id: string): Promise<boolean> {
  const familyTree = await loadFamilyTree();
  
  const memberIndex = familyTree.members.findIndex(member => member.id === id);
  if (memberIndex === -1) return false;
  
  // Remove member from family tree
  familyTree.members.splice(memberIndex, 1);
  
  // Clean up relationships - remove this member from other members' relationships
  familyTree.members.forEach(member => {
    // Remove from spouseIds
    member.spouseIds = member.spouseIds.filter(spouseId => spouseId !== id);
    // Remove from childrenIds
    member.childrenIds = member.childrenIds.filter(childId => childId !== id);
    // Clear parentId if it matches the deleted member
    if (member.parentId === id) {
      member.parentId = null;
    }
  });
  
  familyTree.metadata.lastModified = new Date().toISOString();
  
  await saveFamilyTree(familyTree);
  return true;
}

// Find user by username
export async function findUserByUsername(username: string): Promise<User | null> {
  const userData = await loadUsers();
  return userData.users.find(user => user.username === username) || null;
}

// Update user's last login
export async function updateUserLastLogin(id: string): Promise<void> {
  const userData = await loadUsers();
  
  const userIndex = userData.users.findIndex(user => user.id === id);
  if (userIndex === -1) return;
  
  userData.users[userIndex].lastLogin = new Date().toISOString();
  
  await saveUsers(userData);
}