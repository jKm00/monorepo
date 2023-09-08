import { hashString } from "$lib/server/utils";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({event, resolve}) => {

    // Validate request
    const username = event.cookies.get('Username')
    const token = event.cookies.get('Authorization')

    if (!username || !token) {
        event.locals.session = undefined
    } else {
        const originalToken = hashString(username)
        if (token !== originalToken) {
            event.locals.session = undefined
        } else {
            event.locals.session = {
                username: username
            }
        }
    }

    return resolve(event)
}