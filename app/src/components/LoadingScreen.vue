<template>
    <div>   
    </div>
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/composables/useAuth'; 
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const store = useStore()

if (store.isSignedIn){
     
    router.push('/')
}

</script>

<style scoped>

</style>  