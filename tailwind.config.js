/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// --- Surface Hierarchy ---
				'surface-lowest': '#0e0e0e',
				surface: '#131313',
				'surface-low': '#1a1a1a',
				'surface-container': '#201f1f',
				'surface-high': '#2a2a2a',
				'surface-variant': '#2a2a2a',
				'surface-tint': '#ffb77d',

				// --- Brand & Accents ---
				primary: '#ffb77d',
				'primary-container': '#ff8c00',
				'on-primary-fixed': '#2f1500',

				secondary: '#e9c349', // Brushed Gold
				'secondary-fixed': '#e9c349',

				error: '#ffb4ab',

				// --- Typography & Lines ---
				'on-surface': '#e5e2e1', // No pure white
				'on-surface-variant': '#a8a4a2', // Adjusted for 4.5:1 contrast
				outline: '#a48c7a',
				'outline-variant': '#a48c7a' // We will use /15 opacity in HTML
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'sans-serif'],
				body: ['Inter', 'sans-serif']
			},
			backgroundImage: {
				// The signature 135-degree metallic energy texture
				'kinetic-gradient': 'linear-gradient(135deg, #ffb77d, #ff8c00)'
			},
			boxShadow: {
				// Ambient Shadow: diffused, tinted with primary_container (#ff8c00)
				ambient: '0 32px 64px -12px rgba(255, 140, 0, 0.08)',

				// Ghost Borders & Glows (4px outer bloom)
				'glow-victory': '0 0 4px 1px rgba(233, 195, 73, 0.4)', // Secondary
				'glow-defeat': '0 0 4px 1px rgba(255, 180, 171, 0.4)' // Error
			}
		}
	},
	plugins: []
};
