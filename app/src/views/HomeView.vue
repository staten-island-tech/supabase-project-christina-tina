<template>
  <main>
    <h1 class="text-center text-4xl font-bold mt-10">hello this is the home page</h1>
    <p v-if="!store.isSignedIn">Please create an account or sign in to get started</p>
    <div class="routers absolute right-4 bottom-4">
      <button class="btn btn-xl"><router-link to="/store"></router-link>Store</button>
      <button class="btn btn-xl">Start Game</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import LogoutBtn from '../components/LogoutBtn.vue'
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
</script>
