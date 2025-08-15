'use client';

import React, { useState, useRef } from 'react';

import { FamilyMember } from '@/types';

import { FamilyTreeProvider, useFamilyTreeWithDispatch } from '../../contexts/FamilyTreeContext';
import { useFamilyTreeOperations } from '../../hooks/useFamilyTreeOperations';

import SidebarV2 from '../components/SidebarV2';
import MainToolbarV2 from '../components/MainToolbarV2';
import FamilyTreeCanvasV2, { FamilyTreeCanvasV2Handle } from '../components/FamilyTreeCanvasV2';
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
    <div className="min-h-dvh flex">
      {/* Sidebar */}
      <SidebarV2
        onAddMember={handleAddMember}
        onExport={handleExport}
        onHelp={toggleHelp}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <MainToolbarV2
          title="Family Tree"
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchFocus={handleSearchFocus}
          searchSuggestions={searchSuggestions}
          onOpenFilters={handleOpenFilters}
        />
        
        {/* Canvas */}
        <FamilyTreeCanvasV2
          ref={canvasRef}
          members={initialMembers}
          moveMember={(id, x, y) => updateMemberPosition(id, { x, y })}
          highlightedIds={[]} // TODO: Connect to search results highlighting
        />
      </div>
      
      {/* Filters Panel - TODO: Implement in subsequent tasks */}
      {showFiltersPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="panel bg-white p-6 rounded-[var(--radius-lg)] max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <p className="text-(--color-neutral-600) mb-4">Filter functionality will be implemented in v2</p>
            <button
              className="btn-primary w-full"
              onClick={() => setShowFiltersPanel(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Add Member Modal - TODO: Implement in E12-T2 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="panel bg-white p-6 rounded-[var(--radius-lg)] max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Add Member</h2>
            <p className="text-(--color-neutral-600) mb-4">Add Member modal will be implemented in E12-T2</p>
            <button
              className="btn-primary w-full"
              onClick={() => setShowAddModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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