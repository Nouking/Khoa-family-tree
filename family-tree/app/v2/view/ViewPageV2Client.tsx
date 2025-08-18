'use client';

import React, { useState, useRef } from 'react';

import '../v2-styles.css';

import { FamilyMember } from '@/types';

import { FamilyTreeProvider, useFamilyTreeWithDispatch } from '../../contexts/FamilyTreeContext';
import { useFamilyTreeOperations } from '../../hooks/useFamilyTreeOperations';

import SidebarV2 from '../components/SidebarV2';
import MainToolbarV2 from '../components/MainToolbarV2';
import FamilyTreeCanvasV2, { FamilyTreeCanvasV2Handle } from '../components/FamilyTreeCanvasV2';
import AddMemberModalV2 from '../../components-v2/AddMemberModalV2';
import { useToast } from '../../components/ToastProvider';
import { useOnboarding } from '../../components/OnboardingProvider';

interface ViewPageV2ClientProps {
  initialMembers: FamilyMember[];
}

const ViewPageV2ClientInner: React.FC<ViewPageV2ClientProps> = ({ initialMembers }) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const { updateMemberPosition } = useFamilyTreeOperations();
  const { showToast } = useToast();
  const { toggleHelp } = useOnboarding();
  
  // Search and filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  
  // Canvas ref for programmatic operations
  const canvasRef = useRef<FamilyTreeCanvasV2Handle>(null);
  
  // Search functionality
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    // Generate suggestions based on member names
    if (value.length > 0) {
      const suggestions = initialMembers
        .filter(member => 
          member.name.toLowerCase().includes(value.toLowerCase())
        )
        .map(member => member.name)
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };
  
  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    
    const matchingMember = initialMembers.find(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (matchingMember) {
      // Focus on the matching member
      canvasRef.current?.focusMember(matchingMember.id);
      dispatch({ type: 'SET_SELECTED_MEMBERS', payload: [] });
      dispatch({ type: 'SELECT_MEMBER', payload: matchingMember.id });
      showToast({ 
        type: 'info', 
        title: 'Member found', 
        description: `Focused on ${matchingMember.name}` 
      });
    } else {
      showToast({ 
        type: 'warning', 
        title: 'Not found', 
        description: `No member found matching "${searchQuery}"` 
      });
    }
  };
  
  const handleSearchFocus = () => {
    // Generate all member names as suggestions when focused
    const allNames = initialMembers.map(member => member.name);
    setSearchSuggestions(allNames.slice(0, 10));
  };
  
  // Action handlers
  const handleAddMember = () => {
    setShowAddModal(true);
  };
  
  const handleExport = () => {
    showToast({ 
      type: 'info', 
      title: 'Export', 
      description: 'Export functionality will be implemented in v2' 
    });
  };
  
  const handleOpenFilters = () => {
    setShowFiltersPanel(true);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <MainToolbarV2
        title="Khoa Family Tree"
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onSearchFocus={handleSearchFocus}
        searchSuggestions={searchSuggestions}
        onOpenFilters={handleOpenFilters}
      />

      {/* Main layout: left rail + content */}
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-3 flex-1 grid grid-cols-12 gap-3 py-3">
        {/* Left icon rail */}
        <aside className="v2-toolbar-rail col-span-2 lg:col-span-1 h-fit lg:sticky lg:top-3">
          <SidebarV2
            onAddMember={handleAddMember}
            onExport={handleExport}
            onHelp={toggleHelp}
          />
        </aside>

        {/* Center content */}
        <main className="col-span-10 lg:col-span-11 flex flex-col gap-3">
          {/* Context bar */}
          <div className="v2-panel px-3 py-2 flex items-center gap-2 text-xs sm:text-sm">
            <span className="v2-badge">Home</span>
            <span>›</span>
            <span className="v2-badge">Khoa Family</span>
            <div className="ms-auto flex items-center gap-2">
              <span className="hidden sm:inline">Filters</span>
              <select className="v2-input py-1">
                <option>All</option>
                <option>Parents</option>
                <option>Children</option>
              </select>
              <input 
                id="member-search" 
                type="text" 
                className="v2-input py-1 w-40 sm:w-56" 
                placeholder="Search member…" 
                aria-label="Search member name"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Canvas */}
          <section className="v2-panel p-2 sm:p-3 min-h-[64vh]">
            <FamilyTreeCanvasV2
              ref={canvasRef}
              members={initialMembers}
              moveMember={(id, x, y) => updateMemberPosition(id, { x, y })}
              highlightedIds={[]} // TODO: Connect to search results highlighting
            />
          </section>
        </main>
      </div>
      
      {/* Filters Panel - TODO: Implement in subsequent tasks */}
      {showFiltersPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="v2-panel bg-white p-6 rounded-[var(--radius-lg)] max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <p className="text-(--color-neutral-600) mb-4">Filter functionality will be implemented in v2</p>
            <button
              className="v2-btn-primary w-full"
              onClick={() => setShowFiltersPanel(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Add Member Modal */}
      <AddMemberModalV2
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onMemberAdded={(member) => {
          showToast({ 
            type: 'success', 
            title: 'Member added', 
            description: `${member.name} has been added to the family tree` 
          });
          setShowAddModal(false);
        }}
      />
    </div>
  );
};

const ViewPageV2Client: React.FC<ViewPageV2ClientProps> = ({ initialMembers }) => {
  return (
    <FamilyTreeProvider>
      <ViewPageV2ClientInner initialMembers={initialMembers} />
    </FamilyTreeProvider>
  );
};

export default ViewPageV2Client;