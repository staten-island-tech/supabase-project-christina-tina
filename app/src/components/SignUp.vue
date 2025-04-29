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
    <button @click="logIn">Log In</button>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { supabase } from '../lib/supabaseClient'
import type { Ref } from 'vue'
import type { User } from '../types'

const form = reactive<User>({
  email: '',
  password: '',
  username: '',
  currency: 0,
  score: 0,
  items: [],
})
const message = ref('')
let profileInserted = ref(false)

const signUp = async () => {
  message.value = ''

  const { error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  })

  if (error) {
    message.value = `Sign up error: ${error.message}`
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

  const user = loginData?.user
  if (!user) {
    message.value = 'No user found after login.'
    return
  }

  const { data: existingUsers, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)

  if (fetchError) {
    message.value = `Error checking user profile: ${fetchError.message}`
    return
  }

  if (existingUsers && existingUsers.length === 0) {
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: user.id,
        username: form.username,
      },
    ])

    if (insertError) {
      message.value = `Error saving user profile: ${insertError.message}`
      return
    } else {
      profileInserted.value = true
      message.value = 'User logged in and profile created!'
    }
  } else {
    message.value = 'User already has a profile. Logged in!'
  }
}
</script>
