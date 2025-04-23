<template>
  <div>
    <input v-model="user.email" placeholder="Email" />
    <input v-model="user.password" type="password" placeholder="Password" />
    <button @click="handleSignUp">Sign Up</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { supabase } from '../lib/supabaseClient'

interface User {
  email: string
  password: string
}

const user = reactive<User>({ email: '', password: '' })

const {
  signUp,
  error,
}: { signUp: (email: string, password: string) => Promise<void>; error: string | null } = useAuth()

const handleSignUp = async () => {
  await signUp(user.email, user.password)
}
</script>
