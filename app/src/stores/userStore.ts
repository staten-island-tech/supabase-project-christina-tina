import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../types/types'
import { supabase } from '../lib/supabaseClient'

export const useStore = defineStore('user', () => {

  // state
  const user = ref<User | null>(null)
  const isSignedIn = ref(false)

  const errorMessage = ref<string>('')

  // actions
  function signIn(userData: User) {
    isSignedIn.value = true
    user.value = userData
  }

  function signOut() {
    isSignedIn.value = false
    user.value = null
  }

  async function signUp(email:string, password:string, username: string) {
    errorMessage.value = ''
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    })

    console.log('Supabase signup result:', { data, error })

    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        errorMessage.value = 'Email is already in use.'
      } else {
        errorMessage.value = `Sign up error: ${error.message}`
      }
      return errorMessage.value
    }

    if (data?.user?.identities?.length === 0) {
      errorMessage.value = 'Email is already registered. Try logging in or using another email.'
      return errorMessage.value
    }

    errorMessage.value = 'Sign up successful! Please check your email to confirm'
  }

  async function logIn(email:string, password:string){
    errorMessage.value = ''
  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    errorMessage.value = `Login error: ${error.message}`
    return errorMessage.value
  } else {
    isSignedIn.value = true
    user.value = //get user from supabase
  }

  return {
    user,
    isSignedIn,
    errorMessage,
    signIn,
    signOut,
    signUp,
  }
})