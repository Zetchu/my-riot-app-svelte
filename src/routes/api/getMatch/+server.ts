import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';
import type { RiotParticipantDto } from '$lib/types';

export async function GET({ url }) {
	const matchId = url.searchParams.get('matchId');
	const region = 'europe';

	if (!matchId) return json({ error: 'Missing matchId' }, { status: 400 });

	try {
		// Fetch full match details
		const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
		const matchRes = await fetch(matchUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });

		if (!matchRes.ok) return json({ error: 'Failed to fetch match' }, { status: matchRes.status });

		const match = await matchRes.json();

		// Extract all 10 participants with their stats
		const participants = match.info.participants.map((p: RiotParticipantDto) => ({
			puuid: p.puuid,
			summonerName: p.summonerName,
			riotIdGameName: p.riotIdGameName, // NEW
			riotIdTagline: p.riotIdTagline,
			championName: p.championName,
			teamPosition: p.teamPosition, // Replaces role/lane
			win: p.win,

			// KDA & Combat
			kills: p.kills,
			deaths: p.deaths,
			assists: p.assists,
			totalDamageDealtToChampions: p.totalDamageDealtToChampions,

			// Econ & Vision
			totalMinionsKilled: p.totalMinionsKilled,
			neutralMinionsKilled: p.neutralMinionsKilled,
			goldEarned: p.goldEarned,
			visionScore: p.visionScore,

			// --- NEW DATA BELOW ---

			// Grouping items 0-6 into an array (item6 is the vision trinket)
			items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6],

			// Summoner Spells (e.g., Flash, Ignite)
			summoner1Id: p.summoner1Id,
			summoner2Id: p.summoner2Id,

			// Runes (Perks)
			primaryRune: p.perks?.styles?.[0]?.selections?.[0]?.perk || null,
			secondaryStyle: p.perks?.styles?.[1]?.style || null
		}));

		return json({
			matchId: match.metadata.matchId,
			gameDuration: match.info.gameDuration,
			gameMode: match.info.gameMode,
			gameType: match.info.gameType,
			participants,
			teams: match.info.teams
		});
	} catch (error) {
		console.error(error);
		return json({ error: 'Server error fetching match' }, { status: 500 });
	}
}
