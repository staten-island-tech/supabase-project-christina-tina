<template>
  <div></div>
</template>

<script setup lang="ts">
import { supabase } from '../supabaseClient'
async function getPowerups() {
  let { data: powerups, error } = await supabase.from('powerups').select('*')
}
</script>

<style scoped></style>
