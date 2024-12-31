<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'
import type { Range } from '~/types'

// Predefined ranges
const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]

// Define the selected range model
const selected = defineModel({
  type: Object as PropType<Range>,
  required: true,
  default: () => ({
    start: sub(new Date(), { days: 7 }),
    end: new Date()
  })
})

// Check if a range is selected
function isRangeSelected(duration: Duration) {
  if (!selected.value) return false
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

// Update the selected range
function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      >
        {{ selected?.start ? format(selected.start, 'd MMM, yyyy') : 'Start Date' }}
        -
        {{ selected?.end ? format(selected.end, 'd MMM, yyyy') : 'End Date' }}
      </UButton>
    </template>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <!-- Predefined ranges -->
        <div class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <!-- Custom date picker -->
        <DatePicker
          v-model="selected"
          @close="close"
        />
      </div>
    </template>
  </UPopover>
</template>
