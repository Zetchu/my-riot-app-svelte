import { browser } from '$app/environment';
import type { SummonerData } from '$lib/types';

class SummonerState {
	#value = $state<SummonerData | null>(null);

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('riot_summoner');
			if (stored) {
				try {
					this.#value = JSON.parse(stored);
				} catch (e) {
					console.error('Could not parse stored summoner data', e);
				}
			}
		}
	}

	get value() {
		return this.#value;
	}

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
