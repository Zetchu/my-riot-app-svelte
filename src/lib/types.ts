// src/lib/types.ts

// --- SUMMONER & PROFILE TYPES ---
export interface SummonerData {
	puuid: string;
	gameName: string;
	tagLine: string;
	summonerLevel: number;
	profileIconId: number;
	tier: string;
	rank: string;
	leaguePoints: number;
	wins: number;
	losses: number;
}

export interface LeagueEntry {
	queueType: string;
	tier: string;
	rank: string;
	leaguePoints: number;
	wins: number;
	losses: number;
}

// --- MATCH TYPES ---
export interface Objective {
	first: boolean;
	kills: number;
}

export interface Participant {
	puuid: string;
	summonerName: string;
	riotIdGameName: string;
	riotIdTagline: string;
	championName: string;
	teamPosition: string;
	win: boolean;
	kills: number;
	deaths: number;
	assists: number;
	totalDamageDealtToChampions: number;
	totalMinionsKilled: number;
	neutralMinionsKilled: number;
	goldEarned: number;
	visionScore: number;
	items: number[];
	summoner1Id: number;
	summoner2Id: number;
	primaryRune: number | null;
	secondaryStyle: number | null;
}

export interface MatchDetail {
	matchId: string;
	gameDuration: number;
	gameMode: string;
	gameType: string;
	patchVersion: string;
	participants: Participant[];
	teams: Array<{
		teamId: number;
		win: boolean;
		objectives: {
			baron: Objective;
			champion: Objective;
			dragon: Objective;
			inhibitor: Objective;
			riftHerald: Objective;
			tower: Objective;
			horde?: Objective;
			atakhan?: Objective;
		};
	}>;
}

// --- RAW RIOT API DTOs (Data Transfer Objects) ---
// Used only in the backend to type the incoming messy Riot JSON
export interface RiotParticipantDto {
	puuid: string;
	summonerName: string;
	riotIdGameName: string;
	riotIdTagline: string;
	championName: string;
	teamPosition: string;
	win: boolean;
	kills: number;
	deaths: number;
	assists: number;
	totalDamageDealtToChampions: number;
	totalMinionsKilled: number;
	neutralMinionsKilled: number;
	goldEarned: number;
	visionScore: number;
	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	summoner1Id: number;
	summoner2Id: number;
	perks?: {
		styles?: Array<{
			style: number;
			selections?: Array<{ perk: number }>;
		}>;
	};
}

export interface MatchParticipantDto {
	puuid: string;
	championName: string;
	kills: number;
	deaths: number;
	assists: number;
	win: boolean;
	totalMinionsKilled: number;
	neutralMinionsKilled: number;
	visionScore: number;
}
