<template>
    <div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

let { data: questions, error } = await supabase
  .from('questions')
  .select('*')
  .eq('column', 'quote')
          
function getQuestion(){
}

</script>

<style scoped>

</style>