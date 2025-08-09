'use client'

import { FamilyMember } from '@/types'

import { FamilyTreeProvider } from '../contexts/FamilyTreeContext'

import FamilyTree from '../components/FamilyTree'
import MainToolbar from '../components/MainToolbar'
import FiltersPanel, { type SearchFilters } from '../components/FiltersPanel'
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
        
        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 px-2 sm:px-0">Family Tree Visualization</h2>
            
            <div className="bg-white rounded-lg shadow p-2 sm:p-4">
              {/* Responsive help text for mobile users */}
              <div className="md:hidden p-2 mb-4 bg-blue-50 text-blue-700 rounded text-sm">
                <p>Scroll horizontally to view the complete family tree.</p>
              </div>
              
              <FamilyTree initialMembers={initialMembers} searchQuery={searchQuery} activeFilters={activeFilters} />
            </div>
          </div>
        </main>

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