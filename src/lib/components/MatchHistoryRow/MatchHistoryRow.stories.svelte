<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MatchHistoryRow from './MatchHistoryRow.svelte';
	import type { MatchSummary } from '$lib/types';

	const { Story } = defineMeta({
		title: 'Components/MatchHistoryRow',
		component: MatchHistoryRow
	});

	// Mock data for a Victory
	const mockVictory: MatchSummary = {
		matchId: 'EUW1_123',
		gameDuration: 1845, // ~30 mins
		championName: 'LeeSin',
		kills: 12,
		deaths: 2,
		assists: 14,
		win: true,
		cs: 165,
		visionScore: 42
	};

	// Mock data for a Defeat
	const mockDefeat: MatchSummary = {
		...mockVictory,
		matchId: 'EUW1_456',
		gameDuration: 2100, // ~35 mins
		championName: 'Yasuo',
		kills: 2,
		deaths: 10,
		assists: 4,
		win: false,
		cs: 120,
		visionScore: 12
	};
</script>

<Story name="Victory" args={{ match: mockVictory }}>
	{#snippet template(args)}
		<div class="w-full max-w-xl bg-surface-lowest p-6">
			<MatchHistoryRow match={args.match} onclick={() => console.log('Match Clicked!')} />
		</div>
	{/snippet}
</Story>

<Story name="Defeat" args={{ match: mockDefeat }}>
	{#snippet template(args)}
		<div class="w-full max-w-xl bg-surface-lowest p-6">
			<MatchHistoryRow match={args.match} onclick={() => console.log('Match Clicked!')} />
		</div>
	{/snippet}
</Story>
