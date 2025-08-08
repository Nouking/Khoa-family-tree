'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch, useFamilyMembers } from '../contexts/FamilyTreeContext';

import Modal from './Modal';

interface BulkDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberIds: string[];
  onMembersDeleted?: (memberIds: string[]) => void;
}

const BulkDeleteModal: React.FC<BulkDeleteModalProps> = ({
  isOpen,
  onClose,
  memberIds,
  onMembersDeleted
}) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const allMembers = useFamilyMembers();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  // Get the members to delete
  const membersToDelete = useMemo(() => {
    return allMembers.filter((m: FamilyMember) => memberIds.includes(m.id));
  }, [memberIds, allMembers]);

  // Find affected relationships for all selected members
  const affectedRelationships = useMemo(() => {
    const childrenSet = new Set<FamilyMember>();
    const spousesSet = new Set<FamilyMember>();
    const parentsSet = new Set<FamilyMember>();

    membersToDelete.forEach(member => {
      // Find children
      allMembers.forEach((m: FamilyMember) => {
        if (m.parentId === member.id && !memberIds.includes(m.id)) {
          childrenSet.add(m);
        }
      });

      // Find spouses
      allMembers.forEach((m: FamilyMember) => {
        if ((m.spouseIds.includes(member.id) || member.spouseIds.includes(m.id)) && !memberIds.includes(m.id)) {
          spousesSet.add(m);
        }
      });

      // Find parents
      allMembers.forEach((m: FamilyMember) => {
        if ((m.childrenIds.includes(member.id) || member.parentId === m.id) && !memberIds.includes(m.id)) {
          parentsSet.add(m);
        }
      });
    });

    return {
      children: Array.from(childrenSet),
      spouses: Array.from(spousesSet),
      parents: Array.from(parentsSet)
    };
  }, [membersToDelete, allMembers, memberIds]);

  // Check if any member has critical relationships
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
    if (membersToDelete.length === 0) return false;
    
    if (hasCriticalRelationships) {
      // Require typing "DELETE" for confirmation when relationships exist
      return confirmationText.trim().toUpperCase() === 'DELETE';
    }
    
    return true;
  }, [membersToDelete.length, hasCriticalRelationships, confirmationText]);

  // Handle bulk deletion
  const handleDelete = async () => {
    if (!canDelete || membersToDelete.length === 0) {
      return;
    }

    setIsDeleting(true);
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Call API to delete each member
      const deletePromises = membersToDelete.map(member =>
        fetch(`/api/members/${member.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
      );

      const responses = await Promise.all(deletePromises);
      
      // Check if all deletions were successful
      const failedDeletions: string[] = [];
      await Promise.all(responses.map(async (response, index) => {
        if (!response.ok) {
          const errorData = await response.json();
          failedDeletions.push(`${membersToDelete[index].name}: ${errorData.error || 'Failed to delete'}`);
        }
      }));

      if (failedDeletions.length > 0) {
        throw new Error(`Some deletions failed:\n${failedDeletions.join('\n')}`);
      }

      // Update local state with bulk delete
      dispatch({ type: 'DELETE_MULTIPLE_MEMBERS', payload: memberIds });

      // Call callback if provided
      onMembersDeleted?.(memberIds);

      // Close modal and reset
      handleClose();
    } catch (error) {
      console.error('Error deleting members:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to delete members' 
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

  if (membersToDelete.length === 0) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Delete ${membersToDelete.length} Family Members`}
      size="large"
    >
      <div className="space-y-4">
        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md whitespace-pre-line">
            {state.error}
          </div>
        )}

        {/* Warning Icon and Bulk Info */}
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
              Delete {membersToDelete.length} Family Members?
            </h3>
            <p className="text-sm text-red-700 mt-1">
              This action cannot be undone. All selected members will be permanently removed from the family tree.
            </p>
          </div>
        </div>

        {/* Members to Delete */}
        <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
          <h4 className="font-medium text-gray-900 mb-3">Members to be deleted:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {membersToDelete.map(member => (
              <div key={member.id} className="flex items-center space-x-3 p-2 bg-white rounded border">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-sm font-medium">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{member.name}</p>
                  <p className="text-xs text-gray-600 truncate">{member.relationship}</p>
                </div>
              </div>
            ))}
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
                  Warning: These members have existing relationships
                </h4>
                
                <div className="space-y-2 text-sm text-yellow-700 max-h-32 overflow-y-auto">
                  {affectedRelationships.children.length > 0 && (
                    <div>
                      <p className="font-medium">Affected Children ({affectedRelationships.children.length}):</p>
                      <ul className="list-disc list-inside ml-2">
                        {affectedRelationships.children.slice(0, 5).map((child: FamilyMember) => (
                          <li key={child.id}>{child.name}</li>
                        ))}
                        {affectedRelationships.children.length > 5 && (
                          <li>...and {affectedRelationships.children.length - 5} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {affectedRelationships.spouses.length > 0 && (
                    <div>
                      <p className="font-medium">Affected Spouses ({affectedRelationships.spouses.length}):</p>
                      <ul className="list-disc list-inside ml-2">
                        {affectedRelationships.spouses.slice(0, 5).map((spouse: FamilyMember) => (
                          <li key={spouse.id}>{spouse.name}</li>
                        ))}
                        {affectedRelationships.spouses.length > 5 && (
                          <li>...and {affectedRelationships.spouses.length - 5} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {affectedRelationships.parents.length > 0 && (
                    <div>
                      <p className="font-medium">Affected Parents ({affectedRelationships.parents.length}):</p>
                      <ul className="list-disc list-inside ml-2">
                        {affectedRelationships.parents.slice(0, 5).map((parent: FamilyMember) => (
                          <li key={parent.id}>{parent.name}</li>
                        ))}
                        {affectedRelationships.parents.length > 5 && (
                          <li>...and {affectedRelationships.parents.length - 5} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                
                <p className="mt-3 text-sm text-yellow-700">
                  All relationships with these members will be automatically removed from other family members.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Input for Critical Relationships */}
        {hasCriticalRelationships && (
          <div>
            <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-2">
              To confirm bulk deletion, please type <strong>DELETE</strong> in the field below:
            </label>
            <input
              type="text"
              id="confirmation"
              value={confirmationText}
              onChange={handleConfirmationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Type DELETE to confirm"
              disabled={isDeleting}
              autoComplete="off"
            />
          </div>
        )}

        {/* Simple confirmation for members without relationships */}
        {!hasCriticalRelationships && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              These members have no existing family relationships that would be affected. Bulk deletion will proceed without impacting other family members.
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
            {isDeleting ? `Deleting ${membersToDelete.length} Members...` : `Delete ${membersToDelete.length} Members`}
          </button>
        </div>

        {/* Help Text */}
        {hasCriticalRelationships && !canDelete && confirmationText && (
          <p className="text-xs text-red-600 text-center">
            Please type &quot;DELETE&quot; exactly to confirm bulk deletion.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default BulkDeleteModal;