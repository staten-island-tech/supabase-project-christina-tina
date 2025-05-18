<template>
  <div>
    <h2>heading/description</h2>
    <div>
      <button @click="mode = 'signup'">Sign Up</button>
      <button @click="mode = 'login'">Login</button>
    </div>
    <SignUp v-if="mode === 'signup'" />
    <LogIn v-else />
    <!-- use v-if to show either signup or login depending on what user chooses + allow them to change to other one even after choosing one + if user exists when trying to sign up, change to login + vice versa for login-->
  </div>
</template>

<script setup>
import SignUp from '../components/SignUp.vue'
import LogIn from '../components/LogIn.vue'
import { ref } from 'vue'
const mode = ref('login')
</script>
