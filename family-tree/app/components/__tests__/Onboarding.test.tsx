import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingProvider } from '../../components/OnboardingProvider';
import OnboardingTour from '../../components/OnboardingTour';
import HelpPanel from '../../components/HelpPanel';
import { waitFor } from '@testing-library/react';

describe('Onboarding system', () => {
test('tour opens on first load and can be skipped', async () => {
    // Ensure localStorage is empty
    window.localStorage.removeItem('onboardingCompleted');
    render(
      <OnboardingProvider>
        <div />
        <OnboardingTour />
      </OnboardingProvider>
    );
    // Welcome step modal title should be visible
    expect(screen.getByText(/Welcome to Family Tree/i)).toBeInTheDocument();
    // Skip closes and sets localStorage
  const skipBtn = screen.getByRole('button', { name: /^Skip$/i });
  fireEvent.click(skipBtn);
  await waitFor(() => expect(window.localStorage.getItem('onboardingCompleted')).toBe('true'));
  });

  test('help panel renders with shortcuts and can start tour', () => {
    render(
      <OnboardingProvider>
        <HelpPanel />
        <OnboardingTour />
      </OnboardingProvider>
    );
    // Manually open help via keyboard shortcut simulation
    fireEvent.keyDown(document, { key: '/', shiftKey: true });
    expect(screen.getByText(/Help & Shortcuts/i)).toBeInTheDocument();
    // Start Tour
    fireEvent.click(screen.getByText(/Start Tour/i));
    expect(screen.getByText(/Welcome to Family Tree/i)).toBeInTheDocument();
  });
});


