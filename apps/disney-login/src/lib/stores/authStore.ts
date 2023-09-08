import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function createAuthStore() {
	const { subscribe, set } = writable<AuthUser | undefined>(undefined);

	const setAuth = (username: string, token: string) => {
		set({
			username,
			token
		});
	};

	const clear = () => {
		set(undefined)
	}

	if (browser) {
		const username = window.localStorage.getItem('username');
		const token = window.localStorage.getItem('token');
		if (token && token.length > 0 && username && username.length > 0) {
			setAuth(username, token);
		}
	}

	subscribe((value) => {
		if (browser) {
			if (value?.username) {
				window.localStorage.setItem('username', value?.username ?? '');
			} else {
				window.localStorage.removeItem('username')
			}

			if (value?.token) {
				window.localStorage.setItem('token', value?.token ?? '');
			} else {
				window.localStorage.removeItem('token')
			}
		}
	});

	return {
		subscribe,
		set: setAuth,
		clear,
	};
}

export const authStore = createAuthStore();
