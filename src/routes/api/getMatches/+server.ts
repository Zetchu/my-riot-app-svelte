import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';
import type { MatchParticipantDto } from '$lib/types';

export async function GET({ url }) {
	const puuid = url.searchParams.get('puuid');
	// Note: Match-V5 uses large routing regions (europe, americas, asia).
	// Change 'europe' below to match your account's region!
	const start = url.searchParams.get('start') || '0';
	const count = url.searchParams.get('count') || '5';
	const region = 'europe';

	if (!puuid) return json({ error: 'Missing puuid' }, { status: 400 });

	try {
		// 1. Get the last 5 Match IDs
		const idsUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&type=ranked`;
		const idsResponse = await fetch(idsUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });

		if (!idsResponse.ok)
			return json({ error: 'Failed to fetch match IDs' }, { status: idsResponse.status });
		const matchIds = await idsResponse.json();

		// 2. Fetch the details for all 5 matches simultaneously
		const matchPromises = matchIds.map(async (matchId: string) => {
			const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
			const matchRes = await fetch(matchUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });
			return matchRes.json();
		});

		// Wait for all 5 matches to finish downloading
		const fullMatches = await Promise.all(matchPromises);

		// 3. (Optional but recommended) Clean up the massive Riot payload
		// Riot sends back thousands of lines of JSON per game. We only want YOUR player's stats.
		const cleanData = fullMatches.map((match) => {
			// Find our specific player in the 10-person participant array
			const participant = match.info.participants.find(
				(p: MatchParticipantDto) => p.puuid === puuid
			);

			return {
				matchId: match.metadata.matchId,
				gameDuration: match.info.gameDuration,
				championName: participant.championName,
				kills: participant.kills,
				deaths: participant.deaths,
				assists: participant.assists,
				win: participant.win,
				cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
				visionScore: participant.visionScore
			};
		});

		return json(cleanData);
	} catch (error) {
		console.error('Failed to fetch matches:', error);
		return json({ error: 'Server error processing matches' }, { status: 500 });
	}
}
