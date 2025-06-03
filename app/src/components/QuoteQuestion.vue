<template>
  <div>
    <div v-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';

function shuffle(array) { 
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questionsData = ref([]);
const error = ref(null);

async function getQuestions() {
  const { data, error: fetchError } = await supabase
    .from('questions')
    .select('*')
    .eq('column', 'quote');

  if (fetchError) {
    error.value = fetchError;
  } else {
    questionsData.value = data;
  }
}

function showQuestion() {
  if (questionsData){
    const question = questionsData.question
    const correctAnswer = questionsData.correct_ans
    const incorrectAnswers = 
    const allAnswers = shuffle()
  }
}

onMounted(() => {
  getQuestions();
});

</script>

<style scoped>

</style>
