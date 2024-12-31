<template>
  <div class="h-full flex flex-col">
    <UPageHeader
      title="Star Growth Analytics"
      description="Track and analyze your repository's star growth"
    />

    <div class="flex-1 overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StarGrowthStatCard
          v-for="stat in stats"
          :key="stat.label"
          :stat="stat"
        />
      </div>

      <StarGrowthChart :data="chartData" />
      <StarGrowthHistory :history="starHistory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StarStat, ChartData, HistoryItem } from '~/types/star-growth'

const stats: StarStat[] = [
  { label: 'Total Stars', value: '0', change: '0%', trend: 'up' },
  { label: 'Stars This Week', value: '0', change: '0%', trend: 'up' },
  { label: 'Average Daily', value: '0', change: '0%', trend: 'down' }
]

const chartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  values: [0, 0, 0, 0, 0]
}

const starHistory: HistoryItem[] = [
  { date: '-', user: '-', repo: '-' }
]
</script>
