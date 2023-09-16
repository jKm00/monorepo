import { AUTH_TOKEN } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({event, resolve}) => {

    // Validate request
    const token = event.cookies.get('Authorization')

    if (!token) {
        event.locals.session = undefined
    } else {
        if (token !== AUTH_TOKEN) {
            event.locals.session = undefined
        } else {
            event.locals.session = token
        }
    }

    return resolve(event)
}