<template>
  <main>
    <h1>hello this is the home page</h1>
    <SignoutButton v-if="store.isSignedIn" />
  </main>
</template>

<script setup>
import SignoutButton from '../components/SignoutButton.vue'
import { ref } from 'vue'
</script>
