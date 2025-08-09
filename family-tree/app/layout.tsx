'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './globals.css';
import { ToastProvider } from './components/ToastProvider';
import { OnboardingProvider } from './components/OnboardingProvider';
import OnboardingTour from './components/OnboardingTour';
import HelpPanel from './components/HelpPanel';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DndProvider backend={HTML5Backend}>
          <ToastProvider>
            <OnboardingProvider>
              {children}
              {/* Onboarding & Help mounted at root so they can overlay pages */}
              <OnboardingTour />
              <HelpPanel />
            </OnboardingProvider>
          </ToastProvider>
        </DndProvider>
      </body>
    </html>
  );
}
