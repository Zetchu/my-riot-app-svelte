<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SummonerSearch from './SummonerSearch.svelte';

	const { Story } = defineMeta({
		title: 'Components/SummonerSearch',
		component: SummonerSearch,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' }
	});
</script>

<Story name="Default State">
	{#snippet template(args)}
		<div class="h-screen w-full bg-surface-lowest pt-20">
			<SummonerSearch {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Loading State" args={{ loading: true, gameName: 'Faker', tagLine: 'KR1' }}>
	{#snippet template(args)}
		<div class="h-screen w-full bg-surface-lowest pt-20">
			<SummonerSearch {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Error State"
	args={{ error: 'Player not found in this region.', gameName: 'Unknown', tagLine: 'NA1' }}
>
	{#snippet template(args)}
		<div class="h-screen w-full bg-surface-lowest pt-20">
			<SummonerSearch {...args} />
		</div>
	{/snippet}
</Story>
