<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProfileHeader from './ProfileHeader.svelte';

	const { Story } = defineMeta({
		title: 'Dashboard/ProfileHeader',
		component: ProfileHeader,
		// This automatically generates the docs page!
		tags: ['autodocs'],
		parameters: {
			layout: 'padded' // Gives it some breathing room instead of touching the edges
		}
	});
</script>

<script lang="ts">
	const rankedPlayer = {
		profileIconId: 508,
		summonerLevel: 420,
		gameName: 'Hide on bush',
		tagLine: 'KR1',
		tier: 'CHALLENGER',
		rank: 'I',
		leaguePoints: 1250,
		wins: 154,
		losses: 82
	};

	const unrankedPlayer = {
		profileIconId: 29,
		summonerLevel: 28,
		gameName: 'New Player',
		tagLine: 'NA1',
		tier: 'UNRANKED',
		wins: 0,
		losses: 0
	};
</script>

<Story name="Ranked Challenger" args={{ player: rankedPlayer }}>
	{#snippet template(args)}
		<div class="max-w-5xl bg-surface-lowest p-8">
			<ProfileHeader {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Unranked Player" args={{ player: unrankedPlayer }}>
	{#snippet template(args)}
		<div class="max-w-5xl bg-surface-lowest p-8">
			<ProfileHeader {...args} />
		</div>
	{/snippet}
</Story>
