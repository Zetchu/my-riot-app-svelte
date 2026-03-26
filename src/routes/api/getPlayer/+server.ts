import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';

export async function GET({ url }) {
	const gameName = url.searchParams.get('gameName');
	const tagLine = url.searchParams.get('tagLine');

	if (!gameName || !tagLine) {
		return json({ error: 'Missing gameName or tagLine' }, { status: 400 });
	}

	try {
		const headers = { 'X-Riot-Token': RIOT_API_KEY };

		// --- HOP 1: Get PUUID (Regional Routing) ---
		const region = 'europe';
		const accountUrl = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
		const accountRes = await fetch(accountUrl, { headers });

		if (!accountRes.ok)
			return json({ error: 'Player not found in Riot system' }, { status: accountRes.status });
		const accountData = await accountRes.json();
		const puuid = accountData.puuid;

		// --- HOP 2: Get Profile Info (Platform Routing) ---
		const platform = 'eun1'; // e.g., na1, euw1, eun1
		const summonerUrl = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
		const summonerRes = await fetch(summonerUrl, { headers });

		if (!summonerRes.ok)
			return json({ error: 'Failed to fetch summoner profile' }, { status: summonerRes.status });
		const summonerData = await summonerRes.json();
		const summonerId = summonerData.id; // This is the encrypted ID needed for Ranked stats

		// --- HOP 3: Get Ranked Stats (Platform Routing) ---
		const leagueUrl = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
		const leagueRes = await fetch(leagueUrl, { headers });

		if (!leagueRes.ok)
			return json({ error: 'Failed to fetch ranked stats' }, { status: leagueRes.status });
		const leagueData = await leagueRes.json();

		// The API returns an array of all queues (Solo/Duo, Flex, TFT). We want to find Solo/Duo.
		const soloQueue = leagueData.find((queue: any) => queue.queueType === 'RANKED_SOLO_5x5');

		// --- Assemble the Final Payload ---
		return json({
			// Core Identity
			puuid: puuid,
			gameName: accountData.gameName,
			tagLine: accountData.tagLine,

			// Profile Info
			summonerLevel: summonerData.summonerLevel,
			profileIconId: summonerData.profileIconId,

			// Ranked Stats (Will be null if they are unranked)
			tier: soloQueue ? soloQueue.tier : 'UNRANKED',
			rank: soloQueue ? soloQueue.rank : '',
			leaguePoints: soloQueue ? soloQueue.leaguePoints : 0,
			wins: soloQueue ? soloQueue.wins : 0,
			losses: soloQueue ? soloQueue.losses : 0
		});
	} catch (error) {
		console.error('API Hop Error:', error);
		return json({ error: 'Server error while fetching player data' }, { status: 500 });
	}
}
