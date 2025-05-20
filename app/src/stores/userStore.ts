import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, UserForm } from '../types/types'
import { supabase } from '../lib/supabaseClient'

export const useStore = defineStore('user', () => {

  // state
  const user = ref<User | null>(null)
  const isSignedIn = ref(false)

  const errorMessage = ref<string>('')

  // actions
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
  console.log("first",loginData.user.id) //works
  if (error) {
    errorMessage.value = `Login error: ${error.message}`
    return errorMessage.value
  } else {
    isSignedIn.value = true
    async function getUserData() {
      const {data, error} = await supabase.from('users').select('*').eq('id',loginData.user.id)
      if (error){
        console.log("getUserData error",error)
      } else {
        return data
      }
    }
    const temp = await getUserData() //temp is list of all users with that id
    console.log("temp[0] is",temp[0])
    user.value = reactive<User>({
      email: email,
      username: temp[0].username,
      currency: temp[0].currency,
      score: temp[0].score,
      items: [],
    })//get user from supabase
    
  }}

  return {
    user,
    isSignedIn,
    errorMessage,
    signOut,
    signUp,
    logIn
  }
  })