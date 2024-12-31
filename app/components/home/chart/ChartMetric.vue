<template>
  <USelectMenu
    v-model="selectedMetric"
    :options="metrics"
    class="shrink-0"
  />
</template>

<script setup lang="ts">
const metrics = ['views', 'unique visitors']
const selectedMetric = defineModel<string>()
</script>
