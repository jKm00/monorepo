import { AUTH_KEY } from '$env/static/private';
// @ts-ignore
import sha256 from 'crypto-js/sha256';
// @ts-ignore
import Base64 from 'crypto-js/enc-base64';

export const hashString = (string: string) => {
	return Base64.stringify(sha256(AUTH_KEY + string));
};
