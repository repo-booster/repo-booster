<template>
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
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { GitHubTrafficData } from '~/types/github'

const props = defineProps<{
  data?: GitHubTrafficData[]
  metric: string
}>()

const x = (_: GitHubTrafficData, i: number) => i
const y = (d: GitHubTrafficData) => props.metric === 'views' ? d.count : d.uniques

const xTicks = (i: number) => {
  if (!props.data?.[i]) return ''
  return format(new Date(props.data[i].timestamp), 'MMM d')
}

const template = (d: GitHubTrafficData) => {
  const value = props.metric === 'views' ? d.count : d.uniques
  return `${format(new Date(d.timestamp), 'MMM d')}: ${value.toLocaleString()} ${props.metric}`
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
