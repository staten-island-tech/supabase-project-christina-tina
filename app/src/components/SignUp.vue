<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <input v-model="signupForm.email" type="email" placeholder="Email" />
      <input v-model="signupForm.password" type="password" placeholder="Password" />
      <input v-model="signupForm.username" type="text" placeholder="Username" />
      <button type="submit">Sign Up</button>
    </form>
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
  // check if username/email already exists; yes-direct to login or input smth diff, no-continue
  const { data, error } = await supabase.auth.signUp({
    email: signupForm.email,
    password: signupForm.password,
    options: {
      data: {
        username: signupForm.username,
      },
    },
  })
  console.log('Supabase signup result:', { data, error })
  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      errorMessage.value = 'Email is already in use.'
    } else {
      errorMessage.value = `Sign up error: ${error.message}`
    }

    return
  } else if (data?.user?.identities?.length === 0) {
    errorMessage.value = 'Email is already registered. Try logging in or using another email.'
    return //problem: email confirmed, but supabase still allows signup but w/o creating new user or sending confirmation email and doesn't give error (its supposed to) - solution: disable email confirmation or do this
  } else {
    errorMessage.value = 'Sign up successful! Please check your email to confirm'
  }
  // problem: can't insert username bc user is not signed in yet (no session) & can't do anything after signup until user confirms email
  // options:
  // remove email confirmation in supabase
  // save username locally somewhere and insert it in login
  // use metadata and insert username with SQL *what I did
}
</script>
