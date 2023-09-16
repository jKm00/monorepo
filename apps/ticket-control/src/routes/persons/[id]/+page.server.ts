import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
    if (!locals.session) {
        throw redirect(302, `/login?redirectTo=/persons/${params.id}`)
    }
};