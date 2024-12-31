<template>
  <div>
    <UPageHeader
      title="Latest Updates"
      description="Track recent changes and updates to your repositories"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                placeholder="All repositories"
              />
            </div>
          </template>

          <div class="space-y-6">
            <div
              v-for="update in filteredUpdates"
              :key="update.id"
              class="flex gap-4"
            >
              <div class="relative">
                <div class="w-2 h-2 rounded-full bg-primary mt-2" />
                <div class="absolute top-3 bottom-0 left-1/2 w-px bg-gray-800 -translate-x-1/2" />
              </div>
              <div class="flex-1 pb-6">
                <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <span>{{ formatDate(update.date) }}</span>
                  <span>•</span>
                  <span>{{ update.type }}</span>
                </div>
                <h4 class="font-medium mb-2">
                  {{ update.title }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ update.description }}
                </p>
                <div class="mt-3 flex gap-2">
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
        </UCard>
      </div>

      <!-- Statistics -->
      <div class="space-y-6">
        <!-- Update Stats -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">
              Update Statistics
            </h3>
          </template>
          <div class="space-y-4">
            <div
              v-for="stat in updateStats"
              :key="stat.label"
              class="flex justify-between items-center"
            >
              <span class="text-sm text-gray-500">{{ stat.label }}</span>
              <span class="font-medium">{{ stat.value }}</span>
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
          <div class="space-y-4">
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
                  {{ type.count }}
                  updates
                </div>
              </div>
              <div
                class="w-24 h-2 rounded-full bg-gray-800"
              >
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
  </div>
</template>

<script setup lang="ts">
const selectedRepo = ref('')

const repositories = [
  { label: 'All repositories', value: '' },
  { label: 'awesome-project', value: 'awesome-project' },
  { label: 'cool-lib', value: 'cool-lib' }
]

interface Update {
  id: string
  date: string
  type: string
  title: string
  description: string
  tags: string[]
  repository: string
}

const updates: Update[] = [
  {
    id: '1',
    date: '2024-02-20T10:00:00Z',
    type: 'Feature',
    title: 'Added new search functionality',
    description: 'Implemented advanced search with filters and sorting options',
    tags: ['feature', 'search', 'ui'],
    repository: 'awesome-project'
  },
  {
    id: '2',
    date: '2024-02-19T15:30:00Z',
    type: 'Bug Fix',
    title: 'Fixed memory leak in data processing',
    description: 'Resolved memory leak issue in the data processing pipeline',
    tags: ['bug', 'performance'],
    repository: 'cool-lib'
  }
]

const updateStats = [
  { label: 'Total Updates', value: '0' },
  { label: 'This Week', value: '0' },
  { label: 'Average per Day', value: '0' }
]

const contentTypes = [
  { name: 'Features', icon: 'i-heroicons-sparkles', count: 0, percentage: 0 },
  { name: 'Bug Fixes', icon: 'i-heroicons-bug-ant', count: 0, percentage: 0 },
  { name: 'Documentation', icon: 'i-heroicons-document-text', count: 0, percentage: 0 },
  { name: 'Performance', icon: 'i-heroicons-chart-bar', count: 0, percentage: 0 }
]

const filteredUpdates = computed(() => {
  if (!selectedRepo.value) return updates
  return updates.filter(update => update.repository === selectedRepo.value)
})

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    feature: 'green',
    bug: 'red',
    performance: 'yellow',
    ui: 'blue',
    search: 'purple'
  }
  return colors[tag] || 'gray'
}
</script>
