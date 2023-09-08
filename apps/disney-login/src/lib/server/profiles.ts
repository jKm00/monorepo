export let profiles: Profile[] = [
	{
		username: 'jKm',
		img: {
			src: 'snips.png',
			alt: "jKm's profile picture"
		},
		isPasswordProtected: true,
		password: '1234'
	}
];

export const addProfile = (profile: Profile) => {
	profiles = [...profiles, profile];
};
