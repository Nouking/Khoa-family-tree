"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { FamilyMember } from '@/types';

import FamilyTreeCanvas, { FamilyTreeCanvasHandle } from './FamilyTreeCanvas';
import Fuse from 'fuse.js';
import type { SearchFilters } from './FiltersPanel';

interface FamilyTreeProps {
  initialMembers: FamilyMember[];
  searchQuery?: string;
  activeFilters?: SearchFilters;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ initialMembers, searchQuery = '', activeFilters }) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const canvasRef = useRef<FamilyTreeCanvasHandle>(null);

  // Process members to ensure they have size properties
  useEffect(() => {
    const processedMembers = initialMembers.map(member => ({
      ...member,
      // Set default size if not already set
      size: member.size || { width: 250, height: 120 },
      // Ensure relationship field exists
      relationship: member.relationship || 'Member'
    }));
    
    setMembers(processedMembers);
  }, [initialMembers]);

  // Build Fuse index for fuzzy search
  const fuse = useMemo(() => new Fuse(members, {
    keys: ['name', 'relationship', 'title', 'email', 'phone', 'address', 'biography'],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  }), [members]);

  // Apply filters helper
  const memberMatchesFilters = React.useCallback((member: FamilyMember, filters?: SearchFilters) => {
    if (!filters) return true;
    // Gender facet
    if (filters.genders && filters.genders.length > 0 && !filters.genders.includes(member.gender)) {
      return false;
    }
    // Birth year range
    if ((filters.birthYearMin !== undefined) || (filters.birthYearMax !== undefined)) {
      const year = member.birthDate ? parseInt(member.birthDate.slice(0, 4), 10) : undefined;
      if (filters.birthYearMin !== undefined && (year === undefined || year < filters.birthYearMin)) return false;
      if (filters.birthYearMax !== undefined && (year === undefined || year > filters.birthYearMax)) return false;
    }
    // Location includes
    if (filters.locationIncludes && filters.locationIncludes.trim()) {
      const q = filters.locationIncludes.toLowerCase();
      const addr = (member.address || '').toLowerCase();
      if (!addr.includes(q)) return false;
    }
    // Relationship includes
    if (filters.relationshipIncludes && filters.relationshipIncludes.trim()) {
      const q = filters.relationshipIncludes.toLowerCase();
      const rel = (member.relationship || '').toLowerCase();
      if (!rel.includes(q)) return false;
    }
    return true;
  }, []);

  // Compute filtered/highlighted IDs based on search and filters with debounce
  useEffect(() => {
    const handle = window.setTimeout(() => {
      const byFilters = members.filter(m => memberMatchesFilters(m, activeFilters)).map(m => m.id);
      const bySearch = searchQuery ? fuse.search(searchQuery).slice(0, 100).map(r => r.item.id) : [];

      let ids: string[] = [];
      if (searchQuery && activeFilters) {
        // Intersection when both present
        const set = new Set(byFilters);
        ids = bySearch.filter(id => set.has(id));
      } else if (searchQuery) {
        ids = bySearch;
      } else if (activeFilters) {
        ids = byFilters;
      } else {
        ids = [];
      }
      setFilteredIds(ids);
      if (ids.length > 0) {
        canvasRef.current?.focusMember(ids[0]);
      }
    }, 200);

    return () => window.clearTimeout(handle);
  }, [members, fuse, searchQuery, activeFilters, memberMatchesFilters]);

  const moveMember = async (id: string, x: number, y: number) => {
    // Optimistically update the local state
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, position: { x, y } } : member
      )
    );

    // Persist the change to the backend
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ position: { x, y } }),
      });

      if (!response.ok) {
        // Handle unauthorized quietly to avoid noisy console errors in view-only mode
        const status = response.status;
        let message = 'Failed to update member position';
        try {
          const data = await response.json();
          message = (data && (data.message || data.error)) || message;
        } catch {}
        if (status === 401) {
          console.warn(`[moveMember] Unauthorized (401): ${message}`);
          return;
        }
        console.warn(`[moveMember] Non-OK response (${status}): ${message}`);
      }
    } catch (error) {
      console.warn('Error updating member position (network or unexpected):', error);
      // Optionally, revert the state change if the API call fails
      // For now, we'll just log the warning to avoid breaking UX
    }
  };

  const hasMembers = members.length > 0;
  return (
    <div className="w-full h-full relative">
      {!hasMembers && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-(--surface-1) border border-(--color-neutral-200) rounded-[var(--radius-lg)] shadow-[var(--elevation-2)] p-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Welcome! Your family tree is empty.</h3>
            <p className="text-(--text-sm) mb-4">Get started by adding your first member using the Add button in the toolbar. You can also import data later.</p>
            <p className="text-(--text-sm)">Tip: Use the Help (Shift+?) to view shortcuts and a quick tour.</p>
          </div>
        </div>
      )}
      {/* Floating control for results */}
      {filteredIds.length > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <button
            className="h-9 px-3 rounded-[var(--radius-md)] bg-(--color-primary) text-(--color-primary-contrast) shadow-[var(--elevation-1)]"
            onClick={() => canvasRef.current?.zoomToFitMembers(filteredIds)}
            aria-label="Zoom to results"
          >
            Zoom to results ({filteredIds.length})
          </button>
        </div>
      )}
      <FamilyTreeCanvas ref={canvasRef} highlightedIds={filteredIds} members={members} moveMember={moveMember} />
    </div>
  );
};

export default FamilyTree;
