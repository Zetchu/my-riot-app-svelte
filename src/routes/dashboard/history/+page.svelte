<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import { selectedMatchStore } from '$lib/stores/match.svelte';
	import type { MatchSummary } from '$lib/types';
	import MatchHistoryRow from '$lib/components/MatchHistoryRow/MatchHistoryRow.svelte';

	let matches = $state<MatchSummary[]>([]);
	let loading = $state(false);
	let loadingMore = $state(false);
	let error = $state('');

	// Pagination State
	let startOffset = $state(0);
	let hasMore = $state(true);

	async function loadMatches(isLoadMore = false) {
		if (!summonerStore.value?.puuid) {
			error = 'Summoner data not found. Please sync your summoner first.';
			return;
		}

		if (!isLoadMore) {
			startOffset = 0;
			hasMore = true;
		}

		if (isLoadMore) {
			loadingMore = true;
		} else {
			loading = true;
		}
		error = '';

		try {
			const response = await fetch(
				`/api/getMatches?puuid=${summonerStore.value.puuid}&start=${startOffset}&count=5`
			);

			if (!response.ok) {
				error = 'Failed to load matches';
				return;
			}

			const newMatches = await response.json();

			if (newMatches.length < 5) hasMore = false;

			if (isLoadMore) {
				const existingIds = new Set(matches.map((m) => m.matchId));

				const uniqueNewMatches = newMatches.filter(
					(m: { matchId: string }) => !existingIds.has(m.matchId)
				);

				matches = [...matches, ...uniqueNewMatches];
			} else {
				matches = newMatches;
			}
		} catch (err) {
			error = 'Failed to fetch matches';
			console.error(err);
		} finally {
			if (isLoadMore) loadingMore = false;
			else loading = false;
		}
	}

	function handleLoadMore() {
		startOffset += 5;
		loadMatches(true);
	}
	async function handleMatchClick(matchId: string) {
		try {
			const response = await fetch(`/api/getMatch?matchId=${matchId}`);
			if (!response.ok) {
				error = 'Failed to load match details';
				return;
			}

			const matchDetail = await response.json();
			selectedMatchStore.value = matchDetail;
			await goto(`/dashboard/history/${matchId}`);
		} catch (err) {
			error = 'Failed to load match details';
			console.error(err);
		}
	}
	onMount(() => {
		console.log(loading);

		loadMatches();
		console.log(loading);
	});
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="space-y-2">
		<h1 class="font-display text-3xl font-bold tracking-tight text-white uppercase">
			Match <span class="bg-kinetic-gradient bg-clip-text text-transparent">History</span>
		</h1>
		<p class="text-on-surface-variant">Your last 5 matches</p>
	</div>

	{#if loading}
		<!-- Loading State -->
		<div class="rounded-lg bg-surface-high/30 p-8 text-center">
			<div class="inline-block animate-spin">
				<svg
					class="h-8 w-8 text-primary"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</div>
			<p class="mt-4 text-on-surface-variant">Loading matches...</p>
		</div>
	{:else if error}
		<!-- Error State -->
		<div class="rounded-lg bg-red-500/10 p-6 ring-1 ring-red-500/20">
			<p class="text-red-400">{error}</p>
			<button
				onclick={() => loadMatches()}
				class="mt-4 rounded-sm bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/30"
			>
				Try Again
			</button>
		</div>
	{:else if matches.length === 0}
		<!-- Empty State -->
		<div class="rounded-lg bg-surface-high/30 p-8 text-center">
			<p class="text-on-surface-variant">No matches found</p>
		</div>
	{:else}
		<!-- Match List -->
		<div class="space-y-3">
			{#each matches as match (match.matchId)}
				<MatchHistoryRow {match} onclick={() => handleMatchClick(match.matchId)} />
			{/each}
		</div>
		{#if hasMore && matches.length > 0}
			<button
				onclick={handleLoadMore}
				disabled={loadingMore}
				class="mt-6 w-full rounded-lg border border-surface-variant/30 bg-surface-low py-4 text-sm font-bold text-on-surface-variant transition hover:bg-surface-high hover:text-white disabled:opacity-50"
			>
				{#if loadingMore}
					<div
						class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent align-middle"
					></div>
					Loading...
				{:else}
					Load More Matches
				{/if}
			</button>
		{/if}
	{/if}
</div>
