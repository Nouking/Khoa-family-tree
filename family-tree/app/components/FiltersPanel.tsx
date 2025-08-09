import React, { useEffect, useState } from 'react';

import Modal from './Modal';

type Gender = 'male' | 'female' | 'other';

export interface SearchFilters {
  genders: Gender[];
  birthYearMin?: number;
  birthYearMax?: number;
  locationIncludes?: string;
  relationshipIncludes?: string;
}

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
  onSavePreset?: (name: string, filters: SearchFilters) => void;
  presets?: { name: string; filters: SearchFilters }[];
  onLoadPreset?: (filters: SearchFilters) => void;
}

const defaultFilters: SearchFilters = { genders: [] };

export default function FiltersPanel({
  isOpen,
  onClose,
  initialFilters,
  onApply,
  onSavePreset,
  presets = [],
  onLoadPreset,
}: FiltersPanelProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || defaultFilters);
  const [presetName, setPresetName] = useState('');

  useEffect(() => {
    setFilters(initialFilters || defaultFilters);
  }, [initialFilters]);

  const toggleGender = (g: Gender) => {
    setFilters((prev) => {
      const set = new Set(prev.genders);
      if (set.has(g)) set.delete(g); else set.add(g);
      return { ...prev, genders: Array.from(set) as Gender[] };
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium" title="Filters">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Gender</h3>
          <div className="flex gap-3 flex-wrap">
            {(['male','female','other'] as Gender[]).map((g) => (
              <label key={g} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.genders.includes(g)}
                  onChange={() => toggleGender(g)}
                />
                <span className="capitalize">{g}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-(--color-neutral-700) mb-1">Birth Year Min</label>
            <input
              type="number"
              value={filters.birthYearMin ?? ''}
              onChange={(e) => setFilters({ ...filters, birthYearMin: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200)"
            />
          </div>
          <div>
            <label className="block text-sm text-(--color-neutral-700) mb-1">Birth Year Max</label>
            <input
              type="number"
              value={filters.birthYearMax ?? ''}
              onChange={(e) => setFilters({ ...filters, birthYearMax: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-(--color-neutral-700) mb-1">Location includes</label>
          <input
            type="text"
            value={filters.locationIncludes ?? ''}
            onChange={(e) => setFilters({ ...filters, locationIncludes: e.target.value || undefined })}
            placeholder="City, state, country"
            className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200)"
          />
        </div>

        <div>
          <label className="block text-sm text-(--color-neutral-700) mb-1">Relationship includes</label>
          <input
            type="text"
            value={filters.relationshipIncludes ?? ''}
            onChange={(e) => setFilters({ ...filters, relationshipIncludes: e.target.value || undefined })}
            placeholder="Father, Mother, Cousin..."
            className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200)"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Preset name"
              className="h-10 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200)"
            />
            <button
              className="h-10 px-3 rounded-[var(--radius-md)] bg-(--color-primary) text-(--color-primary-contrast)"
              onClick={() => {
                if (!presetName) return;
                onSavePreset?.(presetName, filters);
                setPresetName('');
              }}
            >Save preset</button>
          </div>
          <div>
            {presets.length > 0 && (
              <select
                className="h-10 px-3 rounded-[var(--radius-md)] border border-(--color-neutral-200)"
                defaultValue=""
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  if (!Number.isNaN(idx)) {
                    const preset = presets[idx];
                    onLoadPreset?.(preset.filters);
                    setFilters(preset.filters);
                  }
                }}
              >
                <option value="" disabled>Load preset…</option>
                {presets.map((p, i) => (
                  <option key={p.name + i} value={i}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button className="h-10 px-3 rounded-[var(--radius-md)] bg-(--color-neutral-200)" onClick={onClose}>Cancel</button>
          <button
            className="h-10 px-3 rounded-[var(--radius-md)] bg-(--color-primary) text-(--color-primary-contrast)"
            onClick={() => { onApply(filters); onClose(); }}
          >Apply</button>
        </div>
      </div>
    </Modal>
  );
}


