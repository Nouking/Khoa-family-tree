"use client";

import React from 'react';
import Modal from './Modal';
import { useOnboarding } from './OnboardingProvider';
import ContextTipsOverlay from './ContextTipsOverlay';

const HelpPanel: React.FC = () => {
  const { isHelpOpen, closeHelp, startTour } = useOnboarding();
  const [showTips, setShowTips] = React.useState(false);
  const tips = React.useMemo(() => ([
    { selector: '.toolbar', text: 'Use the toolbar for actions like Add, Share, Export, and Filters.' },
    { selector: '[data-testid="family-tree-canvas"]', text: 'Drag to pan and use zoom controls on the top-right.' },
    { selector: '.btn-filters', text: 'Open Filters to narrow results and highlight matches.' },
  ]), []);
  if (!isHelpOpen) return null;

  return (
    <Modal isOpen onClose={closeHelp} title="Help & Shortcuts" size="medium">
      <div className="space-y-4">
        <details open>
          <summary className="text-lg font-semibold cursor-pointer">Getting Started</summary>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-(--text-sm)">
            <li>Use the toolbar to Add, Share, Export, and open Filters.</li>
            <li>Drag the canvas to pan; use the +/− buttons to zoom.</li>
            <li>Click a member to select; Ctrl/Cmd-click for multi-select.</li>
          </ul>
        </details>

        <details>
          <summary className="text-lg font-semibold cursor-pointer">Keyboard Shortcuts</summary>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-(--text-sm)">
            <li><strong>Ctrl+/</strong>: Focus search</li>
            <li><strong>Ctrl+Z / Ctrl+Shift+Z</strong>: Undo / Redo</li>
            <li><strong>Shift+?</strong>: Open this help</li>
          </ul>
        </details>

        <details>
          <summary className="text-lg font-semibold cursor-pointer">Tips & Tour</summary>
          <p className="text-(--text-sm) mt-2 mb-3">Take the guided tour to learn the basics.</p>
          <div className="flex gap-2">
            <button className="btn-primary px-3 py-2" onClick={() => { closeHelp(); startTour(); }}>Start Tour</button>
            <button className="btn-outline px-3 py-2" onClick={() => setShowTips(true)}>Show Tips</button>
          </div>
        </details>
        {showTips && (
          <ContextTipsOverlay tips={tips} onClose={() => setShowTips(false)} />
        )}
      </div>
    </Modal>
  );
};

export default HelpPanel;


