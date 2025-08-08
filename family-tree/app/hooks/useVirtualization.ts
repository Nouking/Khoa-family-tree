import { useMemo } from 'react';
import { FamilyMember } from '@/types';

interface ViewportBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface VirtualizationOptions {
  viewport: {
    x: number;
    y: number;
    zoom: number;
    width: number;
    height: number;
  };
  buffer?: number; // Extra padding around viewport
  minItemsToVirtualize?: number; // Only virtualize if more than this many items
}

/**
 * Custom hook for virtualizing family tree members based on viewport
 * Only renders members that are visible or near-visible for performance
 */
export function useVirtualization(
  members: FamilyMember[], 
  options: VirtualizationOptions
) {
  const { viewport, buffer = 200, minItemsToVirtualize = 50 } = options;
  
  const visibleMembers = useMemo(() => {
    // Skip virtualization for small member counts
    if (members.length < minItemsToVirtualize) {
      return members;
    }
    
    // Calculate viewport bounds with buffer
    const viewportBounds: ViewportBounds = {
      left: (-viewport.x / viewport.zoom) - buffer,
      top: (-viewport.y / viewport.zoom) - buffer,
      right: (-viewport.x + viewport.width) / viewport.zoom + buffer,
      bottom: (-viewport.y + viewport.height) / viewport.zoom + buffer,
    };
    
    // Filter members that intersect with viewport bounds
    return members.filter(member => {
      const memberBounds = {
        left: member.position.x,
        top: member.position.y,
        right: member.position.x + member.size.width,
        bottom: member.position.y + member.size.height,
      };
      
      // Check if member bounds intersect with viewport bounds
      return !(
        memberBounds.right < viewportBounds.left ||
        memberBounds.left > viewportBounds.right ||
        memberBounds.bottom < viewportBounds.top ||
        memberBounds.top > viewportBounds.bottom
      );
    });
  }, [members, viewport.x, viewport.y, viewport.zoom, viewport.width, viewport.height, buffer, minItemsToVirtualize]);
  
  const stats = useMemo(() => ({
    totalMembers: members.length,
    visibleMembers: visibleMembers.length,
    renderingRatio: visibleMembers.length / members.length,
    isVirtualized: members.length >= minItemsToVirtualize,
  }), [members.length, visibleMembers.length, minItemsToVirtualize]);
  
  return {
    visibleMembers,
    stats,
  };
}

/**
 * Hook for virtualizing connections based on visible members
 * Only calculates connections between visible members
 */
export function useConnectionVirtualization(
  allMembers: FamilyMember[],
  visibleMemberIds: string[]
) {
  return useMemo(() => {
    if (visibleMemberIds.length === allMembers.length) {
      // No virtualization needed, return all members
      return allMembers;
    }
    
    const visibleMemberSet = new Set(visibleMemberIds);
    const memberMap = new Map(allMembers.map(m => [m.id, m]));
    const relevantMembers: FamilyMember[] = [];
    
    // Include visible members
    visibleMemberIds.forEach(id => {
      const member = memberMap.get(id);
      if (member) {
        relevantMembers.push(member);
      }
    });
    
    // Include members that have connections to visible members
    // (parents, children, spouses of visible members)
    const additionalMemberIds = new Set<string>();
    
    visibleMemberIds.forEach(id => {
      const member = memberMap.get(id);
      if (member) {
        // Add parent
        if (member.parentId && !visibleMemberSet.has(member.parentId)) {
          additionalMemberIds.add(member.parentId);
        }
        
        // Add spouses
        member.spouseIds.forEach(spouseId => {
          if (!visibleMemberSet.has(spouseId)) {
            additionalMemberIds.add(spouseId);
          }
        });
      }
    });
    
    // Add children of visible members
    allMembers.forEach(member => {
      if (member.parentId && visibleMemberSet.has(member.parentId) && !visibleMemberSet.has(member.id)) {
        additionalMemberIds.add(member.id);
      }
    });
    
    // Add the additional members
    additionalMemberIds.forEach(id => {
      const member = memberMap.get(id);
      if (member) {
        relevantMembers.push(member);
      }
    });
    
    return relevantMembers;
  }, [allMembers, visibleMemberIds]);
}