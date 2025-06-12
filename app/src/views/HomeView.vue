<template>
  <main>
    <h1 class="text-center text-4xl font-bold mt-10">hello this is the home page</h1>
    <p v-if="!store.isSignedIn">Please create an account or sign in to get started</p>
    <button v-if="!store.isSignedIn" class="btn">
      <RouterLink to="/signin">Go to Sign Up/Login</RouterLink>
    </button>

    <div class="routers absolute right-4 bottom-4">
      <button class="btn btn-xl"><RouterLink to="/store">Store</RouterLink></button>
      <button class="btn btn-xl"><RouterLink to="/game">Game</RouterLink></button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
</script>
