import { ADMIN_TOKEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	if (!cookies.get('token') || cookies.get('token') !== ADMIN_TOKEN) {
		throw redirect(302, '/login');
	}
};
