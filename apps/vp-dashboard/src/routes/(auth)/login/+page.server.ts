import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { ADMIN_PASSWORD, ADMIN_TOKEN, ADMIN_USERNAME } from '$env/static/private';

export const load = async ({ cookies }) => {
	if (cookies.get('token') === ADMIN_TOKEN) {
		throw redirect(302, '/');
	}

	return {
		form: superValidate(loginSchema)
	};
};

const ALLOWED_PROVIDERS = ['github', 'google', 'apple'];

export const actions = {
	login: async ({ request, url, cookies }) => {
		const form = await superValidate(request, loginSchema);

		const provider = url.searchParams.get('provider');

		if (provider) {
			if (ALLOWED_PROVIDERS.includes(provider)) {
				cookies.set('token', ADMIN_TOKEN);
				throw redirect(302, '/');
			} else {
				return fail(400, { form, error: `${provider} is not a valid provider` });
			}
		}

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, password } = form.data;

		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			cookies.set('token', ADMIN_TOKEN);
			throw redirect(302, '/');
		}

		return fail(400, { form, error: 'Something went wrong. Please try again' });
	}
};
