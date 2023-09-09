interface Profile {
	id: number;
	username: string;
	img: {
		src: string;
		alt: string;
	};
	isPasswordProtected: boolean;
	password?: string;
}

type ProfileResponse = Omit<Profile, 'password'>;

interface LoginRequest {
	username: string;
	password: string;
}

interface AuthUser {
	username: string;
	token: string;
}
