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

export type {User, UserForm}