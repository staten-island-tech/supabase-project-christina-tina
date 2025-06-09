interface User {
    email: string
    username: string
    profile_pic: string
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