<template>
  <div>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleSignUp">Sign Up</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { supabase } from '@/lib/supabaseClient'

const email = ref('')
const password = ref('')
const { signUp, error } = useAuth()

const handleSignUp = async () => {
  await signUp(email.value, password.value)
}
</script>
