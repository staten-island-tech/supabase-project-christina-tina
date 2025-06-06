<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header class="absolute top-0 left-0 w-full"><NavBar /></header>

  <RouterView />
</template>

<style scoped></style>
