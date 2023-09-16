import { redirect } from '@sveltejs/kit';

export const POST = (event) => {
    event.cookies.delete('Authorization', { path: '/' });

    throw redirect(302, "/login")
}