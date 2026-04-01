<script lang="ts">
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import { matchHistoryStore } from '$lib/stores/match.svelte';

	let player = $derived(summonerStore.value);

	let winRate = $derived.by(() => {
		if (!player || (player.wins === 0 && player.losses === 0)) return 0;
		return Math.round((player.wins / (player.wins + player.losses)) * 100);
	});

	let totalGames = $derived(player ? player.wins + player.losses : 0);

	let matches = $derived(matchHistoryStore.value);

	let topChampions = $derived.by(() => {
		if (matches.length === 0) return [];

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

	let topRoles = $derived.by(() => {
		if (matches.length === 0) return [];

		const stats: Record<string, { role: string; games: number; wins: number }> = {};

		for (const match of matches) {
			const role = match.teamPosition || 'UNKNOWN';
			if (!stats[role]) {
				stats[role] = { role, games: 0, wins: 0 };
			}
			stats[role].games += 1;
			if (match.win) stats[role].wins += 1;
		}

		return Object.values(stats).sort((a, b) => b.games - a.games);
	});

	const formatRole = (role: string) => {
		const map: Record<string, string> = {
			TOP: 'Top Lane',
			JUNGLE: 'Jungle',
			MIDDLE: 'Mid Lane',
			BOTTOM: 'ADC',
			UTILITY: 'Support',
			UNKNOWN: 'Flex / ARAM'
		};
		return map[role] || role;
	};
</script>

{#if player}
	<div class="mx-auto max-w-5xl space-y-6 md:space-y-8">
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

			<div
				class="flex w-full flex-1 flex-col items-center justify-between gap-6 md:flex-row md:gap-0"
			>
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

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
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
								<div
									class="h-10 w-10 shrink-0 rounded-lg bg-surface-variant/40 sm:h-12 sm:w-12"
								></div>
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
									<div class="text-xs font-medium text-on-surface-variant">
										{champ.games} Played
									</div>
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
				class="flex flex-col rounded-2xl border border-surface-variant/30 bg-surface-low p-6 ring-1 ring-white/5"
			>
				<h3 class="mb-6 font-display text-xl font-bold text-white">Role Distribution</h3>

				{#if topRoles.length === 0}
					<div class="space-y-4">
						{#each [1, 2, 3] as i (i)}
							<div
								class="flex animate-pulse items-center justify-between rounded-xl bg-surface-high/30 p-4 ring-1 ring-white/5"
							>
								<div class="space-y-2">
									<div class="h-4 w-20 rounded bg-surface-variant/40"></div>
									<div class="h-3 w-28 rounded bg-surface-variant/20"></div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="space-y-4">
						{#each topRoles as role (role.role)}
							{@const roleWinRate = Math.round((role.wins / role.games) * 100)}
							{@const playRate = Math.round((role.games / matches.length) * 100)}

							<div
								class="relative overflow-hidden rounded-xl bg-surface-high/50 p-4 ring-1 ring-white/5 transition hover:bg-surface-high"
							>
								<div
									class="absolute top-0 left-0 h-full bg-primary/10 transition-all duration-1000"
									style={`width: ${playRate}%`}
								></div>

								<div class="relative flex items-center justify-between gap-2">
									<div class="truncate">
										<div class="truncate font-bold text-white">{formatRole(role.role)}</div>
										<div class="text-xs font-medium text-on-surface-variant">
											{playRate}% Rate
										</div>
									</div>

									<div class="shrink-0 text-right">
										<div
											class={`text-sm font-bold ${roleWinRate >= 50 ? 'text-blue-400' : 'text-red-400'}`}
										>
											{roleWinRate}% WR
										</div>
										<div class="text-[10px] tracking-wider text-on-surface-variant uppercase">
											{role.wins}W - {role.games - role.wins}L
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
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
