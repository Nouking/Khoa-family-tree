'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Modal from './Modal';
import { FamilyMember } from '@/types';
import { useFamilyTreeWithDispatch, useFamilyMembers } from '../contexts/FamilyTreeContext';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onMemberUpdated?: (member: FamilyMember) => void;
}

interface FormData {
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  deathDate: string;
  photo: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  biography: string;
  parentId: string | null;
  spouseIds: string[];
  relationship: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface FormErrors {
  [key: string]: string;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onMemberUpdated
}) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const existingMembers = useFamilyMembers();
  
  const [formData, setFormData] = useState<FormData>({
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
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  // Initialize form with member data when modal opens or member changes
  useEffect(() => {
    if (member && isOpen) {
      setFormData({
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
      });
      setPhotoPreview(member.photo || '');
      setFormErrors({});
    }
  }, [member, isOpen]);

  // Validation rules
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.relationship.trim()) {
      errors.relationship = 'Relationship is required';
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (formData.birthDate && formData.deathDate) {
      const birthDate = new Date(formData.birthDate);
      const deathDate = new Date(formData.deathDate);
      if (deathDate <= birthDate) {
        errors.deathDate = 'Death date must be after birth date';
      }
    }

    // Prevent self-reference in relationships
    if (member && formData.parentId === member.id) {
      errors.parentId = 'A member cannot be their own parent';
    }

    if (member && formData.spouseIds.includes(member.id)) {
      errors.spouseIds = 'A member cannot be their own spouse';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, member]);

  // Handle input changes
  const handleInputChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  // Handle photo upload
  const handlePhotoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({
          ...prev,
          photo: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          photo: 'File size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          photo: base64String
        }));
        setPhotoPreview(base64String);
        
        // Clear photo error
        setFormErrors(prev => ({
          ...prev,
          photo: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle parent selection
  const handleParentChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      parentId: event.target.value || null
    }));
  }, []);

  // Handle spouse selection (multiple select)
  const handleSpouseChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      spouseIds: selectedOptions
    }));
  }, []);

  // Handle position changes
  const handlePositionChange = useCallback((field: 'x' | 'y', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setFormData(prev => ({
        ...prev,
        position: {
          ...prev.position,
          [field]: numValue
        }
      }));
    }
  }, []);

  // Handle size changes
  const handleSizeChange = useCallback((field: 'width' | 'height', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setFormData(prev => ({
        ...prev,
        size: {
          ...prev.size,
          [field]: numValue
        }
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!member || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const updatedData: Partial<FamilyMember> = {
        ...formData,
        name: formData.name.trim(),
        relationship: formData.relationship.trim(),
      };

      // Call API to update member
      const response = await fetch(`/api/members/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update member');
      }

      const updatedMember = await response.json();

      // Update local state
      dispatch({ 
        type: 'UPDATE_MEMBER', 
        payload: { 
          id: member.id, 
          updates: updatedMember 
        } 
      });

      // Call callback if provided
      onMemberUpdated?.(updatedMember);

      // Close modal
      onClose();
    } catch (error) {
      console.error('Error updating member:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to update member' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setFormErrors({});
      onClose();
    }
  }, [isSubmitting, onClose]);

  // Available relationship options
  const relationshipOptions = [
    'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister',
    'Grandfather', 'Grandmother', 'Grandson', 'Granddaughter',
    'Uncle', 'Aunt', 'Nephew', 'Niece', 'Cousin', 'Spouse', 'Other'
  ];

  // Filter out current member from parent/spouse options
  const availableMembers = existingMembers.filter((m: FamilyMember) => m.id !== member?.id);

  if (!member) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Edit ${member.name}`}
      size="large"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {state.error}
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Relationship */}
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
              Relationship *
            </label>
            <select
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.relationship ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select relationship</option>
              {relationshipOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formErrors.relationship && (
              <p className="mt-1 text-sm text-red-600">{formErrors.relationship}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title/Occupation
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Engineer, Teacher"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-1">
              Death Date
            </label>
            <input
              type="date"
              id="deathDate"
              name="deathDate"
              value={formData.deathDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.deathDate ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {formErrors.deathDate && (
              <p className="mt-1 text-sm text-red-600">{formErrors.deathDate}</p>
            )}
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => document.getElementById('photo')?.click()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {photoPreview ? 'Change Photo' : 'Choose Photo'}
            </button>
            {photoPreview && (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, photo: '' }));
                    setPhotoPreview('');
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          {formErrors.photo && (
            <p className="mt-1 text-sm text-red-600">{formErrors.photo}</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="email@example.com"
              disabled={isSubmitting}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
              disabled={isSubmitting}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full address"
            disabled={isSubmitting}
          />
        </div>

        {/* Position and Size Controls */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Canvas Position & Size</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X Position</label>
              <input
                type="number"
                value={formData.position.x}
                onChange={(e) => handlePositionChange('x', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Y Position</label>
              <input
                type="number"
                value={formData.position.y}
                onChange={(e) => handlePositionChange('y', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
              <input
                type="number"
                min="100"
                value={formData.size.width}
                onChange={(e) => handleSizeChange('width', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
              <input
                type="number"
                min="80"
                value={formData.size.height}
                onChange={(e) => handleSizeChange('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Family Relations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parent */}
          <div>
            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
              Parent
            </label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId || ''}
              onChange={handleParentChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.parentId ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select parent</option>
              {availableMembers.map((m: FamilyMember) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.relationship})
                </option>
              ))}
            </select>
            {formErrors.parentId && (
              <p className="mt-1 text-sm text-red-600">{formErrors.parentId}</p>
            )}
          </div>

          {/* Spouses */}
          <div>
            <label htmlFor="spouseIds" className="block text-sm font-medium text-gray-700 mb-1">
              Spouses (Hold Ctrl/Cmd to select multiple)
            </label>
            <select
              id="spouseIds"
              name="spouseIds"
              multiple
              value={formData.spouseIds}
              onChange={handleSpouseChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.spouseIds ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
              size={3}
            >
              {availableMembers.map((m: FamilyMember) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.relationship})
                </option>
              ))}
            </select>
            {formErrors.spouseIds && (
              <p className="mt-1 text-sm text-red-600">{formErrors.spouseIds}</p>
            )}
          </div>
        </div>

        {/* Biography */}
        <div>
          <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
            Biography
          </label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            placeholder="Brief biography or notes..."
            disabled={isSubmitting}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating Member...' : 'Update Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMemberModal;