import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte';
import { goto } from '$app/navigation';
import SummonerSearch from './SummonerSearch.svelte';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

// 1. Use vi.spyOn instead of global.fetch = vi.fn().
// This automatically preserves all of TypeScript's native fetch types!
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

		expect(screen.getByText('Please enter both summoner name and tagline')).toBeInTheDocument();

		// 2. Assert against the typed spy
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

		// 3. Cast the return value `as Response` so TS knows it's valid
		fetchSpy.mockResolvedValueOnce({
			ok: true,
			json: async () => mockPlayerData
		} as Response);

		render(SummonerSearch);

		await fireEvent.input(screen.getByLabelText('Summoner Name'), { target: { value: 'Shmungi' } });
		await fireEvent.input(screen.getByLabelText('Tagline'), { target: { value: 'CPT' } });

		await fireEvent.click(screen.getByRole('button', { name: 'Unleash Kinetic' }));

		expect(fetchSpy).toHaveBeenCalledWith('/api/getPlayer?gameName=Shmungi&tagLine=CPT');
		expect(goto).toHaveBeenCalledWith('/dashboard');
	});

	it('shows an error message if the API call fails', async () => {
		// 4. Cast the failure return value `as Response` as well
		fetchSpy.mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: 'Player not found in Riot system' })
		} as Response);

		render(SummonerSearch);

		await fireEvent.input(screen.getByLabelText('Summoner Name'), {
			target: { value: 'FakePlayer' }
		});
		await fireEvent.input(screen.getByLabelText('Tagline'), { target: { value: 'NA1' } });
		await fireEvent.click(screen.getByRole('button', { name: 'Unleash Kinetic' }));

		expect(await screen.findByText('Player not found in Riot system')).toBeInTheDocument();
		expect(goto).not.toHaveBeenCalled();
	});
});
