export interface SummonerData {
	// Core Identity
	puuid: string;
	gameName: string;
	tagLine: string;

	// Profile Info
	summonerLevel: number;
	profileIconId: number;

	// Ranked Stats
	tier: string;
	rank: string;
	leaguePoints: number;
	wins: number;
	losses: number;
}

// Create a reactive class
class SummonerState {
	value = $state<SummonerData | null>(null);
}

// Export a single, globally reactive instance
export const summonerStore = new SummonerState();
