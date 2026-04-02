<script lang="ts">
	let { player } = $props();

	let winRate = $derived.by(() => {
		if (!player || (player.wins === 0 && player.losses === 0)) return 0;
		return Math.round((player.wins / (player.wins + player.losses)) * 100);
	});

	let totalGames = $derived(player ? player.wins + player.losses : 0);
</script>

<div
	class="flex flex-col items-center gap-6 rounded-2xl bg-surface-high p-6 text-center shadow-lg ring-1 ring-white/5 md:flex-row md:gap-8 md:p-8 md:text-left"
>
	<div class="relative shrink-0">
		<img
			src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/${player.profileIconId}.png`}
			alt="Profile Icon"
			class="h-24 w-24 rounded-2xl border-2 border-surface-variant/50 object-cover shadow-xl md:h-28 md:w-28"
		/>
		<div
			class="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-surface-lowest px-4 py-1 text-xs font-bold whitespace-nowrap text-white shadow-md ring-1 ring-surface-variant/50"
		>
			Lvl {player.summonerLevel}
		</div>
	</div>

	<div class="flex w-full flex-1 flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
		<div class="space-y-2">
			<h1
				class="flex flex-col items-center gap-1 font-display text-3xl font-bold tracking-tight text-white md:block md:text-4xl"
			>
				<span>{player.gameName}</span>
				<span class="text-xl font-normal text-on-surface-variant md:ml-2 md:text-2xl"
					>#{player.tagLine}</span
				>
			</h1>

			{#if player.tier !== 'UNRANKED'}
				<div
					class="flex flex-wrap items-center justify-center gap-3 text-sm md:justify-start md:gap-4"
				>
					<span class="font-bold tracking-wider text-primary uppercase drop-shadow-sm">
						{player.tier}
						{player.rank}
					</span>
					<span class="hidden text-on-surface-variant md:block">•</span>
					<span class="font-medium text-white">{player.leaguePoints} LP</span>
				</div>
			{:else}
				<div class="text-sm font-medium tracking-wider text-on-surface-variant uppercase">
					Unranked
				</div>
			{/if}
		</div>

		{#if player.tier !== 'UNRANKED'}
			<div
				class="flex w-full flex-col items-center gap-1 rounded-xl bg-surface-low/50 p-4 text-center ring-1 ring-white/5 md:w-auto md:items-end md:bg-transparent md:p-0 md:text-right md:ring-0"
			>
				<div
					class="flex items-baseline gap-2 font-display text-3xl font-bold text-white md:block md:text-4xl"
				>
					{winRate}%
					<span
						class="text-sm font-normal tracking-widest text-on-surface-variant uppercase md:ml-2 md:text-lg md:tracking-normal md:normal-case"
						>Win Rate</span
					>
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
