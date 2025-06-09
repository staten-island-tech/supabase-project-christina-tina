<template>
    <div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

async function question(){
    const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq()
}
</script>

<style scoped>

</style>