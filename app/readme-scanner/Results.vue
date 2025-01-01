<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">SEO Score</h3>
          <UBadge
            :color="scoreColor"
            size="lg"
            class="text-lg"
          >
            {{ results.score }}/100
          </UBadge>
        </div>
      </template>

      <ul class="space-y-3">
        <li
          v-for="(suggestion, index) in results.suggestions"
          :key="index"
          class="flex items-start gap-3"
        >
          <UIcon
            :name="suggestionIcon(suggestion.type)"
            class="w-5 h-5 mt-0.5"
            :class="suggestionIconClass(suggestion.type)"
          />
          <span>{{ suggestion.text }}</span>
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Suggestion {
  type: 'success' | 'warning' | 'error'
  text: string
}

interface ScanResults {
  score: number
  suggestions: Suggestion[]
}

const props = defineProps<{
  results: ScanResults
}>()

const scoreColor = computed(() => {
  if (props.results.score >= 80) return 'green'
  if (props.results.score >= 60) return 'yellow'
  return 'red'
})

function suggestionIcon(type: string) {
  switch (type) {
    case 'success': return 'i-heroicons-check-circle'
    case 'warning': return 'i-heroicons-exclamation-triangle'
    case 'error': return 'i-heroicons-x-circle'
    default: return 'i-heroicons-information-circle'
  }
}

function suggestionIconClass(type: string) {
  switch (type) {
    case 'success': return 'text-green-500'
    case 'warning': return 'text-yellow-500'
    case 'error': return 'text-red-500'
    default: return 'text-gray-500'
  }
}
</script>
