import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';

// 1. AUTO-CLEANUP: Destroys the component after each test so they don't overlap!
afterEach(() => {
	cleanup();
});

// 2. MOCK LOCAL STORAGE: Gives your Svelte stores a fake storage layer during tests
const localStorageMock = (function () {
	let store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value.toString();
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		}),
		clear: vi.fn(() => {
			store = {};
		})
	};
})();

// Inject the mock into the Vitest fake browser window
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});
