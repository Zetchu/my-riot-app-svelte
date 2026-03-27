import type { SummonerData } from '$lib/types';

// Create a reactive class
class SummonerState {
	value = $state<SummonerData | null>(null);
}

// Export a single, globally reactive instance
export const summonerStore = new SummonerState();
