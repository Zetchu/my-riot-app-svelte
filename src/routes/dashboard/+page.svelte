<script lang="ts">
	import { summonerStore } from '$lib/stores/summoner.svelte';

	// Create a reactive alias to our player data
	let player = $derived(summonerStore.value);

	// Automatically calculate Win Rate
	let winRate = $derived(() => {
		if (!player || (player.wins === 0 && player.losses === 0)) return 0;
		return Math.round((player.wins / (player.wins + player.losses)) * 100);
	});

	// Automatically calculate Total Games
	let totalGames = $derived(() => {
		if (!player) return 0;
		return player.wins + player.losses;
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
							{winRate()}% <span class="text-lg font-normal text-on-surface-variant">Win Rate</span>
						</div>
						<div class="text-sm font-medium text-on-surface-variant">
							<span class="text-blue-400">{player.wins}W</span> -
							<span class="text-red-400">{player.losses}L</span>
							<span class="ml-2 opacity-50">({totalGames()} Games)</span>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div
				class="col-span-2 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-surface-variant/30 bg-surface-low p-6 text-on-surface-variant/50 ring-1 ring-white/5"
			>
				Top 5 Champions (Coming Soon)
			</div>
			<div
				class="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-surface-variant/30 bg-surface-low p-6 text-on-surface-variant/50 ring-1 ring-white/5"
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
