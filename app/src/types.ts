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

interface UserLeaderboard {
  username: string
  currency: number
  score: number
}

export type {User, UserForm, Powerup, Question, DisplayQuestion, UserLeaderboard}
