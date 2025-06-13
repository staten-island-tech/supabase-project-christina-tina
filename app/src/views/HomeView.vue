<template>
  <main class="relative min-h-screen pb-20 flex flex-col items-center pt-10">
    <h1 class="text-center text-4xl font-bold mb-4">hello this is the home page</h1>
    <p v-if="!store.isSignedIn" class="text-center mb-6">
      Please create an account or sign in to get started
    </p>

    <svg
      viewBox="0 0 200 200"
      width="60vw"
      height="60vh"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      class="block"
    >
      <path ref="morphPath" :d="paths[0]" fill="currentColor" />
    </svg>

    <div class="mt-8 flex justify-center gap-4">
      <RouterLink class="btn btn-xl" to="/store">Store</RouterLink>
      <RouterLink class="btn btn-xl" to="/game">Game</RouterLink>
    </div>

    <svg ref="measureSvg" style="position: absolute; visibility: hidden; width: 0; height: 0;">
      <path v-for="(p, i) in paths" :key="i" :d="p" />
    </svg>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useStore } from "../stores/user";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { paths, colors } from "../components/SvgPaths";

const store = useStore();
const router = useRouter();
gsap.registerPlugin(MorphSVGPlugin);

const morphPath = ref<SVGPathElement | null>(null);
const measureSvg = ref<SVGSVGElement | null>(null);
const measurePaths = ref<SVGPathElement[]>([]);

function normalizePathTransforms() {
  if (!measurePaths.value.length) return;

  if (!morphPath.value) {
    requestAnimationFrame(normalizePathTransforms);
    return;
  }

  const tl = gsap.timeline({ repeat: -1 });

  paths.forEach((_, i) => {
    const nextIndex = (i + 1) % paths.length;
    const nextPath = paths[nextIndex];
    const nextColor = colors[nextIndex];

    tl.to(morphPath.value, {
      duration: 3,
      morphSVG: { shape: nextPath },
      ease: "power1.inOut",
      fill: nextColor, 
    });
  });
}

onMounted(async () => {
  await nextTick();

  if (!measureSvg.value) return;

  measurePaths.value = Array.from(measureSvg.value.querySelectorAll("path"));

  await nextTick();

  normalizePathTransforms();
});
</script>
