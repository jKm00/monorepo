import { json } from "@sveltejs/kit"

export const GET = async () => {
    const person = {
        id: 0,
        ssn: 29059845793,
        name: "Oscar Dahle",
        age: 22,
        previousTickets: [
            {
                date: "20.03.2022",
                time: "13.57",
                route: "L21 - Moss",
                price: 2479,
                unit: "kr",
                payed: false,
            },
            {
                date: "05.01.2022",
                time: "08.15",
                route: "L22 - Mysen",
                price: 2156,
                unit: "kr",
                payed: true,
            },
            {
                date: "18.10.2021",
                time: "22.31",
                route: "K32 - Stavanger",
                price: 1875,
                unit: "kr",
                payed: true,
            }
        ]
    }

    return json(person)
}