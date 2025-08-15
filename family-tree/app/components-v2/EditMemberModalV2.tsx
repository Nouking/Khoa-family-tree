'use client';

import React, { useMemo, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch } from '../contexts/FamilyTreeContext';
import { useToast } from '../components/ToastProvider';
import Modal from '../components/Modal';
import MemberForm from './shared/MemberForm';
import { MemberFormData } from '../lib/validation/memberValidation';

interface EditMemberModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onMemberUpdated?: (member: FamilyMember) => void;
}

/**
 * v2 Edit Member Modal with modern design patterns and APG modal dialog semantics.
 * Features bottom-sheet variant on mobile, token-driven styling, and Canvas Position/Size fields.
 */
const EditMemberModalV2: React.FC<EditMemberModalV2Props> = ({ 
  isOpen, 
  onClose, 
  member,
  onMemberUpdated 
}) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = useMemo<MemberFormData>(() => {
    if (!member) {
      return {
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
      };
    }
    
    return {
      name: member.name || '',
      gender: member.gender || 'male',
      birthDate: member.birthDate || '',
      deathDate: member.deathDate || '',
      photo: member.photo || '',
      title: member.title || '',
      email: member.email || '',
      phone: member.phone || '',
      address: member.address || '',
      biography: member.biography || '',
      parentId: member.parentId || null,
      spouseIds: member.spouseIds || [],
      relationship: member.relationship || '',
      position: member.position || { x: 300, y: 200 },
      size: member.size || { width: 200, height: 120 }
    };
  }, [member]);

  const handleSubmit = async (data: MemberFormData) => {
    if (!member) {
      showToast({ 
        type: 'error', 
        title: 'Error', 
        description: 'No member to update' 
      });
      return;
    }

    setIsSubmitting(true);
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      const updatedMember: FamilyMember = {
        ...member,
        ...data
      };
      
      const response = await fetch(`/api/members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMember),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update member');
      }
      
      const responseData = await response.json();
      dispatch({ type: 'UPDATE_MEMBER', payload: responseData });
      onMemberUpdated?.(responseData);
      showToast({ 
        type: 'success', 
        title: 'Member updated', 
        description: responseData.name 
      });
      onClose();
    } catch (error) {
      console.error('Error updating member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update member';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      showToast({ 
        type: 'error', 
        title: 'Failed to update member', 
        description: errorMessage 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) onClose();
  };

  if (!member) {
    return null;
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleCancel} 
      title="Edit Family Member" 
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
        mode="edit" 
        initialData={initialData} 
        currentMember={member}
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        isSubmitting={isSubmitting} 
      />
    </Modal>
  );
};

export default EditMemberModalV2;