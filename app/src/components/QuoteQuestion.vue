<template>
  <div>
    <div v-if="questionError">Error: {{ error.message }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

function shuffle(array) {
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const questionsData = ref([])
const questionError = ref(null)
const answersData = ref([])
const answerError = ref(null)

async function getQuestions() {
  const { data, error: fetchQuestionsError } = await supabase
    .from('questions')
    .select('*')
    .eq('column', 'quote')

  if (fetchQuestionsError) {
    questionError.value = fetchQuestionsError
  } else {
    questionsData.value = data
  }
}

async function getAllAnswers() {
  const { data, error: fetchAnswersError } = await supabase
    .from('question')
    .select('correct_ans')

  if (fetchAnswersError){
    answerError.value = fetchAnswersError
  } else {
    answersData.value = data
  }
}

function question() {
  if (questionsData && answersData) {
    for (let i = 0; i < questionsData.length; i++) {
      const questionid = questionsData[i].id
      const question = questionsData[i].question
      const correctAnswer = questionsData[i].correct_ans
      const incorrectAnswers = []
      while (incorrectAnswers.length < 3){
        const randomAnswer = answersData[Math.floor(Math.random() * answersData.length)]
        if (randomAnswer !== correctAnswer){
          incorrectAnswers.push(randomAnswer)
        }
      }
      const allAnswers = shuffle([correctAnswer, ...incorrectAnswers])
      return { questionid, question, correctAnswer, allAnswers }
    }
  }
}

function displayQuestion(id, question, correct_ans, answers){
  const game = question()
}

onMounted(() => {
  getQuestions()
  getAllAnswers()
})

</script>

<style scoped></style>
