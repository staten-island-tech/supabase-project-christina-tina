<template>
    <div class="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">{{ question.text }}</h3>
      <ul class="space-y-3">
        <li
          v-for="(choice, index) in question.choices"
          :key="index"
          class="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded cursor-pointer transition"
        >
          {{ choice }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  interface DisplayQuestion {
    id: number
    text: string
    correct: string
    choices: string[]
  }
  
  defineProps<{
    question: DisplayQuestion
  }>()
  </script>
  