interface User {
    id: string
    email: string
    username: string
    currency: number
    score: number
}

interface UserForm {
    email: string
    password: string
    username: string
}

interface Powerup {
    id: number
    name: string
    description: string
    price: number
    amount:number
}

export type {User, UserForm, Powerup}