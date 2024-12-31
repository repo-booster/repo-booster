<template>
  <ChartContainer v-slot="{ metric }">
    <ChartVisualization
      :data="data"
      :metric="metric"
    />
  </ChartContainer>
</template>

<script setup lang="ts">
import type { GitHubTrafficData } from '~/types/github'

const { data } = await useFetch<GitHubTrafficData[]>('/api/github/traffic')
</script>
