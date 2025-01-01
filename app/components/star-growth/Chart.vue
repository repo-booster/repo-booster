<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Growth Trend</h3>
        <USelectMenu
          v-model="period"
          :options="periodOptions"
        />
      </div>
    </template>

    <div class="h-80">
      <!-- Replace with actual chart component -->
      <div class="h-full flex items-center justify-center text-gray-500">
        Star Growth Chart Visualization
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { ChartData } from '~/types/star-growth'

defineProps<{
  data: ChartData
}>()

const period = ref('30d')
const periodOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last year', value: '1y' }
]

// Reset chart data to 0
const chartData = ref({
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
  values: [0, 0, 0, 0, 0]
})
</script>