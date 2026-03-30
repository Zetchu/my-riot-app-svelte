import { test, expect } from '@playwright/test';

test.describe('Landing Page Search', () => {
	test('shows an error when submitting an empty form', async ({ page }) => {
		await page.goto('/');

		// 1. Click the CTA to reveal/open the search form
		// (Using a case-insensitive regex /start tracking/i makes it bulletproof)
		await page.getByRole('link', { name: /start tracking/i }).click();

		// 2. Find the submit button and click it empty
		await page.getByRole('button', { name: /unleash kinetic/i }).click();

		// 3. Verify the error message appeared
		const errorMessage = page.getByText('Please enter both summoner name and tagline');
		await expect(errorMessage).toBeVisible();
	});

	test('successfully searches and navigates to the dashboard', async ({ page }) => {
		// --- 1. MOCK THE API ---
		await page.route('**/api/getPlayer*', async (route) => {
			await route.fulfill({
				status: 200,
				json: {
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
				}
			});
		});

		await page.route('**/api/getMatches*', async (route) => {
			await route.fulfill({ status: 200, json: [] });
		});

		// --- 2. PERFORM ACTIONS ---
		await page.goto('/');

		// 1. Click the CTA to reveal/open the search form!
		await page.getByRole('link', { name: /start tracking/i }).click();

		// 2. Fill out the inputs
		await page.getByLabel('Summoner Name').fill('TestUser');
		await page.getByLabel('Tagline').fill('E2E');

		// 3. Click the search button
		await page.getByRole('button', { name: /unleash kinetic/i }).click();

		// --- 3. ASSERTIONS ---
		await expect(page).toHaveURL(/.*\/dashboard/);

		// 1. Verify the massive Dashboard Header (H1) loaded correctly
		await expect(page.getByRole('heading', { name: 'TestUser #E2E' })).toBeVisible();

		// 2. Verify the Sidebar Profile Badge loaded correctly by grabbing the first instance of the text
		await expect(page.getByText('DIAMOND I').first()).toBeVisible();

		// (Optional) We can also verify the Win Rate calculated correctly from our fake 100W / 50L data!
		await expect(page.getByText('67%')).toBeVisible();
	});
});
