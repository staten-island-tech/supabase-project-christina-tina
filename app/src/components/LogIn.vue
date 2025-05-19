<template>
  <div>
    <h2>Log In</h2>
    <input v-model="loginForm.email" type="email" placeholder="Email" />
    <input v-model="loginForm.password" type="password" placeholder="Password" />
    <button @click="logIn">Log In</button>

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

const loginForm = reactive<User>({
  email: '',
  password: '',
  username: '',
  currency: 0,
  score: 0,
  items: [],
})
const errorMessage = ref<string>('')
const store = useStore()

const logIn = async () => {
  errorMessage.value = ''
  // check: user doesn't exist, direct to signup/ make sure inputs are right
  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email: loginForm.email,
    password: loginForm.password,
  })

  if (error) {
    errorMessage.value = `Login error: ${error.message}`
    return
  } else {
    store.signIn(loginData)
    console.log(store.user, store.isSignedIn)
    router.push('/')
  }
}
</script>
