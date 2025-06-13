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
  <InventoryItem v-for="item in inventory" :key="item.id" :item="item" :amount="item.amount || 0" />
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
const inventory = ref<Powerup[]>([])
async function fetchInventory() {
  const { data, error } = await supabase
    .from('player_inventory')
    .select('item_id, name, description, price')
    .eq('user_id', user?.id)

  if (error) {
    alert('Error fetching inventory:' + error)
    inventory.value = []
    return
  }

  if (data) {
    inventory.value = data.map((item) => ({
      id: item.item_id,
      name: item.name,
      description: item.description,
      price: item.price,
    }))
  } else {
    inventory.value = []
  }
  inventory.value = groupItemsWithAmount(inventory.value)
}

function groupItemsWithAmount(items: Powerup[]) {
  const map = new Map<number, Powerup & { amount: number }>()

  for (const item of items) {
    if (map.has(item.id)) {
      map.get(item.id)!.amount += 1
    } else {
      map.set(item.id, { ...item, amount: 1 })
    }
  }
  return Array.from(map.values())
}
onMounted(fetchInventory)
</script>

<style scoped></style>
