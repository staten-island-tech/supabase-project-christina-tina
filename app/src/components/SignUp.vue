<template>
  <div>
    <h2>Sign Up</h2>
    <input v-model="signupForm.email" type="email" placeholder="Email" />
    <input v-model="signupForm.password" type="password" placeholder="Password" />
    <input v-model="signupForm.username" type="text" placeholder="Username" />
    <button @click="signUp">Sign Up</button>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { supabase } from '../lib/supabaseClient'
import type { Ref } from 'vue'
import type { User } from '../types/types'
import { useStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const signupForm = reactive<User>({
  email: '',
  password: '',
  username: '',
  currency: 0,
  score: 0,
  items: [],
})
const errorMessage = ref<string>()
const store = useStore()

async function signUp() {
  errorMessage.value = ''

  const { data, error } = await supabase.auth.signUp({
    email: signupForm.email,
    password: signupForm.password,
  })

  if (error) {
    errorMessage.value = `Sign up error: ${error.message}`
    return
  } else {
    errorMessage.value = 'Sign up successful! Please check your email to confirm'
  }
  // problem: can't insert username bc user is not signed in yet (no session) - either remove email confirmation in supabase OR save username locally somewhere and insert it in login OR use metadata and insert username with SQL
  /* const user = data?.user
  if (user) {
    const { error: insertError } = await supabase.from('users').insert({
      id: user.id,
      username: signupForm.username,
    })

    if (insertError) {
      errorMessage.value = `Username update error: ${insertError.message}`
    }
  } */
}
</script>
