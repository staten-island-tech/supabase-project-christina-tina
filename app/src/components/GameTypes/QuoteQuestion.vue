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
        <button @click="startGame" class="px-4 py-2 bg-blue-600 text-white rounded">
          Start Game
        </button>
      </div>

      <div v-else>
        <div v-if="!questionError && currentQuestion" class="flex flex-row">
          <div>
            <div class="text-center mb-4 text-gray-700 font-medium">
              Question {{ currentIndex }} of {{ questionsData.length }}
            </div>
            <QuestionCard :question="currentQuestion" @answerSelected="handleAnswer" />
          </div>
          <!-- add powerup container here -->
          <div>
            <div class="text-center mb-4 text-gray-700 font-medium">Use Powerups</div>
            <div class="ml-4 flex flex-row flex-wrap">
              <button
                v-for="powerup in powerups"
                :key="powerup.id"
                class="px-2 py-1 rounded mr-2 mb-2"
                @click="handlePowerup(powerup, currentQuestion)"
              >
                {{ powerup.name }} ({{ powerup.amount }})
              </button>
            </div>
            <div class="text-center">Results: {{ result }}</div>
          </div>
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
          <button @click="startGame" class="mr-4 px-4 py-2 bg-green-600 text-white rounded">
            Play Again
          </button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded">
            <RouterLink to="/game">Choose another game</RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabaseClient'
import QuestionCard from '../QuestionCard.vue'
import LoadingSpinner from '../LoadingScreen.vue'
import { useStore } from '../../stores/user'
import type { Question, DisplayQuestion, Powerup } from '../../types'
import { shuffle } from '../../function'
import { random } from 'gsap'

const store = useStore()
const user = store.user

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
  const { data, error } = await supabase.from('questions').select('*').ilike('category', '%quote%')

  if (error) {
    questionError.value = error
    return
  }

  const quoteQuestions = data as Question[]
  questionsData.value = quoteQuestions
  answersData.value = quoteQuestions.map((q) => q.correct_ans)
}

function generateQuestion(): void {
  if (!questionsData.value.length || answersData.value.length < 2) {
    currentQuestion.value = null
    return
  }

  const unusedQuestions = questionsData.value.filter((q) => !usedQuestionIds.value.has(q.id))

  if (!unusedQuestions.length) {
    currentQuestion.value = null
    return
  }

  const randomIndex = Math.floor(Math.random() * unusedQuestions.length)
  const selected = unusedQuestions[randomIndex]
  const correctAnswer = selected.correct_ans

  const incorrectAnswers = new Set<string>()
  while (incorrectAnswers.size < Math.min(3, answersData.value.length - 1)) {
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

  await fetchPowerups()
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
    store.changeCoins(20)
    store.changeScore(1)
  } else {
    alert('Wrong!')
    store.changeScore(-1)
    alert(`Wrong! The correct answer was: ${currentQuestion.value.correct}`)
  }

  generateQuestion()
}

const powerups = ref<Powerup[]>([])
async function fetchPowerups() {
  const { data, error } = await supabase
    .from('player_inventory')
    .select('item_id, name, description, price, amount')
    .eq('user_id', user?.id)
  if (error) {
    alert('Error fetching powerups: ' + error.message)
    powerups.value = []
    return
  }
  if (data) {
    powerups.value = data.map((item) => ({
      id: item.item_id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: item.amount,
    }))
  } else {
    powerups.value = []
  }
}
const result = ref('')
async function handlePowerup(powerup: Powerup, currentQuestion: DisplayQuestion) {
  store.changeCoins(-powerup.price)
  if (powerup.name === '50/50') {
    let wrongs = currentQuestion.choices.filter((i) => i !== currentQuestion.correct)
    function getTwoRandomItems(array: string[]) {
      // create copy
      const copy = array.slice()
      // shuffle copy
      return shuffle(copy)
    }
    const randomWrongs = getTwoRandomItems(wrongs)
    result.value = `The answer is not "${randomWrongs[0]}" or "${randomWrongs[1]}"`
  } else if (powerup.name === 'Skip Question') {
    generateQuestion()
  } else if (powerup.name === 'Double Points') {
    store.changeCoins(40)
    result.value = 'you got 40 coins instead of 20 !!'
  } else if (powerup.name === 'Reveal Letter') {
    const randomIndex = Math.floor(Math.random() * currentQuestion.correct.length)
    const randomLetter = currentQuestion.correct[randomIndex]
    result.value = `The answer has the letter "${randomLetter}" in it`
  } else if (powerup.name === 'Score Surge') {
    store.changeCoins(50)
    result.value = 'You got 50 extra coins !!'
  } else if (powerup.name === 'Mystery Box') {
    const randomInt = Math.floor(Math.random() * 41) - 20 //random integer from -20 to 20
    store.changeCoins(randomInt)
    result.value = `You got ${randomInt} coins !!`
  } else if (powerup.name === 'Steal') {
    await useStealPowerup()
  }
  powerup.amount -= 1

  //filter out powerups with zero amount
  if (powerup.amount <= 0) {
    /* const index = powerups.findIndex((p) => p.id === powerup.id)
    if (index !== -1) powerups.splice(index, 1) */
    powerups.value = powerups.value.filter((i) => i !== powerup)
  }
  store.usePowerup(powerup)
}

async function useStealPowerup() {
  if (!user) return

  // get all users except the current one
  const { data: others, error } = await supabase
    .from('users')
    .select('id, username, currency')
    .neq('id', user.id)

  if (error || !others?.length) {
    alert('No users to steal from!')
    return
  }

  // pick one randomly
  const target = others[Math.floor(Math.random() * others.length)]
  const amountToSteal = Math.floor(Math.random() * 21) + 10 // 10–30

  // if amountToSteal is > the target's, steal all; if it's within, steal the amountToSteal
  const stealAmount = Math.min(target.currency, amountToSteal)

  if (stealAmount <= 0) {
    alert(`${target.username} has nothing to steal, they're too broke haha`)
    return
  }

  // subtract from target
  const { error: deductError } = await supabase
    .from('users')
    .update({ currency: target.currency - stealAmount })
    .eq('id', target.id)

  // add to current user
  store.changeCoins(stealAmount)

  if (deductError) {
    alert('something went wrong trying to steal')
    return
  }

  result.value = `You stole ${stealAmount} coins from ${target.username}!`
}
onMounted(fetchPowerups)
</script>
