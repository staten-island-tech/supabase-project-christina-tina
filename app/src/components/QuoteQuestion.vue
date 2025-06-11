<template>
  <div>
    <div v-if="!questionError && currentQuestion">
      <QuestionCard :question="currentQuestion" />
    </div>
    <div v-else-if="questionError" class="text-red-600 font-semibold p-4">
      Error: {{ questionError.message }}
    </div>
    <div v-else class="text-gray-500 p-4">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import QuestionCard from './QuestionCard.vue'

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

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const questionsData = ref<Question[]>([])
const answersData = ref<string[]>([])
const questionError = ref<Error | null>(null)
const currentQuestion = ref<DisplayQuestion | null>(null)

async function getQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('category', 'quote')

  if (error) {
    questionError.value = error
  } else {
    questionsData.value = data as Question[]
  }
}

async function getAllAnswers() {
  const { data, error } = await supabase
    .from('questions')
    .select('correct_ans')

  if (error) {
    questionError.value = error
  } else {
    answersData.value = (data as { correct_ans: string }[]).map(a => a.correct_ans)
  }
}

function generateQuestion(): void {
  if (!questionsData.value.length || !answersData.value.length) return

  const randomIndex = Math.floor(Math.random() * questionsData.value.length)
  const selected = questionsData.value[randomIndex]
  const correctAnswer = selected.correct_ans

  const incorrectAnswers = new Set<string>()
  while (incorrectAnswers.size < 3) {
    const rand = answersData.value[Math.floor(Math.random() * answersData.value.length)]
    if (rand !== correctAnswer) {
      incorrectAnswers.add(rand)
    }
  }

  const allAnswers = shuffle([correctAnswer, ...Array.from(incorrectAnswers)])

  currentQuestion.value = {
    id: selected.id,
    text: selected.question,
    correct: correctAnswer,
    choices: allAnswers,
  }
}

onMounted(async () => {
  await getQuestions()
  await getAllAnswers()
  generateQuestion()
})
</script>
