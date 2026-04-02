import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/svelte';
import { goto } from '$app/navigation';
import SummonerSearch from './SummonerSearch.svelte';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

const fetchSpy = vi.spyOn(global, 'fetch');

describe('SummonerSearch Component', () => {
	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	it('renders the search form correctly', () => {
		render(SummonerSearch);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveTextContent(/Find Your Summoner/i);

		expect(screen.getByLabelText('Summoner Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Tagline')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Unleash Kinetic' })).toBeInTheDocument();
	});

	it('shows an error if the form is submitted empty', async () => {
		render(SummonerSearch);
		const button = screen.getByRole('button', { name: 'Unleash Kinetic' });

		await fireEvent.click(button);

		// This now passes because we added the error message to the Svelte component!
		expect(screen.getByText('Please enter both summoner name and tagline')).toBeInTheDocument();
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it('makes an API call and navigates on successful submit', async () => {
		const mockPlayerData = {
			puuid: '123',
			gameName: 'Shmungi',
			tagLine: 'CPT',
			summonerLevel: 30,
			profileIconId: 1,
			tier: 'GOLD',
			rank: 'III',
			leaguePoints: 50,
			wins: 100,
			losses: 90
		};

		// 1. Mock the first fetch (/api/getPlayer)
		fetchSpy.mockResolvedValueOnce({
			ok: true,
			json: async () => mockPlayerData
		} as Response);

		// 2. Mock the second fetch (/api/getMatches)
		fetchSpy.mockResolvedValueOnce({
			ok: true,
			json: async () => [] // Returns empty match array just to satisfy the code
		} as Response);

		render(SummonerSearch);

		await fireEvent.input(screen.getByLabelText('Summoner Name'), { target: { value: 'Shmungi' } });
		await fireEvent.input(screen.getByLabelText('Tagline'), { target: { value: 'CPT' } });

		await fireEvent.click(screen.getByRole('button', { name: 'Unleash Kinetic' }));
		await waitFor(() => {
			expect(fetchSpy).toHaveBeenCalledWith('/api/getPlayer?gameName=Shmungi&tagLine=CPT');
			expect(goto).toHaveBeenCalledWith('/dashboard');
		});
	});

	it('shows an error message if the API call fails', async () => {
		fetchSpy.mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: 'Not found' })
		} as Response);

		render(SummonerSearch);

		await fireEvent.input(screen.getByLabelText('Summoner Name'), {
			target: { value: 'FakePlayer' }
		});
		await fireEvent.input(screen.getByLabelText('Tagline'), { target: { value: 'NA1' } });
		await fireEvent.click(screen.getByRole('button', { name: 'Unleash Kinetic' }));

		// Changed to match the EXACT string your Svelte code throws ("Player not found")
		expect(await screen.findByText('Player not found')).toBeInTheDocument();
		expect(goto).not.toHaveBeenCalled();
	});
});
