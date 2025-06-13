<template>
  <div class="flex flex-col items-center">
    <h2 class="text-2xl">User Profile</h2>
    <div class="avatar">
      <div class="w-24 rounded-full">
        <img src="/profile_icon.png" alt="user profile picture" />
      </div>
    </div>
    <div>
      <h3>Username</h3>
      <p>{{ store.isSignedIn ? user?.username : null }}</p>
      <h3>Email</h3>
      <p>{{ store.isSignedIn ? user?.email : null }}</p>
    </div>
    <h2 class="text-2xl">User Stats</h2>
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Total Score</div>
        <div class="stat-value text-primary">{{ user?.score }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Currency</div>
        <div class="stat-value text-secondary">{{ user?.currency }}</div>
      </div>
    </div>
  </div>
  <h2>User Inventory</h2>
  <InventoryItem v-for="item in inventory" :key="item.id" :item="item" :amount="item.amount" />
  <h2>User Achievements</h2>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '../stores/user'
import type { Powerup } from '@/types'
import InventoryItem from './InventoryItem.vue'
import { supabase } from '../supabaseClient'
const store = useStore()
const user = store.user
const inventory = ref<PowerupWithAmount[]>([])

interface PowerupWithAmount extends Powerup {
  amount: number
}
async function fetchUserInventory(userId: string) {
  const { data, error } = await supabase
    .from('player_inventory')
    .select(
      `
      item_id,
      items (
        name,
        description,
        type,
        price
      )
    `,
    )
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching inventory:', error)
    return
  }

  // Map to count amounts per item_id
  const itemMap = new Map<number, PowerupWithAmount>()

  if (!data) return

  for (const row of data) {
    const item = row.items
    if (!item) continue // just in case

    if (!itemMap.has(row.item_id)) {
      itemMap.set(row.item_id, {
        id: row.item_id,
        name: item.name,
        description: item.description,
        type: item.type,
        price: item.price,
        amount: 1,
      })
    } else {
      itemMap.get(row.item_id)!.amount += 1
    }
  }

  inventory.value = Array.from(itemMap.values())
}

onMounted(() => {
  if (user?.id) {
    fetchUserInventory(user.id)
  }
})
</script>

<style scoped></style>
