<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SummonerSearch from './SummonerSearch.svelte';

	const { Story } = defineMeta({
		title: 'Components/SummonerSearch',
		component: SummonerSearch,
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Default State">
	<div class="h-screen w-full bg-surface-lowest">
		<SummonerSearch />
	</div>
</Story>
