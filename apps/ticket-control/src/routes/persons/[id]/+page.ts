import type { PersonResponse } from '$lib/types.js';

export const load = async ({ params, fetch }) => {
    const findPerson = async () => {
        const result = await fetch(`/api/v1/persons/${29059845893}`)
        const person = await result.json()

        return person as PersonResponse
    }

    return {
        ssn: params.id,
        person: findPerson()
    }
};