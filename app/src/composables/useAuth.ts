import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { AuthError, User, Session } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const error = ref<string | null>(null)

export function useAuth() {
  const signUp = async (email: string, password: string) => {
    const {
      data,
      error: signUpError,
    }: {
      data: { user: User | null; session: Session | null }
      error: AuthError | null
    } = await supabase.auth.signUp({
      email,
      password,
    })

    error.value = signUpError?.message || null
    user.value = data.user
    return data
  }

  const signIn = async (email: string, password: string) => {
    const {
      data,
      error: signInError,
    }: {
      data: { user: User | null; session: Session | null }
      error: AuthError | null
    } = await supabase.auth.signInWithPassword({
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
    const {
      data,
    }: {
      data: { user: User | null } | null
    } = await supabase.auth.getUser()

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
