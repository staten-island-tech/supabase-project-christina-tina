<template>
  <div class="flex flex-col items-center">
    <h2 class="text-2xl">User Profile</h2>
    <div class="avatar">
      <div class="w-24 rounded-full">
        <img src="/profile_icon.png" alt="user profile picture" />
      </div>
    </div>
    <div>
      <h3>Username</h3>
      <p>{{ store.isSignedIn ? user?.username : null }}</p>
      <h3>Email</h3>
      <p>{{ store.isSignedIn ? user?.email : null }}</p>
    </div>
    <h2 class="text-2xl">User Stats</h2>
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Total Score</div>
        <div class="stat-value text-primary">{{ user?.score }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Currency</div>
        <div class="stat-value text-secondary">{{ user?.currency }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../stores/user'
const store = useStore()
const user = store.user
</script>

<style scoped></style>
