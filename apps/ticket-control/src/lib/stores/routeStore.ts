import { writable } from "svelte/store";

function createRoute() {
	const { subscribe, set } = writable<string>("");

	return {
		subscribe,
		set
	};
}

export const route = createRoute();