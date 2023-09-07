import { profiles } from '$lib/server/profiles';
import { json } from '@sveltejs/kit';

export const GET = ({ params }) => {
	const profile = profiles.find((p) => p.username === params.username);

	if (!profile) {
		return new Response(`Profile with username ${params.username} not found`, { status: 404 });
	}

	return json({
		username: profile.username,
		img: {
			src: profile.img.src,
			alt: profile.img.alt
		},
		isPasswordProtected: profile.isPasswordProtected
	});
};
