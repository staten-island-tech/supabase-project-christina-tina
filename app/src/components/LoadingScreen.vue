<template>
  <div :class="['fixed inset-0 z-50 flex items-center justify-center', backgroundClass]">
    <svg
      ref="spinner"
      :class="[sizeClass, colorClass]"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        stroke-opacity="0.2"
        stroke-width="4"
        fill="none"
      />
      <path
        d="M25 5a20 20 0 1 1-14.14 5.86"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
      />
    </svg>
    <p v-if="message" class="absolute bottom-12 text-sm text-gray-600">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  message?: string
  sizeClass?: string
  colorClass?: string
  backgroundClass?: string
}>()

const spinner = ref<SVGElement | null>(null)
let tween: gsap.core.Tween | null = null

onMounted(() => {
  if (spinner.value) {
    tween = gsap.to(spinner.value, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: 'linear',
      transformOrigin: 'center center'
    })
  }
})

onUnmounted(() => {
  if (tween) {
    tween.kill()
    tween = null
  }
})
</script>

<style scoped>
</style>
