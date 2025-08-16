'use client';

import React from 'react';
import { User, Calendar } from 'lucide-react';

import { FamilyMember } from '@/types';

interface MemberBannerV2Props {
  member: FamilyMember;
  className?: string;
}

/**
 * MemberBannerV2 - Reusable profile summary component for member detail pages
 * 
 * Features:
 * - Profile card layout with circular photo, ribbon name, relationship badge
 * - Label chips for gender and dates with icons
 * - Token-driven styling using .profile-card, .profile-meta, .ribbon, .label-chip
 * - Responsive: stacks vertically on mobile <768px
 * - Accessibility: proper alt text and semantic markup
 */
export default function MemberBannerV2({ member, className = '' }: MemberBannerV2Props) {
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  const formatDates = () => {
    const dates = [];
    if (member.birthDate) dates.push(`Born ${member.birthDate}`);
    if (member.deathDate) dates.push(`Died ${member.deathDate}`);
    return dates.join(' • ') || '—';
  };

  const getPhotoSrc = () => {
    if (member.photo && member.photo.trim()) {
      return member.photo;
    }
    return `https://placehold.co/160x160?text=${encodeURIComponent(getInitials(member.name))}`;
  };

  return (
    <section className={`panel p-3 ${className}`} aria-labelledby="profile-heading">
      <div className="profile-card">
        {/* Profile Photo */}
        <img
          className="node-photo"
          src={getPhotoSrc()}
          alt={`${member.name} profile photo`}
        />
        
        {/* Profile Metadata */}
        <div className="profile-meta">
          {/* Name and Relationship */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="ribbon ribbon-peach" id="profile-heading">
              {member.name}
            </div>
            <span className="badge">
              {member.relationship || 'Family Member'}
            </span>
          </div>
          
          {/* Title */}
          {member.title && (
            <p className="value-muted">
              {member.title}
            </p>
          )}
          
          {/* Gender and Dates with Label Chips */}
          <div className="text-xs flex items-center gap-4 flex-wrap">
            {/* Gender */}
            <span className="inline-flex items-center gap-2">
              <span className="label-chip inline-flex items-center gap-1">
                <User className="h-3 w-3" />
                Gender
              </span>
              <span className="value">
                {member.gender || '—'}
              </span>
            </span>
            
            {/* Dates */}
            <span className="inline-flex items-center gap-2">
              <span className="label-chip inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Dates
              </span>
              <span className="value">
                {formatDates()}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}