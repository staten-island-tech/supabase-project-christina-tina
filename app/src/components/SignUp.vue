<template>
  <div>
    <h2>Sign Up</h2>
    <input v-model="form.email" type="email" placeholder="Email" />
    <input v-model="form.password" type="password" placeholder="Password" />
    <input v-model="form.username" type="text" placeholder="Username" />
    <button @click="signUp">Sign Up</button>

    <h2>Log In</h2>
    <input v-model="form.email" type="email" placeholder="Email" />
    <input v-model="form.password" type="password" placeholder="Password" />
    <input v-model="form.username" type="text" placeholder="Username" />
    <button @click="logIn">Log In</button>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { supabase } from '../lib/supabaseClient'
import type { Ref } from 'vue'
import type { User } from '../types'
import { useStore } from '../stores/userStatus'

const form = reactive<User>({
  email: '',
  password: '',
  username: '',
  currency: 0,
  score: 0,
  items: [],
})
const message = ref('')
const store = useStore()

const signUp = async () => {
  message.value = ''

  const { error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  })

  if (error) {
    message.value = `Sign up error: ${error.message}`
    return
  } else {
    message.value = 'Sign up successful! Please check your email to confirm'
  }
}

const logIn = async () => {
  message.value = ''

  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  })

  if (error) {
    message.value = `Login error: ${error.message}`
    return
  }

  const user = loginData?.user //checks if there's user in loginData
  if (!user) {
    message.value = 'No user found after login.'
    return
  }

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id, username')
    .eq('id', user.id)
    .single()

  console.log(existingUser) // before inserting username (username still null)
  if (fetchError) {
    message.value = `Error checking user profile: ${fetchError.message}`
    return
  }

  if (existingUser && !existingUser.username) {
    const { error: updateError } = await supabase
      .from('users')
      .update({ username: form.username })
      .eq('id', user.id)

    if (updateError) {
      message.value = `Error updating user profile: ${updateError.message}`
      return
    }
    message.value = 'User logged in and profile updated!'
  } else {
    message.value = 'User already has a profile. Logged in!'
  }

  store.$patch((state) => {
    state.items.push({})
  })
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  // reset user in store

  store.$reset()
}
</script>
