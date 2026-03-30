<script lang="ts">
	import { onMount } from 'svelte';
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import type { MatchSummary } from '$lib/types';

	// Create a reactive alias to our player data
	let player = $derived(summonerStore.value);

	// Automatically calculate Win Rate
	let winRate = $derived.by(() => {
		if (!player || (player.wins === 0 && player.losses === 0)) return 0;
		return Math.round((player.wins / (player.wins + player.losses)) * 100);
	});

	let totalGames = $derived(player ? player.wins + player.losses : 0);

	// --- STEP 3: THE DATA AGGREGATOR ---
	let matches = $state<MatchSummary[]>([]);
	let loadingMatches = $state(false);

	// The Aggregation Engine
	let topChampions = $derived.by(() => {
		if (matches.length === 0) return [];

		// 1. Group data by champion
		const stats: Record<
			string,
			{ name: string; games: number; wins: number; kills: number; deaths: number; assists: number }
		> = {};

		for (const match of matches) {
			if (!stats[match.championName]) {
				stats[match.championName] = {
					name: match.championName,
					games: 0,
					wins: 0,
					kills: 0,
					deaths: 0,
					assists: 0
				};
			}
			stats[match.championName].games += 1;
			if (match.win) stats[match.championName].wins += 1;
			stats[match.championName].kills += match.kills;
			stats[match.championName].deaths += match.deaths;
			stats[match.championName].assists += match.assists;
		}

		// 2. Convert object to array, sort by games played, and grab top 5
		return Object.values(stats)
			.sort((a, b) => b.games - a.games)
			.slice(0, 5);
	});

	// Fetch recent matches silently in the background when the dashboard opens
	onMount(async () => {
		if (player?.puuid) {
			loadingMatches = true;
			try {
				const res = await fetch(`/api/getMatches?puuid=${player.puuid}&count=15`);
				if (res.ok) {
					matches = await res.json();
				}
			} catch (e) {
				console.error('Failed to load matches for aggregation', e);
			} finally {
				loadingMatches = false;
			}
		}
	});
</script>

{#if player}
	<div class="mx-auto max-w-5xl space-y-8">
		<div
			class="flex items-center gap-8 rounded-2xl bg-surface-high p-8 shadow-lg ring-1 ring-white/5"
		>
			<div class="relative shrink-0">
				<img
					src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/${player.profileIconId}.png`}
					alt="Profile Icon"
					class="h-28 w-28 rounded-2xl border-2 border-surface-variant/50 object-cover shadow-xl"
				/>
				<div
					class="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-surface-lowest px-4 py-1 text-xs font-bold whitespace-nowrap text-white shadow-md ring-1 ring-surface-variant/50"
				>
					Lvl {player.summonerLevel}
				</div>
			</div>

			<div class="flex flex-1 items-center justify-between">
				<div class="space-y-2">
					<h1 class="font-display text-4xl font-bold tracking-tight text-white">
						{player.gameName}
						<span class="text-2xl font-normal text-on-surface-variant">#{player.tagLine}</span>
					</h1>

					{#if player.tier !== 'UNRANKED'}
						<div class="flex items-center gap-4 text-sm">
							<span class="font-bold tracking-wider text-primary uppercase drop-shadow-sm">
								{player.tier}
								{player.rank}
							</span>
							<span class="text-on-surface-variant">•</span>
							<span class="font-medium text-white">{player.leaguePoints} LP</span>
						</div>
					{:else}
						<div class="text-sm font-medium tracking-wider text-on-surface-variant uppercase">
							Unranked
						</div>
					{/if}
				</div>

				{#if player.tier !== 'UNRANKED'}
					<div class="flex flex-col items-end gap-1 text-right">
						<div class="font-display text-4xl font-bold text-white">
							{winRate}% <span class="text-lg font-normal text-on-surface-variant">Win Rate</span>
						</div>
						<div class="text-sm font-medium text-on-surface-variant">
							<span class="text-blue-400">{player.wins}W</span> -
							<span class="text-red-400">{player.losses}L</span>
							<span class="ml-2 opacity-50">({totalGames} Games)</span>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div
				class="col-span-2 flex flex-col rounded-2xl border border-surface-variant/30 bg-surface-low p-6 ring-1 ring-white/5"
			>
				<h3 class="mb-6 font-display text-xl font-bold text-white">
					Recent Top Champions (Last 15 Games)
				</h3>

				{#if loadingMatches}
					<div class="flex flex-1 items-center justify-center text-on-surface-variant/50">
						Loading recent performance...
					</div>
				{:else if topChampions.length === 0}
					<div class="flex flex-1 items-center justify-center text-on-surface-variant/50">
						No recent match data available.
					</div>
				{:else}
					<div class="space-y-3">
						{#each topChampions as champ (champ.name)}
							{@const champWinRate = Math.round((champ.wins / champ.games) * 100)}
							{@const kda =
								champ.deaths === 0
									? 'Perfect'
									: ((champ.kills + champ.assists) / champ.deaths).toFixed(2)}

							<div
								class="flex items-center gap-4 rounded-xl bg-surface-high/50 p-3 ring-1 ring-white/5 transition hover:bg-surface-high"
							>
								<img
									src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champ.name}.png`}
									alt={champ.name}
									class="h-12 w-12 rounded-lg shadow-sm"
								/>

								<div class="flex-1">
									<div class="font-bold text-white">{champ.name}</div>
									<div class="text-xs font-medium text-on-surface-variant">
										{champ.games} Played
									</div>
								</div>

								<div class="w-24 text-right">
									<div
										class={`text-sm font-bold ${champWinRate >= 50 ? 'text-blue-400' : 'text-red-400'}`}
									>
										{champWinRate}% WR
									</div>
									<div class="text-[10px] tracking-wider text-on-surface-variant uppercase">
										{champ.wins}W - {champ.games - champ.wins}L
									</div>
								</div>

								<div class="w-20 text-right">
									<div class="text-sm font-bold text-white">{kda}</div>
									<div class="text-[10px] tracking-wider text-on-surface-variant uppercase">
										KDA
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div
				class="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-surface-variant/30 bg-surface-low p-6 text-on-surface-variant/50 ring-1 ring-white/5"
			>
				Most Played Roles (Coming Soon)
			</div>
		</div>
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center text-on-surface-variant">
		<div
			class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"
		></div>
	</div>
{/if}
