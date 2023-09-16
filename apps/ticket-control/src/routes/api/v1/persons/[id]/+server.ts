import { persons } from "$lib/server/persons"
import { json } from "@sveltejs/kit"

export const GET = async ({params}) => {
    const person = persons.find(p => p.ssn === Number(params.id))

    if (!person) {
        return new Response(`Could not find person with ssn: ${params.id}`, { status: 404 })
    }

    return json(person)
}