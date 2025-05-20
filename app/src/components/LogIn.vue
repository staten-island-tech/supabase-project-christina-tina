<template>
  <div>
    <h2>Log In</h2>
    <form @submit.prevent="logIn">
      <input v-model="loginForm.email" type="email" placeholder="Email" />
      <input v-model="loginForm.password" type="password" placeholder="Password" />
      <button type="submit">Log In</button>
    </form>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { supabase } from '../lib/supabaseClient'
import type { Ref } from 'vue'
import type { UserForm } from '../types/types'
import { useStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = reactive<UserForm>({
  email: 'christinach709@gmail.com',
  password: 'password',
  username: '',
})
const errorMessage = ref<string>('')
const store = useStore()

const logIn = async () => {
  errorMessage.value = ''
  // check: user doesn't exist, direct to signup/ make sure inputs are right
  const error = store.logIn(loginForm.email, loginForm.password)
  console.log('error', error)
  if (error) {
    errorMessage.value = await error
    return
  } else {
    console.log('login successful', store.user, store.isSignedIn)
    router.push('/')
  }
}
</script>
