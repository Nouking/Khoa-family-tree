'use client';

import React, { useMemo, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch, useFamilyMembers } from '../contexts/FamilyTreeContext';
import { useToast } from '../components/ToastProvider';
import Modal from '../components/Modal';
import MemberForm from './shared/MemberForm';
import { MemberFormData } from '../lib/validation/memberValidation';

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
      
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add member');
      }
      
      const newMember = await response.json();
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to add member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      showToast({ 
        type: 'error', 
        title: 'Failed to add member', 
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