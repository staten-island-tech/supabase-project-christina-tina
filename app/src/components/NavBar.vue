<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="navbar bg-base-300">
        <div class="flex-none">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2 text-center">
          <a class="btn btn-ghost text-3xl">Title</a>
        </div>
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
            <li v-if="store.isSignedIn">
              <RouterLink to="/profile">Profile</RouterLink>
            </li>
            <li><a>Settings</a></li>
            <li><LogoutBtn v-if="store.isSignedIn" /></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4 text-xl">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/signin">Signin/Login</RouterLink></li>
        <li><RouterLink to="/profile">Profile</RouterLink></li>
        <li><RouterLink to="/stats">View Stats</RouterLink></li>
        <li><a>something</a></li>
        <li><a>Log Out</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoutBtn from './UserFiles/LogoutBtn.vue'
import { useStore } from '../stores/user'
const store = useStore()
</script>

<style scoped></style>
