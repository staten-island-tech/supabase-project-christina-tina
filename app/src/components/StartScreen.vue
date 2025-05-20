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

const { data, error } = await supabase.from('users').select()

//get user data
//if data has been loaded, route to homepage

</script>

<style scoped>

</style>  