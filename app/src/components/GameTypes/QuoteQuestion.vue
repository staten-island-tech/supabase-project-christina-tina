<template>
  <div>
    <LoadingSpinner
      v-if="loading"
      message="Loading questions..."
      sizeClass="w-16 h-16"
      colorClass="text-blue-600"
      backgroundClass="bg-white/70"
    />

    <div v-else>
      <div v-if="!gameStarted">
        <button
          @click="startGame"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Game
        </button>
      </div>

      <div v-else>
        <div v-if="!questionError && currentQuestion">
          <div class="text-center mb-4 text-gray-700 font-medium">
            Question {{ currentIndex }} of {{ questionsData.length }}
          </div>
          <QuestionCard :question="currentQuestion" @answerSelected="handleAnswer" />
        </div>

        <div v-else-if="questionError" class="text-red-600 font-semibold p-4">
          Error: {{ questionError.message }}
        </div>

        <div v-else-if="!questionError && questionsData.length === 0" class="text-gray-500 p-4">
          No questions available.
        </div>

        <div v-else-if="!currentQuestion" class="text-center p-6">
          <h2 class="text-xl font-semibold mb-4">Game Over!</h2>
          <p class="mb-4">
            You got {{ correctAnswersCount }} out of {{ questionsData.length }} questions right.
          </p>
          <button
            @click="startGame"
            class="mr-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Play Again
          </button>
          <button
            class="px-4 py-2 bg-gray-600 text-white rounded"
          ><RouterLink to="/game">Choose another game</RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../../supabaseClient'
import QuestionCard from '../QuestionCard.vue'
import LoadingSpinner from '../LoadingScreen.vue'
import type { Question, DisplayQuestion } from '../../types'
import { shuffle } from '../../function'

const questionsData = ref<Question[]>([])
const answersData = ref<string[]>([])
const questionError = ref<Error | null>(null)
const currentQuestion = ref<DisplayQuestion | null>(null)
const usedQuestionIds = ref<Set<number>>(new Set())
const gameStarted = ref(false)
const correctAnswersCount = ref(0)
const currentIndex = ref(0)
const loading = ref(false)

async function getQuestionsAndAnswers() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .ilike('category', '%quote%')

  if (error) {
    questionError.value = error
    return
  }

  const quoteQuestions = data as Question[]
  questionsData.value = quoteQuestions
  answersData.value = quoteQuestions.map(q => q.correct_ans)
}

function generateQuestion(): void {
  if (!questionsData.value.length || answersData.value.length < 2) {
    currentQuestion.value = null
    return
  }

  const unusedQuestions = questionsData.value.filter(
    (q) => !usedQuestionIds.value.has(q.id)
  )

  if (!unusedQuestions.length) {
    currentQuestion.value = null
    return
  }

  const randomIndex = Math.floor(Math.random() * unusedQuestions.length)
  const selected = unusedQuestions[randomIndex]
  const correctAnswer = selected.correct_ans

  const incorrectAnswers = new Set<string>()
  while (
    incorrectAnswers.size < Math.min(3, answersData.value.length - 1)
  ) {
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

  usedQuestionIds.value.add(selected.id)
  currentIndex.value++
}

async function startGame() {
  questionError.value = null
  currentQuestion.value = null
  usedQuestionIds.value = new Set()
  correctAnswersCount.value = 0
  currentIndex.value = 0
  loading.value = true

  await getQuestionsAndAnswers()
  generateQuestion()

  loading.value = false
  gameStarted.value = true
}

function handleAnswer(selectedAnswer: string) {
  if (!currentQuestion.value) return

  if (selectedAnswer === currentQuestion.value.correct) {
    alert('Correct!')
    correctAnswersCount.value++
  } else {
    alert(`Wrong! The correct answer was: ${currentQuestion.value.correct}`)
  }

  generateQuestion()
}
</script>
