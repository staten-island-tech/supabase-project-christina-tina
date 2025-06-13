<template>
  <div
    class="text-white p-4 rounded-lg shadow-lg flex flex-col gap-2 w-[21%] mx-auto border border-red-200"
  >
    <h3 class="text-sm font-medium text-red-600 uppercase">{{ item.name }}</h3>
    <p class="text-sm text-gray-500">{{ item.description }}</p>
    <div class="text-right text-red-500 font-bold">×{{ amount }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Powerup } from '@/types'

defineProps<{
  item: Powerup
  amount: number
}>()
</script>
