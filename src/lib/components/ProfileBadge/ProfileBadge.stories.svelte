<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProfileBadge from './ProfileBadge.svelte';

	// 1. Define the component for Storybook
	const { Story } = defineMeta({
		title: 'NavigationBar/ProfileBadge',
		component: ProfileBadge,
		tags: ['autodocs'],
		parameters: { layout: 'padded' }
	});

	// 2. Create some fake "Mock" data to test our UI states
	const mockRankedPlayer = {
		puuid: '123',
		gameName: 'Shmungi',
		tagLine: 'CPT',
		summonerLevel: 142,
		profileIconId: 4661, // A random cool Riot icon
		tier: 'EMERALD',
		rank: 'III',
		leaguePoints: 50,
		wins: 100,
		losses: 90
	};

	const mockUnrankedPlayer = {
		...mockRankedPlayer,
		tier: 'UNRANKED',
		rank: ''
	};
</script>

<Story name="Ranked Player" args={{ player: mockRankedPlayer }}>
	<div class="w-72 rounded-md bg-surface-low p-4">
		<ProfileBadge player={mockRankedPlayer} />
	</div>
</Story>

<Story name="Unranked Player" args={{ player: mockUnrankedPlayer }}>
	<div class="w-72 rounded-md bg-surface-low p-4">
		<ProfileBadge player={mockUnrankedPlayer} />
	</div>
</Story>
