<script lang="ts">
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import { matchHistoryStore } from '$lib/stores/match.svelte';
	import ProfileHeader from '$lib/components/ProfileHeader/ProfileHeader.svelte';
	import TopChampions from '$lib/components/TopChampions/TopChampions.svelte';
	import RoleDistribution from '$lib/components/RoleDistribution/RoleDistribution.svelte';

	let player = $derived(summonerStore.value);
	let matches = $derived(matchHistoryStore.value || []);
</script>

{#if player}
	<div class="mx-auto max-w-5xl space-y-6 md:space-y-8">
		<ProfileHeader {player} />

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<TopChampions {matches} />
			<RoleDistribution {matches} />
		</div>
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center text-on-surface-variant">
		<div
			class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"
		></div>
	</div>
{/if}
