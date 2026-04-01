<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';
	import { summonerStore } from '$lib/stores/summoner.svelte';
	import { matchHistoryStore, selectedMatchStore } from '$lib/stores/match.svelte';

	let { children } = $props();

	// Reactive alias for our global player state
	let player = $derived(summonerStore.value);

	// Global Reset Function
	// Wipes all Svelte state, which automatically clears localStorage, then routes to home
	function handleSearchNew() {
		summonerStore.value = null;
		matchHistoryStore.value = [];
		selectedMatchStore.value = null;
		goto('/');
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div
	class="flex min-h-screen flex-col bg-surface-lowest font-body text-on-surface selection:bg-primary-container selection:text-on-primary-fixed"
>
	<nav
		class="sticky top-0 z-50 border-b border-surface-variant/20 bg-surface-lowest/80 backdrop-blur-md"
	>
		<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
			<div class="flex items-center gap-2">
				<a
					href="/"
					class="font-display text-2xl font-bold tracking-tight text-primary transition-colors duration-200 hover:text-primary-container"
				>
					NEXUS LENS
				</a>
			</div>

			<div class="flex items-center gap-4">
				{#if player}
					<button
						onclick={handleSearchNew}
						class="rounded-lg bg-transparent px-5 py-2.5 text-xs font-bold tracking-wider text-primary uppercase ring-1 ring-primary/70 transition-colors duration-200 hover:bg-primary hover:text-black hover:ring-primary"
					>
						Sync New Summoner
					</button>
				{/if}
			</div>
		</div>
	</nav>

	<main class="min-h-0 grow">
		{@render children()}
	</main>

	<footer class="border-t border-surface-variant/20 bg-surface-lowest py-12">
		<div class="mx-auto max-w-7xl px-6 md:flex md:items-center md:justify-between lg:px-8">
			<div class="mt-8 md:order-1 md:mt-0">
				<p class="text-center text-xs leading-5 text-on-surface-variant">
					&copy; 2026 Nexus Lens. All rights reserved.
				</p>
			</div>
			<div class="flex justify-center space-x-6 md:order-2">
				{#each ['Privacy Policy', 'Terms of Service', 'API Status', 'Support'] as item (item)}
					<a
						href="/"
						class="text-xs tracking-wider text-on-surface-variant uppercase transition-colors duration-200 hover:text-primary"
					>
						{item}
					</a>
				{/each}
			</div>
			<div class="mt-8 flex justify-center md:hidden">
				<span class="font-display font-bold tracking-tight text-primary">NEXUS LENS</span>
			</div>
		</div>
	</footer>
</div>
