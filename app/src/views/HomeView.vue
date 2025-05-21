<template>
  <main>
    <h1 class="text-center text-4xl font-bold mt-10">hello this is the home page</h1>
    <SignoutButton v-if="store.isSignedIn" />
    <div class="routers"></div>
  </main>
</template>

<script setup lang="ts">
import SignoutButton from '../components/LogoutBtn.vue'
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
</script>
