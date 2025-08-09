import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch, useSelectedMembers } from '../contexts/FamilyTreeContext';

import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
import BulkDeleteModal from './BulkDeleteModal';
import { useToast } from './ToastProvider';

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
  const { showToast } = useToast();
  
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
      showToast({ type: 'info', title: 'Undid last action' });
    }
  };

  const handleRedo = () => {
    if (history.canRedo) {
      history.redo();
      showToast({ type: 'info', title: 'Redid action' });
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

  // mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="toolbar bg-(--surface-1) shadow-[var(--elevation-1)] border-b border-(--color-neutral-100) sticky top-0 z-10">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 grid grid-cols-3 items-center gap-2">
          <div className="toolbar-left flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-[var(--radius-md)] text-(--color-neutral-700) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] focus-visible:outline-2 focus-visible:outline-(--color-primary)"
              aria-label="Open Menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" clipRule="evenodd" />
              </svg>
            </button>
            <Link href="/" className="btn-home px-3 py-2 rounded-[var(--radius-md)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] flex items-center focus-visible:outline-2 focus-visible:outline-(--color-primary)">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="hidden sm:inline text-(--text-sm)">Home</span>
            </Link>
            <div className="undo-redo hidden md:flex gap-1">
              <button 
                className={`btn-undo p-2 rounded-[var(--radius-md)] hover:bg-[color-mix(in_oklch,_var(--color-neutral-200),_white_60%)] ${
                  history.canUndo ? 'text-(--color-neutral-700)' : 'text-(--color-neutral-300) cursor-not-allowed'
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
                className={`btn-redo p-2 rounded-[var(--radius-md)] hover:bg-[color-mix(in_oklch,_var(--color-neutral-200),_white_60%)] ${
                  history.canRedo ? 'text-(--color-neutral-700)' : 'text-(--color-neutral-300) cursor-not-allowed'
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
          
          <div className="toolbar-center text-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-(--color-neutral-900) truncate">{title}</h1>
          </div>
          
          <div className="toolbar-right hidden md:flex items-center gap-2 justify-end">
            {/* Bulk delete button - only show when multiple members selected */}
            {selectedMemberIds.length > 1 && (
              <button 
                className="btn-bulk-delete h-10 px-3 rounded-[var(--radius-md)] bg-(--color-error) text-white hover:bg-[color-mix(in_oklch,_var(--color-error),_black_10%)] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                onClick={handleBulkDelete}
                aria-label={`Delete ${selectedMemberIds.length} Members`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden lg:inline">Delete {selectedMemberIds.length}</span>
                <span className="md:hidden">{selectedMemberIds.length}</span>
              </button>
            )}
            
            <button 
              className="btn-share h-10 px-3 rounded-[var(--radius-md)] bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)] hidden sm:flex items-center focus-visible:outline-2 focus-visible:outline-(--color-primary)"
              onClick={onShare}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="hidden md:inline">Share</span>
            </button>
            <button 
              className="btn-export h-10 px-3 rounded-[var(--radius-md)] bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)] hidden sm:flex items-center focus-visible:outline-2 focus-visible:outline-(--color-primary)"
              onClick={onExport}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">Export</span>
            </button>
            <button 
              className="btn-add-member h-10 px-3 rounded-[var(--radius-md)] bg-(--color-primary) text-(--color-primary-contrast) hover:bg-[color-mix(in_oklch,_var(--color-primary),_black_10%)] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-(--color-primary)"
              onClick={handleAddMember}
              aria-label="Add Member"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">Add</span>
            </button>
            <div className="user-section ml-2 hidden sm:block">
              <div className="user-avatar bg-(--color-neutral-100) h-8 w-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-neutral-500)" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile actions panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-(--color-neutral-100) bg-(--surface-1) shadow-[var(--elevation-1)]">
            <div className="container mx-auto px-2 py-2 grid grid-cols-2 gap-2">
              {selectedMemberIds.length > 1 && (
                <button
                  className="h-10 px-3 rounded-[var(--radius-md)] bg-(--color-error) text-white hover:bg-[color-mix(in_oklch,_var(--color-error),_black_10%)] flex items-center justify-center"
                  onClick={() => { handleBulkDelete(); closeMobileMenu(); }}
                >
                  Delete {selectedMemberIds.length}
                </button>
              )}
              <button
                className="h-10 px-3 rounded-[var(--radius-md)] bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)]"
                onClick={() => { onShare(); closeMobileMenu(); }}
              >
                Share
              </button>
              <button
                className="h-10 px-3 rounded-[var(--radius-md)] bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)]"
                onClick={() => { onExport(); closeMobileMenu(); }}
              >
                Export
              </button>
              <button
                className="col-span-2 h-10 px-3 rounded-[var(--radius-md)] bg-(--color-primary) text-(--color-primary-contrast) hover:bg-[color-mix(in_oklch,_var(--color-primary),_black_10%)]"
                onClick={() => { handleAddMember(); closeMobileMenu(); }}
              >
                Add Member
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <AddMemberModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onMemberAdded={() => {
          setShowAddModal(false);
          showToast({ type: 'success', title: 'Member added', description: 'New family member has been added.' });
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
          showToast({ type: 'success', title: 'Member updated' });
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
          showToast({ type: 'success', title: 'Member deleted' });
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
          // Selections auto-cleared in reducer
          showToast({ type: 'success', title: `Deleted ${selectedMemberIds.length} members` });
        }}
      />
    </>
  );
};

export default MainToolbar;