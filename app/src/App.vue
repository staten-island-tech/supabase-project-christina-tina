../supabaseClient
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const user = ref([])

async function getInstruments() {
  const { data } = await supabase.from('users').select()
  user.value = data
}

onMounted(() => {
   getInstruments()
})
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>