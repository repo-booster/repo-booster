<template>
  <div
    class="star absolute rounded-full"
    :style="{
      width: `${star.size}px`,
      height: `${star.size}px`,
      left: `${star.x}%`,
      top: `${star.y}%`,
      opacity: star.opacity,
      animation: `twinkle ${star.duration}s ease-in-out infinite`,
      animationDelay: `${star.delay}s`
    }"
  />
</template>

<script setup lang="ts">
import type { Star } from '~/utils/stars'

defineProps<{
  star: Star
}>()
</script>

<style scoped>
.star {
  background: white;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
  will-change: opacity;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
