<template>
    <div>
        
    </div>
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient'
import { reactive } from 'vue'
import type { User } from '../types'

const user = reactive<User>({
  email: '',
  password: '',
  username: '',
  currency: 0,
  score: 0,
  items: [],
})

const { data, error} = await supabase.from('users').select('username')
if (error) {
    console.error('Error fetching data', error)
} else {
    console.log('Data', Data)
}
</script>

<style scoped>

</style>