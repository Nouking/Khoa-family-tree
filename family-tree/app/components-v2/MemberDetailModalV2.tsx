'use client';

import React from 'react';
import '../../v2-styles.css';

import { FamilyMember } from '@/types';
import { useFamilyMembers } from '../contexts/FamilyTreeContext';
import Modal from '../components/Modal';

interface MemberDetailModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember | null;
  onEditMember?: (member: FamilyMember) => void;
  onDeleteMember?: (member: FamilyMember) => void;
  onNavigateToMember?: (memberId: string) => void;
  showActions?: boolean;
}

/**
 * v2 Member Detail Modal with comprehensive member information display
 * Based on member-detail-prompt specifications with modern design patterns
 */
const MemberDetailModalV2: React.FC<MemberDetailModalV2Props> = ({
  isOpen,
  onClose,
  member,
  onEditMember,
  onDeleteMember,
  onNavigateToMember,
  showActions = true
}) => {
  const allMembers = useFamilyMembers();

  if (!member) return null;

  // Helper function to get member by ID
  const getMemberById = (id: string): FamilyMember | null => {
    return allMembers.find(m => m.id === id) || null;
  };

  // Helper function to get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  // Helper function to format dates
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Helper function to get ribbon color class based on relationship
  const getRibbonColorClass = (relationship: string): string => {
    const relationshipLower = relationship.toLowerCase();
    if (relationshipLower.includes('father') || relationshipLower.includes('patriarch')) return 'v2-ribbon-sage';
    if (relationshipLower.includes('mother') || relationshipLower.includes('matriarch')) return 'v2-ribbon-peach';
    if (relationshipLower.includes('son') || relationshipLower.includes('daughter')) return 'v2-ribbon-lilac';
    if (relationshipLower.includes('spouse') || relationshipLower.includes('wife') || relationshipLower.includes('husband')) return 'v2-ribbon-rose';
    if (relationshipLower.includes('grand')) return 'v2-ribbon-sun';
    return 'v2-ribbon-mint';
  };

  // Get related members
  const parent = member.parentId ? getMemberById(member.parentId) : null;
  const spouses = member.spouseIds.map(id => getMemberById(id)).filter(Boolean) as FamilyMember[];
  const children = member.childrenIds.map(id => getMemberById(id)).filter(Boolean) as FamilyMember[];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Member Detail"
      size="large"
      headerStyle="gradient"
      className="v2-member-detail-modal"
    >
      <div className="v2-member-detail-content">
        {/* Breadcrumb / Context */}
        <div className="v2-member-detail-breadcrumb">
          <span className="v2-badge">Home</span>
          <span className="v2-breadcrumb-separator">›</span>
          <span className="v2-badge">Family Tree</span>
          <span className="v2-breadcrumb-separator">›</span>
          <span className="v2-badge">{member.name}</span>
          
          {showActions && (
            <div className="v2-member-detail-actions">
              {onEditMember && (
                <button
                  className="v2-btn v2-btn-outline v2-btn-sm"
                  onClick={() => onEditMember(member)}
                  type="button"
                >
                  Edit
                </button>
              )}
              {onDeleteMember && (
                <button
                  className="v2-btn v2-btn-outline v2-btn-sm"
                  onClick={() => onDeleteMember(member)}
                  type="button"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Summary */}
        <section className="v2-member-detail-section">
          <div className="v2-profile-card">
            <div className="v2-profile-photo-container">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`${member.name} photo`}
                  className="v2-profile-photo"
                />
              ) : (
                <div className="v2-profile-photo v2-profile-photo-fallback">
                  {getInitials(member.name)}
                </div>
              )}
            </div>
            
            <div className="v2-profile-meta">
              <div className="v2-profile-name-container">
                <div className={`v2-ribbon ${getRibbonColorClass(member.relationship)}`}>
                  {member.name}
                </div>
                <span className="v2-relationship-badge">
                  {member.relationship || 'Family Member'}
                </span>
              </div>
              
              {member.title && (
                <p className="v2-profile-title">{member.title}</p>
              )}
              
              <div className="v2-profile-quick-info">
                <span className="v2-quick-info-item">
                  <span className="v2-label-chip">
                    <svg className="v2-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 16a6 6 0 1112 0v2H2v-2z" clipRule="evenodd"/>
                    </svg>
                    Gender
                  </span>
                  <span className="v2-value">{member.gender || '—'}</span>
                </span>
                
                <span className="v2-quick-info-item">
                  <span className="v2-label-chip">
                    <svg className="v2-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 112 0v1zm11 7H3v6h14V9z"/>
                    </svg>
                    Dates
                  </span>
                  <span className="v2-value">
                    {member.birthDate && `Born ${formatDate(member.birthDate)}`}
                    {member.birthDate && member.deathDate && ' • '}
                    {member.deathDate && `Died ${formatDate(member.deathDate)}`}
                    {!member.birthDate && !member.deathDate && '—'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="v2-member-detail-section">
          <div className="v2-section-title">
            <span className="v2-section-dot" aria-hidden="true"></span>
            <h2>About</h2>
          </div>
          <div className="v2-section-divider"></div>
          
          <div className="v2-info-grid">
            <div className="v2-info-item">
              <h4>Gender</h4>
              <p className="v2-value">{member.gender || '—'}</p>
            </div>
            <div className="v2-info-item">
              <h4>Title</h4>
              <p className="v2-value">{member.title || '—'}</p>
            </div>
            <div className="v2-info-item">
              <h4>Birth Date</h4>
              <p className="v2-value">{formatDate(member.birthDate)}</p>
            </div>
            <div className="v2-info-item">
              <h4>Death Date</h4>
              <p className="v2-value">{formatDate(member.deathDate)}</p>
            </div>
          </div>
          
          <div className="v2-biography-section">
            <h3>Biography</h3>
            <p className="v2-biography-text">
              {member.biography || 'No biography available.'}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="v2-member-detail-section">
          <div className="v2-section-title">
            <span className="v2-section-dot" aria-hidden="true"></span>
            <h2>Contact</h2>
          </div>
          <div className="v2-section-divider"></div>
          
          <div className="v2-info-grid">
            <div className="v2-info-item">
              <h4>Email</h4>
              <p className="v2-value">{member.email || '—'}</p>
            </div>
            <div className="v2-info-item">
              <h4>Phone</h4>
              <p className="v2-value">{member.phone || '—'}</p>
            </div>
            <div className="v2-info-item v2-info-item-full">
              <h4>Address</h4>
              <p className="v2-value">{member.address || '—'}</p>
            </div>
          </div>
        </section>

        {/* Relations Section */}
        <section className="v2-member-detail-section">
          <div className="v2-section-title">
            <span className="v2-section-dot" aria-hidden="true"></span>
            <h2>Relations</h2>
          </div>
          <div className="v2-section-divider"></div>
          
          <div className="v2-relations-container">
            <div className="v2-relation-group">
              <h3>Parent</h3>
              <div className="v2-relation-list">
                {parent ? (
                  <button
                    className="v2-relation-chip"
                    onClick={() => onNavigateToMember?.(parent.id)}
                    type="button"
                  >
                    <div className="v2-relation-avatar">
                      {parent.photo ? (
                        <img src={parent.photo} alt={parent.name} />
                      ) : (
                        getInitials(parent.name)
                      )}
                    </div>
                    <span>{parent.name}</span>
                  </button>
                ) : (
                  <span className="v2-relation-empty">—</span>
                )}
              </div>
            </div>

            <div className="v2-relation-group">
              <h3>Spouses</h3>
              <div className="v2-relation-list">
                {spouses.length > 0 ? (
                  spouses.map(spouse => (
                    <button
                      key={spouse.id}
                      className="v2-relation-chip"
                      onClick={() => onNavigateToMember?.(spouse.id)}
                      type="button"
                    >
                      <div className="v2-relation-avatar">
                        {spouse.photo ? (
                          <img src={spouse.photo} alt={spouse.name} />
                        ) : (
                          getInitials(spouse.name)
                        )}
                      </div>
                      <span>{spouse.name}</span>
                    </button>
                  ))
                ) : (
                  <span className="v2-relation-empty">—</span>
                )}
              </div>
            </div>

            <div className="v2-relation-group">
              <h3>Children</h3>
              <div className="v2-relation-list">
                {children.length > 0 ? (
                  children.map(child => (
                    <button
                      key={child.id}
                      className="v2-relation-chip"
                      onClick={() => onNavigateToMember?.(child.id)}
                      type="button"
                    >
                      <div className="v2-relation-avatar">
                        {child.photo ? (
                          <img src={child.photo} alt={child.name} />
                        ) : (
                          getInitials(child.name)
                        )}
                      </div>
                      <span>{child.name}</span>
                    </button>
                  ))
                ) : (
                  <span className="v2-relation-empty">—</span>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default MemberDetailModalV2;