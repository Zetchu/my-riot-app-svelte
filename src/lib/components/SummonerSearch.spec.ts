import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte';
import { goto } from '$app/navigation';
import SummonerSearch from './SummonerSearch.svelte';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

global.fetch = vi.fn();

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
		expect(fetch).not.toHaveBeenCalled();
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

		(global.fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockPlayerData
		});

		render(SummonerSearch);

		await fireEvent.input(screen.getByLabelText('Summoner Name'), { target: { value: 'Shmungi' } });
		await fireEvent.input(screen.getByLabelText('Tagline'), { target: { value: 'CPT' } });

		await fireEvent.click(screen.getByRole('button', { name: 'Unleash Kinetic' }));

		expect(fetch).toHaveBeenCalledWith('/api/getPlayer?gameName=Shmungi&tagLine=CPT');
		expect(goto).toHaveBeenCalledWith('/dashboard');
	});

	it('shows an error message if the API call fails', async () => {
		(global.fetch as any).mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: 'Player not found in Riot system' })
		});

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
