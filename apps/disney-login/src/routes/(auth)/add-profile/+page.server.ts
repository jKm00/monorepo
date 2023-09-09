import { addProfile, profiles } from '$lib/server/profiles.js';
import { fail } from '@sveltejs/kit';
import { profilePictures } from '../select-avatar/profilePictures.js';

export const actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.img || !formData.username || !formData.password) {
			return fail(400, {
				error: 'Missing image, username or password'
			});
		}

		const { img, username, password } = formData as {
			img: string;
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

		if (profiles.map((p) => p.username).includes(username)) {
			return fail(400, {
				error: 'Username already taken'
			});
		}

		let imgId = Number(img);

		if (!imgId) {
			return fail(400, {
				error: 'Could not find image. Please try again!'
			});
		}

		const image = profilePictures.find((i) => i.id === Number(imgId));

		if (!image) {
			return fail(400, {
				error: 'Could not find image. Please try again!'
			});
		}

		addProfile({
			id: profiles[profiles.length - 1].id + 1,
			username,
			img: {
				src: image?.src,
				alt: image?.alt
			},
			isPasswordProtected: true,
			password: pinCode.toString()
		});

		return {
			success: 200
		};
	}
};
