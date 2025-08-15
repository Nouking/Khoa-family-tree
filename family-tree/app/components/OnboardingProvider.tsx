"use client";

import React from 'react';

type OnboardingContextValue = {
  isTourOpen: boolean;
  isHelpOpen: boolean;
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  openHelp: () => void;
  closeHelp: () => void;
  toggleHelp: () => void;
  stepIndex: number;
  setSpotlightTarget: (selector: string | null) => void;
  spotlightTarget: string | null;
};

const OnboardingContext = React.createContext<OnboardingContextValue | null>(null);

export function useOnboarding(): OnboardingContextValue {
  const ctx = React.useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return ctx;
}

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTourOpen, setIsTourOpen] = React.useState(false);
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [spotlightTarget, setSpotlightTarget] = React.useState<string | null>(null);
  const [isClient, setIsClient] = React.useState(false);

  // Ensure we're on the client before accessing localStorage
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Persist onboarding completion - only run after client hydration
  React.useEffect(() => {
    if (!isClient) return;
    
    try {
      const done = localStorage.getItem('onboardingCompleted');
      if (!done) {
        // First visit: open tour automatically
        setIsTourOpen(true);
      }
    } catch {}
  }, [isClient]);

  // Global keyboard shortcut to open help (Shift+/ => '?') - only on client
  React.useEffect(() => {
    if (!isClient) return;
    
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === '/') {
        e.preventDefault();
        setIsHelpOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isClient]);

  const startTour = React.useCallback(() => {
    setStepIndex(0);
    setIsTourOpen(true);
  }, []);

  const nextStep = React.useCallback(() => {
    setStepIndex((i) => i + 1);
  }, []);

  const prevStep = React.useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const skipTour = React.useCallback(() => {
    setIsTourOpen(false);
    try { localStorage.setItem('onboardingCompleted', 'true'); } catch {}
  }, []);

  const completeTour = React.useCallback(() => {
    setIsTourOpen(false);
    try { localStorage.setItem('onboardingCompleted', 'true'); } catch {}
  }, []);

  const openHelp = React.useCallback(() => setIsHelpOpen(true), []);
  const closeHelp = React.useCallback(() => setIsHelpOpen(false), []);
  const toggleHelp = React.useCallback(() => setIsHelpOpen((v) => !v), []);

  const value: OnboardingContextValue = React.useMemo(() => ({
    isTourOpen,
    isHelpOpen,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    openHelp,
    closeHelp,
    toggleHelp,
    stepIndex,
    setSpotlightTarget,
    spotlightTarget,
  }), [isTourOpen, isHelpOpen, startTour, nextStep, prevStep, skipTour, completeTour, openHelp, closeHelp, toggleHelp, stepIndex, spotlightTarget]);

  return (
    <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
  );
};

export default OnboardingProvider;


