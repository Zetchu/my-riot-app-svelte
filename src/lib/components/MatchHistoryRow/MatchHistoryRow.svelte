<script lang="ts">
	import type { MatchSummary } from '$lib/types';

	let { match, onclick }: { match: MatchSummary; onclick: () => void } = $props();

	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}m ${secs}s`;
	}
</script>

<button
	{onclick}
	class="w-full rounded-lg bg-surface-high p-4 text-left transition hover:bg-surface-high/80"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<div
				class={`rounded-lg p-3 ${match.win ? 'bg-green-500/20 ring-1 ring-green-500/40' : 'bg-red-500/20 ring-1 ring-red-500/40'}`}
			>
				<div class="text-center">
					<div
						class={`text-xs font-bold tracking-wider uppercase ${match.win ? 'text-green-400' : 'text-red-400'}`}
					>
						{match.win ? 'Victory' : 'Defeat'}
					</div>
					<div class="text-sm font-bold text-white">{match.championName}</div>
				</div>
			</div>

			<div class="space-y-1">
				<div class="text-sm font-bold text-white">
					{match.kills}/{match.deaths}/{match.assists}
				</div>
				<div class="text-xs text-on-surface-variant">
					{match.cs} CS • {match.visionScore} vision
				</div>
			</div>
		</div>

		<div class="text-right">
			<div class="text-xs text-on-surface-variant">
				{formatDuration(match.gameDuration)}
			</div>
		</div>
	</div>
</button>
