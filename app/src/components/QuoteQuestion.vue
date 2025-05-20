<template>
    <div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

const {question, error} = await supabase
  .from('questions')
  .select("*")
  .eq('category', 'quote')

</script>

<style scoped>

</style>