'use client';

import React, { useMemo, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch } from '../contexts/FamilyTreeContext';

import Modal from './Modal';
import { useToast } from './ToastProvider';
import MemberForm from './shared/MemberForm';
import { MemberFormData } from '../lib/validation/memberValidation';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onMemberUpdated?: (member: FamilyMember) => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ isOpen, onClose, member, onMemberUpdated }) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = useMemo<MemberFormData>(() => ({
    name: member?.name || '',
    gender: member?.gender || 'male',
    birthDate: member?.birthDate || '',
    deathDate: member?.deathDate || '',
    photo: member?.photo || '',
    title: member?.title || '',
    email: member?.email || '',
    phone: member?.phone || '',
    address: member?.address || '',
    biography: member?.biography || '',
    parentId: member?.parentId || null,
    spouseIds: member?.spouseIds || [],
    relationship: member?.relationship || '',
    position: member?.position || { x: 300, y: 200 },
    size: member?.size || { width: 200, height: 120 }
  }), [member]);

  if (!member) return null;

  const handleSubmit = async (data: MemberFormData) => {
    setIsSubmitting(true);
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const updatedData: Partial<FamilyMember> = { ...data };
      const response = await fetch(`/api/members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update member');
      }
      const updatedMember = await response.json();
      dispatch({ type: 'UPDATE_MEMBER', payload: { id: member.id, updates: updatedMember } });
      onMemberUpdated?.(updatedMember);
      showToast({ type: 'success', title: 'Member updated', description: updatedMember.name });
      onClose();
    } catch (error) {
      console.error('Error updating member:', error);
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update member' });
      showToast({ type: 'error', title: 'Update failed', description: error instanceof Error ? error.message : undefined });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={`Edit ${member.name}`} size="large">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
          {state.error}
        </div>
      )}
      <MemberForm mode="edit" initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} currentMember={member} />
    </Modal>
  );
};

export default EditMemberModal;