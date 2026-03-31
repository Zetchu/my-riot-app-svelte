import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';
import type { MatchParticipantDto } from '$lib/types';

export async function GET({ url }) {
	const puuid = url.searchParams.get('puuid');
	// Note: Match-V5 uses large routing regions (europe, americas, asia).
	// Change 'europe' below to match your account's region!
	const region = 'europe';

	if (!puuid) return json({ error: 'Missing puuid' }, { status: 400 });

	// 1. Grab the raw strings from the URL
	const rawStart = url.searchParams.get('start');
	const rawCount = url.searchParams.get('count');

	// 2. Safely parse them into integers (falling back to defaults if missing)
	let start = parseInt(rawStart || '0', 10);
	let count = parseInt(rawCount || '5', 10);

	// 3. Validate: If they typed letters instead of numbers, or negative numbers, reset to defaults
	if (isNaN(start) || start < 0) start = 0;
	if (isNaN(count) || count < 1) count = 5;

	// 4. THE CLAMP: Hard-cap the count at 15 to protect our Riot Rate Limits
	count = Math.min(count, 15);

	try {
		// 1. Get the Match IDs (using our newly cleaned variables!)
		const idsUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&type=ranked`;
		const idsResponse = await fetch(idsUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });

		if (!idsResponse.ok)
			return json({ error: 'Failed to fetch match IDs' }, { status: idsResponse.status });
		const matchIds = await idsResponse.json();

		// 2. Fetch the details for all the matches simultaneously
		const matchPromises = matchIds.map(async (matchId: string) => {
			const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
			const matchRes = await fetch(matchUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });
			return matchRes.json();
		});

		// Wait for all matches to finish downloading
		const fullMatches = await Promise.all(matchPromises);

		const cleanData = fullMatches.map((match) => {
			// Find our specific player in the 10-person participant array
			const participant = match.info.participants.find(
				(p: MatchParticipantDto) => p.puuid === puuid
			);

			return {
				matchId: match.metadata.matchId,
				gameDuration: match.info.gameDuration,
				championName: participant.championName,
				teamPosition: participant.teamPosition,
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
