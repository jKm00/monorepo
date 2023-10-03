import { get, writable, type Writable } from 'svelte/store';

interface Options {
	debounced?: boolean;
	debounceDelay?: number;
}

export const useParam = (
	key: string,
	params: Writable<Record<string, string>>,
	options?: Options
) => {
	const value = writable<string>(get(params)[key] || '');

	const defaultOptions: Options = {
		debounced: false,
		debounceDelay: 500
	};

	const finalOptions = { ...defaultOptions, ...options };

	let debounceTimer: number | null = null;

	value.subscribe((value) => {
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
