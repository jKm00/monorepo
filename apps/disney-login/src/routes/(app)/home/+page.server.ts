import { hashString } from '$lib/server/utils.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(302, '/')
	}
};
