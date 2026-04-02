import { test, expect } from '@playwright/test';

// --- MOCK DATA ---
const mockPlayer = {
	puuid: 'playwright-test-123',
	gameName: 'TestUser',
	tagLine: 'E2E',
	summonerLevel: 99,
	profileIconId: 1,
	tier: 'DIAMOND',
	rank: 'I',
	leaguePoints: 75,
	wins: 100,
	losses: 50
};

const mockMatchesList = [
	{
		matchId: 'EUN1_3930889387',
		gameDuration: 2413,
		championName: 'Veigar',
		teamPosition: 'MIDDLE',
		kills: 5,
		deaths: 5,
		assists: 11,
		win: false,
		cs: 328,
		visionScore: 35,
		tiltScore: 30,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3929023205',
		gameDuration: 1743,
		championName: 'Naafiri',
		teamPosition: 'MIDDLE',
		kills: 13,
		deaths: 2,
		assists: 9,
		win: false,
		cs: 200,
		visionScore: 28,
		tiltScore: 10,
		tiltModifiers: ['1v9 Buffer (-10)', 'Team Diff Buffer (-10)']
	},
	{
		matchId: 'EUN1_3928651029',
		gameDuration: 1725,
		championName: 'Naafiri',
		teamPosition: 'MIDDLE',
		kills: 2,
		deaths: 4,
		assists: 3,
		win: false,
		cs: 212,
		visionScore: 24,
		tiltScore: 30,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3926626932',
		gameDuration: 1762,
		championName: 'Nasus',
		teamPosition: 'TOP',
		kills: 2,
		deaths: 7,
		assists: 3,
		win: false,
		cs: 172,
		visionScore: 40,
		tiltScore: 30,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3926604045',
		gameDuration: 1687,
		championName: 'Veigar',
		teamPosition: 'MIDDLE',
		kills: 7,
		deaths: 4,
		assists: 5,
		win: false,
		cs: 260,
		visionScore: 14,
		tiltScore: 20,
		tiltModifiers: ['Team Diff Buffer (-10)']
	},
	{
		matchId: 'EUN1_3926242211',
		gameDuration: 1458,
		championName: 'Naafiri',
		teamPosition: 'MIDDLE',
		kills: 9,
		deaths: 0,
		assists: 8,
		win: true,
		cs: 223,
		visionScore: 19,
		tiltScore: 0,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3925745448',
		gameDuration: 2345,
		championName: 'Veigar',
		teamPosition: 'MIDDLE',
		kills: 8,
		deaths: 7,
		assists: 10,
		win: true,
		cs: 270,
		visionScore: 35,
		tiltScore: 0,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3925712534',
		gameDuration: 1790,
		championName: 'TahmKench',
		teamPosition: 'TOP',
		kills: 2,
		deaths: 3,
		assists: 7,
		win: true,
		cs: 181,
		visionScore: 30,
		tiltScore: 10,
		tiltModifiers: ['Champion Hopping (+10)']
	},
	{
		matchId: 'EUN1_3924861692',
		gameDuration: 2168,
		championName: 'Veigar',
		teamPosition: 'MIDDLE',
		kills: 8,
		deaths: 8,
		assists: 8,
		win: false,
		cs: 207,
		visionScore: 33,
		tiltScore: 30,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3924315647',
		gameDuration: 1833,
		championName: 'Naafiri',
		teamPosition: 'MIDDLE',
		kills: 5,
		deaths: 5,
		assists: 8,
		win: true,
		cs: 227,
		visionScore: 27,
		tiltScore: 0,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3924292748',
		gameDuration: 1363,
		championName: 'Naafiri',
		teamPosition: 'MIDDLE',
		kills: 2,
		deaths: 2,
		assists: 7,
		win: true,
		cs: 179,
		visionScore: 17,
		tiltScore: 0,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3922441478',
		gameDuration: 2420,
		championName: 'Nasus',
		teamPosition: 'TOP',
		kills: 11,
		deaths: 7,
		assists: 12,
		win: false,
		cs: 236,
		visionScore: 34,
		tiltScore: 30,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3922046669',
		gameDuration: 1625,
		championName: 'Nasus',
		teamPosition: 'TOP',
		kills: 5,
		deaths: 5,
		assists: 10,
		win: true,
		cs: 173,
		visionScore: 29,
		tiltScore: 0,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3921521096',
		gameDuration: 2266,
		championName: 'Veigar',
		teamPosition: 'MIDDLE',
		kills: 7,
		deaths: 3,
		assists: 9,
		win: true,
		cs: 293,
		visionScore: 34,
		tiltScore: 0,
		tiltModifiers: []
	},
	{
		matchId: 'EUN1_3921491400',
		gameDuration: 1770,
		championName: 'DrMundo',
		teamPosition: 'TOP',
		kills: 2,
		deaths: 4,
		assists: 5,
		win: false,
		cs: 228,
		visionScore: 28,
		tiltScore: 40,
		tiltModifiers: ['Champion Hopping (+10)']
	}
];

