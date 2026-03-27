<script lang="ts">
	import type { Participant } from '$lib/types';

	let { participant }: { participant: Participant } = $props();

	function formatNumber(num: number): string {
		return num.toLocaleString();
	}
</script>

<div class="rounded-lg bg-surface-high p-4 transition-colors hover:bg-surface-high/80">
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
			<div class="w-16 text-right">
				<div class="text-sm font-bold text-white">
					{participant.kills}/{participant.deaths}/{participant.assists}
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">
					{((participant.kills + participant.assists) / Math.max(participant.deaths, 1)).toFixed(2)} KDA
				</div>
			</div>

			<div class="w-12 text-right">
				<div class="text-sm font-bold text-white">
					{formatNumber(participant.totalMinionsKilled + participant.neutralMinionsKilled)}
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">CS</div>
			</div>

			<div class="w-12 text-right">
				<div class="text-sm font-bold text-yellow-400">
					{formatNumber(Math.floor(participant.goldEarned / 1000))}k
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">Gold</div>
			</div>

			<div class="w-12 text-right">
				<div class="text-sm font-bold text-red-400">
					{formatNumber(Math.floor((participant.totalDamageDealtToChampions || 0) / 1000))}k
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">Dmg</div>
			</div>

			<div class="w-12 text-right">
				<div class="text-sm font-bold text-white">
					{participant.visionScore}
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">Vis</div>
			</div>
		</div>
	</div>
</div>
