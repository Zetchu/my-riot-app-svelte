<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TiltBreakdownDialog from './TiltBreakdownDialog.svelte';

	const { Story } = defineMeta({
		title: 'Components/TiltBreakdownDialog',
		component: TiltBreakdownDialog,
		parameters: {
			layout: 'centered'
		}
	});
</script>

<script lang="ts">
	// We bind to this so the button can open the dialog
	let dialogRef: HTMLDialogElement | undefined = $state();
</script>

<Story
	name="Moderate Tilt (Loss)"
	args={{
		tiltScore: 20,
		isWin: false,
		tiltModifiers: ['Team Diff Buffer (-10)']
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col items-center justify-center p-12 text-center">
			<button
				onclick={() => dialogRef?.showModal()}
				class="rounded-xl bg-surface-high px-8 py-3 font-bold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-surface-high/80 hover:ring-white/30"
			>
				Open Tilt Breakdown
			</button>
			<TiltBreakdownDialog bind:dialogRef {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Severe Tilt (Spiral)"
	args={{
		tiltScore: 55,
		isWin: false,
		tiltModifiers: ['Stomp Penalty (+15)', 'Champion Hopping (+10)']
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col items-center justify-center p-12 text-center">
			<button
				onclick={() => dialogRef?.showModal()}
				class="rounded-xl bg-surface-high px-8 py-3 font-bold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-surface-high/80 hover:ring-white/30"
			>
				Open Tilt Breakdown
			</button>
			<TiltBreakdownDialog bind:dialogRef {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Clean Win"
	args={{
		tiltScore: 0,
		isWin: true,
		tiltModifiers: []
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col items-center justify-center p-12 text-center">
			<button
				onclick={() => dialogRef?.showModal()}
				class="rounded-xl bg-surface-high px-8 py-3 font-bold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-surface-high/80 hover:ring-white/30"
			>
				Open Tilt Breakdown
			</button>
			<TiltBreakdownDialog bind:dialogRef {...args} />
		</div>
	{/snippet}
</Story>
