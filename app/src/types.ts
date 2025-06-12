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

interface Question {
    id: number
    category: string
    question: string
    correct_ans: string
}
  
interface DisplayQuestion {
    id: number
    text: string
    correct: string
    choices: string[]
}

export type {User, UserForm, Question, DisplayQuestion}