<template>
  <div>
    <input v-model="user.email" type="email" placeholder="Email" />
    <input v-model="user.password" type="password" placeholder="Password" />
    <input v-model="user.username" type="text" placeholder="Username" />
    <button @click="signUp">Sign Up</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
//import { useAuth } from '../composables/useAuth'
import { supabase } from '../lib/supabaseClient'
import type { Ref } from 'vue'
import type { User } from '../types'

const user = reactive<User>({
  email: '',
  password: '',
  username: '',
  currency: 0,
  score: 0,
  items: [],
})
const message = ref('')

const signUp = async () => {
  message.value = ''

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  })

  if (signUpError) {
    message.value = `Sign up error: ${signUpError.message}`
    return
  }

  if (signUpData?.user) {
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: signUpData.user.id,
        username: user.username,
        currency: user.currency,
        score: user.score,
        items: user.items,
      },
    ])

    if (insertError) {
      message.value = `Error saving user profile: ${insertError.message}`
    } else {
      message.value = 'Sign up successful! Check your email to confirm.'
    }
  }
}

const checkLoggedIn = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    console.log('User is logged in:', session.user)
  } else {
    console.log('No user is logged in')
  }
}
checkLoggedIn()
</script>
