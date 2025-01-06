<script setup lang="ts">
import { ref } from 'vue'

// Define refs for reactive data
const repoUrl = ref('')
const repoContent = ref('')
const results = ref<{
  score: number
  suggestions: Array<{ type: 'success' | 'warning' | 'error', text: string }>
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
  },
  {
    id: 'toc-generator',
    name: 'TOC Generator',
    description: 'Generate table of contents',
    icon: 'i-heroicons-list-bullet'
  }
]

const templates = [
  {
    id: 'standard',
    name: 'Standard Project',
    description: 'Basic project template',
    icon: 'i-heroicons-document-text'
  }
]

const bestPractices = [
  'Include a clear project description',
  'Add installation instructions',
  'Provide usage examples with code'
]

const generating = ref(false)

// Method to fetch repository content
async function fetchRepository() {
  console.log(`Fetching repository content for: ${repoUrl.value}`)
  // Simulated repository content retrieval
  repoContent.value = `
# Example Repository

This is an example README file for your repository.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`js
import { example } from 'example-library'
example()
\`\`\`
  `
}

function refreshScanner() {
  console.log('Scanner refreshed')
  repoUrl.value = ''
  repoContent.value = ''
  results.value = null
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="README Scanner">
        <template #right>
          <UButton
            color="primary"
            icon="i-heroicons-magnifying-glass"
            :loading="generating"
          >
            Generate Headings
          </UButton>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            variant="ghost"
            icon="i-heroicons-arrow-path"
            size="sm"
            @click="refreshScanner"
          >
            Refresh
          </UButton>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UPageHeader
          title="README Scanner"
          description="Analyze and optimize your repository's README file"
          class="mb-6"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Repository Input Section -->
          <div class="lg:col-span-2 space-y-8">
            <div class="space-y-4">
              <UInput
                v-model="repoUrl"
                placeholder="Enter repository URL"
                label="Repository URL"
              />
              <UButton
                color="primary"
                @click="fetchRepository"
              >
                Fetch Repository
              </UButton>
            </div>

            <!-- Repository Content Section -->
            <div
              v-if="repoContent"
              class="space-y-4"
            >
              <h3 class="text-lg font-medium">
                Edit README (Markdown Supported)
              </h3>
              <UMarkdownEditor v-model="repoContent" />
            </div>

            <!-- Scanner Results -->
            <div
              v-if="results"
              class="space-y-6"
            >
              <ReadmeScannerResults :results="results" />
            </div>
          </div>

          <!-- Tools and Templates Panel -->
          <div class="space-y-6">
            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  README Tools
                </h3>
              </template>
              <div class="space-y-4">
                <div
                  v-for="tool in tools"
                  :key="tool.id"
                  class="p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <div class="flex items-center gap-3">
                    <UIcon
                      :name="tool.icon"
                      class="w-5 h-5 text-primary"
                    />
                    <div>
                      <div class="font-medium">
                        {{ tool.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ tool.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  README Templates
                </h3>
              </template>
              <div class="space-y-4">
                <div
                  v-for="template in templates"
                  :key="template.id"
                  class="p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <div class="flex items-center gap-3">
                    <UIcon
                      :name="template.icon"
                      class="w-5 h-5 text-primary"
                    />
                    <div>
                      <div class="font-medium">
                        {{ template.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ template.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  Best Practices
                </h3>
              </template>
              <ul class="space-y-3">
                <li
                  v-for="(practice, index) in bestPractices"
                  :key="index"
                  class="flex gap-3"
                >
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 shrink-0"
                  />
                  <span class="text-sm">{{ practice }}</span>
                </li>
              </ul>
            </UCard>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
