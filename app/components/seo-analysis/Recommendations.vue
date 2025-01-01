<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">Recommendations</h3>
    </template>
    <ul class="space-y-4">
      <li
        v-for="(recommendation, index) in recommendations"
        :key="index"
        class="flex items-start gap-3 p-3 rounded-lg"
        :class="priorityClass(recommendation.priority)"
      >
        <UIcon
          :name="priorityIcon(recommendation.priority)"
          class="w-5 h-5 mt-0.5"
          :class="priorityIconClass(recommendation.priority)"
        />
        <div>
          <div class="font-medium">{{ recommendation.text }}</div>
          <div class="text-sm text-gray-500 mt-1">
            Priority: {{ recommendation.priority }}
          </div>
        </div>
      </li>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  text: string
}

defineProps<{
  recommendations: Recommendation[]
}>()

function priorityClass(priority: string) {
  switch (priority) {
    case 'high': return 'bg-red-50 dark:bg-red-900/20'
    case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/20'
    case 'low': return 'bg-green-50 dark:bg-green-900/20'
    default: return ''
  }
}

function priorityIcon(priority: string) {
  switch (priority) {
    case 'high': return 'i-heroicons-exclamation-circle'
    case 'medium': return 'i-heroicons-exclamation-triangle'
    case 'low': return 'i-heroicons-information-circle'
    default: return 'i-heroicons-information-circle'
  }
}

function priorityIconClass(priority: string) {
  switch (priority) {
    case 'high': return 'text-red-500'
    case 'medium': return 'text-yellow-500'
    case 'low': return 'text-green-500'
    default: return 'text-gray-500'
  }
}
</script>