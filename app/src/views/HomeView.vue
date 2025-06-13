<template>
  <main class="flex justify-center mt-10">
    <div class="w-full max-w-3xl px-4">
      <h1 class="text-center text-4xl font-bold mb-6">Welcome! This is the home page</h1>

      <!-- <p v-if="!store.isSignedIn" class="text-center mb-4">
        Please create an account or sign in to get started
      </p> -->

      <!-- <div v-if="!store.isSignedIn" class="flex justify-center mb-6">
        <RouterLink to="/signin" class="btn">Go to Sign Up/Login</RouterLink>
      </div> -->
      <UserStats />
      <div class="routers fixed right-4 bottom-4 space-y-2 flex flex-row">
        <RouterLink to="/profile" class="btn btn-xl btn-primary mx-3">Profile</RouterLink>
        <RouterLink to="/store" class="btn btn-xl btn-primary mx-3">Store</RouterLink>
        <RouterLink to="/game" class="btn btn-xl btn-primary mx-3">Game</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import UserStats from '../components/UserFiles/UserStats.vue'
</script>
