import { persons } from '$lib/server/persons';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs'

export const load = async ({ locals, params }) => {
    if (!locals.session) {
        throw redirect(302, `/login?redirectTo=/persons/${params.id}`)
    }
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const ssn = data.get('ssn')
        const route = data.get('route')

        if (!ssn) {
            return {
                error: 'ssn not available'
            }
        }

        if (!route) {
            return {
                error: 'Route not available'
            }
        }

        const index = persons.findIndex(p => p.ssn === Number(ssn))

        if (index === -1) {
            console.log('hi')
            return {
                error: `Did not find person with ssn: ${ssn}`
            }
        }

        const BASE_PRICE = 1875
        const ticketPrice = persons[index].previousTickets.length === 0 ? BASE_PRICE : persons[index].previousTickets[0].price * 1.15
        const currentDate = new Date()
        const newTicket = {
            date: dayjs(currentDate).format("DD.MM.YYYY"),
            time: dayjs(currentDate).format("HH.mm"),
            route: `${route}`,
            price: ticketPrice,
            unit: "kr",
            payed: false,
        }

        persons[index].previousTickets = [newTicket, ...persons[index].previousTickets]

        return {
            success: true
        }
    }
}