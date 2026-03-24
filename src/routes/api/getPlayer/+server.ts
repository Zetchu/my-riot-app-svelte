import { json } from '@sveltejs/kit';
import { RIOT_API_KEY } from '$env/static/private';

export async function GET({ url }) {
	// 1. Grab the name and tag the user typed in the frontend
	const gameName = url.searchParams.get('gameName');
	const tagLine = url.searchParams.get('tagLine');

	if (!gameName || !tagLine) {
		return json({ error: 'Missing gameName or tagLine' }, { status: 400 });
	}

	try {
		// 2. Make the secure call to Riot's Account API
		// Note: Account-V1 uses regional routing (europe, americas, asia) i need to change this to be dynamic based on the player's region in the future
		const riotUrl = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;

		const response = await fetch(riotUrl, {
			headers: {
				'X-Riot-Token': RIOT_API_KEY
			}
		});

		if (!response.ok) {
			return json({ error: 'Player not found or Riot API error' }, { status: response.status });
		}

		const data = await response.json();

		// 3. Send the clean data back
		return json(data);
	} catch (error) {
		return json({ error: 'Server error' }, { status: 500 });
	}
}
