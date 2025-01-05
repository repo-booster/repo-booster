<template>
  <UDashboardPage>
    <!-- Left Panel -->
    <UDashboardPanel
      id="analytics-overview"
      :width="400"
      :resizable="{ min: 300, max: 500 }"
    >
      <UDashboardNavbar
        title="Star Growth Analytics"
        description="Track and analyze your repository's star growth"
      />

      <div class="p-4 space-y-6">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StarGrowthStatCard
            v-for="stat in stats"
            :key="stat.label"
            :stat="stat"
          />
        </div>
      </div>
    </UDashboardPanel>

    <!-- Right Panel -->
    <UDashboardPanel grow collapsible side="right">
      <UDashboardNavbar title="Detailed Analytics" />

      <div class="p-4 space-y-6">
        <!-- Star Growth Chart -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">Star Growth Chart</h3>
          </template>
          <StarGrowthChart :data="chartData" />
        </UCard>

        <!-- Star Growth History -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">Star Growth History</h3>
          </template>
          <StarGrowthHistory :history="starHistory" />
        </UCard>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
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
