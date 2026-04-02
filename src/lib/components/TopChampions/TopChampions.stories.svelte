<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TopChampions from './TopChampions.svelte';
	import type { MatchSummary } from '$lib/types';

	const { Story } = defineMeta({
		title: 'Dashboard/TopChampions',
		component: TopChampions,
		tags: ['autodocs'],
		parameters: {
			layout: 'padded'
		}
	});
</script>

<script lang="ts">
	// Mock match data specifically formatted to test the aggregation engine
	const mockMatches = [
		{ championName: 'Ahri', win: true, kills: 10, deaths: 2, assists: 8 },
		{ championName: 'Ahri', win: true, kills: 8, deaths: 1, assists: 12 },
		{ championName: 'Ahri', win: false, kills: 5, deaths: 6, assists: 4 },
		{ championName: 'LeeSin', win: true, kills: 12, deaths: 4, assists: 10 },
		{ championName: 'LeeSin', win: false, kills: 3, deaths: 8, assists: 5 },
		{ championName: 'Jinx', win: true, kills: 15, deaths: 3, assists: 7 }
	] as MatchSummary[];
</script>

<Story name="Populated Data" args={{ matches: mockMatches }}>
	{#snippet template(args)}
		<div class="max-w-2xl bg-surface-lowest p-8">
			<TopChampions {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Empty State (Skeletons)" args={{ matches: [] }}>
	{#snippet template(args)}
		<div class="max-w-2xl bg-surface-lowest p-8">
			<TopChampions {...args} />
		</div>
	{/snippet}
</Story>
