<template>
    <div>
        <div class="question-modal">
            <h1>{{ questions.question }}</h1>
            <div class="answer-options">
                
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    questions: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>

</style>