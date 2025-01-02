<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">
        SEO Metrics
      </h3>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <div class="text-sm text-gray-500">
          {{ metric.label }}
        </div>
        <div class="mt-1 flex items-center justify-between">
          <div class="text-xl font-semibold">
            {{ metric.value }}%
          </div>
          <div class="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              class="h-full rounded-full bg-primary"
              :style="{ width: `${metric.value}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Metric {
  label: string
  value: number
}

defineProps<{
  metrics: Metric[]
}>()
</script>
