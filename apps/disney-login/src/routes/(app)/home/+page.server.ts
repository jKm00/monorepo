import { hashString } from '$lib/server/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const username = event.cookies.get('Username');
	const token = event.cookies.get('Authorization');

	if (!username || !token) {
		throw redirect(302, '/');
	}

	const originalToken = hashString(username);
	if (token !== originalToken) {
		throw redirect(302, '/');
	}
};
