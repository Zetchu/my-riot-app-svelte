<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedMatchStore } from '$lib/stores/match.svelte';
	import type { Participant } from '$lib/types';

	let match = $derived(selectedMatchStore.value);
	let loading = $derived(!match);
	let error = $state('');

	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}m ${secs}s`;
	}

	function formatNumber(num: number): string {
		return num.toLocaleString();
	}

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
					<div class="rounded-lg bg-surface-high p-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="flex w-50 shrink-0 items-center gap-3">
									<div
										class="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-surface-lowest ring-1 ring-surface-variant/30"
									>
										<img
											src={`https://ddragon.leagueoflegends.com/cdn/16.6.1/img/champion/${participant.championName}.png`}
											alt={participant.championName}
											class="h-full w-full scale-110 object-cover"
											loading="lazy"
										/>
									</div>
									<div class="w-full space-y-1 overflow-hidden">
										<div
											class="truncate text-sm font-bold text-white"
											title={`${participant.riotIdGameName || participant.summonerName || 'Unknown Player'}${participant.riotIdTagline ? '#' + participant.riotIdTagline : ''}`}
										>
											{participant.riotIdGameName || participant.summonerName || 'Unknown Player'}
											{#if participant.riotIdTagline}
												<span class="text-xs font-normal text-on-surface-variant"
													>#{participant.riotIdTagline}</span
												>
											{/if}
										</div>
										<div class="text-xs text-on-surface-variant">
											{participant.teamPosition}
										</div>
									</div>
								</div>

								<div class="flex shrink-0 gap-1">
									{#each participant.items || [] as itemId, index (index)}
										<div
											class={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm 
                                            ${index === 6 ? 'ml-2 rounded-full' : ''} 
                                            ${itemId === 0 ? 'bg-surface-lowest/30 ring-1 ring-white/5' : 'bg-surface-container-highest ring-1 ring-surface-variant/30'}`}
										>
											{#if itemId > 0}
												<img
													src={`https://ddragon.leagueoflegends.com/cdn/16.6.1/img/item/${itemId}.png`}
													alt={`Item ${itemId}`}
													class="h-full w-full object-cover"
													loading="lazy"
												/>
											{/if}
										</div>
									{/each}
								</div>
							</div>

							<div class="flex items-center gap-8">
								<div class="text-right">
									<div class="text-sm font-bold text-white">
										{participant.kills}/{participant.deaths}/{participant.assists}
									</div>
									<div class="text-xs text-on-surface-variant">
										KDA: {(
											(participant.kills + participant.assists) /
											Math.max(participant.deaths, 1)
										).toFixed(2)}
									</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-white">
										{formatNumber(
											participant.totalMinionsKilled + participant.neutralMinionsKilled
										)}
									</div>
									<div class="text-xs text-on-surface-variant">CS</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-yellow-400">
										{formatNumber(Math.floor(participant.goldEarned / 1000))}k
									</div>
									<div class="text-xs text-on-surface-variant">Gold</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-red-400">
										{formatNumber(
											Math.floor((participant.totalDamageDealtToChampions || 0) / 1000)
										)}k
									</div>
									<div class="text-xs text-on-surface-variant">Damage</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-white">
										{participant.visionScore}
									</div>
									<div class="text-xs text-on-surface-variant">Vision</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="my-4 border-t border-surface-variant/20"></div>

		<div class="space-y-3">
			<h2 class="font-display text-xl font-bold tracking-tight text-red-400">Red Team</h2>
			<div class="space-y-2">
				{#each sortByRole(getTeamParticipants(200)) as participant (participant.puuid)}
					<div class="rounded-lg bg-surface-high p-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="flex w-50 shrink-0 items-center gap-3">
									<div
										class="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-surface-lowest ring-1 ring-surface-variant/30"
									>
										<img
											src={`https://ddragon.leagueoflegends.com/cdn/16.6.1/img/champion/${participant.championName}.png`}
											alt={participant.championName}
											class="h-full w-full scale-110 object-cover"
											loading="lazy"
										/>
									</div>
									<div class="w-full space-y-1 overflow-hidden">
										<div
											class="truncate text-sm font-bold text-white"
											title={`${participant.riotIdGameName || participant.summonerName || 'Unknown Player'}${participant.riotIdTagline ? '#' + participant.riotIdTagline : ''}`}
										>
											{participant.riotIdGameName || participant.summonerName || 'Unknown Player'}
											{#if participant.riotIdTagline}
												<span class="text-xs font-normal text-on-surface-variant"
													>#{participant.riotIdTagline}</span
												>
											{/if}
										</div>
										<div class="text-xs text-on-surface-variant">
											{participant.teamPosition}
										</div>
									</div>
								</div>

								<div class="flex shrink-0 gap-1">
									{#each participant.items || [] as itemId, index (index)}
										<div
											class={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm 
                                            ${index === 6 ? 'ml-2 rounded-full' : ''} 
                                            ${itemId === 0 ? 'bg-surface-lowest/30 ring-1 ring-white/5' : 'bg-surface-container-highest ring-1 ring-surface-variant/30'}`}
										>
											{#if itemId > 0}
												<img
													src={`https://ddragon.leagueoflegends.com/cdn/16.6.1/img/item/${itemId}.png`}
													alt={`Item ${itemId}`}
													class="h-full w-full object-cover"
													loading="lazy"
												/>
											{/if}
										</div>
									{/each}
								</div>
							</div>

							<div class="flex items-center gap-8">
								<div class="text-right">
									<div class="text-sm font-bold text-white">
										{participant.kills}/{participant.deaths}/{participant.assists}
									</div>
									<div class="text-xs text-on-surface-variant">
										KDA: {(
											(participant.kills + participant.assists) /
											Math.max(participant.deaths, 1)
										).toFixed(2)}
									</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-white">
										{formatNumber(
											participant.totalMinionsKilled + participant.neutralMinionsKilled
										)}
									</div>
									<div class="text-xs text-on-surface-variant">CS</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-yellow-400">
										{formatNumber(Math.floor(participant.goldEarned / 1000))}k
									</div>
									<div class="text-xs text-on-surface-variant">Gold</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-red-400">
										{formatNumber(
											Math.floor((participant.totalDamageDealtToChampions || 0) / 1000)
										)}k
									</div>
									<div class="text-xs text-on-surface-variant">Damage</div>
								</div>

								<div class="text-right">
									<div class="text-sm font-bold text-white">
										{participant.visionScore}
									</div>
									<div class="text-xs text-on-surface-variant">Vision</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
