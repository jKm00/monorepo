import { changeProfile, deleteProfile, profiles } from '$lib/server/profiles.js';
import { fail, redirect } from '@sveltejs/kit';
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

export const actions = {
	save: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.id || !formData.imgId || !formData.username || !formData.password) {
			return fail(400, {
				error: 'Something went wrong. Please try again!'
			});
		}

		const { id, imgId, username, password } = formData as {
			id: string;
			imgId: string;
			username: string;
			password: string;
		};

		if (password.length !== 4) {
			return fail(400, {
				error: 'Pin code must be 4 digits!'
			});
		}

		let pinCode = Number(password);

		if (!pinCode) {
			return fail(400, {
				error: 'Pin code can only contain digits from 0-9'
			});
		}

		let img: { id: number; src: string; alt: string } | undefined;
		let _imgId = Number(imgId);
		if (_imgId !== -1) {
			img = profilePictures.find((p) => p.id === _imgId);
		}

		changeProfile(Number(id), img, username, pinCode.toString());

		throw redirect(302, '/logout?redirect=/edit-profiles');
	},
	delete: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.id) {
			return fail(400, {
				error: 'Something went wrong. Please try again!'
			});
		}

		const { id } = formData as { id: string };

		deleteProfile(Number(id));

		throw redirect(302, '/logout');
	}
};
