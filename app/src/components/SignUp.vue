<template>
  <div>
    <input v-model="user.email" placeholder="Email" />
    <input v-model="user.password" type="password" placeholder="Password" />
    <button @click="handleSignUp">Sign Up</button>
    <p v-if="error">{{ error.value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { supabase } from '../lib/supabaseClient'
import type { Ref } from 'vue'
import type { User as SupabaseUser, Session } from '@supabase/supabase-js'

interface User {
  email: string
  password: string
}

const user = reactive<User>({ email: '', password: '' })

/* const {
  signUp,
  error,
}: {
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ user: SupabaseUser | null; session: Session | null }>
  error: Ref<string | null>
} = useAuth() */

const { signUp, error } = useAuth() // according to chatgpt not manually typing out the return of useAuth(), figure out later

const handleSignUp = async () => {
  await signUp(user.email, user.password)
}
</script>
