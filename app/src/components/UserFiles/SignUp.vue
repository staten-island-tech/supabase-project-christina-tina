<template>
  <div class="flex flex-col justify-around min-h-[50vh] p-5">
    <form @submit.prevent="handleSignup()" class="flex flex-col space-y-4">
      <input
        class="input mb-4 w-full"
        v-model="signupForm.email"
        type="email"
        placeholder="Email"
      />
      <input
        class="input mb-4 w-full"
        v-model="signupForm.password"
        type="password"
        placeholder="Password"
      />
      <input
        class="input mb-4 w-full"
        v-model="signupForm.username"
        type="text"
        placeholder="Username"
      />
      <button class="btn w-full" type="submit">Sign Up</button>
    </form>
    <p><RouterLink to="/LogIn">Home</RouterLink>Already have an account? Try logging in</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from '../../stores/user'
import { useRouter } from 'vue-router'
import type { UserForm } from '../../types'
import LogIn from './LogIn.vue'
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
