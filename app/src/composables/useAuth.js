import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const user = ref(null)
const error = ref(null)

export function useAuth() {
  const signUp = async (email, password) => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })
    error.value = signUpError?.message || null
    user.value = data.user
    return data
  }

  const signIn = async (email, password) => {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    error.value = signInError?.message || null
    user.value = data.user
    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data?.user || null
    return data?.user
  }

  return {
    user,
    error,
    signUp,
    signIn,
    signOut,
    getUser,
  }
}
