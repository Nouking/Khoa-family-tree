import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../v2/view/page';
import { FamilyTreeProvider } from '../../contexts/FamilyTreeContext';
import { OnboardingProvider } from '../OnboardingProvider';
import { ToastProvider } from '../ToastProvider';

const TestProviders = ({ children }: { children: React.ReactNode }) => (
  <FamilyTreeProvider>
    <ToastProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </ToastProvider>
  </FamilyTreeProvider>
);

describe('v2 /view page', () => {
	it('renders v2 page components', () => {
		render(
      <TestProviders>
        <Page />
      </TestProviders>
    );
		expect(screen.getByRole('heading', { name: /family tree/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/sidebar navigation/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/family tree canvas/i)).toBeInTheDocument();
	});
});


