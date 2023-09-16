import type { PersonResponse } from '$lib/types.js';

export const load = async ({ params, fetch }) => {
    const findPerson = async () => {
        try {
            const result = await fetch(`/api/v1/persons/${params.id}`)
            const person = await result.json()

            return person as PersonResponse
        } catch (error) {
            return undefined
        }
    }

    return {
        ssn: params.id,
        person: findPerson()
    }
};