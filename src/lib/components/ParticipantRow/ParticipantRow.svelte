<script lang="ts">
	import type { Participant } from '$lib/types';
	import { slide } from 'svelte/transition';

	let { participant }: { participant: Participant } = $props();

	let isExpanded = $state(false);

	function formatNumber(num: number): string {
		return num.toLocaleString();
	}
</script>

{#snippet renderItems()}
	<div class="flex shrink-0 gap-0.5 lg:gap-1">
		{#each participant.items || [] as itemId, index (index)}
			<div
				class={`flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm lg:h-8 lg:w-8 
                ${index === 6 ? 'ml-1 rounded-full lg:ml-2' : ''} 
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
{/snippet}

{#snippet renderExtraStats(isMobile: boolean)}
	<div class="flex {isMobile ? 'w-full justify-around' : 'items-center gap-3 lg:gap-6'}">
		<div class="shrink-0 text-center md:w-10 lg:w-12 lg:text-right">
			<div class="text-sm font-bold text-yellow-400">
				{formatNumber(Math.floor(participant.goldEarned / 1000))}k
			</div>
			<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">Gold</div>
		</div>

		<div class="shrink-0 text-center md:w-10 lg:w-12 lg:text-right">
			<div class="text-sm font-bold text-red-400">
				{formatNumber(Math.floor((participant.totalDamageDealtToChampions || 0) / 1000))}k
			</div>
			<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">Dmg</div>
		</div>

		<div class="shrink-0 text-center md:w-10 lg:w-12 lg:text-right">
			<div class="text-sm font-bold text-white">
				{participant.visionScore}
			</div>
			<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">Vis</div>
		</div>
	</div>
{/snippet}

<button
	type="button"
	class="w-full rounded-lg bg-surface-high p-4 text-left transition-colors hover:bg-surface-high/80 lg:cursor-default"
	onclick={() => (isExpanded = !isExpanded)}
	aria-expanded={isExpanded}
>
	<div class="flex items-center justify-between gap-2 lg:gap-4">
		<div class="flex min-w-0 flex-1 items-center gap-3 md:w-40 lg:w-48 lg:flex-none">
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
			<div class="min-w-0 flex-1 space-y-1 overflow-hidden">
				<div
					class="truncate text-sm font-bold text-white"
					title={`${participant.riotIdGameName || participant.summonerName || 'Unknown Player'}${participant.riotIdTagline ? '#' + participant.riotIdTagline : ''}`}
				>
					{participant.riotIdGameName || participant.summonerName || 'Unknown Player'}
					{#if participant.riotIdTagline}
						<span class="hidden text-xs font-normal text-on-surface-variant sm:inline"
							>#{participant.riotIdTagline}</span
						>
					{/if}
				</div>
				<div class="truncate text-xs text-on-surface-variant">
					{participant.teamPosition}
				</div>
			</div>
		</div>

		<div class="hidden lg:block">
			{@render renderItems()}
		</div>

		<div class="flex shrink-0 items-center gap-4 lg:gap-6">
			<div class="w-14 text-right sm:w-16">
				<div class="text-sm font-bold text-white">
					{participant.kills}/{participant.deaths}/{participant.assists}
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">
					{((participant.kills + participant.assists) / Math.max(participant.deaths, 1)).toFixed(2)} KDA
				</div>
			</div>

			<div class="w-8 shrink-0 text-right sm:w-10 lg:w-12">
				<div class="text-sm font-bold text-white">
					{formatNumber(participant.totalMinionsKilled + participant.neutralMinionsKilled)}
				</div>
				<div class="mt-0.5 text-[10px] tracking-wider text-on-surface-variant uppercase">CS</div>
			</div>

			<div class="hidden lg:block">
				{@render renderExtraStats(false)}
			</div>

			<div
				class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-low/50 text-on-surface-variant transition-transform duration-300 lg:hidden {isExpanded
					? 'rotate-180'
					: ''}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</div>
	</div>

	{#if isExpanded}
		<div
			class="mt-4 space-y-4 border-t border-surface-variant/20 pt-4 lg:hidden"
			transition:slide={{ duration: 300 }}
		>
			<div class="flex justify-center">
				{@render renderItems()}
			</div>

			<div class="rounded-xl bg-surface-low/30 p-3 ring-1 ring-white/5">
				{@render renderExtraStats(true)}
			</div>
		</div>
	{/if}
</button>
