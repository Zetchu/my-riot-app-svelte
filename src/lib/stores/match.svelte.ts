import { browser } from '$app/environment';
import type { MatchDetail, MatchSummary } from '$lib/types';

class MatchDetailState {
	#value = $state<MatchDetail | null>(null);

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('riot_selected_match');
			if (stored) {
				try {
					this.#value = JSON.parse(stored);
				} catch (e) {
					console.error('Could not parse stored match detail', e);
				}
			}
		}
	}

	get value() {
		return this.#value;
	}

	set value(data: MatchDetail | null) {
		this.#value = data;
		if (browser) {
			if (data) localStorage.setItem('riot_selected_match', JSON.stringify(data));
			else localStorage.removeItem('riot_selected_match');
		}
	}
}

class MatchHistoryState {
	#value = $state<MatchSummary[]>([]);

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('riot_match_history');
			if (stored) {
				try {
					this.#value = JSON.parse(stored);
				} catch (e) {
					console.error('Could not parse stored match history', e);
				}
			}
		}
	}

	get value() {
		return this.#value;
	}

	set value(data: MatchSummary[]) {
		this.#value = data;
		if (browser) {
			if (data && data.length > 0) localStorage.setItem('riot_match_history', JSON.stringify(data));
			else localStorage.removeItem('riot_match_history');
		}
	}
}

export const selectedMatchStore = new MatchDetailState();
export const matchHistoryStore = new MatchHistoryState();
