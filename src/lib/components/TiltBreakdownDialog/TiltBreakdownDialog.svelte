<script lang="ts">
	let {
		tiltScore = 0,
		tiltModifiers = [],
		isWin = false,
		dialogRef = $bindable() // Allows the parent to bind to this variable
	} = $props<{
		tiltScore?: number;
		tiltModifiers?: string[];
		isWin?: boolean;
		dialogRef?: HTMLDialogElement;
	}>();

	// The math logic moved from the parent
	let baseScore = $derived(isWin ? 0 : 30);

	let tiltSeverityClass = $derived(
		tiltScore >= 30
			? 'bg-red-500/10 text-red-400 ring-red-500/30'
			: tiltScore >= 15
				? 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30'
				: 'bg-green-500/10 text-green-400 ring-green-500/30'
	);

	const modifierDescriptions: Record<string, string> = {
		'Stomp Penalty':
			'This game ended in under 20 minutes. Extremely fast losses usually indicate a highly frustrating, one-sided match.',
		'1v9 Buffer':
			'Your individual KDA was significantly higher than your team average. The system recognizes you played well despite the loss.',
		'Team Diff Buffer':
			'You had a major gold lead at 15 minutes compared to your team. You won your early game, mitigating self-tilt.',
		'Champion Hopping':
			'You are playing multiple different champions across recent games. Switching champs randomly is a classic behavioral sign of tilt-queuing.'
	};

	function parseModifier(modString: string) {
		const regexMatch = modString.match(/(.+) \(([+-]\d+)\)/);
		const name = regexMatch ? regexMatch[1] : modString;
		const value = regexMatch ? regexMatch[2] : '';
		const description =
			modifierDescriptions[name] || 'An adjustment based on your match statistics.';
		return { name, value, description };
	}
</script>

<dialog
	bind:this={dialogRef}
	class="fixed inset-0 m-auto w-full max-w-md rounded-2xl border border-surface-variant/30 bg-surface-low p-6 text-white shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
>
	{#if tiltScore !== undefined}
		<div class="space-y-6">
			<div>
				<h3 class="font-display text-2xl font-bold tracking-tight">Tilt Breakdown</h3>
				<p class="text-sm text-on-surface-variant">
					How we calculated your session stress for this match.
				</p>
			</div>

			<div class="rounded-xl bg-surface-high/30 p-4 ring-1 ring-white/5">
				<div class="space-y-2 text-sm">
					<div class="flex items-center justify-between font-medium text-on-surface-variant">
						<span>Base Result ({isWin ? 'Win' : 'Loss'})</span>
						<span>{baseScore === 0 ? '0' : `+${baseScore}`}</span>
					</div>

					{#if tiltModifiers && tiltModifiers.length > 0}
						{#each tiltModifiers as modifier (modifier)}
							{@const parsed = parseModifier(modifier)}
							<div class="flex items-center justify-between font-medium text-on-surface-variant/80">
								<span>{parsed.name}</span>
								<span class={parsed.value.startsWith('+') ? 'text-red-400' : 'text-green-400'}>
									{parsed.value}
								</span>
							</div>
						{/each}
					{/if}
				</div>

				<div class="mt-3 flex items-center justify-between border-t border-surface-variant/30 pt-3">
					<span class="font-bold text-white">Final Score</span>
					<span
						class={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ${tiltSeverityClass}`}
					>
						{tiltScore}
					</span>
				</div>
			</div>

			<div class="space-y-3">
				<span class="text-xs font-bold tracking-wider text-on-surface-variant uppercase">
					Modifier Details
				</span>

				{#if tiltModifiers && tiltModifiers.length > 0}
					<div class="space-y-4">
						{#each tiltModifiers as modifier (modifier)}
							{@const parsed = parseModifier(modifier)}
							<div class="flex gap-3">
								<div
									class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary"
								>
									i
								</div>
								<div>
									<p class="text-sm font-bold text-white/90">{parsed.name}</p>
									<p class="text-xs leading-relaxed text-on-surface-variant/80">
										{parsed.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-white/60 italic">
						This was a standard game. No special behavioral or statistical modifiers were triggered.
					</p>
				{/if}
			</div>

			<div class="mt-6 pt-2">
				<form method="dialog">
					<button
						class="w-full rounded-lg bg-surface-high py-3 text-sm font-bold text-white transition hover:bg-surface-high/80"
					>
						Got it
					</button>
				</form>
			</div>
		</div>
	{/if}
</dialog>
