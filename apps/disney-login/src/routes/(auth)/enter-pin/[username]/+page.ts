import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const fetchProfile = async () => {
		try {
			const result = await fetch(`/api/v1/profiles/${params.username}`);
			const profile = await result.json();

			return profile;
		} catch (error) {
			throw redirect(302, '/select-profile');
		}
	};

	return {
		profile: fetchProfile() as unknown as ProfileResponse
	};
};
