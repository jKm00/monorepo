import { profiles } from '$lib/server/profiles.js';
import { hashString } from '$lib/server/utils.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.username || !formData.password) {
			return fail(400, {
				error: 'Missing username or password'
			});
		}

		const { username, password } = formData as { username: string; password: string };

		const profile = profiles.find((p) => p.username === username);
		if (!profile) {
			return fail(404, {
				error: 'Profile not found'
			});
		}

		if (profile.isPasswordProtected && profile.password !== password) {
			return fail(401, {
				error: 'Wrong password!'
			});
		}

		const token = hashString(profile.username);
		// Set cookie
		event.cookies.set('Authorization', token, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});
		event.cookies.set('Username', profile.username, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/home');
	}
};
