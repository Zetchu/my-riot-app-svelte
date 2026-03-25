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
	damageDealtToChampions: number;
	summonerName: string;
	lane: string;
	role: string;
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

export const selectedMatchStore = writable<MatchDetail | null>(null);
