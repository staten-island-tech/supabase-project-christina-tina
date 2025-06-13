<template>
  <div class="">
    <h2 class="text-center font-bold text-3xl my-5 text-green-800">Coins: {{ coins }}</h2>
    <div class="w-[80vw] flex flex-row flex-wrap items-center justify-center mx-auto mt-4">
      <StoreItem v-for="item in items || []" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabaseClient'
import { onMounted, ref, computed } from 'vue'
import StoreItem from '@/components/StoreItem.vue'
import type { Powerup } from '@/types'
import { useStore } from '@/stores/user'
const store = useStore()
const user = store.user
const coins = computed(() => store.user?.currency || 0)

const items = ref<Powerup[] | null>([])
async function fetchPowerups() {
  const { data: powerups, error } = await supabase.from('powerups').select('*')
  if (error) {
    alert('error fetching powerups')
    return
  }
  items.value = powerups
}
onMounted(fetchPowerups)
</script>
