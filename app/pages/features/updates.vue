<template>
  <div class="flex flex-col h-full">
    <UDashboardPage>
      <!-- Page Header -->
      <UDashboardNavbar
        title="Latest Updates"
        description="Track recent changes and updates to your repositories"
      />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <!-- Updates Section -->
        <div class="lg:col-span-2 space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium">
                  Recent Changes
                </h3>
                <USelectMenu
                  v-model="selectedRepo"
                  :options="repositories"
                  placeholder="Filter by repository"
                />
              </div>
            </template>
            <div class="divide-y divide-gray-200 dark:divide-gray-800">
              <div
                v-for="update in filteredUpdates"
                :key="update.id"
                class="py-4"
              >
                <div class="flex gap-4 items-start">
                  <div class="relative">
                    <div class="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div class="absolute top-3 bottom-0 left-1/2 w-px bg-gray-800 -translate-x-1/2" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <span>{{ formatDate(update.date) }}</span>
                      <span>•</span>
                      <span>{{ update.type }}</span>
                    </div>
                    <h4 class="font-medium text-lg mb-2">
                      {{ update.title }}
                    </h4>
                    <p class="text-sm text-gray-500">
                      {{ update.description }}
                    </p>
                    <div class="mt-3 flex gap-2 flex-wrap">
                      <UChip
                        v-for="tag in update.tags"
                        :key="tag"
                        :colors="getTagColor(tag)"
                        size="sm"
                      >
                        {{ tag }}
                      </UChip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Update Stats -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">
                Update Statistics
              </h3>
            </template>
            <div class="space-y-4 p-4">
              <div
                v-for="stat in updateStats"
                :key="stat.label"
                class="flex justify-between items-center"
              >
                <span class="text-sm text-gray-500">{{ stat.label }}</span>
                <span class="font-medium text-lg">{{ stat.value }}</span>
              </div>
            </div>
          </UCard>

          <!-- Content Types -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">
                Content Types
              </h3>
            </template>
            <div class="space-y-4 p-4">
              <div
                v-for="type in contentTypes"
                :key="type.name"
                class="flex items-center gap-3"
              >
                <UIcon
                  :name="type.icon"
                  class="w-5 h-5 text-primary"
                />
                <div class="flex-1">
                  <div class="text-sm font-medium">
                    {{ type.name }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ type.count }} updates
                  </div>
                </div>
                <div class="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    class="h-full rounded-full bg-primary"
                    :style="{ width: `${type.percentage}%` }"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UDashboardPage>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedRepo = ref(null)

const repositories = ref([
  { value: 'repo1', label: 'Repository 1' },
  { value: 'repo2', label: 'Repository 2' },
  { value: 'repo3', label: 'Repository 3' }
])

const filteredUpdates = ref([
  {
    id: 1,
    date: '2025-01-01',
    type: 'Bug Fix',
    title: 'Fixed issue with login',
    description: 'Resolved an issue causing login failures.',
    tags: ['bug', 'critical']
  },
  {
    id: 2,
    date: '2025-01-02',
    type: 'Feature',
    title: 'Added dark mode support',
    description: 'Implemented dark mode for better user experience.',
    tags: ['feature', 'ui']
  }
])

const updateStats = ref([
  { label: 'Total Updates', value: '24' },
  { label: 'Bug Fixes', value: '12' },
  { label: 'New Features', value: '8' },
  { label: 'Improvements', value: '4' }
])

const contentTypes = ref([
  {
    name: 'Bug Fixes',
    count: 12,
    percentage: 50,
    icon: 'i-heroicons-bug-ant'
  },
  {
    name: 'Features',
    count: 8,
    percentage: 33,
    icon: 'i-heroicons-light-bulb'
  },
  {
    name: 'Improvements',
    count: 4,
    percentage: 17,
    icon: 'i-heroicons-arrow-path'
  }
])

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getTagColor(tag: string): string {
  switch (tag) {
    case 'bug':
      return 'red'
    case 'critical':
      return 'yellow'
    case 'feature':
      return 'green'
    case 'ui':
      return 'blue'
    default:
      return 'gray'
  }
}
</script>
