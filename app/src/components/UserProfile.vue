<template>
  <div class="flex flex-col items-center">
    <h2 class="text-2xl">User Profile</h2>
    <div class="avatar">
      <div class="w-24 rounded-full">
        <img src="" alt="user profile picture" />
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
        <div class="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Total Score</div>
        <div class="stat-value text-primary">{{ user?.score }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
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
