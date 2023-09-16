import { fail, redirect } from "@sveltejs/kit";
import { loginSchema } from "./schema";
import { message, superValidate } from "sveltekit-superforms/server";
import { ADMIN_PASSWORD, ADMIN_USERNAME, AUTH_TOKEN } from "$env/static/private";

export const load = async () => {
    return {
        form: superValidate(loginSchema)
    }
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, loginSchema)

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const { username, password } = form.data as Record<string, string>

        if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            console.log('hi')
            return message(form, 'Wrong username or password');
        }

        event.cookies.set('Authorization', AUTH_TOKEN)

        throw redirect(302, "/")
    }
}