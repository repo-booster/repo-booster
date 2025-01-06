<template>
  <div>
    <div class="flex flex-1 w-full min-w-0">
      <UPageHeader
        title="README Scanner"
        description="Analyze and optimize your repository's README file"
      />
      <div class="grid grid-cols-4 lg:grid-cols-3 gap-12">
        <!-- Main Scanner -->
        <div class="lg:col-span-4 space-y-8">
          <ReadmeScannerForm v-model="repoUrl" />

          <div
            v-if="results"
            class="space-y-6"
          >
            <ReadmeScannerResults :results="results" />
          </div>
        </div>

        <!-- Tools Panel -->
        <div class="space-y-6">
          <!-- Quick Tools -->
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
                @click="activateTool(tool.id)"
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

          <!-- Templates -->
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
                @click="useTemplate(template.id)"
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

          <!-- Best Practices -->
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

      <!-- Tool Modals -->
      <UModal v-model="showHeadingGenerator">
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">
              Heading Generator
            </h3>
          </template>
          <div class="space-y-4">
            <UTextarea
              v-model="headingInput"
              placeholder="Enter your project description..."
              col="4"
            />
            <div
              v-if="generatedHeadings"
              class="space-y-2"
            >
              <div
                v-for="(heading, index) in generatedHeadings"
                :key="index"
                class="p-2 rounded bg-gray-800/50 cursor-pointer hover:bg-gray-800"
                @click="copyHeading(heading)"
              >
                {{ heading }}
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                color="gray"
                variant="soft"
                @click="showHeadingGenerator = false"
              >
                Close
              </UButton>
              <UButton
                color="primary"
                :loading="generating"
                @click="generateHeadings"
              >
                Generate
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </div>
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

// Tools configuration
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
  },
  {
    id: 'emoji-picker',
    name: 'Emoji Picker',
    description: 'Add relevant emojis to sections',
    icon: 'i-heroicons-face-smile'
  },
  {
    id: 'screenshot-formatter',
    name: 'Screenshot Formatter',
    description: 'Format and optimize screenshots',
    icon: 'i-heroicons-photo'
  }
]

// README templates
const templates = [
  {
    id: 'standard',
    name: 'Standard Project',
    description: 'Basic project template',
    icon: 'i-heroicons-document-text'
  },
  {
    id: 'library',
    name: 'Library/Package',
    description: 'Template for libraries',
    icon: 'i-heroicons-cube'
  },
  {
    id: 'docs',
    name: 'Documentation',
    description: 'Detailed documentation template',
    icon: 'i-heroicons-book-open'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Project',
    description: 'Showcase your work',
    icon: 'i-heroicons-presentation-chart-line'
  }
]

// Best practices
const bestPractices = [
  'Include a clear project description',
  'Add installation instructions',
  'Provide usage examples with code',
  'List features and requirements',
  'Include contributing guidelines',
  'Add license information',
  'Use screenshots or GIFs',
  'Keep content organized and structured'
]

// Heading generator state
const showHeadingGenerator = ref(false)
const headingInput = ref('')
const generating = ref(false)
const generatedHeadings = ref<string[]>([])

async function activateTool(toolId: string) {
  if (toolId === 'heading-generator') {
    showHeadingGenerator.value = true
  }
  // Implement other tool activations
}

async function generateHeadings() {
  if (!headingInput.value) return

  generating.value = true
  try {
    // TODO: Implement actual heading generation
    generatedHeadings.value = [
      '🚀 Project Name - Description',
      '✨ Project Name | One-line Description',
      '💫 Project Name: Brief Description'
    ]
  } finally {
    generating.value = false
  }
}

function copyHeading(heading: string) {
  navigator.clipboard.writeText(heading)
}

async function useTemplate(templateId: string) {
  // TODO: Implement template usage
  console.log('Using template:', templateId)
}
</script>
