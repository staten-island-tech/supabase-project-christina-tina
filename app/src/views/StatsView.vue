<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-10">🌍 Global User Rankings</h1>

    <div class="grid md:grid-cols-2 gap-10">

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">💰 Richest Users</h2>
        <table class="w-full border border-gray-300 rounded overflow-hidden">
          <thead class="bg-gray-100 text-left text-gray-700">
            <tr>
              <th class="p-3">#</th>
              <th class="p-3">Username</th>
              <th class="p-3">Currency</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in richestUsers"
              :key="user.username"
              class="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
            >
              <td class="p-3">{{ index + 1 }}</td>
              <td class="p-3 font-medium text-blue-800">{{ user.username }}</td>
              <td class="p-3 text-green-600 font-semibold">{{ user.currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🏆 Top Scorers</h2>
        <table class="w-full border border-gray-300 rounded overflow-hidden">
          <thead class="bg-gray-100 text-left text-gray-700">
            <tr>
              <th class="p-3">#</th>
              <th class="p-3">Username</th>
              <th class="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in topScorers"
              :key="user.username"
              class="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
            >
              <td class="p-3">{{ index + 1 }}</td>
              <td class="p-3 font-medium text-purple-800">{{ user.username }}</td>
              <td class="p-3 text-indigo-600 font-semibold">{{ user.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient'
import type { UserLeaderboard } from '../types'

const richestUsers = ref<UserLeaderboard[]>([])
const topScorers = ref<UserLeaderboard[]>([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('public_leaderboard')
    .select('username, currency, score')

  if (error) {
    console.error('Error fetching users:', error)
    return
  }

  if (data) {
    richestUsers.value = [...data].sort((a, b) => b.currency - a.currency).slice(0, 20)
    topScorers.value = [...data].sort((a, b) => b.score - a.score).slice(0, 20)
  }
})
</script>

<style>

</style>