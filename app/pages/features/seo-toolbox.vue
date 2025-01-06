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
  },
  {
    id: 'backlinks-checker',
    name: 'Backlinks Checker',
    description: 'Analyze your repository backlinks and check their quality',
    icon: 'i-heroicons-link'
  },
  {
    id: 'keyword-ranking',
    name: 'Keyword Ranking',
    description: 'Track the ranking of keywords for your repository',
    icon: 'i-heroicons-chart-bar'
  }
])

const seoTips = ref([
  'Use descriptive repository names with keywords',
  'Keep README files comprehensive and well-structured',
  'Add relevant topics and tags to your repository',
  'Include clear project descriptions and documentation',
  'Regularly update your repository content'
])

const seoScore = ref(85)
const showBacklinksModal = ref(false)
const showKeywordRankingModal = ref(false)

const backlinksData = ref([]) // Placeholder for backlinks data
const keywordRankingData = ref([]) // Placeholder for keyword ranking data

const scoreLabel = computed(() => {
  if (seoScore.value >= 90) return 'Excellent'
  if (seoScore.value >= 70) return 'Good'
  return 'Needs Improvement'
})

// Functions to handle modals
function openBacklinksChecker() {
  showBacklinksModal.value = true
}

function openKeywordRanking() {
  showKeywordRankingModal.value = true
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <!-- Navbar -->
      <UDashboardNavbar title="SEO Toolbox" />

      <!-- Page Header -->
      <UPageHeader
        title="SEO Toolbox"
        description="Comprehensive tools to optimize your repository's SEO"
        class="mb-6"
      />

      <!-- Main Layout with Scroll -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto h-full">
        <!-- Tools List -->
        <div class="lg:col-span-2 space-y-6">
          <UCard
            v-for="tool in tools"
            :key="tool.id"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="shrink-0">
                <UIcon
                  :name="tool.icon"
                  class="w-10 h-10 text-primary"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-medium mb-2">
                  {{ tool.name }}
                </h3>
                <p class="text-sm text-gray-500 mb-4">
                  {{ tool.description }}
                </p>
                <UButton
                  v-if="tool.id === 'backlinks-checker'"
                  color="primary"
                  variant="ghost"
                  size="sm"
                  @click="openBacklinksChecker"
                >
                  Check Backlinks
                </UButton>
                <UButton
                  v-if="tool.id === 'keyword-ranking'"
                  color="primary"
                  variant="ghost"
                  size="sm"
                  @click="openKeywordRanking"
                >
                  View Rankings
                </UButton>
                <UButton
                  v-else
                  color="primary"
                  variant="ghost"
                  size="sm"
                >
                  Use Tool
                </UButton>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Tips -->
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

          <!-- SEO Score -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">
                SEO Score
              </h3>
            </template>
            <div class="flex items-center justify-center p-6">
              <div class="text-center">
                <div class="text-4xl font-bold text-primary">
                  {{ seoScore }}/100
                </div>
                <div class="text-sm text-gray-500 mt-2">
                  {{ scoreLabel }}
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Backlinks Checker Modal -->
      <UModal v-model="showBacklinksModal">
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">
              Backlinks Checker
            </h3>
          </template>
          <div class="p-6">
            <p class="text-gray-500 mb-4">
              Analyze the backlinks to your repository for better SEO insights.
            </p>
            <!-- Placeholder for backlinks data -->
            <ul class="space-y-2">
              <li
                v-for="(link, index) in backlinksData"
                :key="index"
                class="p-3 bg-gray-800/50 rounded"
              >
                {{ link }}
              </li>
              <li
                v-if="!backlinksData.length"
                class="text-gray-400"
              >
                No backlinks found.
              </li>
            </ul>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <UButton
                color="primary"
                @click="showBacklinksModal = false"
              >
                Close
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>

      <!-- Keyword Ranking Modal -->
      <UModal v-model="showKeywordRankingModal">
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">
              Keyword Ranking
            </h3>
          </template>
          <div class="p-6">
            <p class="text-gray-500 mb-4">
              Track how your repository ranks for key search terms.
            </p>
            <!-- Placeholder for keyword ranking data -->
            <ul class="space-y-2">
              <li
                v-for="(keyword, index) in keywordRankingData"
                :key="index"
                class="p-3 bg-gray-800/50 rounded"
              >
                {{ keyword }}
              </li>
              <li
                v-if="!keywordRankingData.length"
                class="text-gray-400"
              >
                No keyword rankings available.
              </li>
            </ul>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <UButton
                color="primary"
                @click="showKeywordRankingModal = false"
              >
                Close
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </UDashboardPanel>
  </UDashboardPage>
</template>
