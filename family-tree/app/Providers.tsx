'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastProvider } from './components/ToastProvider';
import { OnboardingProvider } from './components/OnboardingProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToastProvider>
        <OnboardingProvider>
          {children}
        </OnboardingProvider>
      </ToastProvider>
    </DndProvider>
  );
}


