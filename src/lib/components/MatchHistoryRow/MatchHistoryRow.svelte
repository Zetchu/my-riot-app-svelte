<script lang="ts">
	import type { MatchSummary } from '$lib/types';

	let { match, onclick } = $props<{ match: MatchSummary; onclick: () => void }>();

	let isWin = $derived(match.win);
	let kda = $derived(
		match.deaths === 0 ? 'Perfect' : ((match.kills + match.assists) / match.deaths).toFixed(2)
	);
	let minutes = $derived(Math.floor(match.gameDuration / 60));
	let seconds = $derived(match.gameDuration % 60);
</script>

<div
	role="button"
	tabindex="0"
	{onclick}
	onkeypress={(e) => e.key === 'Enter' && onclick()}
	class="relative flex cursor-pointer items-center gap-5 overflow-hidden rounded-xl bg-surface-high/50 p-4 ring-1 ring-white/5 transition hover:bg-surface-high hover:ring-white/20"
>
	<div class={`absolute top-0 bottom-0 left-0 w-1.5 ${isWin ? 'bg-blue-500' : 'bg-red-500'}`}></div>

	<div class="relative ml-2 shrink-0">
		<img
			src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${match.championName}.png`}
			alt={match.championName}
			title={match.championName}
			class="h-14 w-14 rounded-full border-2 border-surface-variant/50 object-cover shadow-lg transition-transform hover:scale-110"
		/>
		<div
			class={`absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-2 ring-surface-low ${isWin ? 'bg-blue-500' : 'bg-red-500'}`}
		>
			{isWin ? 'W' : 'L'}
		</div>
	</div>

	<div class="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
		<div class="space-y-1">
			<div class="text-lg font-bold text-white">
				{match.kills} / <span class="text-red-400">{match.deaths}</span> / {match.assists}
			</div>
			<div class="text-xs font-medium text-on-surface-variant">
				{kda} KDA <span class="opacity-50">•</span>
				{match.cs} CS <span class="opacity-50">•</span>
				{match.visionScore} Vision
			</div>
		</div>

		<div class="mt-2 text-left sm:mt-0 sm:text-right">
			<div class="text-sm font-bold text-white">
				{minutes}m {seconds}s
			</div>
			<div class="text-xs font-medium tracking-wider text-on-surface-variant uppercase">
				{match.teamPosition || 'Flex'}
			</div>
		</div>
	</div>
</div>
