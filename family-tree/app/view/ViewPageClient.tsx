'use client'

import { FamilyMember } from '@/types'

import { FamilyTreeProvider } from '../contexts/FamilyTreeContext'

import FamilyTree from '../components/FamilyTree'
import MainToolbar from '../components/MainToolbar'
import FiltersPanel, { type SearchFilters } from '../components/FiltersPanel'
import AddMemberModal from '../components/AddMemberModal'
import { useOnboarding } from '../components/OnboardingProvider'
import { useToast } from '../components/ToastProvider'
import React from 'react'
import Fuse from 'fuse.js'

interface ViewPageClientProps {
  initialMembers: FamilyMember[]
}

export default function ViewPageClient({ initialMembers }: ViewPageClientProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<SearchFilters>({ genders: [] });
  const [presets, setPresets] = React.useState<{ name: string; filters: SearchFilters }[]>([]);
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const { toggleHelp } = useOnboarding();
  const { showToast } = useToast();
  const [isSidebarAddOpen, setIsSidebarAddOpen] = React.useState(false);
  // Placeholder functions for toolbar actions
  const handleShare = () => {
    alert('Share functionality will be implemented in a future task')
  }
  
  const handleExport = () => {
    alert('Export functionality will be implemented in a future task')
  }
  
  const handleAddMember = () => {
    alert('Add Member functionality will be implemented in a future task')
  }

  const handleUndo = () => {
    alert('Undo functionality will be implemented in a future task')
  }

  const handleRedo = () => {
    alert('Redo functionality will be implemented in a future task')
  }
  
  // Load persisted presets and history
  React.useEffect(() => {
    try {
      const p = localStorage.getItem('searchFilterPresets');
      const h = localStorage.getItem('searchHistory');
      if (p) setPresets(JSON.parse(p));
      if (h) setSearchHistory(JSON.parse(h));
    } catch {}
  }, []);

  // Persist presets and history
  React.useEffect(() => {
    try {
      localStorage.setItem('searchFilterPresets', JSON.stringify(presets));
    } catch {}
  }, [presets]);
  React.useEffect(() => {
    try {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory.slice(0, 25)));
    } catch {}
  }, [searchHistory]);

  // Suggestions based on current query using simple heuristics (names + relationships)
  React.useEffect(() => {
    const handle = window.setTimeout(() => {
      const pool = new Set<string>();
      for (const m of initialMembers) {
        if (m.name) pool.add(m.name);
        if (m.relationship) pool.add(m.relationship);
        if (m.title) pool.add(m.title);
        if (m.address) pool.add(m.address);
      }
      const q = searchQuery.trim().toLowerCase();
      const list = Array.from(pool);
      if (!q) {
        setSuggestions(searchHistory.slice(0, 10));
      } else {
        const fuse = new Fuse(list, { includeScore: false, threshold: 0.4 });
        setSuggestions(fuse.search(searchQuery).slice(0, 10).map(r => r.item));
      }
    }, 150);
    return () => window.clearTimeout(handle);
  }, [initialMembers, searchQuery, searchHistory]);

  const handleSearchSubmit = React.useCallback(() => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchHistory((prev) => [q, ...prev.filter((s) => s.toLowerCase() !== q.toLowerCase())]);
  }, [searchQuery]);
  
  return (
    <FamilyTreeProvider>
      <div className="min-h-screen bg-gray-50">
        <MainToolbar 
          title="Family Tree View"
          onShare={handleShare}
          onExport={handleExport}
          onOpenFilters={() => setShowFilters(true)}
          onSearchFocus={() => {
            // Focus the first search input found on the page for now
            const el = document.querySelector('input[type="search"]') as HTMLInputElement | null;
            el?.focus();
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          searchSuggestions={suggestions}
        />
        
        {/* Canonical layout: left toolbar rail + context bar + canvas panel (prototype parity) */}
        <div className="container mx-auto px-2 sm:px-3 py-3 grid grid-cols-12 gap-3">
          <aside className="hidden md:block col-span-3 lg:col-span-2">
            <div className="toolbar-rail sticky top-20 space-y-2">
              <button
                className="w-full h-10 px-3 rounded-[var(--radius-md)] bg-(--color-primary) text-(--color-primary-contrast) hover:bg-[color-mix(in_oklch,_var(--color-primary),_black_10%)]"
                onClick={() => setIsSidebarAddOpen(true)}
                aria-label="Add Member"
              >
                Add
              </button>
              <button
                className="w-full h-10 px-3 rounded-[var(--radius-md)] bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)]"
                onClick={handleExport}
                aria-label="Export"
              >
                Export
              </button>
              <button
                className="w-full h-10 px-3 rounded-[var(--radius-md)] btn-outline"
                onClick={toggleHelp}
                aria-label="Open Help"
              >
                Help
              </button>
            </div>
          </aside>
          <main className="col-span-12 md:col-span-9 lg:col-span-10 flex flex-col gap-3">
            {/* Context bar */}
            <div className="panel px-3 py-2 flex items-center gap-2 text-xs sm:text-sm">
              <span className="badge">Home</span>
              <span>›</span>
              <span className="badge">Khoa Family</span>
              <div className="ms-auto flex items-center gap-2">
                <span className="hidden sm:inline">Filters</span>
                <button
                  className="btn-outline py-1 px-2"
                  onClick={() => setShowFilters(true)}
                  aria-label="Open Filters"
                >
                  Open
                </button>
                <label htmlFor="member-search" className="sr-only">Search member name</label>
                <input id="member-search" type="text" className="input py-1 w-40 sm:w-56"
                  placeholder="Search member…" aria-label="Search member name"
                  value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); handleSearchSubmit(); } }} />
              </div>
            </div>

            {/* Canvas panel */}
            <section className="panel p-2 sm:p-3 canvas-wrap">
              <div className="canvas-grid rounded-[16px] h-full p-3 sm:p-5 relative overflow-hidden">
                <h2 className="canvas-title">Family Tree</h2>
                {/* FamilyTree contains its own connections layer; ensure class hook for responsive hiding */}
                <div className="connections-layer absolute inset-0 pointer-events-none" aria-hidden />
                <FamilyTree initialMembers={initialMembers} searchQuery={searchQuery} activeFilters={activeFilters} />
              </div>
            </section>
          </main>
        </div>

        {/* Sidebar Add modal */}
        <AddMemberModal 
          isOpen={isSidebarAddOpen}
          onClose={() => setIsSidebarAddOpen(false)}
          onMemberAdded={() => {
            setIsSidebarAddOpen(false);
            showToast({ type: 'success', title: 'Member added', description: 'New family member has been added.' });
          }}
        />

        {/* Filters modal */}
        <FiltersPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          initialFilters={activeFilters}
          onApply={(f) => setActiveFilters(f)}
          onSavePreset={(name, f) => setPresets((prev) => [{ name, filters: f }, ...prev.filter(p => p.name !== name)])}
          presets={presets}
          onLoadPreset={(f) => setActiveFilters(f)}
        />
      </div>
    </FamilyTreeProvider>
  )
} 