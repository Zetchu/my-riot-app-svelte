import type { Preview } from '@storybook/svelte';
import '../src/routes/layout.css'; // Path to your global CSS file

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#0e0e0e' }]
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
