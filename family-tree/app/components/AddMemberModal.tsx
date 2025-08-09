'use client';

import React, { useCallback, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyTreeWithDispatch, useFamilyMembers } from '../contexts/FamilyTreeContext';

import Modal from './Modal';
import { useToast } from './ToastProvider';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: (member: FamilyMember) => void;
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

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onMemberAdded
}) => {
  const { state, dispatch } = useFamilyTreeWithDispatch();
  const existingMembers = useFamilyMembers();
  const { showToast } = useToast();
  
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
    position: { x: 300, y: 200 }, // Default position
    size: { width: 200, height: 120 } // Default size
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  // Validation rules
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name must be less than 100 characters';
    }

    if (!formData.relationship.trim()) {
      errors.relationship = 'Relationship is required';
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (enhanced)
    if (formData.phone) {
      const phoneRegex = /^[\d\s+()-]+$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number (digits, spaces, +, -, () only)';
      } else if (formData.phone.replace(/[\s+()-]/g, '').length < 7) {
        errors.phone = 'Phone number must have at least 7 digits';
      }
    }

    // Date validation
    if (formData.birthDate && formData.deathDate) {
      const birthDate = new Date(formData.birthDate);
      const deathDate = new Date(formData.deathDate);
      if (deathDate <= birthDate) {
        errors.deathDate = 'Death date must be after birth date';
      }
    }

    // Future date validation
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        errors.birthDate = 'Birth date cannot be in the future';
      }
    }

    // Biography length validation
    if (formData.biography && formData.biography.length > 1000) {
      errors.biography = 'Biography must be less than 1000 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

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

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Generate order number based on existing members
      const maxOrder = existingMembers.reduce((max: number, member: FamilyMember) =>
        Math.max(max, member.order || 0), 0
      );

      const memberData: Omit<FamilyMember, 'id'> = {
        ...formData,
        name: formData.name.trim(),
        relationship: formData.relationship.trim(),
        order: maxOrder + 1,
        childrenIds: [], // Will be updated when children are added
      };

      // Call API to add member
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add member');
      }

      const newMember = await response.json();

      // Update local state
      dispatch({ type: 'ADD_MEMBER', payload: newMember });

      // Call callback if provided
      onMemberAdded?.(newMember);
      showToast({ type: 'success', title: 'Member added', description: newMember.name });

      // Reset form and close modal
      handleReset();
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to add member' 
      });
      showToast({ type: 'error', title: 'Failed to add member', description: error instanceof Error ? error.message : undefined });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = useCallback(() => {
    setFormData({
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
    setFormErrors({});
    setPhotoPreview('');
  }, []);

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      handleReset();
      onClose();
    }
  }, [isSubmitting, handleReset, onClose]);

  // Available relationship options
  const relationshipOptions = [
    'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister',
    'Grandfather', 'Grandmother', 'Grandson', 'Granddaughter',
    'Uncle', 'Aunt', 'Nephew', 'Niece', 'Cousin', 'Spouse', 'Other'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Family Member"
      size="large"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.birthDate ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {formErrors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{formErrors.birthDate}</p>
            )}
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
              Choose Photo
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select parent</option>
              {existingMembers.map((member: FamilyMember) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.relationship})
                </option>
              ))}
            </select>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              size={3}
            >
              {existingMembers.map((member: FamilyMember) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.relationship})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Biography */}
        <div>
          <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
            Biography
            <span className="text-sm text-gray-500 ml-2">
              ({formData.biography.length}/1000 characters)
            </span>
          </label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
              formErrors.biography ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Brief biography or notes..."
            disabled={isSubmitting}
            maxLength={1000}
          />
          {formErrors.biography && (
            <p className="mt-1 text-sm text-red-600">{formErrors.biography}</p>
          )}
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
            className="px-4 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding…' : 'Add Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMemberModal;