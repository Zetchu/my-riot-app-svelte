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
		const idsUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&type=ranked`;
		const idsResponse = await fetch(idsUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });

		if (!idsResponse.ok)
			return json({ error: 'Failed to fetch match IDs' }, { status: idsResponse.status });
		const matchIds = await idsResponse.json();

		const cleanData = [];
		const previousChamps: string[] = []; // Array to track Champion Hopping

		// Use a for...of loop instead of Promise.all to respect rate limits
		for (const matchId of matchIds) {
			// 1. Stagger requests by 50ms to prevent 429 Rate Limits
			await new Promise((resolve) => setTimeout(resolve, 50));

			// 2. Fetch Match Data
			const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
			const matchRes = await fetch(matchUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });
			const match = await matchRes.json();

			// 3. Fetch Timeline Data
			const timelineUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
			const timelineRes = await fetch(timelineUrl, { headers: { 'X-Riot-Token': RIOT_API_KEY } });
			const timeline = await timelineRes.json();

			// 4. Identify the Player and Team
			const participant = match.info.participants.find(
				(p: MatchParticipantDto) => p.puuid === puuid
			);
			const teamId = participant.teamId;
			const teamMates = match.info.participants.filter(
				(p: { teamId: number }) => p.teamId === teamId
			);

			// --- TILT ENGINE CALCULATIONS ---
			let tiltScore = participant.win ? 0 : +30; // Base score
			const tiltModifiers = [];

			if (!participant.win) {
				// A. Stomp Penalty (Game under 20 mins)
				if (match.info.gameDuration < 1200) {
					tiltScore += 15;
					tiltModifiers.push('Stomp Penalty (+15)');
				}

				// B. 1v9 Buffer (Player KDA vs Team Average KDA)
				const playerKDA =
					(participant.kills + participant.assists) / Math.max(1, participant.deaths);
				let teamTotalKills = 0,
					teamTotalDeaths = 0,
					teamTotalAssists = 0;

				teamMates.forEach((tm: { kills: number; deaths: number; assists: number }) => {
					teamTotalKills += tm.kills;
					teamTotalDeaths += tm.deaths;
					teamTotalAssists += tm.assists;
				});

				const teamAvgKDA = (teamTotalKills + teamTotalAssists) / Math.max(1, teamTotalDeaths);

				if (playerKDA > teamAvgKDA + 1.5) {
					tiltScore -= 10;
					tiltModifiers.push('1v9 Buffer (-10)');
				}

				// C. Team Disparity Buffer (15-Minute Gold)
				// Make sure the game actually lasted 15 minutes before checking!
				if (timeline.info.frames.length > 15) {
					const frame15 = timeline.info.frames[15].participantFrames;
					const playerTimelineId = participant.participantId;
					const playerGoldAt15 = frame15[playerTimelineId].totalGold;

					let teamTotalGoldAt15 = 0;
					teamMates.forEach((tm: { participantId: number }) => {
						teamTotalGoldAt15 += frame15[tm.participantId].totalGold;
					});
					const teamAvgGoldAt15 = teamTotalGoldAt15 / 5;

					if (playerGoldAt15 > teamAvgGoldAt15 + 500) {
						tiltScore -= 10;
						tiltModifiers.push('Team Diff Buffer (-10)');
					}
				}
			}

			// D. Champion Hopping Penalty (Session behavior)
			if (!previousChamps.includes(participant.championName)) {
				previousChamps.push(participant.championName);
				// If they've played more than 3 different champs in recent games
				if (previousChamps.length > 3) {
					tiltScore += 10;
					tiltModifiers.push('Champion Hopping (+10)');
				}
			}

			// Clamp tilt score so it doesn't go below 0
			tiltScore = Math.max(0, tiltScore);

			// 5. Push clean data to frontend
			cleanData.push({
				matchId: match.metadata.matchId,
				gameDuration: match.info.gameDuration,
				championName: participant.championName,
				teamPosition: participant.teamPosition,
				kills: participant.kills,
				deaths: participant.deaths,
				assists: participant.assists,
				win: participant.win,
				cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
				visionScore: participant.visionScore,
				tiltScore,
				tiltModifiers
			});
		}

		return json(cleanData);
	} catch (error) {
		console.error('Failed to fetch matches:', error);
		return json({ error: 'Server error processing matches' }, { status: 500 });
	}
}
