import { redirect } from '@sveltejs/kit';
import { profilePictures } from '../select-avatar/profilePictures.js';

export const load = async ({ url }) => {
    const username = url.searchParams.get('username')
    const imgId  = url.searchParams.get('img')
    const img = profilePictures.find(p => p.id === Number(imgId))

    if (!img) {
        throw redirect(302, '/select-avatar')
    }

    return {
        img,
        username
    }
};