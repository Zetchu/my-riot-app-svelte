<script>
	// @ts-nocheck

	let { data } = $props();
</script>

<main class="min-h-screen bg-slate-900 p-8 font-sans text-slate-100">
	<div class="mx-auto max-w-2xl">
		<h1
			class="mb-8 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent"
		>
			Player Lookup
		</h1>

		{#if data?.error}
			<div class="rounded-lg border border-red-500 bg-red-900/50 p-4 text-red-200">
				{data.error}
			</div>
		{:else if data?.account}
			<div class="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
				<h2 class="mb-4 text-2xl font-semibold text-white">Player Found</h2>

				<div class="space-y-2">
					<p class="text-slate-400">
						<span class="font-medium text-slate-200">Riot ID:</span>
						{data.account.gameName} <span class="text-slate-500">#{data.account.tagLine}</span>
					</p>
					<p class="text-slate-400">
						<span class="font-medium text-slate-200">PUUID:</span><br />
						<span class="mt-1 block rounded bg-slate-900 p-2 font-mono text-xs break-all">
							{data.account.puuid}
						</span>
					</p>
				</div>
			</div>
		{:else}
			<form class="space-y-6 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label for="gameName" class="block text-sm font-medium text-slate-300">Riot ID</label>
						<input
							type="text"
							name="gameName"
							id="gameName"
							class="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-red-500 focus:ring-red-500 sm:text-sm"
							placeholder="Game Name"
							required
						/>
					</div>
					<div>
						<label for="tagLine" class="block text-sm font-medium text-slate-300">Tag Line</label>
						<div class="relative mt-1 rounded-md shadow-sm">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span class="text-slate-400">#</span>
							</div>
							<input
								type="text"
								name="tagLine"
								id="tagLine"
								class="block w-full rounded-md border-slate-600 bg-slate-700 py-2 pr-3 pl-7 text-white placeholder-slate-400 focus:border-red-500 focus:ring-red-500 sm:text-sm"
								placeholder="NA1"
								required
							/>
						</div>
					</div>
				</div>
				<button
					class="bg-kinetic-gradient text-on-primary-fixed font-display rounded px-4 py-2 font-bold"
					>Search</button
				>
			</form>
		{/if}
	</div>
</main>
