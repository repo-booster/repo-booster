<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">
            Traffic
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Past 2 weeks of repository views
          </p>
        </div>
        <ChartMetrics v-model="metric" />
      </div>
    </template>

    <div class="h-80">
      <slot :metric="metric" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
const metric = ref('views')
</script>
