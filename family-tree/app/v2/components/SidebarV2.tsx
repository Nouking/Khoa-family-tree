import React from 'react';

interface SidebarV2Props {
  onAddMember: () => void;
  onExport: () => void;
  onHelp: () => void;
}

const SidebarV2: React.FC<SidebarV2Props> = ({ onAddMember, onExport, onHelp }) => {
  return (
    <nav className="flex flex-col gap-2 text-xs">
      <button 
        data-active="true" 
        className="w-full"
        onClick={onAddMember}
        aria-label="Add Member"
      >
        <span className="i" data-lucide="plus" aria-hidden="true"></span> Add
      </button>
      <button 
        className="w-full"
        onClick={onExport}
        aria-label="Export family tree"
      >
        <span className="i" data-lucide="share" aria-hidden="true"></span> Export
      </button>
      <button 
        className="w-full"
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