import React from 'react';

interface MainToolbarV2Props {
  title?: string;
  onOpenFilters?: () => void;
  onSearchFocus?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  searchSuggestions?: string[];
}

const MainToolbarV2: React.FC<MainToolbarV2Props> = ({
  title = 'Family Tree',
  onOpenFilters = () => {},
  onSearchFocus = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  onSearchSubmit = () => {},
  searchSuggestions = [],
}) => {
  return (
    <header 
      className="u-header-accent--gradient text-white shadow-[var(--elevation-1)] sticky top-0 z-10"
      role="banner"
    >
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1 
              className="text-lg sm:text-xl md:text-2xl font-semibold text-(--color-neutral-900) truncate" 
              title={title}
            >
              {title}
            </h1>
          </div>
          
          {/* Search and Filters Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Input */}
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onSearchSubmit();
                  }
                }}
                onFocus={onSearchFocus}
                placeholder="Search members"
                className="input h-10 w-32 sm:w-40 md:w-56 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                aria-label="Search family members"
                list="toolbar-v2-search-suggestions"
              />
              {searchSuggestions.length > 0 && (
                <datalist id="toolbar-v2-search-suggestions">
                  {searchSuggestions.slice(0, 10).map((s, i) => (
                    <option key={s + i} value={s} />
                  ))}
                </datalist>
              )}
            </div>

            {/* Filters Button */}
            <button
              className="btn h-10 px-3 rounded-[var(--radius-md)] bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)] flex items-center focus-visible:outline-2 focus-visible:outline-(--color-primary)"
              onClick={onOpenFilters}
              aria-label="Open Filters"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 sm:mr-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-.293.707L12 11.414V16a1 1 0 01-1.447.894l-2-1A1 1 0 018 15v-3.586L3.293 6.707A1 1 0 013 6V5z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline text-(--text-sm)">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainToolbarV2;