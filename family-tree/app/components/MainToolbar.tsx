import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
import BulkDeleteModal from './BulkDeleteModal';
import { useFamilyTreeWithDispatch, useSelectedMembers } from '../contexts/FamilyTreeContext';
import { FamilyMember } from '@/types';

interface MainToolbarProps {
  title?: string;
  onShare?: () => void;
  onExport?: () => void;
  selectedMember?: FamilyMember | null;
}

const MainToolbar: React.FC<MainToolbarProps> = ({
  title = 'Family Tree',
  onShare = () => {},
  onExport = () => {},
  selectedMember = null,
}) => {
  const { state, history } = useFamilyTreeWithDispatch();
  const selectedMemberIds = useSelectedMembers();
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<FamilyMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<FamilyMember | null>(null);

  // Handle modal actions
  const handleAddMember = () => {
    setShowAddModal(true);
  };

  const handleEditMember = (member?: FamilyMember) => {
    setMemberToEdit(member || selectedMember);
    setShowEditModal(true);
  };

  const handleDeleteMember = (member?: FamilyMember) => {
    setMemberToDelete(member || selectedMember);
    setShowDeleteModal(true);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const handleUndo = () => {
    if (history.canUndo) {
      history.undo();
    }
  };

  const handleRedo = () => {
    if (history.canRedo) {
      history.redo();
    }
  };

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl (Windows/Linux) or Cmd (Mac) is pressed
      const ctrlOrCmd = event.ctrlKey || event.metaKey;
      
      if (ctrlOrCmd && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      } else if (ctrlOrCmd && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
        event.preventDefault();
        handleRedo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [history.canUndo, history.canRedo]);

  return (
    <>
      <header className="toolbar bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-2 sm:px-4 py-3 flex items-center">
          <div className="toolbar-left flex items-center space-x-2">
            <Link href="/" className="btn-home px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>
            <div className="undo-redo hidden sm:flex space-x-1">
              <button 
                className={`btn-undo p-2 rounded-md hover:bg-gray-100 ${
                  history.canUndo ? 'text-gray-700' : 'text-gray-300 cursor-not-allowed'
                }`}
                onClick={handleUndo}
                disabled={!history.canUndo}
                aria-label="Undo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className={`btn-redo p-2 rounded-md hover:bg-gray-100 ${
                  history.canRedo ? 'text-gray-700' : 'text-gray-300 cursor-not-allowed'
                }`}
                onClick={handleRedo}
                disabled={!history.canRedo}
                aria-label="Redo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="toolbar-center flex-1 text-center">
            <h1 className="text-xl font-semibold text-gray-800 truncate">{title}</h1>
          </div>
          
          <div className="toolbar-right flex items-center space-x-2">
            {/* Bulk delete button - only show when multiple members selected */}
            {selectedMemberIds.length > 1 && (
              <button 
                className="btn-bulk-delete p-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                onClick={handleBulkDelete}
                aria-label={`Delete ${selectedMemberIds.length} Members`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden md:inline">Delete {selectedMemberIds.length}</span>
                <span className="md:hidden">{selectedMemberIds.length}</span>
              </button>
            )}
            
            <button 
              className="btn-share p-2 rounded-md text-blue-600 hover:bg-blue-50 hidden sm:flex items-center"
              onClick={onShare}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="hidden md:inline">Share</span>
            </button>
            <button 
              className="btn-export p-2 rounded-md text-blue-600 hover:bg-blue-50 hidden sm:flex items-center"
              onClick={onExport}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">Export</span>
            </button>
            <button 
              className="btn-add-member p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
              onClick={handleAddMember}
              aria-label="Add Member"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">Add</span>
            </button>
            <div className="user-section ml-2 hidden sm:block">
              <div className="user-avatar bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AddMemberModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onMemberAdded={() => {
          setShowAddModal(false);
          // Optional: Show success notification
        }}
      />

      <EditMemberModal 
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setMemberToEdit(null);
        }}
        member={memberToEdit}
        onMemberUpdated={() => {
          setShowEditModal(false);
          setMemberToEdit(null);
          // Optional: Show success notification
        }}
      />

      <DeleteMemberModal 
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setMemberToDelete(null);
        }}
        member={memberToDelete}
        onMemberDeleted={() => {
          setShowDeleteModal(false);
          setMemberToDelete(null);
          // Optional: Show success notification
        }}
      />

      <BulkDeleteModal 
        isOpen={showBulkDeleteModal}
        onClose={() => {
          setShowBulkDeleteModal(false);
        }}
        memberIds={selectedMemberIds}
        onMembersDeleted={() => {
          setShowBulkDeleteModal(false);
          // Selections are automatically cleared when members are deleted via context reducer
          // Optional: Show success notification
        }}
      />
    </>
  );
};

export default MainToolbar;