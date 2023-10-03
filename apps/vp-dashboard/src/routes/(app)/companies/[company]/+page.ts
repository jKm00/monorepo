import { companies } from '$lib/stores/company.js';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = async ({ params }) => {
	const company = get(companies).find((c) => c.name === params.company);

	if (!company) {
		throw redirect(302, '/');
	}

	return {
		company
	};
};
