'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FamilyMember } from '@/types';

import { useFamilyMembers } from '../../contexts/FamilyTreeContext';
import { MemberFormData, MemberFormErrors, validateMemberForm, validatePhotoFile } from '../../lib/validation/memberValidation';

export interface MemberFormProps {
  mode: 'add' | 'edit';
  initialData: MemberFormData;
  onSubmit: (data: MemberFormData) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
  currentMember?: FamilyMember | null;
}

/**
 * Shared member form used by Add and Edit modals.
 * Preserves legacy validation messages and input fields.
 */
const MemberForm: React.FC<MemberFormProps> = ({ mode, initialData, onSubmit, onCancel, isSubmitting = false, currentMember }) => {
  const existingMembers = useFamilyMembers();

  const [formData, setFormData] = useState<MemberFormData>(initialData);
  const [formErrors, setFormErrors] = useState<MemberFormErrors>({});
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormData(initialData);
    setPhotoPreview(initialData.photo || '');
    setFormErrors({});
  }, [initialData]);

  const relationshipOptions = useMemo(() => [
    'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister',
    'Grandfather', 'Grandmother', 'Grandson', 'Granddaughter',
    'Uncle', 'Aunt', 'Nephew', 'Niece', 'Cousin', 'Spouse', 'Other'
  ], []);

  const availableMembers = useMemo(() => existingMembers.filter((m: FamilyMember) => m.id !== currentMember?.id), [existingMembers, currentMember?.id]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  const handleParentChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, parentId: event.target.value || null }));
  }, []);

  const handleSpouseChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(event.target.selectedOptions).map(o => (o as HTMLOptionElement).value);
    setFormData(prev => ({ ...prev, spouseIds: selected }));
  }, []);

  const handlePhotoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const photoError = validatePhotoFile(file);
    if (photoError) {
      setFormErrors(prev => ({ ...prev, photo: photoError }));
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setFormData(prev => ({ ...prev, photo: base64String }));
        setPhotoPreview(base64String);
        setFormErrors(prev => ({ ...prev, photo: '' }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handlePositionChange = useCallback((field: 'x' | 'y', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setFormData(prev => ({ ...prev, position: { ...prev.position, [field]: numValue } }));
    }
  }, []);

  const handleSizeChange = useCallback((field: 'width' | 'height', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setFormData(prev => ({ ...prev, size: { ...prev.size, [field]: numValue } }));
    }
  }, []);

  const validate = useCallback(() => {
    const errors = validateMemberForm(formData, { mode, currentMemberId: currentMember?.id });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, mode, currentMember?.id]);

  const getErrorId = (field: string): string => `${field}-error`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ ...formData, name: formData.name.trim(), relationship: formData.relationship.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-(--color-neutral-900)">
      {/* Basic Information */}
      <section aria-labelledby="section-basic-info">
        <h3 id="section-basic-info" className="text-base font-medium text-(--color-neutral-900) mb-3">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? getErrorId('name') : undefined}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.name ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`}
            placeholder="Enter full name"
            disabled={isSubmitting}
          />
          <div className="mt-1 min-h-[20px]" aria-live="polite">
            {formErrors.name && (
              <p id={getErrorId('name')} role="alert" className="text-sm text-(--color-error)">{formErrors.name}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" disabled={isSubmitting}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="relationship" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Relationship *</label>
            <select id="relationship" name="relationship" value={formData.relationship} onChange={handleInputChange} aria-invalid={!!formErrors.relationship} aria-describedby={formErrors.relationship ? getErrorId('relationship') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.relationship ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} disabled={isSubmitting}>
            <option value="">Select relationship</option>
            {relationshipOptions.map(option => (<option key={option} value={option}>{option}</option>))}
          </select>
          <div className="mt-1 min-h-[20px]" aria-live="polite">
            {formErrors.relationship && (<p id={getErrorId('relationship')} role="alert" className="text-sm text-(--color-error)">{formErrors.relationship}</p>)}
          </div>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Title/Occupation</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" placeholder="e.g., Engineer, Teacher" disabled={isSubmitting} />
        </div>
        </div>
      </section>

      {/* Dates */}
      <section aria-labelledby="section-dates" className="border-t border-(--color-neutral-100) pt-4">
        <h3 id="section-dates" className="text-base font-medium text-(--color-neutral-900) mb-3">Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Birth Date</label>
            <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleInputChange} aria-invalid={!!formErrors.birthDate} aria-describedby={formErrors.birthDate ? getErrorId('birthDate') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.birthDate ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} disabled={isSubmitting} />
            <div className="mt-1 min-h-[20px]" aria-live="polite">
              {formErrors.birthDate && (<p id={getErrorId('birthDate')} role="alert" className="text-sm text-(--color-error)">{formErrors.birthDate}</p>)}
            </div>
        </div>
        <div>
          <label htmlFor="deathDate" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Death Date</label>
            <input type="date" id="deathDate" name="deathDate" value={formData.deathDate} onChange={handleInputChange} aria-invalid={!!formErrors.deathDate} aria-describedby={formErrors.deathDate ? getErrorId('deathDate') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.deathDate ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} disabled={isSubmitting} />
            <div className="mt-1 min-h-[20px]" aria-live="polite">
              {formErrors.deathDate && (<p id={getErrorId('deathDate')} role="alert" className="text-sm text-(--color-error)">{formErrors.deathDate}</p>)}
            </div>
        </div>
        </div>
      </section>

      {/* Photo Upload */}
      <section aria-labelledby="section-photo" className="border-t border-(--color-neutral-100) pt-4">
        <h3 id="section-photo" className="text-base font-medium text-(--color-neutral-900) mb-3">Photo</h3>
        <label htmlFor="photo" className="sr-only">Photo</label>
        <div className="flex items-center space-x-4">
          <input
            ref={fileInputRef}
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            disabled={isSubmitting}
            aria-describedby={formErrors.photo ? getErrorId('photo') : undefined}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 btn-outline text-sm font-medium text-(--color-neutral-700) focus-visible:outline-2 focus-visible:outline-(--color-primary) focus-visible:outline-offset-2 max-sm:min-h-[44px]"
            disabled={isSubmitting}
            aria-describedby={formErrors.photo ? getErrorId('photo') : undefined}
          >
            {photoPreview ? 'Change Photo' : 'Choose Photo'}
          </button>
          {photoPreview && (
            <div className="relative">
              <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
              <button
                type="button"
                onClick={() => { setFormData(prev => ({ ...prev, photo: '' })); setPhotoPreview(''); }}
                className="absolute -top-2 -right-2 bg-(--color-error) text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-(--color-primary) focus-visible:outline-offset-2"
                disabled={isSubmitting}
                aria-label="Remove photo"
              >
                <span aria-hidden>×</span>
                <span className="sr-only">Remove photo</span>
              </button>
            </div>
          )}
        </div>
        <div className="mt-1 min-h-[20px]" aria-live="polite">
          {formErrors.photo && (<p id={getErrorId('photo')} role="alert" className="text-sm text-(--color-error)">{formErrors.photo}</p>)}
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="section-contact" className="border-t border-(--color-neutral-100) pt-4">
        <h3 id="section-contact" className="text-base font-medium text-(--color-neutral-900) mb-3">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} aria-invalid={!!formErrors.email} aria-describedby={formErrors.email ? getErrorId('email') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.email ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} placeholder="email@example.com" disabled={isSubmitting} />
            <div className="mt-1 min-h-[20px]" aria-live="polite">
              {formErrors.email && (<p id={getErrorId('email')} role="alert" className="text-sm text-(--color-error)">{formErrors.email}</p>)}
            </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} aria-invalid={!!formErrors.phone} aria-describedby={formErrors.phone ? getErrorId('phone') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.phone ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} placeholder="+1 (555) 123-4567" disabled={isSubmitting} />
            <div className="mt-1 min-h-[20px]" aria-live="polite">
              {formErrors.phone && (<p id={getErrorId('phone')} role="alert" className="text-sm text-(--color-error)">{formErrors.phone}</p>)}
            </div>
        </div>
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" placeholder="Full address" disabled={isSubmitting} />
        </div>
      </section>

      {/* Relations */}
      <section aria-labelledby="section-relations" className="border-t border-(--color-neutral-100) pt-4">
        <h3 id="section-relations" className="text-base font-medium text-(--color-neutral-900) mb-3">Relations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="parentId" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Parent</label>
            <select id="parentId" name="parentId" value={formData.parentId || ''} onChange={handleParentChange} aria-invalid={!!formErrors.parentId} aria-describedby={formErrors.parentId ? getErrorId('parentId') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.parentId ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} disabled={isSubmitting}>
            <option value="">Select parent</option>
            {availableMembers.map((m: FamilyMember) => (<option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>))}
          </select>
          <div className="mt-1 min-h-[20px]" aria-live="polite">
            {formErrors.parentId && (<p id={getErrorId('parentId')} role="alert" className="text-sm text-(--color-error)">{formErrors.parentId}</p>)}
          </div>
        </div>
        <div>
          <label htmlFor="spouseIds" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Spouses (Hold Ctrl/Cmd to select multiple)</label>
            <select id="spouseIds" name="spouseIds" multiple value={formData.spouseIds} onChange={handleSpouseChange} aria-invalid={!!formErrors.spouseIds} aria-describedby={formErrors.spouseIds ? getErrorId('spouseIds') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) ${formErrors.spouseIds ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} disabled={isSubmitting} size={3}>
            {availableMembers.map((m: FamilyMember) => (<option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>))}
          </select>
          <div className="mt-1 min-h-[20px]" aria-live="polite">
            {formErrors.spouseIds && (<p id={getErrorId('spouseIds')} role="alert" className="text-sm text-(--color-error)">{formErrors.spouseIds}</p>)}
          </div>
        </div>
        </div>
      </section>

      {/* Biography */}
      <section aria-labelledby="section-biography" className="border-t border-(--color-neutral-100) pt-4">
        <h3 id="section-biography" className="text-base font-medium text-(--color-neutral-900) mb-3">Biography</h3>
        <label htmlFor="biography" className="block text-sm font-medium text-(--color-neutral-700) mb-1">Biography <span className="text-sm text-(--color-neutral-500) ml-2">({formData.biography.length}/1000 characters)</span></label>
        <textarea id="biography" name="biography" value={formData.biography} onChange={handleInputChange} rows={3} aria-invalid={!!formErrors.biography} aria-describedby={formErrors.biography ? getErrorId('biography') : undefined} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary) resize-vertical ${formErrors.biography ? 'border-(--color-error)/40' : 'border-(--color-neutral-200)'}`} placeholder="Brief biography or notes..." disabled={isSubmitting} maxLength={1000} />
        <div className="mt-1 min-h-[20px]" aria-live="polite">
          {formErrors.biography && (<p id={getErrorId('biography')} role="alert" className="text-sm text-(--color-error)">{formErrors.biography}</p>)}
        </div>
      </section>

      {mode === 'edit' && (
        <section aria-labelledby="section-canvas" className="border-t border-(--color-neutral-100) pt-4">
          <h3 id="section-canvas" className="text-base font-medium text-(--color-neutral-900) mb-4">Canvas Position & Size</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-(--color-neutral-700) mb-1">X Position</label>
              <input type="number" value={formData.position.x} onChange={(e) => handlePositionChange('x', e.target.value)} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-neutral-700) mb-1">Y Position</label>
              <input type="number" value={formData.position.y} onChange={(e) => handlePositionChange('y', e.target.value)} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-neutral-700) mb-1">Width</label>
              <input type="number" min="100" value={formData.size.width} onChange={(e) => handleSizeChange('width', e.target.value)} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" disabled={isSubmitting} />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-neutral-700) mb-1">Height</label>
              <input type="number" min="80" value={formData.size.height} onChange={(e) => handleSizeChange('height', e.target.value)} className="w-full px-3 py-2 border border-(--color-neutral-200) rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary)" disabled={isSubmitting} />
            </div>
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-(--color-neutral-100)">
        <button type="button" onClick={onCancel} className="px-4 py-2 btn-outline text-sm font-medium text-(--color-neutral-700) max-sm:min-h-[44px]" disabled={isSubmitting}>Cancel</button>
        <button type="submit" className="px-4 py-2 btn-primary btn-primary--gradient focus-visible:outline-2 focus-visible:outline-(--color-primary) focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed max-sm:min-h-[44px] motion-reduce:transition-none" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'add' ? 'Adding Member...' : 'Updating…') : (mode === 'add' ? 'Add Member' : 'Update Member')}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;


