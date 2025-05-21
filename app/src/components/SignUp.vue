<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup()">
      <input v-model="signupForm.email" type="email" placeholder="Email" />
      <input v-model="signupForm.password" type="password" placeholder="Password" />
      <input v-model="signupForm.username" type="text" placeholder="Username" />
      <button class="btn" type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router'
import type { UserForm } from '../types/types'
const store = useStore()
const router = useRouter()
const signupForm = reactive<UserForm>({
  email: '',
  password: '',
  username: '',
})
const errorMessage = ref<string>('')
async function handleSignup() {
  errorMessage.value = ''
  //check if exists
  const error = await store.signUp(signupForm.email, signupForm.password, signupForm.username)
  if (error) {
    errorMessage.value = error
    return
  }
  //reset form
}
</script>
