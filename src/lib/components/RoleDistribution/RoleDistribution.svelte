<script lang="ts">
	import type { MatchSummary } from '$lib/types';

	let { matches = [] }: { matches: MatchSummary[] } = $props();

	let topRoles = $derived.by(() => {
		if (!matches || matches.length === 0) return [];

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
							<div class="text-xs font-medium text-on-surface-variant">{playRate}% Rate</div>
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
