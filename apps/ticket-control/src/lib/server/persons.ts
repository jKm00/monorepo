export const persons = [
    {
        id: 0,
        ssn: 29059845793,
        name: "Oscar Dahle",
        age: 25,
        previousTickets: [
            {
                date: "20.03.2022",
                time: "13.57",
                route: "L21 - Moss",
                paymentMethod: 'vipps',
                price: 2479,
                unit: "kr",
                payed: false,
            },
            {
                date: "05.01.2022",
                time: "08.15",
                route: "L22 - Mysen",
                paymentMethod: 'invoice',
                price: 2156,
                unit: "kr",
                payed: true,
            },
            {
                date: "18.10.2021",
                time: "22.31",
                route: "K32 - Stavanger",
                paymentMethod: 'invoice',
                price: 1875,
                unit: "kr",
                payed: true,
            }
        ]
    },
    {
        id: 1,
        ssn: 31108494583,
        name: "Carl Andre",
        age: 39,
        previousTickets: []
    }
]