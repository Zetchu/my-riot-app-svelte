<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedMatchStore, matchHistoryStore } from '$lib/stores/match.svelte';
	import type { MatchSummary } from '$lib/types';
	import MatchHistoryRow from '$lib/components/MatchHistoryRow/MatchHistoryRow.svelte';

	let error = $state('');

	// Client-side pagination state
	let visibleCount = $state(5); // Start by showing 5 out of the 15 cached matches

	// Instantly slice the array. Svelte updates the DOM automatically!
	let visibleMatches = $derived(matchHistoryStore.value.slice(0, visibleCount));

	// Check if there are more matches in the 15-game cache to reveal
	let hasMoreCached = $derived(visibleCount < matchHistoryStore.value.length);

	// This is instant now! No loading spinner needed.
	function showMore() {
		visibleCount += 5;
	}

	async function handleMatchClick(matchSummary: MatchSummary) {
		try {
			// We still fetch the single heavy detail payload on-demand
			const response = await fetch(`/api/getMatch?matchId=${matchSummary.matchId}`);
			if (!response.ok) {
				error = 'Failed to load match details';
				return;
			}

			const matchDetail = await response.json();
			matchDetail.tiltScore = matchSummary.tiltScore;
			matchDetail.tiltModifiers = matchSummary.tiltModifiers;

			selectedMatchStore.value = matchDetail;
			await goto(`/dashboard/history/${matchSummary.matchId}`);
		} catch (err) {
			error = 'Failed to load match details';
			console.error(err);
		}
	}
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h1 class="font-display text-3xl font-bold tracking-tight text-white uppercase">
			Match <span class="bg-kinetic-gradient bg-clip-text text-transparent">History</span>
		</h1>
		<p class="text-on-surface-variant">Your recent matches</p>
	</div>

	{#if error}
		<div class="rounded-lg bg-red-500/10 p-6 ring-1 ring-red-500/20">
			<p class="text-red-400">{error}</p>
		</div>
	{:else if visibleMatches.length === 0}
		<div class="rounded-lg bg-surface-high/30 p-8 text-center">
			<p class="text-on-surface-variant">No matches found in cache. Please re-sync.</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each visibleMatches as match (match.matchId)}
				<MatchHistoryRow {match} onclick={() => handleMatchClick(match)} />
			{/each}
		</div>

		{#if hasMoreCached}
			<button
				onclick={showMore}
				class="mt-6 w-full rounded-lg border border-surface-variant/30 bg-surface-low py-4 text-sm font-bold text-on-surface-variant transition hover:bg-surface-high hover:text-white"
			>
				Load More Matches
			</button>
		{:else}
			<p
				class="mt-6 text-center text-xs font-medium tracking-widest text-on-surface-variant/50 uppercase"
			>
				End of cached history
			</p>
		{/if}
	{/if}
</div>
