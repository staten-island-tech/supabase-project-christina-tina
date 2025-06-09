<template>
    <div>  
        <span class="loading loading-spinner loading-lg"></span> 
    </div>
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/composables/useAuth'; 
import { useStore } from '../stores/user'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';

const router = useRouter()
const store = useStore()

</script>

<style scoped>

</style>  