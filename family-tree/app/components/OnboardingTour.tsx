"use client";

import React from 'react';
import Modal from './Modal';
import { useOnboarding } from './OnboardingProvider';

const steps: Array<{ title: string; description: string; target?: string }> = [
  {
    title: 'Welcome to Family Tree',
    description: 'This brief tour will show you the main areas: toolbar, canvas, and search & filters. You can skip anytime.',
  },
  {
    title: 'Toolbar',
    description: 'Access actions like Add, Share, Export and the Filters panel. Use Ctrl+/ to focus search.',
    target: '.toolbar',
  },
  {
    title: 'Canvas',
    description: 'Drag the canvas to pan, use the buttons to zoom, and drag member cards to reposition.',
    target: '[data-testid="family-tree-canvas"]',
  },
  {
    title: 'Search & Filters',
    description: 'Use the search box and the Filters panel to highlight members and zoom to results.',
    target: '.btn-filters',
  },
];

const Spotlight: React.FC<{ selector?: string }> = ({ selector }) => {
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    if (!selector) { setRect(null); return; }
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      const update = () => setRect(el.getBoundingClientRect());
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      window.addEventListener('scroll', update, true);
      window.addEventListener('resize', update);
      return () => {
        ro.disconnect();
        window.removeEventListener('scroll', update, true);
        window.removeEventListener('resize', update);
      };
    } else {
      setRect(null);
    }
  }, [selector]);

  if (!rect) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {/* Dim layer */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Spotlight hole using CSS clip-path */}
      <div
        className="absolute inset-0"
        style={{
          WebkitClipPath: `path('M0,0 L100vw,0 L100vw,100vh L0,100vh Z M${rect.left},${rect.top} L${rect.right},${rect.top} L${rect.right},${rect.bottom} L${rect.left},${rect.bottom} Z')`,
          clipPath: `path('M0,0 L100vw,0 L100vw,100vh L0,100vh Z M${rect.left},${rect.top} L${rect.right},${rect.top} L${rect.right},${rect.bottom} L${rect.left},${rect.bottom} Z')`,
          backgroundColor: 'rgba(0,0,0,0.6)',
          // Use CSS blend mode with type casting to satisfy TS React CSSProperties
          mixBlendMode: 'multiply' as React.CSSProperties['mixBlendMode'],
        }}
      />
      {/* Outline around target */}
      <div
        className="absolute border-2 border-(--color-accent) rounded-[var(--radius-lg)]"
        style={{ left: rect.left - 4, top: rect.top - 4, width: rect.width + 8, height: rect.height + 8, boxShadow: '0 0 0 4px color-mix(in oklch, var(--color-accent), white 75%)' }}
      />
    </div>
  );
};

const OnboardingTour: React.FC = () => {
  const { isTourOpen, stepIndex, nextStep, prevStep, skipTour, completeTour } = useOnboarding();

  if (!isTourOpen) return null;
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const isLast = stepIndex >= steps.length - 1;

  return (
    <>
      {/* Visual spotlight */}
      <Spotlight selector={step.target} />

      {/* Modal with step content */}
      <Modal
        isOpen
        onClose={skipTour}
        title={step.title}
        size="small"
      >
        <div className="space-y-4">
          <p className="text-(--text-sm)">{step.description}</p>
          <div className="flex items-center justify-between">
            <button
              className="btn-outline px-3 py-2"
              onClick={skipTour}
            >
              Skip
            </button>
            <div className="space-x-2">
              <button
                className="btn-outline px-3 py-2"
                onClick={prevStep}
                aria-label="Previous step"
                disabled={stepIndex === 0}
              >
                Back
              </button>
              {isLast ? (
                <button
                  className="btn-primary px-3 py-2"
                  onClick={completeTour}
                >
                  Finish
                </button>
              ) : (
                <button
                  className="btn-primary px-3 py-2"
                  onClick={nextStep}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OnboardingTour;


