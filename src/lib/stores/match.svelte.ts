import { writable } from 'svelte/store';

export interface Participant {
	puuid: string;
	championName: string;
	kills: number;
	deaths: number;
	assists: number;
	win: boolean;
	totalMinionsKilled: number;
	neutralMinionsKilled: number;
	visionScore: number;
	goldEarned: number;
	totalDamageDealtToChampions: number;
	summonerName: string;
	teamPosition: string; // Added teamPosition for role sorting
}

export interface MatchDetail {
	matchId: string;
	gameDuration: number;
	gameMode: string;
	gameType: string;
	participants: Participant[];
	teams: Array<{
		teamId: number;
		win: boolean;
		objectives: any;
	}>;
}

class MatchState {
	value = $state<MatchDetail | null>(null);
}

export const selectedMatchStore = new MatchState();
