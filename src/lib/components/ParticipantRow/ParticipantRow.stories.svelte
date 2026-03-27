<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ParticipantRow from './ParticipantRow.svelte';
	import type { Participant } from '$lib/types';

	const { Story } = defineMeta({
		title: 'Components/ParticipantRow',
		component: ParticipantRow
	});

	const mockCarry: Participant = {
		puuid: '123',
		summonerName: 'Faker',
		riotIdGameName: 'Hide on bush',
		riotIdTagline: 'KR1',
		championName: 'Ahri',
		teamPosition: 'MIDDLE',
		win: true,
		kills: 14,
		deaths: 2,
		assists: 8,
		totalDamageDealtToChampions: 45200,
		totalMinionsKilled: 210,
		neutralMinionsKilled: 24,
		goldEarned: 16400,
		visionScore: 32,
		items: [3152, 3020, 3089, 3157, 1056, 0, 3340], // Example item IDs
		summoner1Id: 4,
		summoner2Id: 14,
		primaryRune: 8112,
		secondaryStyle: 8200
	};

	const mockSupport: Participant = {
		...mockCarry,
		championName: 'Nami',
		teamPosition: 'UTILITY',
		kills: 1,
		deaths: 4,
		assists: 22,
		totalDamageDealtToChampions: 8400,
		totalMinionsKilled: 12,
		neutralMinionsKilled: 0,
		goldEarned: 7200,
		visionScore: 84,
		items: [3853, 3158, 3107, 3011, 0, 0, 3364] // Support items
	};
</script>

<Story name="Fed Mid Laner" args={{ participant: mockCarry }}>
	{#snippet children()}
		<div class="bg-surface-low p-6">
			<ParticipantRow participant={mockCarry} />
		</div>
	{/snippet}
</Story>

<Story name="Vision Heavy Support" args={{ participant: mockSupport }}>
	{#snippet children()}
		<div class="bg-surface-low p-6">
			<ParticipantRow participant={mockSupport} />
		</div>
	{/snippet}
</Story>
