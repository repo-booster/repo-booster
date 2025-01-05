<template>
  <div class="min-h-screen flex flex-col">
    <!-- Page Header -->
    <UPageHeader
      title="SEO Analysis"
      description="Comprehensive SEO analysis for your repository"
      class="mb-6"
    >
      <template #right>
        <UButton
          color="primary"
          icon="i-heroicons-magnifying-glass"
          :loading="analyzing"
          @click="analyzeSEO"
        >
          Analyze Now
        </UButton>
      </template>
    </UPageHeader>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      <!-- Repository Input Form -->
      <div class="lg:col-span-2">
        <SeoAnalysisForm v-model="repoUrl" />
      </div>

      <!-- Quick Tips Section -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Quick Tips</h3>
        </template>
        <ul class="space-y-3">
          <li
            v-for="(tip, index) in quickTips"
            :key="index"
            class="flex gap-2"
          >
            <UIcon
              name="i-heroicons-light-bulb"
              class="w-5 h-5 text-yellow-500 shrink-0"
            />
            <span class="text-sm">{{ tip }}</span>
          </li>
        </ul>
      </UCard>
    </div>

    <!-- Results Section -->
    <div
      v-if="results"
      class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <!-- SEO Score -->
      <div class="col-span-1 lg:col-span-1">
        <SeoAnalysisScore :score="results.score" />
      </div>

      <!-- Metrics Section -->
      <div class="col-span-1 md:col-span-2 lg:col-span-2">
        <SeoAnalysisMetrics :metrics="results.metrics" />
      </div>

      <!-- Recommendations -->
      <div class="col-span-1 lg:col-span-4">
        <SeoAnalysisRecommendations :recommendations="results.recommendations" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const repoUrl = ref('')
const analyzing = ref(false)
const results = ref<{
  score: number
  metrics: Array<{ label: string, value: number }>
  recommendations: Array<{ priority: 'high' | 'medium' | 'low', text: string }>
} | null>(null)

const quickTips = [
  'Use descriptive repository names',
  'Keep README files up to date',
  'Add relevant topics and tags',
  'Include clear project descriptions'
]

async function analyzeSEO() {
  analyzing.value = true
  try {
    // Simulated Results for Demo
    results.value = {
      score: 78,
      metrics: [
        { label: 'Title Optimization', value: 90 },
        { label: 'Description Quality', value: 85 },
        { label: 'Keyword Usage', value: 70 },
        { label: 'Content Structure', value: 75 }
      ],
      recommendations: [
        { priority: 'high', text: 'Add more relevant keywords to repository description' },
        { priority: 'medium', text: 'Include installation instructions in README' },
        { priority: 'low', text: 'Add more project screenshots' }
      ]
    }
  } finally {
    analyzing.value = false
  }
}
</script>
