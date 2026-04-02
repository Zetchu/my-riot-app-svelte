<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedMatchStore } from '$lib/stores/match.svelte';
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import type { Participant } from '$lib/types';
	import ParticipantRow from '$lib/components/ParticipantRow/ParticipantRow.svelte';
	import TiltBreakdownDialog from '$lib/components/TiltBreakdownDialog/TiltBreakdownDialog.svelte';

	let match = $derived(selectedMatchStore.value);
	let error = $state('');
	let loading = $derived(!match && !error);

	let dialogRef = $state<HTMLDialogElement>();

	// Determine tilt color severity for the badge
	let tiltSeverityClass = $derived(
		(match?.tiltScore ?? 0) >= 30
			? 'bg-red-500/10 text-red-400 ring-red-500/30'
			: (match?.tiltScore ?? 0) >= 15
				? 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30'
				: 'bg-green-500/10 text-green-400 ring-green-500/30'
	);

	// Find the current player in the 10-person array
	let currentPlayer = $derived(
		match?.participants.find((p) => p.puuid === summonerStore.value?.puuid)
	);

	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}m ${secs}s`;
	}

	$effect(() => {
		if (!match && !error) {
			error =
				'Match data is not available. Please return to the match history and select a match again.';
		}
	});

	function getTeamParticipants(teamId: number): Participant[] {
		if (!match) return [];
		return match.participants.filter((p: Participant) => {
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

{#if match}
	<TiltBreakdownDialog
		bind:dialogRef
		tiltScore={match.tiltScore}
		tiltModifiers={match.tiltModifiers}
		isWin={currentPlayer?.win}
	/>
{/if}

<div class="space-y-6">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="space-y-2">
			<div class="flex items-center gap-4">
				<h1 class="font-display text-3xl font-bold tracking-tight text-white uppercase">
					Match <span class="bg-kinetic-gradient bg-clip-text text-transparent">Details</span>
				</h1>

				{#if match && match.tiltScore !== undefined}
					<button
						onclick={() => dialogRef?.showModal()}
						class={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 transition hover:opacity-80 ${tiltSeverityClass}`}
					>
						Tilt: {match?.tiltScore}
						<svg class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				{/if}
			</div>

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
