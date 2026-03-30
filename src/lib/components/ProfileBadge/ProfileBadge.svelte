<script lang="ts">
	import type { SummonerData } from '$lib/types';

	let { player }: { player: SummonerData } = $props();
</script>

<div
	class="flex items-center gap-3 rounded-lg bg-surface-high/50 p-2 pr-4 ring-1 ring-white/10 transition hover:bg-surface-high"
>
	<div
		class="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-surface-lowest ring-1 ring-surface-variant/30"
	>
		<img
			src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/${player.profileIconId}.png`}
			alt="Profile Icon"
			class="h-full w-full scale-110 object-cover"
		/>
	</div>

	<div class="flex flex-col justify-center overflow-hidden">
		<div class="flex items-center gap-1.5 text-sm leading-none font-bold text-white">
			<span class="truncate">{player.gameName}</span>

			<span class="shrink-0 text-xs font-normal text-on-surface-variant">#{player.tagLine}</span>
		</div>
		<div class="mt-1 flex items-center text-[10px] font-bold tracking-wide text-blue-400 uppercase">
			{player.tier !== 'UNRANKED' ? `${player.tier} ${player.rank}` : 'UNRANKED'}
		</div>
	</div>
</div>
