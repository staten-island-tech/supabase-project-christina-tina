<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useStore } from './stores/user'
import SigninView from './views/SigninView.vue'
const store = useStore()
</script>

<template>
  <SigninView v-if="!store.isSignedIn" />
  <NavBar v-else />
</template>

<style scoped></style>
