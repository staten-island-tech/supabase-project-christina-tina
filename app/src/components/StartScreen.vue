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
const data = ref(null)

//fetch data
while(data === null){
    //...
}

if (data){
    router.push('/')
}


</script>

<style scoped>

</style>  