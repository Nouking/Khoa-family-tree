import { 
  calculateConnections, 
  calculateConnectionsForMember, 
  getConnectionPoint,
  Connection 
} from '../connectionCalculator';
import { FamilyMember } from '../../types';

describe('connectionCalculator', () => {
  const mockMembers: FamilyMember[] = [
    {
      id: 'parent1',
      name: 'Parent 1',
      gender: 'male',
      parentId: null,
      spouseIds: ['parent2'],
      childrenIds: ['child1', 'child2'],
      order: 1,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 120 },
      relationship: 'Father',
    },
    {
      id: 'parent2',
      name: 'Parent 2',
      gender: 'female',
      parentId: null,
      spouseIds: ['parent1'],
      childrenIds: ['child1', 'child2'],
      order: 2,
      position: { x: 350, y: 100 },
      size: { width: 200, height: 120 },
      relationship: 'Mother',
    },
    {
      id: 'child1',
      name: 'Child 1',
      gender: 'female',
      parentId: 'parent1',
      spouseIds: [],
      childrenIds: [],
      order: 3,
      position: { x: 100, y: 300 },
      size: { width: 200, height: 120 },
      relationship: 'Daughter',
    },
    {
      id: 'child2',
      name: 'Child 2',
      gender: 'male',
      parentId: 'parent1',
      spouseIds: [],
      childrenIds: [],
      order: 4,
      position: { x: 350, y: 300 },
      size: { width: 200, height: 120 },
      relationship: 'Son',
    },
  ];

  describe('getConnectionPoint', () => {
    const member = mockMembers[0];

    it('should calculate center connection point', () => {
      const point = getConnectionPoint(member, 'center');
      expect(point).toEqual({ x: 200, y: 160 });
    });

    it('should calculate top connection point', () => {
      const point = getConnectionPoint(member, 'top');
      expect(point).toEqual({ x: 200, y: 100 });
    });

    it('should calculate bottom connection point', () => {
      const point = getConnectionPoint(member, 'bottom');
      expect(point).toEqual({ x: 200, y: 220 });
    });

    it('should calculate left connection point', () => {
      const point = getConnectionPoint(member, 'left');
      expect(point).toEqual({ x: 100, y: 160 });
    });

    it('should calculate right connection point', () => {
      const point = getConnectionPoint(member, 'right');
      expect(point).toEqual({ x: 300, y: 160 });
    });
  });

  describe('calculateConnections', () => {
    it('should calculate parent-child connections', () => {
      const connections = calculateConnections(mockMembers);
      
      const parentChildConnections = connections.filter(c => c.type === 'parent-child');
      expect(parentChildConnections).toHaveLength(2);
      
      // Check parent1 -> child1 connection
      const parent1ToChild1 = parentChildConnections.find(
        c => c.fromId === 'parent1' && c.toId === 'child1'
      );
      expect(parent1ToChild1).toBeDefined();
      expect(parent1ToChild1?.from).toEqual({ x: 200, y: 220 });
      expect(parent1ToChild1?.to).toEqual({ x: 200, y: 300 });
      
      // Check parent1 -> child2 connection
      const parent1ToChild2 = parentChildConnections.find(
        c => c.fromId === 'parent1' && c.toId === 'child2'
      );
      expect(parent1ToChild2).toBeDefined();
      expect(parent1ToChild2?.from).toEqual({ x: 200, y: 220 });
      expect(parent1ToChild2?.to).toEqual({ x: 450, y: 300 });
    });

    it('should calculate spouse connections without duplicates', () => {
      const connections = calculateConnections(mockMembers);
      
      const spouseConnections = connections.filter(c => c.type === 'spouse');
      expect(spouseConnections).toHaveLength(1);
      
      const spouseConnection = spouseConnections[0];
      expect(spouseConnection.fromId).toBe('parent1');
      expect(spouseConnection.toId).toBe('parent2');
      expect(spouseConnection.from).toEqual({ x: 300, y: 160 });
      expect(spouseConnection.to).toEqual({ x: 350, y: 160 });
    });

    it('should generate unique IDs for each connection', () => {
      const connections = calculateConnections(mockMembers);
      const ids = connections.map(c => c.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('calculateConnectionsForMember', () => {
    it('should return connections involving a specific member', () => {
      const connections = calculateConnectionsForMember('parent1', mockMembers);
      
      // Should include spouse connection and parent-child connections
      expect(connections).toHaveLength(3);
      
      // All connections should involve parent1
      connections.forEach(connection => {
        expect(
          connection.fromId === 'parent1' || connection.toId === 'parent1'
        ).toBe(true);
      });
    });

    it('should return empty array for non-existent member', () => {
      const connections = calculateConnectionsForMember('non-existent', mockMembers);
      expect(connections).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty members array', () => {
      const connections = calculateConnections([]);
      expect(connections).toHaveLength(0);
    });

    it('should handle members with no relationships', () => {
      const isolatedMember: FamilyMember = {
        id: 'isolated',
        name: 'Isolated Member',
        gender: 'other',
        parentId: null,
        spouseIds: [],
        childrenIds: [],
        order: 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 120 },
        relationship: 'Unknown',
      };
      
      const connections = calculateConnections([isolatedMember]);
      expect(connections).toHaveLength(0);
    });

    it('should handle missing referenced members gracefully', () => {
      const memberWithMissingParent: FamilyMember = {
        id: 'orphan',
        name: 'Orphan',
        gender: 'other',
        parentId: 'non-existent-parent',
        spouseIds: ['non-existent-spouse'],
        childrenIds: [],
        order: 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 120 },
        relationship: 'Child',
      };
      
      const connections = calculateConnections([memberWithMissingParent]);
      expect(connections).toHaveLength(0);
    });
  });
});