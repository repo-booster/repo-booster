<template>
  <UDashboardPage>
    <!-- Left Panel -->
    <UDashboardPanel
      id="readme-scanner"
      :width="400"
      :resizable="{ min: 300, max: 500 }"
    >
      <UDashboardNavbar
        title="README Scanner"
        description="Analyze and optimize your repository's README file"
      />

      <div class="space-y-6 p-4">
        <ReadmeScannerForm v-model="repoUrl" />

        <div v-if="results" class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">Analysis Results</h3>
            </template>
            <ReadmeScannerResults :results="results" />
          </UCard>
        </div>
      </div>
    </UDashboardPanel>

    <!-- Right Panel -->
    <UDashboardPanel grow collapsible side="right">
      <UDashboardNavbar title="Tools and Tips" />

      <div class="space-y-6 p-4">
        <!-- Quick Tools -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">Quick Tools</h3>
          </template>
          <div class="space-y-4">
            <div
              v-for="tool in tools"
              :key="tool.id"
              class="p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer"
              @click="activateTool(tool.id)"
            >
              <div class="flex items-center gap-3">
                <UIcon :name="tool.icon" class="w-5 h-5 text-primary" />
                <div>
                  <div class="font-medium">{{ tool.name }}</div>
                  <p class="text-sm text-gray-500">{{ tool.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Best Practices -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">Best Practices</h3>
          </template>
          <ul class="space-y-3">
            <li
              v-for="(practice, index) in bestPractices"
              :key="index"
              class="flex gap-3"
            >
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-primary shrink-0" />
              <span class="text-sm">{{ practice }}</span>
            </li>
          </ul>
        </UCard>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">
const repoUrl = ref('')
const results = ref<{
  score: number
  suggestions: Array<{
    type: 'success' | 'warning' | 'error'
    text: string
  }>
} | null>(null)

const tools = [
  {
    id: 'heading-generator',
    name: 'Heading Generator',
    description: 'Generate catchy README headings',
    icon: 'i-heroicons-hashtag'
  },
  {
    id: 'badge-maker',
    name: 'Badge Maker',
    description: 'Create custom badges and shields',
    icon: 'i-heroicons-shield-check'
  }
]

const bestPractices = [
  'Include a clear project description',
  'Add installation instructions',
  'Use proper markdown formatting',
  'Add a license and contribution guidelines'
]

function activateTool(toolId: string) {
  console.log(`Tool activated: ${toolId}`)
}
</script>
