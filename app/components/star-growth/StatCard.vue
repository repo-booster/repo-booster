<template>
  <UCard>
    <div class="flex items-start justify-between">
      <div>
        <div class="text-sm text-gray-500">{{ stat.label }}</div>
        <div class="text-2xl font-semibold mt-1">{{ stat.value }}</div>
      </div>
      <UBadge
        :color="stat.trend === 'up' ? 'green' : 'red'"
        variant="subtle"
        class="flex items-center gap-1"
      >
        <UIcon
          :name="stat.trend === 'up' ? 'i-heroicons-arrow-up' : 'i-heroicons-arrow-down'"
          class="w-4 h-4"
        />
        {{ stat.change }}
      </UBadge>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { StarStat } from '~/types/star-growth'

defineProps<{
  stat: StarStat
}>()
</script>