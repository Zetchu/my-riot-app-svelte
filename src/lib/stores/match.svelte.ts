import type { MatchDetail } from '$lib/types';

class MatchState {
	value = $state<MatchDetail | null>(null);
}

export const selectedMatchStore = new MatchState();
