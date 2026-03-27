<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedMatchStore } from '$lib/stores/match.svelte';
	import type { Participant } from '$lib/types';
	import ParticipantRow from '$lib/components/ParticipantRow/ParticipantRow.svelte';

	let match = $derived(selectedMatchStore.value);
	let error = $state('');
	let loading = $derived(!match && !error);

	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}m ${secs}s`;
	}

	$effect(() => {
		// If no match data is available (e.g. after a full page refresh),
		// stop showing a loading state and surface an explicit error instead.
		if (!match && !error) {
			error =
				'Match data is not available. Please return to the match history and select a match again.';
		}
	});

	// function formatNumber(num: number): string {
	// 	return num.toLocaleString();
	// }

	function getTeamParticipants(teamId: number): Participant[] {
		if (!match) return [];
		return match.participants.filter((p: Participant) => {
			// Determine team from win status (team 100 = blue, team 200 = red)
			const playerTeam = match.teams.find((t: { teamId: number; win: boolean }) =>
				t.teamId === 100 ? p.win === match.teams[0].win : p.win === match.teams[1].win
			);
			return playerTeam?.teamId === teamId;
		});
	}

	function sortByRole(participants: Participant[]): Participant[] {
		const roleOrder: { [key: string]: number } = {
			TOP: 1,
			JUNGLE: 2,
			MIDDLE: 3,
			BOTTOM: 4,
			UTILITY: 5
		};
		return [...participants].sort(
			(a, b) => (roleOrder[a.teamPosition] || 999) - (roleOrder[b.teamPosition] || 999)
		);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<h1 class="font-display text-3xl font-bold tracking-tight text-white uppercase">
				Match <span class="bg-kinetic-gradient bg-clip-text text-transparent">Details</span>
			</h1>
			{#if match}
				<p class="text-on-surface-variant">
					{formatDuration(match.gameDuration)} • {match.gameMode}
				</p>
			{/if}
		</div>

		<button
			onclick={() => goto('/dashboard/history')}
			class="rounded-sm bg-surface-high px-4 py-2 text-sm font-semibold text-white transition hover:bg-surface-high/80"
		>
			← Back
		</button>
	</div>

	{#if error}
		<div class="rounded-lg bg-red-500/10 p-8 text-center ring-1 ring-red-500/20">
			<p class="text-lg font-bold text-red-400">Oops! Something went wrong.</p>
			<p class="mt-2 text-sm text-red-300/80">{error}</p>
		</div>
	{:else if loading}
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
			<p class="mt-4 text-on-surface-variant">Loading match details...</p>
		</div>
	{:else}
		<div class="space-y-3">
			<h2 class="font-display text-xl font-bold tracking-tight text-blue-400">Blue Team</h2>
			<div class="space-y-2">
				{#each sortByRole(getTeamParticipants(100)) as participant (participant.puuid)}
					<ParticipantRow {participant} />
				{/each}
			</div>
		</div>

		<div class="my-4 border-t border-surface-variant/20"></div>

		<div class="space-y-3">
			<h2 class="font-display text-xl font-bold tracking-tight text-red-400">Red Team</h2>
			<div class="space-y-2">
				{#each sortByRole(getTeamParticipants(200)) as participant (participant.puuid)}
					<ParticipantRow {participant} />
				{/each}
			</div>
		</div>
	{/if}
</div>
