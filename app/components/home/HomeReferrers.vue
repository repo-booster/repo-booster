<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-arrow-trending-up"
          class="w-5 h-5 text-gray-500"
        />
        <h2 class="text-base font-semibold text-gray-900 dark:text-white">
          Top Referrers
        </h2>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="referrer in referrers"
        :key="referrer.referrer"
        class="flex items-center justify-between"
      >
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ referrer.referrer }}</span>
        <div class="flex items-center gap-4">
          <div class="text-sm">
            <span class="text-gray-900 dark:text-white font-medium">{{ referrer.count.toLocaleString() }}</span>
            <span class="text-gray-500 dark:text-gray-400 ml-1">views</span>
          </div>
          <div class="text-sm">
            <span class="text-gray-900 dark:text-white font-medium">{{ referrer.uniques.toLocaleString() }}</span>
            <span class="text-gray-500 dark:text-gray-400 ml-1">unique</span>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { GitHubReferrer } from '~/types/github'

const { data: referrers } = await useFetch<GitHubReferrer[]>('/api/github/referrers')
</script>
