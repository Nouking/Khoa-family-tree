import React from 'react';

import '../v2-styles.css';

interface SidebarV2Props {
  onAddMember: () => void;
  onExport: () => void;
  onHelp: () => void;
}

const SidebarV2: React.FC<SidebarV2Props> = ({ onAddMember, onExport, onHelp }) => {
  return (
    <nav className="v2-toolbar-rail flex flex-col gap-2 text-xs">
      <button 
        data-active="true" 
        className="v2-toolbar-rail-button w-full"
        onClick={onAddMember}
        aria-label="Add Member"
      >
        <span className="i" data-lucide="plus" aria-hidden="true"></span> Add
      </button>
      <button 
        className="v2-toolbar-rail-button w-full"
        onClick={onExport}
        aria-label="Export family tree"
      >
        <span className="i" data-lucide="share" aria-hidden="true"></span> Export
      </button>
      <button 
        className="v2-toolbar-rail-button w-full"
        onClick={onHelp}
        aria-label="Help"
        title="Help (Shift+?)"
      >
        <span className="i" data-lucide="help-circle" aria-hidden="true"></span> Help
      </button>
    </nav>
  );
};

export default SidebarV2;