import { writable } from 'svelte/store';

export interface SummonerData {
	gameName: string;
	tagLine: string;
	puuid: string;
}

export const summonerStore = writable<SummonerData | null>(null);
