<template>
  <div class="flex flex-col items-center">
    <div class="avatar">
      <div class="w-24 rounded-full">
        <img src="" alt="user profile picture" />
      </div>
    </div>
    Username: Email:
    <div>Stats here</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../stores/user'
const store = useStore()
</script>

<style scoped></style>
