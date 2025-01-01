<template>
  <UCard class="mt-6">
    <template #header>
      <h3 class="text-lg font-medium">Recent Stars</h3>
    </template>

    <UTable
      :rows="history"
      :columns="columns"
    />
  </UCard>
</template>

<script setup lang="ts">
import type { HistoryItem } from '~/types/star-growth'

defineProps<{
  history: HistoryItem[]
}>()

const columns = [
  {
    key: 'date',
    label: 'Date'
  },
  {
    key: 'user',
    label: 'User'
  },
  {
    key: 'repo',
    label: 'Repository'
  }
]
</script>