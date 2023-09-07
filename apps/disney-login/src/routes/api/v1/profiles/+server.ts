import { profiles } from '$lib/server/profiles';
import { json } from '@sveltejs/kit';

export const GET = () => {
	return json(
		profiles.map((p) => ({
			username: p.username,
			img: {
				src: p.img.src,
				alt: p.img.alt
			},
			isPasswordProtected: p.isPasswordProtected
		}))
	);
};
