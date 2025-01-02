<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">
        SEO Score
      </h3>
    </template>
    <div class="flex items-center justify-center p-6">
      <div class="relative">
        <div
          class="text-4xl font-bold"
          :class="scoreColorClass"
        >
          {{ score }}/100
        </div>
        <div class="text-sm text-gray-500 mt-2 text-center">
          {{ scoreLabel }}
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  score: number
}>()

const scoreColorClass = computed(() => {
  if (props.score >= 80) return 'text-green-500'
  if (props.score >= 60) return 'text-yellow-500'
  return 'text-red-500'
})

const scoreLabel = computed(() => {
  if (props.score >= 80) return 'Excellent'
  if (props.score >= 60) return 'Good'
  return 'Needs Improvement'
})
</script>
