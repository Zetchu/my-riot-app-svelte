import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';

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
		const participants = match.info.participants.map((p: any) => ({
			puuid: p.puuid,
			championName: p.championName,
			kills: p.kills,
			deaths: p.deaths,
			assists: p.assists,
			win: p.win,
			totalMinionsKilled: p.totalMinionsKilled,
			neutralMinionsKilled: p.neutralMinionsKilled,
			visionScore: p.visionScore,
			goldEarned: p.goldEarned,
			damageDealtToChampions: p.damageDealtToChampions,
			summonerName: p.summonerName,
			lane: p.lane,
			role: p.role
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
