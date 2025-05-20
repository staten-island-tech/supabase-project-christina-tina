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
import { useStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import type { UserForm } from '../types/types'
const store = useStore()
const router = useRouter()
const signupForm = reactive<UserForm>({
  email: '',
  password: '',
  username: '',
})
async function signUp() {
  //check if exists
  store.signUp(signupForm.email, signupForm.password, signupForm.username)
  //reset
}
</script>
