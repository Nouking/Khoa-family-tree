import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../../app/(v2)/view/page';

describe('v2 /view page', () => {
	it('renders v2 shell header and panel text', () => {
		render(<Page />);
		expect(screen.getByRole('heading', { name: /family tree — v2/i })).toBeInTheDocument();
		expect(screen.getByText(/v2 shell is ready/i)).toBeInTheDocument();
	});
});


