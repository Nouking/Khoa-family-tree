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

/**
 * Calculate all connections for the family tree
 * @param members Array of family members
 * @returns Array of connection objects
 */
export function calculateConnections(members: FamilyMember[]): Connection[] {
  const connections: Connection[] = [];
  const memberMap = new Map<string, FamilyMember>();
  
  // Create a map for quick member lookup
  members.forEach(member => {
    memberMap.set(member.id, member);
  });
  
  members.forEach(member => {
    // Parent-child connections
    if (member.parentId) {
      const parent = memberMap.get(member.parentId);
      if (parent) {
        const connection: Connection = {
          id: `parent-child-${parent.id}-${member.id}`,
          fromId: parent.id,
          toId: member.id,
          from: getConnectionPoint(parent, 'bottom'),
          to: getConnectionPoint(member, 'top'),
          type: 'parent-child'
        };
        connections.push(connection);
      }
    }
    
    // Spouse connections (only create once per couple to avoid duplicates)
    member.spouseIds.forEach(spouseId => {
      // Only create connection if current member ID is smaller than spouse ID
      // This prevents duplicate connections
      if (member.id < spouseId) {
        const spouse = memberMap.get(spouseId);
        if (spouse) {
          const connection: Connection = {
            id: `spouse-${member.id}-${spouseId}`,
            fromId: member.id,
            toId: spouseId,
            from: getConnectionPoint(member, 'right'),
            to: getConnectionPoint(spouse, 'left'),
            type: 'spouse'
          };
          connections.push(connection);
        }
      }
    });
  });
  
  return connections;
}

/**
 * Calculate connections for a specific member (when that member moves)
 * @param memberId The ID of the member that moved
 * @param members Array of all family members
 * @returns Array of connection objects that involve the moved member
 */
export function calculateConnectionsForMember(
  memberId: string,
  members: FamilyMember[]
): Connection[] {
  const allConnections = calculateConnections(members);
  
  // Return only connections that involve the moved member
  return allConnections.filter(
    connection => connection.fromId === memberId || connection.toId === memberId
  );
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