const mockSingleMatch = {
	matchId: 'EUN1_3930889387',
	gameDuration: 2413,
	gameMode: 'CLASSIC',
	gameType: 'MATCHED_GAME',
	participants: [
		{
			puuid: 'Ncqw_...',
			summonerName: '',
			riotIdGameName: 'Blo0Die',
			riotIdTagline: 'Pompa',
			championName: 'Ornn',
			teamPosition: 'TOP',
			win: false,
			kills: 2,
			deaths: 3,
			assists: 18,
			totalDamageDealtToChampions: 21107,
			totalMinionsKilled: 226,
			neutralMinionsKilled: 7,
			goldEarned: 14323,
			visionScore: 18,
			items: [3068, 2504, 3076, 6665, 2525, 3047, 3363],
			summoner1Id: 4,
			summoner2Id: 12,
			primaryRune: 8437,
			secondaryStyle: 8000
		},
		{
			puuid: '7aWXN...',
			summonerName: '',
			riotIdGameName: 'szalonydkamil52',
			riotIdTagline: 'EUNE',
			championName: 'Viego',
			teamPosition: 'JUNGLE',
			win: false,
			kills: 7,
			deaths: 9,
			assists: 5,
			totalDamageDealtToChampions: 25843,
			totalMinionsKilled: 84,
			neutralMinionsKilled: 186,
			goldEarned: 17239,
			visionScore: 57,
			items: [6672, 6676, 6673, 3033, 3047, 3026, 3340],
			summoner1Id: 4,
			summoner2Id: 11,
			primaryRune: 8010,
			secondaryStyle: 8300
		},
		{
			puuid: 'DtO2s...',
			summonerName: '',
			riotIdGameName: 'Shmungi',
			riotIdTagline: 'ČPT',
			championName: 'Veigar',
			teamPosition: 'MIDDLE',
			win: false,
			kills: 5,
			deaths: 5,
			assists: 11,
			totalDamageDealtToChampions: 31055,
			totalMinionsKilled: 328,
			neutralMinionsKilled: 0,
			goldEarned: 16926,
			visionScore: 35,
			items: [6657, 3171, 3040, 3089, 3135, 3742, 3340],
			summoner1Id: 12,
			summoner2Id: 4,
			primaryRune: 8360,
			secondaryStyle: 8400
		},
		{
			puuid: 'Jmcmm...',
			summonerName: '',
			riotIdGameName: 'Aeron',
			riotIdTagline: 'RKG4',
			championName: 'Ashe',
			teamPosition: 'BOTTOM',
			win: false,
			kills: 17,
			deaths: 6,
			assists: 9,
			totalDamageDealtToChampions: 50811,
			totalMinionsKilled: 297,
			neutralMinionsKilled: 44,
			goldEarned: 24557,
			visionScore: 47,
			items: [3031, 6672, 3046, 3033, 3153, 3085, 3363],
			summoner1Id: 21,
			summoner2Id: 4,
			primaryRune: 8008,
			secondaryStyle: 8300
		},
		{
			puuid: 'e2n-T...',
			summonerName: '',
			riotIdGameName: 'ellinotsigganoss',
			riotIdTagline: '5869',
			championName: 'Nautilus',
			teamPosition: 'UTILITY',
			win: false,
			kills: 1,
			deaths: 6,
			assists: 23,
			totalDamageDealtToChampions: 16557,
			totalMinionsKilled: 35,
			neutralMinionsKilled: 0,
			goldEarned: 11506,
			visionScore: 80,
			items: [3876, 3109, 3190, 3047, 3076, 2504, 3364],
			summoner1Id: 4,
			summoner2Id: 14,
			primaryRune: 8439,
			secondaryStyle: 8300
		},
		{
			puuid: 'FCpJr...',
			summonerName: '',
			riotIdGameName: 'The Hunter',
			riotIdTagline: 'DREAM',
			championName: 'Kayle',
			teamPosition: 'TOP',
			win: true,
			kills: 13,
			deaths: 3,
			assists: 0,
			totalDamageDealtToChampions: 45959,
			totalMinionsKilled: 413,
			neutralMinionsKilled: 30,
			goldEarned: 24514,
			visionScore: 61,
			items: [2510, 4645, 3020, 3115, 3135, 3089, 3363],
			summoner1Id: 4,
			summoner2Id: 12,
			primaryRune: 8008,
			secondaryStyle: 8200
		},
		{
			puuid: 'ufmxN...',
			summonerName: '',
			riotIdGameName: 'petot321',
			riotIdTagline: '4052',
			championName: 'Amumu',
			teamPosition: 'JUNGLE',
			win: true,
			kills: 3,
			deaths: 6,
			assists: 11,
			totalDamageDealtToChampions: 23423,
			totalMinionsKilled: 55,
			neutralMinionsKilled: 205,
			goldEarned: 14760,
			visionScore: 42,
			items: [1033, 6653, 3143, 8020, 6665, 3111, 3364],
			summoner1Id: 4,
			summoner2Id: 11,
			primaryRune: 8010,
			secondaryStyle: 8400
		},
		{
			puuid: 'P4kA5...',
			summonerName: '',
			riotIdGameName: 'Mumflr',
			riotIdTagline: '830',
			championName: 'Pantheon',
			teamPosition: 'MIDDLE',
			win: true,
			kills: 8,
			deaths: 8,
			assists: 3,
			totalDamageDealtToChampions: 39698,
			totalMinionsKilled: 249,
			neutralMinionsKilled: 6,
			goldEarned: 15407,
			visionScore: 38,
			items: [3153, 6610, 3173, 6692, 3036, 3134, 3340],
			summoner1Id: 4,
			summoner2Id: 14,
			primaryRune: 8010,
			secondaryStyle: 8100
		},
		{
			puuid: 'vIDCf...',
			summonerName: '',
			riotIdGameName: 'Vukašin',
			riotIdTagline: 'BLUES',
			championName: 'Sivir',
			teamPosition: 'BOTTOM',
			win: true,
			kills: 4,
			deaths: 8,
			assists: 9,
			totalDamageDealtToChampions: 52409,
			totalMinionsKilled: 319,
			neutralMinionsKilled: 20,
			goldEarned: 17305,
			visionScore: 25,
			items: [3072, 3508, 6675, 3031, 3036, 0, 3363],
			summoner1Id: 4,
			summoner2Id: 21,
			primaryRune: 8008,
			secondaryStyle: 8300
		},
		{
			puuid: 'n93tI...',
			summonerName: '',
			riotIdGameName: 'Ayanami',
			riotIdTagline: '2207',
			championName: 'Soraka',
			teamPosition: 'UTILITY',
			win: true,
			kills: 1,
			deaths: 7,
			assists: 11,
			totalDamageDealtToChampions: 11261,
			totalMinionsKilled: 41,
			neutralMinionsKilled: 0,
			goldEarned: 10409,
			visionScore: 164,
			items: [3870, 3107, 3158, 3504, 6621, 3067, 3364],
			summoner1Id: 4,
			summoner2Id: 3,
			primaryRune: 8214,
			secondaryStyle: 8400
		}
	],
	teams: [
		{
			teamId: 100,
			win: false,
			objectives: { baron: { kills: 3 }, dragon: { kills: 4 }, tower: { kills: 8 } }
		},
		{
			teamId: 200,
			win: true,
			objectives: { baron: { kills: 0 }, dragon: { kills: 2 }, tower: { kills: 9 } }
		}
	]
};

