import { page } from '$app/stores';
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';

interface Options {
	immediate: boolean;
}

export const useFetch = <T>(path: string, options?: Options) => {
	let firstLoad = true;
	const data = writable<T>();
	const isLoading = writable<boolean>(false);
	const error = writable<unknown>(null);
	const params = writable<Record<string, string>>(initializeParams());

	const getData = async () => {
		isLoading.set(true);

		try {
			// Get all params
			const searchParams = new URLSearchParams();

			const _params = get(params);
			if (_params) {
				const paramKeys = Object.keys(_params);
				paramKeys.forEach((key) => {
					searchParams.append(key, _params[key]);
				});
			}

			// Update url
			if (searchParams.size > 0) {
				history.replaceState(history.state, '', `?${searchParams.toString()}`);
			} else {
				history.replaceState(history.state, '', get(page).url.pathname);
			}

			// Fetch data
			let completePath = `${path}?${searchParams.toString()}`;

			const result = await fetch(completePath);
			const tmp = (await result.json()) as unknown as T;

			data.set(tmp);
		} catch (err) {
			error.set(err);
		} finally {
			isLoading.set(false);
		}
	};

	onMount(() => {
		if (options && options.immediate) {
			getData();
		}

		// TODO: Unsubscribe on demount
		params.subscribe((_) => {
			if (!firstLoad) {
				getData();
			}
			firstLoad = false;
		});
	});

	return {
		data,
		isLoading,
		error,
		params
	};
};

const initializeParams = () => {
	const searchParams = get(page).url.searchParams;

	const record = {} as Record<string, string>;

	searchParams.forEach((value, key) => {
		record[key] = value;
	});

	return record;
};
