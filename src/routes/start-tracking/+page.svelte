<script lang="ts">
	import { goto } from '$app/navigation';
	import { summonerStore } from '$lib/stores/summoner';

	let gameName = '';
	let tagLine = '';
	let loading = false;
	let error = '';

	async function handleSubmit() {
		if (!gameName.trim() || !tagLine.trim()) {
			error = 'Please enter both summoner name and tagline';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch(
				`/api/getPlayer?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
			);

			if (!response.ok) {
				const data = await response.json();
				error = data.error || 'Failed to find summoner';
				loading = false;
				return;
			}

			const playerData = await response.json();

			// Store the summoner data
			summonerStore.set({
				gameName,
				tagLine,
				puuid: playerData.puuid
			});

			// Redirect to dashboard
			await goto('/dashboard');
		} catch (err) {
			error = 'Failed to load summoner data. Please try again.';
			console.error(err);
			loading = false;
		}
	}
</script>

<div class="relative isolate overflow-hidden">
	<!-- Blob Background -->
	<div
		class="absolute -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>

	<!-- Form Section -->
	<div class="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-32 lg:px-8">
		<div class="mx-auto w-full max-w-md">
			<div class="space-y-8">
				<!-- Header -->
				<div class="space-y-3">
					<a href="/" class="inline-block">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-primary"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
					<h1 class="font-display text-4xl font-bold tracking-tight text-white">
						Find Your <span class="bg-kinetic-gradient bg-clip-text text-transparent">Summoner</span
						>
					</h1>
					<p class="text-on-surface-variant">Enter your summoner name and tagline to get started</p>
				</div>

				<!-- Form -->
				<form on:submit|preventDefault={handleSubmit} class="space-y-6">
					<!-- Summoner Name -->
					<div class="space-y-2">
						<label for="gameName" class="block text-sm font-semibold text-white"
							>Summoner Name</label
						>
						<input
							type="text"
							id="gameName"
							bind:value={gameName}
							placeholder="e.g., Viper"
							disabled={loading}
							class="w-full rounded-sm border-0 bg-surface-container/50 px-4 py-3 text-on-surface shadow-sm ring-1 ring-white/10 ring-inset placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:ring-inset disabled:opacity-50"
						/>
					</div>

					<!-- Tagline -->
					<div class="space-y-2">
						<label for="tagLine" class="block text-sm font-semibold text-white">Tagline</label>
						<input
							type="text"
							id="tagLine"
							bind:value={tagLine}
							placeholder="e.g., NA1"
							disabled={loading}
							class="w-full rounded-sm border-0 bg-surface-container/50 px-4 py-3 text-on-surface shadow-sm ring-1 ring-white/10 ring-inset placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:ring-inset disabled:opacity-50"
						/>
					</div>

					<!-- Error Message -->
					{#if error}
						<div class="rounded-sm bg-red-500/10 p-3 ring-1 ring-red-500/20">
							<p class="text-sm text-red-400">{error}</p>
						</div>
					{/if}

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={loading}
						class="w-full rounded-sm bg-linear-to-r from-primary-container to-primary px-4 py-3 text-sm font-bold tracking-wider text-on-primary-fixed uppercase shadow-lg transition-all duration-300 hover:from-primary hover:to-primary-container hover:shadow-primary/20 disabled:opacity-50"
					>
						{loading ? 'Syncing...' : 'Unleash Kinetic'}
					</button>
				</form>

				<!-- Back Link -->
				<div class="text-center">
					<a href="/" class="text-sm text-on-surface-variant transition hover:text-primary">
						← Back to home
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
