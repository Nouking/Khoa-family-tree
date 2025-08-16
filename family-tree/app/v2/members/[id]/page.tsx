'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, User, Calendar, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';

import { useFamilyMembers } from '../../../contexts/FamilyTreeContext';
import MemberBannerV2 from '../../../components-v2/MemberBannerV2';

/**
 * Member Detail Page (v2) - Dynamic route for /v2/members/[id]
 * 
 * Features:
 * - Token-driven styling with .profile-card, .info-grid, .section-title, .relation-chip, .label-chip
 * - Proper ARIA landmarks and heading hierarchy
 * - Mobile-responsive with single-column layout <640px
 * - 44px touch targets for accessibility
 * - Relationship navigation and action buttons
 */
export default function MemberDetailPageV2() {
  const params = useParams();
  const router = useRouter();
  const members = useFamilyMembers();
  
  const memberId = params.id as string;
  const member = members.find(m => m.id === memberId);
  const findMemberById = (id: string) => members.find(m => m.id === id);

  // Handle member not found
  if (!member) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)]">
        {/* Header */}
        <header className="u-header-accent--gradient text-white">
          <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => router.push('/v2/view')}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Back to Family Tree"
                aria-label="Back to Family Tree"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h1 className="text-base sm:text-lg font-semibold leading-tight">Member Detail</h1>
            </div>
          </div>
        </header>

        {/* Error Content */}
        <main className="flex-1">
          <div className="max-w-5xl mx-auto w-full px-2 sm:px-3 py-3">
            <div className="panel px-4 py-8 text-center">
              <h2 className="text-lg font-semibold mb-2">Member Not Found</h2>
              <p className="text-[var(--color-muted-foreground)] mb-4">
                The requested family member could not be found.
              </p>
              <button
                onClick={() => router.push('/v2/view')}
                className="btn btn-primary btn-press"
              >
                Return to Family Tree
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Get related members
  const parent = member.parentId ? findMemberById(member.parentId) : null;
  const spouses = member.spouseIds?.map(id => findMemberById(id)).filter((spouse): spouse is NonNullable<typeof spouse> => spouse !== undefined) || [];
  const children = member.childrenIds?.map(id => findMemberById(id)).filter((child): child is NonNullable<typeof child> => child !== undefined) || [];

  const handleEditMember = () => {
    // TODO: Open edit modal or navigate to edit page
    console.log('Edit member:', member.id);
  };

  const handleDeleteMember = () => {
    // TODO: Show delete confirmation
    console.log('Delete member:', member.id);
  };

  const handleRelationClick = (relatedMemberId: string) => {
    router.push(`/v2/members/${relatedMemberId}`);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  const formatDates = () => {
    const dates = [];
    if (member.birthDate) dates.push(`Born ${member.birthDate}`);
    if (member.deathDate) dates.push(`Died ${member.deathDate}`);
    return dates.join(' • ') || '—';
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <header className="u-header-accent--gradient text-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/v2/view')}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="Back to Family Tree"
              aria-label="Back to Family Tree"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h1 className="text-base sm:text-lg font-semibold leading-tight">Member Detail</h1>
          </div>
          <div className="ms-auto hidden sm:flex items-center gap-2">
            <input 
              placeholder="Search member" 
              className="input hidden md:block ms-1 w-52 bg-white/90 text-[var(--color-ink)]" 
            />
            <button className="ms-1 shrink-0 h-8 w-8 rounded-full bg-white/90 text-[var(--color-ink)] text-xs font-semibold">
              KY
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto w-full px-2 sm:px-3 py-3 space-y-3">
          {/* Breadcrumb / Context */}
          <nav className="panel px-3 py-2 flex items-center gap-2 text-xs sm:text-sm" aria-label="Breadcrumb">
            <span className="badge">Home</span>
            <span aria-hidden="true">›</span>
            <span className="badge">Family Tree</span>
            <span aria-hidden="true">›</span>
            <span className="badge">{member.name}</span>
            <div className="ms-auto profile-actions">
              <button 
                onClick={handleEditMember}
                className="btn btn-outline btn-sm btn-press" 
                type="button"
                aria-label={`Edit ${member.name}`}
              >
                <Edit className="h-3 w-3" />
                Edit
              </button>
              <button 
                onClick={handleDeleteMember}
                className="btn btn-outline btn-sm btn-press" 
                type="button"
                aria-label={`Delete ${member.name}`}
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          </nav>

          {/* Profile Summary */}
          <MemberBannerV2 member={member} />

          {/* About Section */}
          <section className="panel p-3" aria-labelledby="about-heading">
            <div className="section-title">
              <span className="dot" aria-hidden="true"></span>
              <h2 id="about-heading" className="text-sm">About</h2>
            </div>
            <div className="mt-2 u-keyline"></div>
            <div className="mt-3 info-grid">
              <div className="info-item">
                <h4>Gender</h4>
                <p className="value">{member.gender || '—'}</p>
              </div>
              <div className="info-item">
                <h4>Title</h4>
                <p className="value">{member.title || '—'}</p>
              </div>
              <div className="info-item">
                <h4>Birth Date</h4>
                <p className="value">{member.birthDate || '—'}</p>
              </div>
              <div className="info-item">
                <h4>Death Date</h4>
                <p className="value">{member.deathDate || '—'}</p>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-sm mb-1 font-semibold">Biography</h3>
              <p className="value text-[14px] leading-6">
                {member.biography || 'No biography available.'}
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="panel p-3" aria-labelledby="contact-heading">
            <div className="section-title">
              <span className="dot" aria-hidden="true"></span>
              <h2 id="contact-heading" className="text-sm">Contact</h2>
            </div>
            <div className="mt-2 u-keyline"></div>
            <div className="mt-3 info-grid">
              <div className="info-item">
                <h4><Mail className="inline h-3 w-3 mr-1" />Email</h4>
                <p className="value">{member.email || '—'}</p>
              </div>
              <div className="info-item">
                <h4><Phone className="inline h-3 w-3 mr-1" />Phone</h4>
                <p className="value">{member.phone || '—'}</p>
              </div>
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <h4><MapPin className="inline h-3 w-3 mr-1" />Address</h4>
                <p className="value">{member.address || '—'}</p>
              </div>
            </div>
          </section>

          {/* Relations Section */}
          <section className="panel p-3" aria-labelledby="relations-heading">
            <div className="section-title">
              <span className="dot" aria-hidden="true"></span>
              <h2 id="relations-heading" className="text-sm">Relations</h2>
            </div>
            <div className="mt-2 u-keyline"></div>
            <div className="mt-3 space-y-3">
              {/* Parent */}
              <div>
                <h3 className="text-sm mb-2 opacity-80 font-medium">Parent</h3>
                <div className="relation-list">
                  {parent ? (
                    <button
                      onClick={() => handleRelationClick(parent.id)}
                      className="relation-chip"
                      aria-label={`View ${parent.name} details`}
                    >
                      <img
                        className="avatar"
                        src={parent.photo || `https://placehold.co/64x64?text=${getInitials(parent.name)}`}
                        alt=""
                      />
                      <span>{parent.name}</span>
                    </button>
                  ) : (
                    <span className="text-[var(--color-muted-foreground)]">—</span>
                  )}
                </div>
              </div>

              {/* Spouses */}
              <div>
                <h3 className="text-sm mb-2 opacity-80 font-medium">Spouses</h3>
                <div className="relation-list">
                  {spouses.length > 0 ? (
                    spouses.map((spouse) => (
                      <button
                        key={spouse.id}
                        onClick={() => handleRelationClick(spouse.id)}
                        className="relation-chip"
                        aria-label={`View ${spouse.name} details`}
                      >
                        <img
                          className="avatar"
                          src={spouse.photo || `https://placehold.co/64x64?text=${getInitials(spouse.name)}`}
                          alt=""
                        />
                        <span>{spouse.name}</span>
                      </button>
                    ))
                  ) : (
                    <span className="text-[var(--color-muted-foreground)]">—</span>
                  )}
                </div>
              </div>

              {/* Children */}
              <div>
                <h3 className="text-sm mb-2 opacity-80 font-medium">Children</h3>
                <div className="relation-list">
                  {children.length > 0 ? (
                    children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleRelationClick(child.id)}
                        className="relation-chip"
                        aria-label={`View ${child.name} details`}
                      >
                        <img
                          className="avatar"
                          src={child.photo || `https://placehold.co/64x64?text=${getInitials(child.name)}`}
                          alt=""
                        />
                        <span>{child.name}</span>
                      </button>
                    ))
                  ) : (
                    <span className="text-[var(--color-muted-foreground)]">—</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}