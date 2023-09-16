import { browser } from "$app/environment";
import { writable } from "svelte/store";

function createRoute() {
	const { subscribe, set } = writable<string>("");

	const KEY = "route"

	if (browser) {
		const storedValue = window.localStorage.getItem(KEY)
		if (storedValue) {
			set(storedValue)
		}
	}

	subscribe((value) => {
		if (browser) {
			window.localStorage.setItem(KEY, value)
		}
	})

	return {
		subscribe,
		set
	};
}

export const route = createRoute();