<template>
  <div class="card bg-base-100 w-[26%] shadow-sm">
    <div class="card-body">
      <h2 class="card-title">{{ item?.name }} ({{ item?.price }} coins)</h2>
      <p>
        {{ item?.description }}
      </p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="store.buyPowerup(item)">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Powerup } from '@/types'
import { useStore } from '../stores/user'
const store = useStore()
const user = store.user

defineProps<{
  item: Powerup
}>()
</script>

<style scoped></style>
