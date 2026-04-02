<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RoleDistribution from './RoleDistribution.svelte';
	import type { MatchSummary } from '$lib/types';

	const { Story } = defineMeta({
		title: 'Dashboard/RoleDistribution',
		component: RoleDistribution,
		tags: ['autodocs'],
		parameters: {
			layout: 'padded'
		}
	});
</script>

<script lang="ts">
	// Mock match data emphasizing different roles
	const mockMatches = [
		{ teamPosition: 'MIDDLE', win: true },
		{ teamPosition: 'MIDDLE', win: true },
		{ teamPosition: 'MIDDLE', win: false },
		{ teamPosition: 'JUNGLE', win: true },
		{ teamPosition: 'JUNGLE', win: false },
		{ teamPosition: 'BOTTOM', win: true },
		{ teamPosition: 'UNKNOWN', win: true } // Testing ARAM/Arena fallback
	] as MatchSummary[];
</script>

<Story name="Populated Data" args={{ matches: mockMatches }}>
	{#snippet template(args)}
		<div class="max-w-md bg-surface-lowest p-8">
			<RoleDistribution {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Empty State (Skeletons)" args={{ matches: [] }}>
	{#snippet template(args)}
		<div class="max-w-md bg-surface-lowest p-8">
			<RoleDistribution {...args} />
		</div>
	{/snippet}
</Story>
