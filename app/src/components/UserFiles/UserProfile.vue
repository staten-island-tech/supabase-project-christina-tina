<template>
  <div class="w-[80vw] max-w-2xl mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-center">User Profile</h2>
    <div class="space-y-6 text-center">
      <div>
        <h3 class="text-lg font-semibold">Username</h3>
        <p class="text-base">{{ user?.username }}</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold">Email</h3>
        <p class="text-base">{{ user?.email }}</p>
      </div>
    </div>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-center">User Stats</h2>

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
  <h2 class="text-2xl text-center font-bold mb-2">Inventory</h2>
  <div class="flex flex-row flex-wrap mx-auto w-[80vw]">
    <InventoryItem
      v-for="item in inventory"
      :key="item.id"
      :item="item"
      :amount="item.amount || 0"
    />
  </div>

  <!-- <h2 class="text-2xl font-bold mb-4">🏅 Your Achievement Badges</h2> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '../../stores/user'
import type { Powerup } from '@/types'
import InventoryItem from './../InventoryItem.vue'
import { supabase } from '../../supabaseClient'
const store = useStore()
const user = store.user
const inventory = ref<Powerup[]>([])
async function fetchInventory() {
  if (!user) {
    return
  }
  const { data, error } = await supabase
    .from('player_inventory')
    .select('item_id, name, description, price, amount')
    .eq('user_id', user?.id)

  if (error) {
    alert('Error fetching inventory: ' + error.message)
    inventory.value = []
    return
  }

  if (data) {
    inventory.value = data.map((item) => ({
      id: item.item_id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: item.amount,
    }))
  } else {
    inventory.value = []
  }
}

onMounted(fetchInventory)
</script>
