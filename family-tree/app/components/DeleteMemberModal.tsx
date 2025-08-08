'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Modal from './Modal';
import { FamilyMember } from '@/types';
import { useFamilyTreeWithDispatch, useFamilyMembers } from '../contexts/FamilyTreeContext';

interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onMemberDeleted?: (memberId: string) => void;
}

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onMemberDeleted
}) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const allMembers = useFamilyMembers();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  // Find affected relationships
  const affectedRelationships = useMemo(() => {
    if (!member) return { children: [], spouses: [], parents: [] };

    const children = allMembers.filter((m: FamilyMember) => m.parentId === member.id);
    const spouses = allMembers.filter((m: FamilyMember) => 
      m.spouseIds.includes(member.id) || member.spouseIds.includes(m.id)
    );
    const parents = allMembers.filter((m: FamilyMember) => 
      m.childrenIds.includes(member.id) || member.parentId === m.id
    );

    return { children, spouses, parents };
  }, [member, allMembers]);

  // Check if member has critical relationships
  const hasCriticalRelationships = useMemo(() => {
    return affectedRelationships.children.length > 0 || 
           affectedRelationships.spouses.length > 0 ||
           affectedRelationships.parents.length > 0;
  }, [affectedRelationships]);

  // Handle confirmation text change
  const handleConfirmationChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(event.target.value);
  }, []);

  // Check if deletion can proceed
  const canDelete = useMemo(() => {
    if (!member) return false;
    
    if (hasCriticalRelationships) {
      // Require typing the member's name for confirmation
      return confirmationText.trim().toLowerCase() === member.name.toLowerCase();
    }
    
    return true;
  }, [member, hasCriticalRelationships, confirmationText]);

  // Handle deletion
  const handleDelete = async () => {
    if (!member || !canDelete) {
      return;
    }

    setIsDeleting(true);
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Call API to delete member
      const response = await fetch(`/api/members/${member.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete member');
      }

      // Update local state
      dispatch({ type: 'DELETE_MEMBER', payload: member.id });

      // Call callback if provided
      onMemberDeleted?.(member.id);

      // Close modal and reset
      handleClose();
    } catch (error) {
      console.error('Error deleting member:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to delete member' 
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isDeleting) {
      setConfirmationText('');
      onClose();
    }
  }, [isDeleting, onClose]);

  if (!member) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Family Member"
      size="medium"
    >
      <div className="space-y-4">
        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {state.error}
          </div>
        )}

        {/* Warning Icon and Member Info */}
        <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-red-800">
              Delete {member.name}?
            </h3>
            <p className="text-sm text-red-700 mt-1">
              This action cannot be undone. The member will be permanently removed from the family tree.
            </p>
          </div>
        </div>

        {/* Member Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-xl font-medium">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.relationship}</p>
              {member.title && (
                <p className="text-xs text-gray-500">{member.title}</p>
              )}
            </div>
          </div>
        </div>

        {/* Affected Relationships Warning */}
        {hasCriticalRelationships && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Warning: This member has existing relationships
                </h4>
                
                <div className="space-y-2 text-sm text-yellow-700">
                  {affectedRelationships.children.length > 0 && (
                    <div>
                      <p className="font-medium">Children ({affectedRelationships.children.length}):</p>
                      <ul className="list-disc list-inside ml-2">
                        {affectedRelationships.children.map((child: FamilyMember) => (
                          <li key={child.id}>{child.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {affectedRelationships.spouses.length > 0 && (
                    <div>
                      <p className="font-medium">Spouses ({affectedRelationships.spouses.length}):</p>
                      <ul className="list-disc list-inside ml-2">
                        {affectedRelationships.spouses.map((spouse: FamilyMember) => (
                          <li key={spouse.id}>{spouse.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {affectedRelationships.parents.length > 0 && (
                    <div>
                      <p className="font-medium">Parents ({affectedRelationships.parents.length}):</p>
                      <ul className="list-disc list-inside ml-2">
                        {affectedRelationships.parents.map((parent: FamilyMember) => (
                          <li key={parent.id}>{parent.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <p className="mt-3 text-sm text-yellow-700">
                  All relationships with this member will be automatically removed from other family members.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Input for Critical Relationships */}
        {hasCriticalRelationships && (
          <div>
            <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-2">
              To confirm deletion, please type the member&apos;s name: <strong>{member.name}</strong>
            </label>
            <input
              type="text"
              id="confirmation"
              value={confirmationText}
              onChange={handleConfirmationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder={`Type &quot;${member.name}&quot; to confirm`}
              disabled={isDeleting}
              autoComplete="off"
            />
          </div>
        )}

        {/* Simple confirmation for members without relationships */}
        {!hasCriticalRelationships && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              This member has no existing family relationships. Deletion will be straightforward with no impact on other family members.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${
              canDelete 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!canDelete || isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Member'}
          </button>
        </div>

        {/* Help Text */}
        {hasCriticalRelationships && !canDelete && confirmationText && (
          <p className="text-xs text-red-600 text-center">
            The name doesn&apos;t match. Please type &quot;{member.name}&quot; exactly to confirm deletion.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default DeleteMemberModal;