test.describe('Landing Page, Dashboard & Match Details', () => {
	test('shows an error when submitting an empty form', async ({ page }) => {
		await page.goto('/');

		// 1. Click the CTA to reveal/open the search form
		await page.getByRole('link', { name: /start tracking/i }).click();

		// 2. Find the submit button and click it empty
		await page.getByRole('button', { name: /unleash kinetic/i }).click();

		// 3. Verify the error message appeared
		const errorMessage = page.getByText('Please enter both summoner name and tagline');
		await expect(errorMessage).toBeVisible();
	});

	test('successfully searches, views history, and navigates to a match', async ({ page }) => {
		// --- 1. SET UP NETWORK MOCKS ---

		// Mock Player details
		await page.route('**/api/getPlayer*', async (route) => {
			await route.fulfill({ status: 200, json: mockPlayer });
		});

		// Mock Match History (The array of 15 games)
		await page.route('**/api/getMatches*', async (route) => {
			await route.fulfill({ status: 200, json: mockMatchesList });
		});

		// Mock Single Match Details (When user clicks on a game)
		await page.route('**/api/getMatch?matchId=*', async (route) => {
			await route.fulfill({ status: 200, json: mockSingleMatch });
		});

		// --- 2. PERFORM ACTIONS: SEARCH ---
		await page.goto('/');
		await page.getByRole('link', { name: /start tracking/i }).click();
		await page.getByLabel('Summoner Name').fill('TestUser');
		await page.getByLabel('Tagline').fill('E2E');
		await page.getByRole('button', { name: /unleash kinetic/i }).click();

		// --- 3. ASSERTIONS: DASHBOARD / HISTORY ---

		// Verify navigation to dashboard
		await expect(page).toHaveURL(/.*\/dashboard/);

		// Verify Player Info header loaded
		await expect(page.getByRole('heading', { name: 'TestUser #E2E' })).toBeVisible();
		await expect(page.getByText('DIAMOND I').first()).toBeVisible();

		await page.getByRole('link', { name: /match history/i }).click();

		// Verify we actually navigated to the history route
		await expect(page).toHaveURL(/.*\/dashboard\/history/);

		// Verify Match History loaded from our mock data
		// E.g., we expect to see 'Veigar' and 'Naafiri' champions present in the list
		await expect(page.getByText('328 CS').first()).toBeVisible();
		await expect(page.getByText('28 Vision').first()).toBeVisible();

		// We can also verify a specific tilt modifier from our mock data exists!
		await expect(page.getByText('1v9 Buffer (-10)').first()).toBeVisible();

		// --- 4. PERFORM ACTIONS: CLICK INTO MATCH DETAILS ---

		// Find the match link/row for "EUN1_3930889387" (the Veigar game with 5/5/11) and click it
		// If your MatchHistoryRow component wraps the whole row in an anchor tag mapping to the matchId:
		const matchRowToClick = page.getByRole('button').filter({ hasText: '328 CS' }).first();
		await matchRowToClick.click();

		// --- 5. ASSERTIONS: MATCH DETAIL PAGE ---

		// Verify navigation to the match detail page
		await expect(page).toHaveURL(/.*\/dashboard\/history\/EUN1_3930889387/);

		// Verify data from our specific Match Details JSON rendered correctly
		// For example, verifying specific players/champions in the match render on screen:
		await expect(page.getByText('Blo0Die')).toBeVisible(); // The Ornn Top laner
		await expect(page.getByText('szalonydkamil52')).toBeVisible(); // The Viego Jungler

		// Verify the current player's stats are displayed (e.g., 328 CS on Veigar)
		await expect(page.getByText('328').first()).toBeVisible();
	});
});
