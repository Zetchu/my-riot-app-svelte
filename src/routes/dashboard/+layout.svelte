<script lang="ts">
	import { page } from '$app/stores';
	import { summonerStore } from '$lib/stores/summoner';
	import SummonerSearch from '$lib/components/SummonerSearch.svelte';

	let { children } = $props();

	const sidebarLinks = [
		{ name: 'Overview', href: '/dashboard', icon: 'grid' },
		// { name: 'Live Game', href: '/dashboard/live', icon: 'wifi' },
		{ name: 'Match History', href: '/dashboard/history', icon: 'history' },
		{ name: 'Tilt Analytics', href: '/dashboard/analytics', icon: 'activity' }
	];

	const iconPaths = {
		grid: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
		wifi: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
		history: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
		activity: 'M13 10V3L4 14h7v7l9-11h-7z'
	};

	// Helper to check active state
	function isActive(href: string) {
		if (href === '/dashboard' && $page.url.pathname === '/dashboard') return true;
		if (href !== '/dashboard' && $page.url.pathname.startsWith(href)) return true;
		return false;
	}
</script>

{#if !$summonerStore?.puuid}
	<SummonerSearch />
{:else}
	<div class="flex h-full min-h-[calc(100vh-5rem)]">
		<aside
			class="flex w-64 shrink-0 flex-col justify-between border-r border-surface-variant/20 bg-surface-low"
		>
			<div>
				<div class="p-6">
					<div class="flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded border border-surface-variant/20 bg-surface-high shadow-sm"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-secondary"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-display text-sm font-bold tracking-wide text-white">
								{$summonerStore?.gameName || 'Summoner'}
							</h3>
							<p class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
								{$summonerStore?.tagLine || 'Not loaded'}
							</p>
						</div>
					</div>
				</div>

				<nav class="space-y-1 px-3">
					{#each sidebarLinks as link (link.name)}
						<a
							href={link.href}
							class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 {isActive(
								link.href
							)
								? 'bg-surface-variant/30 text-primary'
								: 'text-on-surface-variant hover:bg-surface-high hover:text-white'}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100 {isActive(
									link.href
								)
									? 'opacity-100'
									: ''}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d={iconPaths[link.icon as keyof typeof iconPaths]}
								/>
							</svg>
							<span>{link.name}</span>
						</a>
					{/each}
				</nav>
			</div>

			<div class="space-y-6 p-6">
				<button
					class="w-full rounded-md bg-linear-to-r from-primary-container to-primary px-4 py-3 text-xs font-bold tracking-wider text-on-primary-fixed uppercase shadow-lg transition-all duration-300 hover:from-primary hover:to-primary-container hover:shadow-primary/20"
				>
					Recap Season
				</button>

				<div class="space-y-1 border-t border-surface-variant/10 pt-4">
					<a
						href="/support"
						class="group flex items-center gap-3 rounded-md px-2 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Support</span>
					</a>
					<button
						class="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						<span>Logout</span>
					</button>
				</div>
			</div>
		</aside>

		<main class="flex-1 overflow-auto bg-surface-lowest p-8">
			{@render children()}
		</main>
	</div>
{/if}
