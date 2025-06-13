<template>
  <div
    class="bg-green-900 text-white p-4 rounded-xl shadow-lg border border-green-500 flex flex-col gap-2"
  >
    <h3 class="text-xl font-semibold text-yellow-300">{{ item.name }}</h3>
    <p class="text-sm text-gray-300">{{ item.description }}</p>
    <div class="text-right text-green-200 font-bold">×{{ amount }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Powerup } from '@/types'

defineProps<{
  item: Powerup
  amount: number
}>()
</script>
