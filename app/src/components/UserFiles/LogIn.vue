<template>
  <div class="flex flex-col justify-around min-h-[50vh] p-5">
    <form @submit.prevent="handleLogin()" class="flex flex-col space-y-4">
      <input class="input mb-4 w-full" v-model="loginForm.email" type="email" placeholder="Email" />
      <input
        class="input mb-4 w-full"
        v-model="loginForm.password"
        type="password"
        placeholder="Password"
      />
      <button class="btn w-full" type="submit">Log In</button>
    </form>
    <p>Don't have an account? Try signing up</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { supabase } from '../../supabaseClient'
import type { Ref } from 'vue'
import type { UserForm } from '../../types'
import { useStore } from '../../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = reactive<UserForm>({
  email: '',
  password: '',
  username: '',
})
const errorMessage = ref<string>('')
const store = useStore()

async function handleLogin() {
  errorMessage.value = ''
  // check: user doesn't exist, direct to signup/ make sure inputs are right
  const error = await store.logIn(loginForm.email, loginForm.password)
  if (error) {
    errorMessage.value = error
    return
  } else {
    router.push('/')
  }
}
</script>
