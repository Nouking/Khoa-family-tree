'use client';

import React, { useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import { useOnboarding } from '../components/OnboardingProvider';
import ContextTipsOverlay from '../components/ContextTipsOverlay';

/**
 * v2 Help Panel with modern design patterns and enhanced accessibility.
 * Features proper modal dialog structure, section reveal animations, 
 * and token-driven styling consistent with the v2 design system.
 */
const HelpPanelV2: React.FC = () => {
  const { isHelpOpen, closeHelp, startTour } = useOnboarding();
  const [showTips, setShowTips] = React.useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Tips data for contextual overlay
  const tips = React.useMemo(() => ([
    { selector: '.toolbar', text: 'Use the toolbar for actions like Add, Share, Export, and Filters.' },
    { selector: '[data-testid="family-tree-canvas"]', text: 'Drag to pan and use zoom controls on the top-right.' },
    { selector: '.btn-filters', text: 'Open Filters to narrow results and highlight matches.' },
  ]), []);

  // Section reveal animation using intersection observer
  useEffect(() => {
    if (!isHelpOpen) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    // Small delay to ensure elements are rendered
    const timer = setTimeout(() => {
      sectionsRef.current.forEach(section => {
        if (section) {
          revealObserver.observe(section);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      revealObserver.disconnect();
    };
  }, [isHelpOpen]);

  // Ref callback to collect section elements
  const addSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Handle action buttons
  const handleStartTour = () => {
    closeHelp();
    startTour();
  };

  const handleShowTips = () => {
    setShowTips(true);
  };

  if (!isHelpOpen) return null;

  return (
    <>
      <Modal 
        isOpen={isHelpOpen} 
        onClose={closeHelp} 
        title="Help & Shortcuts" 
        size="large"
        headerStyle="gradient"
        className="help-panel-v2"
      >
        {/* Header description */}
        <div className="mb-6">
          <p className="text-sm opacity-70 mt-1">
            Quick tips for the toolbar, canvas, search, and filters.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-[color:var(--color-ink)]">
          {/* Getting Started */}
          <section 
            ref={addSectionRef}
            aria-labelledby="help-getting-started" 
            className="pt-1 u-section-reveal"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h3 id="help-getting-started" className="text-base font-medium flex items-center gap-2">
                  <span aria-hidden="true" className="text-[color:var(--color-primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  Getting Started
                </h3>
                <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)]" aria-hidden="true">
                  Quick tips
                </span>
              </div>
              <div className="mt-3 h-px bg-[color:var(--color-border)] opacity-50"></div>
            </div>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
              <li>Use the toolbar to Add, Share, Export, and open Filters.</li>
              <li>Drag the canvas to pan; use the +/− buttons on the top-right to zoom.</li>
              <li>Click a member to select; Ctrl/Cmd-click to multi-select.</li>
            </ul>
          </section>

          {/* Keyboard Shortcuts */}
          <section 
            ref={addSectionRef}
            aria-labelledby="help-shortcuts" 
            className="border-t border-[color:var(--color-border)] pt-4 u-section-reveal"
          >
            <div className="mb-3">
              <h3 id="help-shortcuts" className="text-base font-medium flex items-center gap-2">
                <span aria-hidden="true" className="text-[color:var(--color-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v10a2 2 0 01-2 2H5a2 2 0 01-2-2V4zM5 6h10v8H5V6z"/>
                  </svg>
                </span>
                Keyboard Shortcuts
              </h3>
            </div>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
              <li><strong>Ctrl+/</strong>: Focus search</li>
              <li><strong>Ctrl+Z / Ctrl+Shift+Z</strong>: Undo / Redo</li>
              <li><strong>Shift+?</strong>: Open Help</li>
            </ul>
          </section>

          {/* Tips & Tour */}
          <section 
            ref={addSectionRef}
            aria-labelledby="help-tour" 
            className="border-t border-[color:var(--color-border)] pt-4 u-section-reveal"
          >
            <div className="mb-3">
              <h3 id="help-tour" className="text-base font-medium flex items-center gap-2">
                <span aria-hidden="true" className="text-[color:var(--color-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM9 8h2v5H9V8zm0-3h2v2H9V5z"/>
                  </svg>
                </span>
                Tips & Tour
              </h3>
            </div>
            <p className="text-sm mt-2 mb-3">
              Take the guided tour to learn the basics and see contextual tips in the UI.
            </p>
            <div className="flex flex-wrap gap-2">
              <button 
                type="button" 
                className="btn btn-primary btn-primary--gradient btn-press" 
                onClick={handleStartTour}
                aria-label="Start guided tour"
              >
                Start Tour
              </button>
              <button 
                type="button" 
                className="btn btn-outline btn-press" 
                onClick={handleShowTips}
                aria-label="Show contextual tips"
              >
                Show Tips
              </button>
            </div>
          </section>

          {/* More Help */}
          <section 
            ref={addSectionRef}
            aria-labelledby="help-more" 
            className="border-t border-[color:var(--color-border)] pt-4 u-section-reveal"
          >
            <div className="mb-3">
              <h3 id="help-more" className="text-base font-medium flex items-center gap-2">
                <span aria-hidden="true" className="text-[color:var(--color-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M4 3a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0012.586 3H4zM4 6h8V5.414L13.586 6H16v8H4V6z"/>
                  </svg>
                </span>
                More Help
              </h3>
            </div>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
              <li>Press <strong>Esc</strong> to close dialogs.</li>
              <li>Filters can highlight matches to narrow results.</li>
              <li>Spotlight overlay will highlight key areas during the tour.</li>
            </ul>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-2 sm:gap-3 pt-4 border-t border-[color:var(--color-border)]">
            <button 
              type="button" 
              className="btn btn-outline btn-press"
              onClick={closeHelp}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Context Tips Overlay */}
      {showTips && (
        <ContextTipsOverlay 
          tips={tips} 
          onClose={() => setShowTips(false)} 
        />
      )}
    </>
  );
};

export default HelpPanelV2;