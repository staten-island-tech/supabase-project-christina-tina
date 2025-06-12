<template>
  <div class>
    <StoreItem v-for="item in items || []" :key="item.id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabaseClient'
import { onMounted, ref } from 'vue'
import StoreItem from '@/components/StoreItem.vue'
import type { Powerup } from '@/types'
const items = ref<Powerup[] | null>([])
async function getPowerups() {
  const { data: powerups, error } = await supabase.from('powerups').select('*')
  if (error) {
    alert('error fetching powerups')
    return
  }
  items.value = powerups
  console.log(powerups)
}
onMounted(getPowerups)
</script>
