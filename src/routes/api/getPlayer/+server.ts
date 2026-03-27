import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';
import type { LeagueEntry } from '$lib/types';

export async function GET({ url }) {
	const gameName = url.searchParams.get('gameName');
	const tagLine = url.searchParams.get('tagLine');

	if (!gameName || !tagLine) {
		return json({ error: 'Missing gameName or tagLine' }, { status: 400 });
	}

	try {
		const headers = { 'X-Riot-Token': RIOT_API_KEY };

		// --- HOP 1: Get PUUID (Regional) ---
		const region = 'europe';
		const accountUrl = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
		const accountRes = await fetch(accountUrl, { headers });

		if (!accountRes.ok)
			return json({ error: 'Player not found in Riot system' }, { status: accountRes.status });
		const accountData = await accountRes.json();
		const puuid = accountData.puuid;

		// --- HOPS 2 & 3: Parallel Fetching (Platform) ---
		const platform = 'eun1';

		// We launch both requests at the exact same time
		const summonerPromise = fetch(
			`https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
			{ headers }
		);
		const leaguePromise = fetch(
			`https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
			{ headers }
		); // Your updated endpoint!

		// Wait for both to finish simultaneously
		const [summonerRes, leagueRes] = await Promise.all([summonerPromise, leaguePromise]);

		if (!summonerRes.ok)
			return json({ error: 'Failed to fetch summoner profile' }, { status: summonerRes.status });

		const summonerData = await summonerRes.json();
		let soloQueue = null;

		// Safety check for League data, just in case they are unranked
		if (leagueRes.ok) {
			const leagueData = await leagueRes.json();
			soloQueue = leagueData.find((queue: LeagueEntry) => queue.queueType === 'RANKED_SOLO_5x5');
		}

		// --- Assemble the Final Payload ---
		return json({
			puuid: puuid,
			gameName: accountData.gameName,
			tagLine: accountData.tagLine,
			summonerLevel: summonerData.summonerLevel,
			profileIconId: summonerData.profileIconId,

			tier: soloQueue ? soloQueue.tier : 'UNRANKED',
			rank: soloQueue ? soloQueue.rank : '',
			leaguePoints: soloQueue ? soloQueue.leaguePoints : 0,
			wins: soloQueue ? soloQueue.wins : 0,
			losses: soloQueue ? soloQueue.losses : 0
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Server error while fetching player data' }, { status: 500 });
	}
}
