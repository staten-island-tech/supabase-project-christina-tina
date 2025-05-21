<template>
  <div>
    <button @click="signOut()">log out</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient'
import { useStore } from '../stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const errorMessage = ref<string>('')

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    errorMessage.value = error.message
    return
  }
  store.signOut()
  router.push('/signin')
  alert('you have successfully signed out!') //change this to show message with smth else instead of alert later
}
</script>

<style lang="scss" scoped></style>
