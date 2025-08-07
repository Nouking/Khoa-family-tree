import Link from 'next/link';
import React from 'react';

interface MainToolbarProps {
  title?: string;
  onShare?: () => void;
  onExport?: () => void;
  onAddMember?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

const MainToolbar: React.FC<MainToolbarProps> = ({
  title = 'Family Tree',
  onShare = () => {},
  onExport = () => {},
  onAddMember = () => {},
  onUndo = () => {},
  onRedo = () => {},
}) => {
  return (
    <header className="toolbar bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-2 sm:px-4 py-3 flex items-center">
        <div className="toolbar-left flex items-center space-x-2">
          <Link href="/" className="btn-home px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
          <div className="undo-redo hidden sm:flex space-x-1">
            <button 
              className="btn-undo p-2 rounded-md text-gray-500 hover:bg-gray-100" 
              onClick={onUndo}
              aria-label="Undo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className="btn-redo p-2 rounded-md text-gray-500 hover:bg-gray-100" 
              onClick={onRedo}
              aria-label="Redo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="toolbar-center flex-1 text-center">
          <h1 className="text-xl font-semibold text-gray-800 truncate">{title}</h1>
        </div>
        
        <div className="toolbar-right flex items-center space-x-2">
          <button 
            className="btn-share p-2 rounded-md text-blue-600 hover:bg-blue-50 hidden sm:flex items-center"
            onClick={onShare}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span className="hidden md:inline">Share</span>
          </button>
          <button 
            className="btn-export p-2 rounded-md text-blue-600 hover:bg-blue-50 hidden sm:flex items-center"
            onClick={onExport}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Export</span>
          </button>
          <button 
            className="btn-add-member p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
            onClick={onAddMember}
            aria-label="Add Member"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Add</span>
          </button>
          <div className="user-section ml-2 hidden sm:block">
            <div className="user-avatar bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainToolbar; 