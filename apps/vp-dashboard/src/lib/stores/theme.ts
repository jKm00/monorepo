import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultTheme = 'light';
const initialTheme = browser ? window.localStorage.getItem('theme') ?? defaultTheme : defaultTheme;

export const theme = writable<string>(initialTheme);

theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('theme', value);

		document.querySelector('body')?.classList.remove('light');
		document.querySelector('body')?.classList.remove('dark');
		document.querySelector('body')?.classList.add(value);
	}
});
