import { writable } from 'svelte/store';

export interface SummonerData {
	gameName: string;
	tagLine: string;
	puuid: string;
}

// Create a reactive class
class SummonerState {
	value = $state<SummonerData | null>(null);
}

// Export a single, globally reactive instance
export const summonerStore = new SummonerState();
