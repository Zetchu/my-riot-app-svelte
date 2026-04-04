<script>
	const modules = [
		{
			title: 'Tilt Velocity',
			description:
				'Real-time biometric and performance analysis that detects when your decision-making is slowing down before you even notice.',
			icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			color: 'primary'
		},
		{
			title: 'Live Scouting',
			description:
				'Advanced opponent behavioral patterns. Know which lane is likely to tilt first and where the mechanical cracks are in their armor.',
			icon: 'M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59',
			color: 'secondary'
		},
		{
			title: 'Pro Analytics',
			description:
				'Post-game breakdowns that ignore the stats and focus on your mental endurance. Track your "Zen Recovery" after tough losses.',
			icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
			color: 'orange-500'
		}
	];
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

	<!-- Hero Section -->
	<div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:shrink-0">
			<div class="mt-24 sm:mt-32 lg:mt-16">
				<a href="/" class="inline-flex space-x-6">
					<span
						class="rounded-full bg-surface-high/50 px-3 py-1 text-sm/6 font-semibold text-primary ring-1 ring-primary/20 backdrop-blur-sm ring-inset"
					>
						<span class="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
						LIVE SYN ACTIVE
					</span>
				</a>
			</div>
			<h1
				class="mt-10 font-display text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-7xl"
			>
				MAINTAIN THE <span class="bg-kinetic-gradient bg-clip-text text-transparent">FLOW.</span><br
				/>
				ELIMINATE THE <span class="bg-kinetic-gradient bg-clip-text text-transparent">TILT.</span>
			</h1>
			<p class="mt-6 text-lg leading-8 text-on-surface-variant">
				The ultimate luxury command center for high-stakes competitive play. Predictive analytics
				meeting raw performance data.
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				<a
					href="/dashboard"
					class="rounded-sm bg-primary-container px-8 py-3.5 text-sm font-semibold tracking-wider text-on-primary-fixed uppercase shadow-sm transition-all duration-300 hover:bg-primary hover:text-surface-lowest focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
				>
					Start Tracking
				</a>
				<a
					href="/"
					class="rounded-sm px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase ring-1 ring-white/20 transition-all duration-300 ring-inset hover:text-primary hover:ring-primary"
				>
					View Pro Demo
				</a>
			</div>
		</div>

		<!-- Dashboard Mockup (Right Side) -->
		<div
			class="mx-auto flex max-w-2xl sm:mt-24 lg:mt-32 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<div
					class="rounded-xl border border-surface-variant/30 bg-surface-low p-2 shadow-2xl ring-1 ring-gray-900/10"
				>
					<div class="rounded-lg bg-surface px-6 pt-4 pb-6">
						<!-- Card Header -->
						<div class="flex items-center justify-between border-b border-surface-variant/20 pb-4">
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-high">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6 text-primary"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
										/>
									</svg>
								</div>
								<div>
									<div
										class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase"
									>
										Active Summoner
									</div>
									<div class="text-sm font-bold text-white">Viper#NA1</div>
								</div>
							</div>
							<span
								class="inline-flex items-center rounded-sm bg-surface-variant/30 px-2 py-1 text-xs font-medium tracking-wider text-secondary uppercase ring-1 ring-secondary/20 ring-inset"
								>Challenger Tier</span
							>
						</div>

						<!-- Card Body -->
						<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
							<!-- Radial Gauge -->
							<div
								class="relative flex flex-col items-center justify-center rounded-xl bg-surface-high/30 p-6"
							>
								<div class="relative h-32 w-32">
									<!-- Background Circle -->
									<svg class="h-full w-full rotate-90" viewBox="0 0 36 36">
										<path
											class="text-surface-variant/20"
											d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										></path>
										<!-- Progress Circle (74%) -->
										<path
											class="text-primary drop-shadow-[0_0_4px_rgba(255,183,125,0.5)]"
											stroke-dasharray="74, 100"
											d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										></path>
									</svg>
									<!-- Center Text -->
									<div
										class="absolute inset-0 flex flex-col items-center justify-center text-center"
									>
										<span class="font-display text-4xl font-bold text-white">74</span>
										<span class="text-[0.6rem] tracking-widest text-on-surface-variant uppercase"
											>Velocity</span
										>
									</div>
								</div>
								<div class="mt-4 text-center">
									<div class="font-bold text-white">Optimal Flow</div>
									<div class="text-xs text-secondary">Predicted +14 LP</div>
								</div>
							</div>

							<!-- Match List -->
							<div class="flex flex-col justify-center space-y-3">
								<div
									class="mb-2 text-[10px] font-bold tracking-wider text-on-surface-variant uppercase"
								>
									Live Match Indicator
								</div>

								<!-- Match 1 -->
								<div
									class="flex items-center justify-between rounded-lg bg-surface-high p-3 ring-1 ring-white/5"
								>
									<div class="flex items-center gap-3">
										<div class="h-8 w-8 overflow-hidden rounded-full bg-surface-variant">
											<svg
												class="h-full w-full p-1 text-on-surface-variant"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
												/>
											</svg>
										</div>
										<div>
											<div class="text-xs font-bold text-secondary uppercase">Victory</div>
											<div class="text-xs text-on-surface-variant">Lucian (12/2/4)</div>
										</div>
									</div>
									<div class="text-right">
										<div class="text-[0.6rem] text-on-surface-variant uppercase">Tilt Impact</div>
										<div class="text-xs font-bold text-green-400">- 12%</div>
									</div>
								</div>

								<!-- Match 2 -->
								<div
									class="flex items-center justify-between rounded-lg bg-surface-high p-3 opacity-60 ring-1 ring-white/5"
								>
									<div class="flex items-center gap-3">
										<div class="h-8 w-8 overflow-hidden rounded-full bg-surface-variant">
											<svg
												class="h-full w-full p-1 text-on-surface-variant"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
												/>
											</svg>
										</div>
										<div>
											<div class="text-xs font-bold text-on-surface uppercase">Defeat</div>
											<div class="text-xs text-on-surface-variant">Ezreal (4/8/1)</div>
										</div>
									</div>
									<div class="text-right">
										<div class="text-[0.6rem] text-on-surface-variant uppercase">Tilt Impact</div>
										<div class="text-xs font-bold text-red-400">+ 45%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Precision Modules Section -->
	<div class="bg-surface-lowest py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
					Precision <span class="bg-kinetic-gradient bg-clip-text text-transparent">Modules</span>
				</h2>
				<div class="mt-4 h-1 w-20 bg-linear-to-r from-primary to-transparent"></div>
			</div>
			<div
				class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				{#each modules as module (module.title)}
					<div
						class="flex flex-col justify-between rounded-sm bg-surface-low p-8 ring-1 ring-white/5 transition hover:bg-surface-high"
					>
						<div>
							<div
								class="mb-6 inline-flex rounded-lg bg-{module.color}/10 p-3 ring-1 ring-{module.color}/20"
							>
								<svg
									class="h-6 w-6 text-{module.color}"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={module.icon} />
								</svg>
							</div>
							<h3 class="font-display text-lg leading-8 font-bold text-white">{module.title}</h3>
							<p class="mt-2 text-sm leading-7 text-on-surface-variant">
								{module.description}
							</p>
						</div>
						<div class="mt-8 h-1 w-full overflow-hidden rounded-full bg-surface-variant">
							<div class="h-full w-1/3 bg-{module.color}"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="border-t border-surface-variant/20 bg-surface-lowest py-16 sm:py-24">
		<div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
			<h2
				class="mb-2 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-6xl"
			>
				Ready to climb?
			</h2>
			<h2
				class="mb-12 font-display text-4xl font-bold tracking-tight text-primary-container uppercase sm:text-6xl"
			>
				Sync your summoner
			</h2>

			<div class="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 sm:flex-row">
				<input
					type="text"
					placeholder="Enter Summoner Name..."
					class="w-full rounded-sm border-0 bg-surface-container/50 px-4 py-3.5 text-on-surface shadow-sm ring-1 ring-white/10 ring-inset placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary focus:ring-inset sm:text-sm sm:leading-6"
				/>
				<button
					class="w-full flex-none rounded-sm bg-primary-container px-8 py-3.5 text-sm font-bold tracking-wider text-on-primary-fixed uppercase shadow-sm transition-all duration-300 hover:bg-primary hover:text-surface-lowest focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
				>
					Unleash Kinetic
				</button>
			</div>

			<div
				class="mt-8 flex justify-center gap-8 text-[10px] font-bold tracking-wider text-on-surface-variant uppercase"
			>
				<span>Riot Games API Compliant</span>
				<span>Secure Sync</span>
			</div>
		</div>
	</div>
</div>
