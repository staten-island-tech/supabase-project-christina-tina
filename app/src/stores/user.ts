import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Powerup, User, UserForm } from '../types'
import { supabase } from '../supabaseClient'

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
  } 
  if (!loginData?.user) {
    errorMessage.value="Login failed: No user data returned"
    return errorMessage.value
  }

    const {data: temp, error: userFetchError} = await getUserByID(loginData.user.id) //temp is a list of all users with this id, should be array w one element - change var name later

  if (userFetchError||!temp|| temp.length === 0 || !temp[0]){
    errorMessage.value='Login error: Could not retrieve user data.'
    return errorMessage.value
  }
    isSignedIn.value = true
    
    user.value = {
      id: temp[0].id,
      email: email,
      username: temp[0].username,
      currency: temp[0].currency,
      score: temp[0].score,
    }
    
  }
    async function getUserByID(id:string) { 
      const {data, error} = await supabase
      .from('users')
      .select('*')
      .eq('id',id)
        return {data, error}
    }
  
     async function changeCoins(amount: number) {
      user.value!.currency += amount
      const { data, error } = await supabase
        .from('users')               
        .update({ currency: user.value!.currency })
        .eq('id', user.value!.id)            
      if (error) {
        alert("error updating coins"+error)
        return
      }
    }

    async function changeScore(amount: number) {
      user.value!.score += amount
      const { data, error } = await supabase
        .from('users')                  
        .update({ score: user.value!.score })
        .eq('id', user.value!.id)              
      if (error) {
        alert("error updating score"+error)
        return
      }
    }
  
  async function buyPowerup(item: Powerup){
    if (user.value!.currency<item.price) {
      alert("not enough coins, try again later")
      return
    }
    user.value!.currency -= item.price
    const { data: updateCurrency, error:updateCurrencyError } = await supabase
        .from('users')                  
        .update({ currency: user.value!.currency })
        .eq('id', user.value!.id)              
    if (updateCurrencyError) {
        alert("error updating currency"+updateCurrencyError)
        return
      }
    const {data: updateInventory,error:updateInventoryError}=await supabase
      .from('player_inventory')
      .insert({
        user_id: user.value!.id,
        item_id: item.id,
        name: item.name,
        type: "powerup",
        description: item.description,
        price: item.price
      })
      if (updateInventoryError){
        alert("error updating inventory"+updateInventoryError)
        return
      }
  }

  return {
    user,
    isSignedIn,
    errorMessage,
    signOut,
    signUp,
    logIn,
    changeCoins,
    changeScore,
    buyPowerup
  }
  })