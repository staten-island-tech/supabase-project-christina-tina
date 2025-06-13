<template>
  <div class="w-full max-w-2xl mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">User Profile</h2>

    <div class="space-y-6 text-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-600">Username</h3>
        <p class="text-gray-800 text-base">{{ user?.username }}</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-600">Email</h3>
        <p class="text-gray-800 text-base">{{ user?.email }}</p>
      </div>
    </div>

    <h2 class="text-2xl font-semibold text-gray-800 mt-10 mb-4 text-center">User Stats</h2>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1 border border-blue-200 rounded-lg p-6 text-center">
        <div class="text-sm font-medium text-blue-600 uppercase">Total Score</div>
        <div class="text-3xl font-bold text-blue-800 mt-2">{{ user?.score ?? 0 }}</div>
      </div>

      <div class="flex-1 border border-green-200 rounded-lg p-6 text-center">
        <div class="text-sm font-medium text-green-600 uppercase">Currency</div>
        <div class="text-3xl font-bold text-green-800 mt-2">{{ user?.currency ?? 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../../stores/user'
const store = useStore()
const user = store.user
</script>
