<script lang="ts">
	import type { MatchSummary } from '$lib/types';

	let { matches }: { matches: MatchSummary[] } = $props();

	let topChampions = $derived.by(() => {
		if (!matches || matches.length === 0) return [];

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

		return Object.values(stats)
			.sort((a, b) => b.games - a.games)
			.slice(0, 5);
	});
</script>

<div
	class="col-span-1 flex flex-col rounded-2xl border border-surface-variant/30 bg-surface-low p-6 ring-1 ring-white/5 md:col-span-2"
>
	<h3 class="mb-6 font-display text-xl font-bold text-white">
		Recent Top Champions (Last 15 Games)
	</h3>

	{#if topChampions.length === 0}
		<div class="space-y-3">
			{#each [1, 2, 3, 4, 5] as i (i)}
				<div
					class="flex animate-pulse items-center gap-3 rounded-xl bg-surface-high/30 p-3 ring-1 ring-white/5"
				>
					<div class="h-10 w-10 shrink-0 rounded-lg bg-surface-variant/40 sm:h-12 sm:w-12"></div>
					<div class="flex-1 space-y-2">
						<div class="h-4 w-20 rounded bg-surface-variant/40"></div>
						<div class="h-3 w-12 rounded bg-surface-variant/20"></div>
					</div>
				</div>
			{/each}
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
					class="flex items-center gap-3 rounded-xl bg-surface-high/50 p-3 ring-1 ring-white/5 transition hover:bg-surface-high sm:gap-4"
				>
					<img
						src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champ.name}.png`}
						alt={champ.name}
						class="h-10 w-10 shrink-0 rounded-lg shadow-sm sm:h-12 sm:w-12"
					/>

					<div class="flex-1 truncate">
						<div class="truncate font-bold text-white">{champ.name}</div>
						<div class="text-xs font-medium text-on-surface-variant">{champ.games} Played</div>
					</div>

					<div class="w-16 shrink-0 text-right sm:w-24">
						<div
							class={`text-sm font-bold ${champWinRate >= 50 ? 'text-blue-400' : 'text-red-400'}`}
						>
							{champWinRate}% WR
						</div>
						<div class="text-[10px] tracking-wider text-on-surface-variant uppercase">
							{champ.wins}W - {champ.games - champ.wins}L
						</div>
					</div>

					<div class="w-14 shrink-0 text-right sm:w-20">
						<div class="text-sm font-bold text-white">{kda}</div>
						<div class="text-[10px] tracking-wider text-on-surface-variant uppercase">KDA</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
