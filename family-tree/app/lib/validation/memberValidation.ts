export type Gender = 'male' | 'female' | 'other';

export interface MemberFormData {
  name: string;
  gender: Gender;
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

export type MemberFormErrors = Record<string, string>;

export interface ValidateOptions {
  mode: 'add' | 'edit';
  currentMemberId?: string;
}

/**
 * Validates member form data. Mirrors legacy validation messages to avoid UX regressions.
 */
export function validateMemberForm(
  formData: MemberFormData,
  options: ValidateOptions
): MemberFormErrors {
  const errors: MemberFormErrors = {};

  // Name
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (formData.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  // Relationship
  if (!formData.relationship.trim()) {
    errors.relationship = 'Relationship is required';
  }

  // Email
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone
  if (formData.phone) {
    const phoneRegex = /^[\d\s+()-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (digits, spaces, +, -, () only)';
    } else if (formData.phone.replace(/[\s+()-]/g, '').length < 7) {
      errors.phone = 'Phone number must have at least 7 digits';
    }
  }

  // Dates
  if (formData.birthDate && formData.deathDate) {
    const birthDate = new Date(formData.birthDate);
    const deathDate = new Date(formData.deathDate);
    if (deathDate <= birthDate) {
      errors.deathDate = 'Death date must be after birth date';
    }
  }
  if (formData.birthDate) {
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    if (birthDate > today) {
      errors.birthDate = 'Birth date cannot be in the future';
    }
  }

  // Biography
  if (formData.biography && formData.biography.length > 1000) {
    errors.biography = 'Biography must be less than 1000 characters';
  }

  // Edit-mode specific validations
  if (options.mode === 'edit') {
    // Position validation (0-3000 range per spec)
    if (isNaN(formData.position.x) || formData.position.x < 0 || formData.position.x > 3000) {
      errors.positionX = 'X position must be between 0 and 3000';
    }
    if (isNaN(formData.position.y) || formData.position.y < 0 || formData.position.y > 3000) {
      errors.positionY = 'Y position must be between 0 and 3000';
    }
    
    // Size validation (minimum 100px per spec)
    if (isNaN(formData.size.width) || formData.size.width < 100) {
      errors.sizeWidth = 'Width must be at least 100 pixels';
    }
    if (isNaN(formData.size.height) || formData.size.height < 100) {
      errors.sizeHeight = 'Height must be at least 100 pixels';
    }
    
    // Relationship validation for edit mode
    if (options.currentMemberId) {
      if (formData.parentId === options.currentMemberId) {
        errors.parentId = 'A member cannot be their own parent';
      }
      if (formData.spouseIds.includes(options.currentMemberId)) {
        errors.spouseIds = 'A member cannot be their own spouse';
      }
    }
  }

  return errors;
}

/**
 * Validates photo file client-side; returns error string or empty string if valid.
 */
export function validatePhotoFile(file: File | undefined): string {
  if (!file) return '';
  if (!file.type.startsWith('image/')) {
    return 'Please select a valid image file';
  }
  if (file.size > 5 * 1024 * 1024) {
    return 'File size must be less than 5MB';
  }
  return '';
}


