import { profiles } from '$lib/server/profiles.js';
import { redirect } from '@sveltejs/kit';
import { profilePictures } from '../../select-avatar/profilePictures.js';

export const load = async ({ locals, params, url }) => {
	if (!locals.session) {
		throw redirect(302, '/');
	}

	const profile = profiles.find((p) => p.username === params.username);
	if (!profile) {
		throw redirect(302, '/edit-profiles');
	}

	const imgId = url.searchParams.get('img');
	let tmpImg: { id: number; src: string; alt: string } | undefined;
	if (imgId) {
		tmpImg = profilePictures.find((p) => p.id === Number(imgId));
	}

	return {
		profile,
		numberOfProfiles: profiles.length,
		tmpImg
	};
};
