export const load = async ({ fetch }) => {
	const fetchProfiles = async () => {
		try {
			const result = await fetch('/api/v1/profiles');
			const profiles = await result.json();
			return profiles;
		} catch (error) {
			console.error(error);
		}
	};

	return {
		profiles: fetchProfiles() as unknown as ProfileResponse[]
	};
};
