<template>
  <div class="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
    <h3 class="text-xl font-semibold mb-4">{{ question.text }}</h3>
    <ul class="space-y-3">
      <li
        v-for="(choice, index) in question.choices"
        :key="index"
        class="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded cursor-pointer transition"
        @click="selectAnswer(choice)"
      >
        {{ choice }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

interface DisplayQuestion {
  id: number
  text: string
  correct: string
  choices: string[]
}

const props = defineProps<{
  question: DisplayQuestion
}>()

const emit = defineEmits<{
  (e: 'answerSelected', choice: string): void
}>()

function selectAnswer(choice: string) {
  emit('answerSelected', choice)
}
</script>
