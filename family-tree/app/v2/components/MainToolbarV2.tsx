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
  title = 'Khoa Family Tree',
  onOpenFilters = () => {},
  onSearchFocus = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  onSearchSubmit = () => {},
  searchSuggestions = [],
}) => {
  return (
    <header className="u-header-accent--gradient text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">👪</span>
          <h1 className="text-base sm:text-lg font-semibold leading-tight text-white">
            {title}
          </h1>
        </div>
        <div className="ms-auto hidden sm:flex items-center gap-2">
          <button className="btn btn-outline btn-sm">Undo</button>
          <button className="btn btn-outline btn-sm">Redo</button>
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
            placeholder="Search" 
            className="input hidden md:block ms-1 w-52" 
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
          <button className="ms-1 shrink-0 h-8 w-8 rounded-full bg-white/90 text-[var(--color-neutral-900)] text-xs font-semibold">
            KY
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainToolbarV2;