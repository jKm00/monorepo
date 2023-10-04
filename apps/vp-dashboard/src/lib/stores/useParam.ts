import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';

interface Options {
	fallback?: string
	debounced?: boolean;
	debounceDelay?: number;
}

export const useParam = (
	key: string,
	params: Writable<Record<string, string>>,
	options?: Options
) => {
	const currentValue = get(params)[key]
	const initialValue = currentValue ? currentValue : options?.fallback ?? ''
	const value = writable<string>(initialValue);

	const defaultOptions: Options = {
		debounced: false,
		debounceDelay: 500
	};

	const finalOptions = { ...defaultOptions, ...options };

	let debounceTimer: number | null = null;

	onMount(() => {
		const unsubscribe = value.subscribe((value) => {
			if (finalOptions.debounced) {
				if (debounceTimer) {
					clearTimeout(debounceTimer);
				}
	
				debounceTimer = setTimeout(() => {
					updateParams(key, value, params);
	
					debounceTimer = null;
				}, finalOptions.debounceDelay);
			} else {
				updateParams(key, value, params);
			}
		});

		return () => unsubscribe()
	})

	return value;
};

const updateParams = (key: string, value: string, params: Writable<Record<string, string>>) => {
	params.update((curr) => {
		if (value) {
			curr[key] = value;
		} else {
			delete curr[key];
		}

		return curr;
	});
};
