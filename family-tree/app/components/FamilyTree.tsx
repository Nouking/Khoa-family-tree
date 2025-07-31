"use client";

import React, { useRef, useEffect, useState } from 'react';
import { FamilyMember } from '../../types';
import MemberCard from './MemberCard';
import TreeConnection from './TreeConnection';

interface FamilyTreeProps {
  members: FamilyMember[];
}

// Group members by generation for horizontal layout
export const groupMembersByGeneration = (members: FamilyMember[]) => {
  if (members.length === 0) {
    return [];
  }
  
  // Create a map to track processed members
  const processedMembers = new Set<string>();
  const generations: FamilyMember[][] = [];
  
  // Find root members (no parents)
  const rootMembers = members.filter(m => !m.parentId);
  
  if (rootMembers.length > 0) {
    generations[0] = rootMembers;
    rootMembers.forEach(member => processedMembers.add(member.id));
    
    // Process remaining generations
    let currentLevel = 1;
    let hasMoreGenerations = true;
    
    while (hasMoreGenerations) {
      const currentGeneration: FamilyMember[] = [];
      
      // Find members whose parents are in the previous generation
      members.forEach(member => {
        if (!processedMembers.has(member.id) && member.parentId && 
            generations[currentLevel - 1]?.some(parent => parent.id === member.parentId)) {
          currentGeneration.push(member);
          processedMembers.add(member.id);
        }
      });
      
      if (currentGeneration.length > 0) {
        generations[currentLevel] = currentGeneration;
        currentLevel++;
      } else {
        hasMoreGenerations = false;
      }
    }
  }
  
  return generations;
};

interface ConnectionPoint {
  id: string;
  x: number;
  y: number;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ members }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [connectionPoints, setConnectionPoints] = useState<Map<string, ConnectionPoint>>(new Map());
  const [connections, setConnections] = useState<{from: ConnectionPoint, to: ConnectionPoint, type: 'parent-child' | 'spouse'}[]>([]);
  
  // Group members by generation
  const generations = groupMembersByGeneration(members);
  
  // Calculate connection points after render
  useEffect(() => {
    if (!containerRef.current) return;
    
    const newConnectionPoints = new Map<string, ConnectionPoint>();
    const memberElements = containerRef.current.querySelectorAll('[data-member-id]');
    
    memberElements.forEach((element) => {
      const id = element.getAttribute('data-member-id');
      if (!id) return;
      
      const rect = element.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();
      
      // Calculate center point of the element relative to the container
      const x = rect.left + rect.width / 2 - containerRect.left;
      const y = rect.top + rect.height / 2 - containerRect.top;
      
      newConnectionPoints.set(id, { id, x, y });
    });
    
    setConnectionPoints(newConnectionPoints);
    
    // Create connections based on relationships
    const newConnections: {from: ConnectionPoint, to: ConnectionPoint, type: 'parent-child' | 'spouse'}[] = [];
    
    // Add parent-child connections
    members.forEach(member => {
      const parentPoint = newConnectionPoints.get(member.parentId || '');
      const childPoint = newConnectionPoints.get(member.id);
      
      if (parentPoint && childPoint) {
        newConnections.push({
          from: parentPoint,
          to: childPoint,
          type: 'parent-child'
        });
      }
    });
    
    // Add spouse connections
    members.forEach(member => {
      const memberPoint = newConnectionPoints.get(member.id);
      
      member.spouseIds.forEach(spouseId => {
        const spousePoint = newConnectionPoints.get(spouseId);
        
        // Only add connection once per spouse pair
        if (memberPoint && spousePoint && member.id < spouseId) {
          newConnections.push({
            from: memberPoint,
            to: spousePoint,
            type: 'spouse'
          });
        }
      });
    });
    
    setConnections(newConnections);
  }, [members]);
  
  return (
    <div className="family-tree-container overflow-x-auto" data-testid="family-tree">
      <div 
        ref={containerRef} 
        className="relative p-8"
        style={{ minWidth: 'max-content' }} // Ensure container expands to fit content
      >
        {/* Render generations */}
        <div className="flex flex-col space-y-16">
          {generations.map((generation, genIndex) => (
            <div key={`gen-${genIndex}`} className="flex space-x-8">
              {generation.map(member => (
                <div 
                  key={member.id} 
                  data-member-id={member.id}
                  className="member-container"
                >
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Render connections */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          {connections.map((connection, index) => (
            <TreeConnection
              key={`connection-${index}`}
              from={{ x: connection.from.x, y: connection.from.y }}
              to={{ x: connection.to.x, y: connection.to.y }}
              type={connection.type}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default FamilyTree; 