import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TopChampions from './TopChampions.svelte';
import type { MatchSummary } from '$lib/types';

describe('TopChampions Component', () => {
	it('renders skeleton loaders when match array is empty', () => {
		const { container } = render(TopChampions, { matches: [] });

		// Check for the animate-pulse class on the skeleton wrappers
		const skeletons = container.querySelectorAll('.animate-pulse');
		expect(skeletons.length).toBe(5);
	});

	it('aggregates champion data correctly from matches', () => {
		const mockMatches = [
			{ championName: 'Ahri', win: true, kills: 10, deaths: 2, assists: 8 },
			{ championName: 'Ahri', win: false, kills: 2, deaths: 8, assists: 1 },
			{ championName: 'LeeSin', win: true, kills: 5, deaths: 5, assists: 5 }
		] as MatchSummary[];

		render(TopChampions, { matches: mockMatches });

		// Check if Ahri aggregated correctly (2 games, 1 win -> 50% WR)
		expect(screen.getByText('Ahri')).toBeInTheDocument();
		expect(screen.getByText('2 Played')).toBeInTheDocument();
		expect(screen.getByText('50% WR')).toBeInTheDocument();

		// Check if Lee Sin aggregated correctly (1 game, 1 win -> 100% WR)
		expect(screen.getByText('LeeSin')).toBeInTheDocument();
		expect(screen.getByText('1 Played')).toBeInTheDocument();
		expect(screen.getByText('100% WR')).toBeInTheDocument();
	});
});
