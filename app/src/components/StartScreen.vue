<template>
    <div>   
        <div class="loader" v-if="!data"></div>
    </div>
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/composables/useAuth'; 
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()

//get user data
let { data: users, error } = await supabase
  .from('users')
  .select('*')

//if data has been loaded, route to homepage
if (data){
    router.push('/')
}

</script>

<style scoped>

</style>  