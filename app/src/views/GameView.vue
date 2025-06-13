<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Game</h1>

    <div v-if="!started">
      <h2 class="text-xl font-semibold mb-4">Choose a Game Type</h2>

      <button
        @click="selectGame('quote')"
        class="w-full py-2 mb-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Quote Trivia
      </button>

      <button
        @click="selectGame('saga')"
        class="w-full py-2 mb-3 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Saga Trivia
      </button>
    </div>

    <div v-else>
      <button
        @click="goBack()"
        class="mb-4 text-sm text-gray-500 hover:underline"
      >
        ← Back Home
      </button>

      <QuoteQuestion v-if="selectedGame === 'quote'" />
      <SagaQuestion v-if="selectedGame === 'saga'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QuoteQuestion from '../components/GameTypes/QuoteQuestion.vue'
import SagaQuestion from '../components/GameTypes/SagaQuestion.vue'

const selectedGame = ref<string | null>(null)
const started = ref(false)
const router = useRouter()

function selectGame(gameType: string) {
  selectedGame.value = gameType
  started.value = true
}

function goBack() {
  if (!started.value) {
    selectedGame.value = null
  } else {
    router.push('/')
  }
}
</script>
