export interface Person {
    id: number
    ssn: number
    name: string
    age: number
}

export interface Ticket {
    date: string
    time: string
    route: string
    price: number
    unit: string
    payed: boolean
}

export interface PersonResponse {
    id: number
    ssn: number
    name: string
    age: number
    previousTickets: Ticket[]
}