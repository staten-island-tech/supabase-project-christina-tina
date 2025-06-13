<template>
  <div>
    <h2>heading/description</h2>
    <div role="tablist" class="tabs tabs-border">
      <button
        role="tab"
        :class="mode === 'signup' ? 'tab tab-active' : 'tab'"
        @click="mode = 'signup'"
        id="signup-tab"
      >
        Sign Up
      </button>
      <button
        role="tab"
        :class="mode === 'login' ? 'tab tab-active' : 'tab'"
        @click="mode = 'login'"
        id="login-tab"
      >
        Login
      </button>
    </div>
    <SignUp v-if="mode === 'signup'" />
    <LogIn v-else />
    <!-- allow user to change to other one even after choosing one + if user exists when trying to sign up, change to login + vice versa for login-->
  </div>
</template>

<script setup lang="ts">
import LogIn from '../components/UserFiles/LogIn.vue'
import SignUp from '../components/UserFiles/SignUp.vue'
import { ref } from 'vue'

const mode = ref('login')
</script>
