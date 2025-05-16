import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useStore = defineStore('user', {
  state: () => (
    {
      user: null as User | null,
      isSignedIn: false
    }
  ),
  actions: {
    signIn(userData: User){
      this.isSignedIn = true
      this.user = userData
    },
    signOut(){
      this.isSignedIn = false
      this.user = null
    }
  }
  
})

