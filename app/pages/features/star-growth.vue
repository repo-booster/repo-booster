<template>
  <div class="flex flex-1 w-full min-w-0">
    <UDashboardPage class="flex flex-grow">
      <!-- Analytics Overview -->
      <UDashboardPanel grow>
        <UDashboardNavbar
          title="Star Growth Analytics"
          description="Track and analyze your repository's star growth"
        />

        <div class="p-4 space-y-6 flex-grow overflow-y-auto">
          <!-- Stacked Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Statistics Section -->
            <UCard>
              <template #header>
                <h3
                  class="text-lg font-medium"
                  :style="{ color: textColor }"
                >
                  Star Growth Overview
                </h3>
              </template>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div
                  v-for="stat in stats"
                  :key="stat.label"
                  class="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow"
                  :style="{ backgroundColor: cardBackgroundColor, color: textColor }"
                >
                  <div class="text-sm font-medium mb-1">
                    {{ stat.label }}
                  </div>
                  <div class="text-2xl font-bold">
                    {{ stat.value }}
                  </div>
                  <div class="text-sm mt-1 flex items-center gap-2">
                    <UIcon
                      :name="stat.trend === 'up' ? 'i-heroicons-arrow-up' : 'i-heroicons-arrow-down'"
                      class="w-4 h-4"
                      :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'"
                    />
                    <span :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'">
                      {{ stat.change }}
                    </span>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Star Growth Chart -->
            <UCard>
              <template #header>
                <h3
                  class="text-lg font-medium"
                  :style="{ color: textColor }"
                >
                  Star Growth Chart
                </h3>
              </template>
              <div class="h-64">
                <StarGrowthChart :data="chartData" />
              </div>
            </UCard>

            <!-- Star Growth History -->
            <UCard class="lg:col-span-2">
              <template #header>
                <h3
                  class="text-lg font-medium"
                  :style="{ color: textColor }"
                >
                  Star Growth History
                </h3>
              </template>
              <div class="h-64 overflow-y-auto">
                <StarGrowthHistory :history="starHistory" />
              </div>
            </UCard>

            <!-- Color Picker -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  Customize Colors
                </h3>
              </template>
              <div class="space-y-4 p-4">
                <div>
                  <label
                    for="text-color"
                    class="text-sm font-medium"
                  >Text Color</label>
                  <input
                    id="text-color"
                    v-model="textColor"
                    type="color"
                    class="w-full h-10 mt-2 border border-gray-300 rounded"
                  >
                </div>
                <div>
                  <label
                    for="card-background-color"
                    class="text-sm font-medium"
                  >Card Background Color</label>
                  <input
                    id="card-background-color"
                    v-model="cardBackgroundColor"
                    type="color"
                    class="w-full h-10 mt-2 border border-gray-300 rounded"
                  >
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </UDashboardPanel>
    </UDashboardPage>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StarStat, ChartData, HistoryItem } from '~/types/star-growth'

// State for Custom Colors
const textColor = ref('#333333')
const cardBackgroundColor = ref('#ffffff')

// Mock Stats
const stats: StarStat[] = [
  { label: 'Total Stars', value: '1,234', change: '+12%', trend: 'up' },
  { label: 'Stars Weekly', value: '67', change: '+5%', trend: 'up' },
  { label: 'Average Daily', value: '8', change: '-3%', trend: 'down' }
]

// Mock Chart Data
const chartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  values: [50, 120, 300, 450, 500]
}

// Mock Star History Data
const starHistory: HistoryItem[] = [
  { date: '2024-01-10', user: 'User123', repo: 'MyRepo' },
  { date: '2024-01-09', user: 'User456', repo: 'AnotherRepo' },
  { date: '2024-01-08', user: 'User789', repo: 'SomeRepo' }
]
</script>
