<template>
  <main>
    <div class="navbar bg-base-100 shadow-sm absolute top-0 left-0 w-full">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/signin">Signin</RouterLink>
            <RouterLink to="/profile">Profile</RouterLink>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl">Heading</a>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="user profile picture" src="" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li><a>Settings</a></li>
            <li><LogoutBtn v-if="store.isSignedIn" /></li>
          </ul>
        </div>
      </div>
    </div>
    <h1 class="text-center text-4xl font-bold mt-10">hello this is the home page</h1>
    <div class="routers">
      <button class="btn">Start Game</button>
      <button class="btn">View Stats</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import LogoutBtn from '../components/LogoutBtn.vue'
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
</script>
