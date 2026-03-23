import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('Landing Page', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders the main heading', () => {
		render(Page);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('MAINTAIN THE FLOW');
	});

	it('renders the call to action button', () => {
		render(Page);

		const ctaLink = screen.getByRole('link', { name: 'Start Tracking' });
		expect(ctaLink).toBeInTheDocument();
		expect(ctaLink).toHaveAttribute('href', '/');
	});

	it('renders the live sync badge', () => {
		render(Page);

		const badge = screen.getByText(/LIVE SYNC ACTIVE/i);
		expect(badge).toBeInTheDocument();
	});
});
