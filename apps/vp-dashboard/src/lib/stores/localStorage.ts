import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const useLocalStorage = <T>(key: string, fallbackValue: T) => {
	let storedValue = null;
	if (browser) {
		storedValue = window.localStorage.getItem(key);
	}
	const initialValue = storedValue ? JSON.parse(storedValue) : fallbackValue;

	const { subscribe, update, set } = writable<T>(initialValue);

	// Update local storage whenever value changes
	subscribe((value) => {
		if (browser) {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return {
		subscribe,
		update,
		set
	};
}