<script setup lang="ts">
import SignoutButton from '../components/SignoutButton.vue'
</script>

<template>
  <main>
    <h1>hello this is the home page</h1>
    <SignoutButton v-if="store.isSignedIn" />
  </main>
</template>
