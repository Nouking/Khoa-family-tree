'use client';

import React, { useMemo, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch, useFamilyMembers } from '../contexts/FamilyTreeContext';
import { useToast } from '../components/ToastProvider';
import Modal from '../components/Modal';
import MemberForm from './shared/MemberForm';
import { MemberFormData } from '../lib/validation/memberValidation';
import { apiClient, ApiError } from '../lib/apiClient';

interface AddMemberModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: (member: FamilyMember) => void;
}

/**
 * v2 Add Member Modal with modern design patterns and APG modal dialog semantics.
 * Features bottom-sheet variant on mobile and token-driven styling.
 */
const AddMemberModalV2: React.FC<AddMemberModalV2Props> = ({ 
  isOpen, 
  onClose, 
  onMemberAdded 
}) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const existingMembers = useFamilyMembers();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = useMemo<MemberFormData>(() => ({
    name: '',
    gender: 'male',
    birthDate: '',
    deathDate: '',
    photo: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    biography: '',
    parentId: null,
    spouseIds: [],
    relationship: '',
    position: { x: 300, y: 200 },
    size: { width: 200, height: 120 }
  }), []);

  const handleSubmit = async (data: MemberFormData) => {
    setIsSubmitting(true);
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      const maxOrder = existingMembers.reduce((max: number, member: FamilyMember) => 
        Math.max(max, member.order || 0), 0);
      
      const memberData: Omit<FamilyMember, 'id'> = {
        ...data,
        order: maxOrder + 1,
        childrenIds: [],
      };
      
      // Use the new API client with retry logic and better error handling
      const response = await apiClient.post<FamilyMember>('/api/members', memberData, {
        timeout: 15000, // 15 seconds for member creation
        retries: 2, // Retry once on failure
      });
      
      const newMember = response.data;
      dispatch({ type: 'ADD_MEMBER', payload: newMember });
      onMemberAdded?.(newMember);
      showToast({ 
        type: 'success', 
        title: 'Member added', 
        description: newMember.name 
      });
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
      
      let errorMessage = 'Failed to add member';
      let errorTitle = 'Failed to add member';
      
      if (error instanceof ApiError) {
        errorMessage = error.message;
        if (error.status === 401) {
          errorTitle = 'Authentication required';
          errorMessage = 'Please log in to add members';
        } else if (error.status === 400) {
          errorTitle = 'Invalid member data';
        } else if (error.status === 408) {
          errorTitle = 'Request timeout';
          errorMessage = 'The request took too long. Please try again';
        } else if (error.status >= 500) {
          errorTitle = 'Server error';
          errorMessage = 'Server is experiencing issues. Please try again later';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      showToast({ 
        type: 'error', 
        title: errorTitle, 
        description: errorMessage 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleCancel} 
      title="Add Family Member" 
      size="large" 
      headerStyle="gradient"
    >
      {state.error && (
        <div 
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[var(--radius-md)] mb-4" 
          role="alert"
        >
          {state.error}
        </div>
      )}
      <MemberForm 
        mode="add" 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        isSubmitting={isSubmitting} 
      />
    </Modal>
  );
};

export default AddMemberModalV2;