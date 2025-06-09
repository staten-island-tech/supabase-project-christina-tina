<template>
    <div>
        <h1>{{ questions.category }}</h1>
        <div class="question-modal">
            <h2>{{ questions.question }}</h2>
            <div class="answer-options">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    questions: {
        type: Object,
        required: true
    },
})
</script>

<style scoped>

</style>