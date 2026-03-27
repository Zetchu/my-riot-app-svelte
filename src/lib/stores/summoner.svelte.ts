import { browser } from '$app/environment';
import type { SummonerData } from '$lib/types';

class SummonerState {
	#value = $state<SummonerData | null>(null);

	constructor() {
		// When the app starts, instantly check if we saved a player previously
		if (browser) {
			const stored = localStorage.getItem('riot_summoner');
			if (stored) {
				try {
					this.#value = JSON.parse(stored);
				} catch (e) {
					console.error('Could not parse stored summoner data');
				}
			}
		}
	}

	// Whenever your app asks for summonerStore.value, it runs this
	get value() {
		return this.#value;
	}

	// Whenever your app UPDATES summonerStore.value, it runs this and saves it!
	set value(data: SummonerData | null) {
		this.#value = data;

		if (browser) {
			if (data) {
				localStorage.setItem('riot_summoner', JSON.stringify(data));
			} else {
				localStorage.removeItem('riot_summoner');
			}
		}
	}
}

export const summonerStore = new SummonerState();
