import { FamilyMember } from '../types';

export interface ConnectionPoint {
  x: number;
  y: number;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  from: ConnectionPoint;
  to: ConnectionPoint;
  type: 'parent-child' | 'spouse';
}

/**
 * Calculate the connection point for a member banner
 * @param member The family member
 * @param side Which side of the banner ('top', 'bottom', 'left', 'right', 'center')
 * @returns The x,y coordinates for the connection point
 */
export function getConnectionPoint(
  member: FamilyMember,
  side: 'top' | 'bottom' | 'left' | 'right' | 'center' = 'center'
): ConnectionPoint {
  const { position, size } = member;
  
  switch (side) {
    case 'top':
      return {
        x: position.x + size.width / 2,
        y: position.y
      };
    case 'bottom':
      return {
        x: position.x + size.width / 2,
        y: position.y + size.height
      };
    case 'left':
      return {
        x: position.x,
        y: position.y + size.height / 2
      };
    case 'right':
      return {
        x: position.x + size.width,
        y: position.y + size.height / 2
      };
    case 'center':
    default:
      return {
        x: position.x + size.width / 2,
        y: position.y + size.height / 2
      };
  }
}

// Cache for connection calculations to avoid redundant work
const connectionCache = new Map<string, Connection[]>();
const memberHashCache = new Map<string, string>();

/**
 * Generate a hash for member positions to detect changes
 * @param members Array of family members
 * @returns String hash of member positions
 */
function generateMemberHash(members: FamilyMember[]): string {
  return members
    .map(m => `${m.id}:${m.position.x},${m.position.y}:${m.parentId || ''}:${m.spouseIds.join(',')}`)
    .sort()
    .join('|');
}

/**
 * Calculate all connections for the family tree with performance optimizations
 * @param members Array of family members
 * @returns Array of connection objects
 */
export function calculateConnections(members: FamilyMember[]): Connection[] {
  // Early return for empty members
  if (members.length === 0) return [];
  
  // Generate hash to check if calculation is needed
  const memberHash = generateMemberHash(members);
  const cacheKey = `connections-${memberHash}`;
  
  // Return cached result if available and valid
  if (connectionCache.has(cacheKey) && memberHashCache.get('current') === memberHash) {
    return connectionCache.get(cacheKey)!;
  }
  
  const connections: Connection[] = [];
  const memberMap = new Map<string, FamilyMember>();
  
  // Create a map for O(1) member lookup
  members.forEach(member => {
    memberMap.set(member.id, member);
  });
  
  // Batch process connections to reduce function call overhead
  for (const member of members) {
    // Parent-child connections
    if (member.parentId) {
      const parent = memberMap.get(member.parentId);
      if (parent) {
        connections.push({
          id: `parent-child-${parent.id}-${member.id}`,
          fromId: parent.id,
          toId: member.id,
          from: getConnectionPoint(parent, 'bottom'),
          to: getConnectionPoint(member, 'top'),
          type: 'parent-child'
        });
      }
    }
    
    // Spouse connections (only create once per couple to avoid duplicates)
    for (const spouseId of member.spouseIds) {
      // Only create connection if current member ID is smaller than spouse ID
      if (member.id < spouseId) {
        const spouse = memberMap.get(spouseId);
        if (spouse) {
          connections.push({
            id: `spouse-${member.id}-${spouseId}`,
            fromId: member.id,
            toId: spouseId,
            from: getConnectionPoint(member, 'right'),
            to: getConnectionPoint(spouse, 'left'),
            type: 'spouse'
          });
        }
      }
    }
  }
  
  // Cache the result
  connectionCache.set(cacheKey, connections);
  memberHashCache.set('current', memberHash);
  
  // Limit cache size to prevent memory leaks
  if (connectionCache.size > 10) {
    const firstKey = connectionCache.keys().next().value;
    if (firstKey) {
      connectionCache.delete(firstKey);
    }
  }
  
  return connections;
}

/**
 * Calculate connections for a specific member (when that member moves)
 * Optimized to avoid full tree recalculation when possible
 * @param memberId The ID of the member that moved
 * @param members Array of all family members
 * @returns Array of connection objects that involve the moved member
 */
export function calculateConnectionsForMember(
  memberId: string,
  members: FamilyMember[]
): Connection[] {
  const connections: Connection[] = [];
  const memberMap = new Map<string, FamilyMember>();
  
  // Create map for quick lookup
  members.forEach(member => {
    memberMap.set(member.id, member);
  });
  
  const movedMember = memberMap.get(memberId);
  if (!movedMember) return [];
  
  // Only calculate connections involving the moved member
  // Parent-child connections where moved member is child
  if (movedMember.parentId) {
    const parent = memberMap.get(movedMember.parentId);
    if (parent) {
      connections.push({
        id: `parent-child-${parent.id}-${movedMember.id}`,
        fromId: parent.id,
        toId: movedMember.id,
        from: getConnectionPoint(parent, 'bottom'),
        to: getConnectionPoint(movedMember, 'top'),
        type: 'parent-child'
      });
    }
  }
  
  // Parent-child connections where moved member is parent
  members.forEach(member => {
    if (member.parentId === memberId) {
      connections.push({
        id: `parent-child-${movedMember.id}-${member.id}`,
        fromId: movedMember.id,
        toId: member.id,
        from: getConnectionPoint(movedMember, 'bottom'),
        to: getConnectionPoint(member, 'top'),
        type: 'parent-child'
      });
    }
  });
  
  // Spouse connections
  movedMember.spouseIds.forEach(spouseId => {
    const spouse = memberMap.get(spouseId);
    if (spouse) {
      const [fromId, toId] = movedMember.id < spouseId 
        ? [movedMember.id, spouseId]
        : [spouseId, movedMember.id];
        
      const fromMember = memberMap.get(fromId)!;
      const toMember = memberMap.get(toId)!;
      
      connections.push({
        id: `spouse-${fromId}-${toId}`,
        fromId,
        toId,
        from: getConnectionPoint(fromMember, 'right'),
        to: getConnectionPoint(toMember, 'left'),
        type: 'spouse'
      });
    }
  });
  
  return connections;
}

/**
 * Optimize connection path based on member positions
 * For future enhancement - currently uses straight lines
 * @param connection The connection to optimize
 * @returns Optimized connection points (for now, returns the same points)
 */
export function optimizeConnectionPath(connection: Connection): Connection {
  // For now, return straight lines
  // Future enhancement: could add logic for curved lines or avoiding overlaps
  return connection;
}