interface User {
    email: string
    username: string
    currency: number
    score: number
    items: object[]
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
}

export type {User, UserForm, Powerup}