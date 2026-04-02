import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ProfileHeader from './ProfileHeader.svelte';

describe('ProfileHeader Component', () => {
	const mockRankedPlayer = {
		profileIconId: 508,
		summonerLevel: 420,
		gameName: 'Faker',
		tagLine: 'KR1',
		tier: 'CHALLENGER',
		rank: 'I',
		leaguePoints: 1250,
		wins: 150,
		losses: 50
	};

	const mockUnrankedPlayer = {
		...mockRankedPlayer,
		tier: 'UNRANKED',
		wins: 0,
		losses: 0
	};

	it('renders ranked player info and calculates win rate correctly', () => {
		render(ProfileHeader, { player: mockRankedPlayer });

		// Check if name renders
		expect(screen.getByText('Faker')).toBeInTheDocument();
		expect(screen.getByText('#KR1')).toBeInTheDocument();

		// Check if rank renders
		expect(screen.getByText('CHALLENGER I')).toBeInTheDocument();
		expect(screen.getByText('1250 LP')).toBeInTheDocument();

		// 150 wins / 200 total games = 75% Win Rate
		expect(screen.getByText('75%')).toBeInTheDocument();
		expect(screen.getByText('150W')).toBeInTheDocument();
		expect(screen.getByText('50L')).toBeInTheDocument();
	});

	it('renders fallback UI for unranked players', () => {
		render(ProfileHeader, { player: mockUnrankedPlayer });

		expect(screen.getByText('Unranked')).toBeInTheDocument();

		// Ensure win rate stats are hidden
		expect(screen.queryByText('Win Rate')).not.toBeInTheDocument();
	});
});
