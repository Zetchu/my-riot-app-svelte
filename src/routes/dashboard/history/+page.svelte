<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import { selectedMatchStore } from '$lib/stores/match.svelte';
	import type { MatchSummary } from '$lib/types';

	let matches = $state<MatchSummary[]>([]);
	let loading = $state(false);
	let error = $state('');

	async function loadMatches() {
		if (!summonerStore.value?.puuid) {
			error = 'Summoner data not found. Please sync your summoner first.';
			return;
		}

		// 1. Start loading BEFORE the try block!
		loading = true;
		error = ''; // Clear any old errors

		try {
			const response = await fetch(`/api/getMatches?puuid=${summonerStore.value.puuid}`);
			if (!response.ok) {
				error = 'Failed to load matches';
				console.log('fetch failed');
				return;
			}

			matches = await response.json();
			console.log(matches);
		} catch (err) {
			error = 'Failed to fetch matches';
			console.error(err);
			console.log('catch block');
		} finally {
			loading = false;
		}
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

	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}m ${secs}s`;
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
				onclick={loadMatches}
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
				<button
					onclick={() => handleMatchClick(match.matchId)}
					class="w-full rounded-lg bg-surface-high p-4 transition hover:bg-surface-high/80"
				>
					<div class="flex items-center justify-between">
						<!-- Left Side: Champion & Result -->
						<div class="flex items-center gap-4">
							<div
								class={`rounded-lg p-3 ${match.win ? 'bg-green-500/20 ring-1 ring-green-500/40' : 'bg-red-500/20 ring-1 ring-red-500/40'}`}
							>
								<div class="text-center">
									<div
										class={`text-xs font-bold tracking-wider uppercase ${match.win ? 'text-green-400' : 'text-red-400'}`}
									>
										{match.win ? 'Victory' : 'Defeat'}
									</div>
									<div class="text-sm font-bold text-white">{match.championName}</div>
								</div>
							</div>

							<!-- KDA & CS -->
							<div class="space-y-1">
								<div class="text-sm font-bold text-white">
									{match.kills}/{match.deaths}/{match.assists}
								</div>
								<div class="text-xs text-on-surface-variant">
									{match.cs} CS • {match.visionScore} vision
								</div>
							</div>
						</div>

						<!-- Right Side: Duration -->
						<div class="text-right">
							<div class="text-xs text-on-surface-variant">
								{formatDuration(match.gameDuration)}
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
