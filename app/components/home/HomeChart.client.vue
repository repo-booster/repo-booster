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
        <USelectMenu
          v-model="selectedMetric"
          :options="metrics"
        />
      </div>
    </template>

    <div class="h-80">
      <VisXYContainer
        :data="data"
        :padding="{ top: 10 }"
        class="h-full"
      >
        <VisLine
          :x="x"
          :y="y"
          color="rgb(var(--color-primary-DEFAULT))"
        />
        <VisArea
          :x="x"
          :y="y"
          color="rgb(var(--color-primary-DEFAULT))"
          :opacity="0.1"
        />

        <VisAxis
          type="x"
          :x="x"
          :tick-format="xTicks"
        />

        <VisCrosshair
          color="rgb(var(--color-primary-DEFAULT))"
          :template="template"
        />

        <VisTooltip />
      </VisXYContainer>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { GitHubUser } from '~/types/github'

const metrics = ['views', 'unique visitors']
const selectedMetric = ref(metrics[0])

const { data } = await useFetch<GitHubUser[]>('https://api.github.com')

const x = (_: GitHubUser, i: number) => i
const y = (d: GitHubUser) => selectedMetric.value === 'views' ? d.count : d.uniques

const xTicks = (i: number) => {
  if (!data.value?.[i]) return ''
  return format(new Date(data.value[i].timestamp), 'MMM d')
}

const template = (d: GitHubUser) => {
  const value = selectedMetric.value === 'views' ? d.count : d.uniques
  return `${format(new Date(d.timestamp), 'MMM d')}: ${value.toLocaleString()} ${selectedMetric.value}`
}
</script>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
  --vis-crosshair-circle-stroke-color: #fff;
  --vis-axis-grid-color: rgb(var(--color-gray-200));
  --vis-axis-tick-color: rgb(var(--color-gray-200));
  --vis-axis-tick-label-color: rgb(var(--color-gray-400));
  --vis-tooltip-background-color: #fff;
  --vis-tooltip-border-color: rgb(var(--color-gray-200));
  --vis-tooltip-text-color: rgb(var(--color-gray-900));
}

.dark .unovis-xy-container {
  --vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
  --vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));
  --vis-axis-grid-color: rgb(var(--color-gray-800));
  --vis-axis-tick-color: rgb(var(--color-gray-800));
  --vis-axis-tick-label-color: rgb(var(--color-gray-500));
  --vis-tooltip-background-color: rgb(var(--color-gray-900));
  --vis-tooltip-border-color: rgb(var(--color-gray-800));
  --vis-tooltip-text-color: #fff;
}
</style>
