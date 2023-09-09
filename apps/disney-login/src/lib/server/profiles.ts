export let profiles: Profile[] = [
	{
		id: 0,
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

export const changeProfile = (
	id: number,
	img: { src: string; alt: string } | undefined,
	username: string,
	pinCode: string
) => {
	const indexOfProfile = profiles.findIndex((p) => p.id === id);
	if (indexOfProfile === -1) {
		return;
	}

	if (img) {
		profiles[indexOfProfile].img = img;
	}
	profiles[indexOfProfile].username = username;
	profiles[indexOfProfile].password = pinCode;
};

export const deleteProfile = (id: number) => {
	const index = profiles.findIndex((p) => p.id === id);

	if (index === -1) return;

	profiles = [...profiles.slice(0, index), ...profiles.slice(index + 1)];
};
