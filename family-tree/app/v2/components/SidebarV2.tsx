import React from 'react';

interface SidebarV2Props {
  onAddMember: () => void;
  onExport: () => void;
  onHelp: () => void;
}

const SidebarV2: React.FC<SidebarV2Props> = ({ onAddMember, onExport, onHelp }) => {
  return (
    <aside 
      className="toolbar-rail w-16 lg:w-48 h-full bg-(--surface-1) border-r border-(--color-neutral-200) flex flex-col p-2 lg:p-4"
      role="complementary"
      aria-label="Sidebar navigation"
    >
      {/* Add Member */}
      <button
        className="btn-primary w-full h-12 lg:h-10 mb-2 flex items-center justify-center lg:justify-start focus-visible:outline-2 focus-visible:outline-(--color-primary)"
        onClick={onAddMember}
        aria-label="Add Member"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 lg:mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span className="hidden lg:inline text-(--text-sm)">Add</span>
      </button>

      {/* Export */}
      <button
        className="w-full h-12 lg:h-10 mb-2 flex items-center justify-center lg:justify-start bg-[color-mix(in_oklch,_var(--color-primary),_white_88%)] text-(--color-primary) hover:bg-[color-mix(in_oklch,_var(--color-primary),_white_80%)] rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-(--color-primary)"
        onClick={onExport}
        aria-label="Export family tree"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 lg:mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span className="hidden lg:inline text-(--text-sm)">Export</span>
      </button>

      {/* Help */}
      <button
        className="btn-outline w-full h-12 lg:h-10 mb-2 flex items-center justify-center lg:justify-start focus-visible:outline-2 focus-visible:outline-(--color-primary)"
        onClick={onHelp}
        aria-label="Help"
        title="Help (Shift+?)"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 lg:mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M18 10A8 8 0 11.001 9.999 8 8 0 0118 10zM9 15a1 1 0 100-2 1 1 0 000 2zm1-11a3 3 0 00-3 3 1 1 0 102 0 1 1 0 112 0c0 .628-.287 1.018-.879 1.516-.206.176-.43.35-.653.523C6.86 10.7 6 11.372 6 13a1 1 0 102 0c0-.628.287-1.018.879-1.516.206-.176.43-.35.653-.523C10.14 9.3 11 8.628 11 7a3 3 0 00-3-3z" clipRule="evenodd" />
        </svg>
        <span className="hidden lg:inline text-(--text-sm)">Help</span>
      </button>

      <div className="flex-1" />
      
      {/* User section (minimal) */}
      <div className="hidden lg:flex mt-4 items-center justify-center lg:justify-start">
        <div className="bg-(--color-neutral-100) h-8 w-8 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-neutral-500)" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default SidebarV2;