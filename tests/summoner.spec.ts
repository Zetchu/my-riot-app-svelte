import { test, expect } from '@playwright/test';
import { mockMatchesList, mockPlayer, mockSingleMatch } from './mockData';

test.describe('Landing Page, Dashboard & Match Details', () => {
	test('shows an error when submitting an empty form', async ({ page }) => {
		await test.step('Navigate to landing page and open search form', async () => {
			await page.goto('/');
			await page.getByRole('link', { name: /start tracking/i }).click();
		});

		await test.step('Submit an empty form', async () => {
			await page.getByRole('button', { name: /unleash kinetic/i }).click();
		});

		await test.step('Verify validation error message appears', async () => {
			const errorMessage = page.getByText('Please enter both summoner name and tagline');
			await expect(errorMessage).toBeVisible();
		});
	});

	test('successfully searches, views history, navigates to a match and opens tilt dialog', async ({
		page
	}) => {
		await test.step('Set up network mocks', async () => {
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
		});

		await test.step('Perform search for a summoner', async () => {
			await page.goto('/');
			await page.getByRole('link', { name: /start tracking/i }).click();
			await page.getByLabel('Summoner Name').fill('TestUser');
			await page.getByLabel('Tagline').fill('E2E');
			await page.getByRole('button', { name: /unleash kinetic/i }).click();
		});

		await test.step('Verify Dashboard loads correctly', async () => {
			await expect(page).toHaveURL(/.*\/dashboard/);
			await expect(page.getByRole('heading', { name: 'TestUser #E2E' })).toBeVisible();
			await expect(page.getByText('DIAMOND I').first()).toBeVisible();
		});

		await test.step('Navigate to Match History and verify list', async () => {
			await page.getByRole('link', { name: /match history/i }).click();
			await expect(page).toHaveURL(/.*\/dashboard\/history/);

			await expect(page.getByText('328 CS').first()).toBeVisible();
			await expect(page.getByText('28 Vision').first()).toBeVisible();
			await expect(page.getByText('1v9 Buffer (-10)').first()).toBeVisible();
		});

		await test.step('Click into specific match details', async () => {
			const matchRowToClick = page.getByRole('button').filter({ hasText: '328 CS' }).first();
			await matchRowToClick.click();
		});

		await test.step('Verify Match Detail Page loaded', async () => {
			await expect(page).toHaveURL(/.*\/dashboard\/history\/EUN1_3930889387/);

			await expect(page.getByText('Blo0Die')).toBeVisible();
			await expect(page.getByText('szalonydkamil52')).toBeVisible();
			await expect(page.getByText('328').first()).toBeVisible();
		});

		await test.step('Open and verify Tilt Breakdown Dialog', async () => {
			// 1. Click the dynamic Tilt Button in the match header
			await page.getByRole('button', { name: /Tilt: 30/i }).click();

			// 2. Ensure the `<dialog>` element successfully rendered and is visible
			const dialog = page.getByRole('dialog');
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('heading', { name: 'Tilt Breakdown' })).toBeVisible();

			// 3. Verify the math breakdown for a Loss (+30 base score)
			await expect(dialog.getByText('Base Result (Loss)')).toBeVisible();
			await expect(dialog.getByText('+30')).toBeVisible();

			// 4. Verify the fallback text since this specific mock match has no modifiers
			await expect(dialog.getByText('This was a standard game.')).toBeVisible();
		});

		await test.step('Close the Tilt Breakdown Dialog', async () => {
			const dialog = page.getByRole('dialog');
			await dialog.getByRole('button', { name: 'Got it' }).click();
			await expect(dialog).not.toBeVisible();
		});
		await test.step('Navigate back to Match History', async () => {
			await page.getByRole('button', { name: '← Back' }).click();
			await expect(page).toHaveURL(/.*\/dashboard\/history/);
		});

		await test.step('Search for a different summoner', async () => {
			await page.getByRole('button', { name: 'Sync New Summoner' }).click();
			await page.getByRole('link', { name: /start tracking/i }).click();
			await expect(page).toHaveURL(/.*\/dashboard/);
		});
	});
});
