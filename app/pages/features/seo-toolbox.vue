<script setup lang="ts">
import { computed, ref } from 'vue'

useDashboard()

const tools = ref([
  {
    id: 'keyword-analyzer',
    name: 'Keyword Analyzer',
    description: 'Analyze and optimize your repository keywords for better visibility',
    icon: 'i-heroicons-magnifying-glass'
  },
  {
    id: 'readme-optimizer',
    name: 'README Optimizer',
    description: 'Get suggestions to improve your README.md file for better SEO',
    icon: 'i-heroicons-document-text'
  },
  {
    id: 'meta-tags',
    name: 'Meta Tags Generator',
    description: 'Generate optimized meta tags for your repository',
    icon: 'i-heroicons-tag'
  },
  {
    id: 'description-writer',
    name: 'Description Writer',
    description: 'AI-powered tool to write SEO-friendly repository descriptions',
    icon: 'i-heroicons-pencil-square'
  }
])

const seoTips = ref([
  'Use descriptive repository names with keywords',
  'Keep README files comprehensive and well-structured',
  'Add relevant topics and tags to your repository',
  'Include clear project descriptions and documentation',
  'Regularly update your repository content'
])

const seoScore = ref(0)

const scoreLabel = computed(() => {
  if (seoScore.value >= 90) return 'Excellent'
  if (seoScore.value >= 70) return 'Good'
  return 'Needs Improvement'
})
</script>

<template>
  <div class="flex flex-1 w-full min-w-0">
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="Features" />
        <UPageHeader
          title="SEO Toolbox"
          description="Comprehensive tools to optimize your repository's SEO"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Tools List -->
          <div class="lg:col-span-2 space-y-6">
            <UCard
              v-for="tool in tools"
              :key="tool.id"
            >
              <div class="flex items-start gap-4">
                <div class="shrink-0">
                  <UIcon
                    :name="tool.icon"
                    class="w-8 h-8 text-primary"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-medium mb-2">
                    {{ tool.name }}
                  </h3>
                  <p class="text-gray-500 mb-4">
                    {{ tool.description }}
                  </p>
                  <UButton
                    color="primary"
                    variant="ghost"
                  >
                    Use Tool
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Quick Tips -->
          <div class="space-y-6">
            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  SEO Quick Tips
                </h3>
              </template>
              <ul class="space-y-4">
                <li
                  v-for="(tip, index) in seoTips"
                  :key="index"
                  class="flex gap-3"
                >
                  <UIcon
                    name="i-heroicons-light-bulb"
                    class="w-5 h-5 text-yellow-500 shrink-0"
                  />
                  <span class="text-sm">{{ tip }}</span>
                </li>
              </ul>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  SEO Score
                </h3>
              </template>
              <div class="flex items-center justify-center p-6">
                <div class="relative">
                  <div class="text-4xl font-bold text-primary">
                    {{ seoScore }}/100
                  </div>
                  <div class="text-sm text-gray-500 mt-2 text-center">
                    {{ scoreLabel }}
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </UDashboardPanel>
    </UDashboardPage>
  </div>
</template>
