<template>
  <div class="min-h-screen flex flex-col">
    <!-- Page Header -->
    <UPageHeader
      title="README Scanner"
      description="Analyze and optimize your repository's README file"
      class="mb-6"
    />

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      <!-- Scanner and Results -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Scanner Form -->
        <ReadmeScannerForm v-model="repoUrl" />

        <!-- Results -->
        <div v-if="results" class="space-y-6">
          <ReadmeScannerResults :results="results" />
        </div>
      </div>

      <!-- Tools and Templates Panel -->
      <div class="space-y-6">
        <!-- Tools -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">README Tools</h3>
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
                  <div class="font-medium">{{ tool.name }}</div>
                  <div class="text-sm text-gray-500">{{ tool.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Templates -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">README Templates</h3>
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
                  <div class="font-medium">{{ template.name }}</div>
                  <div class="text-sm text-gray-500">{{ template.description }}</div>
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

    <!-- Modals -->
    <UModal v-model="showHeadingGenerator">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Heading Generator</h3>
        </template>
        <div class="space-y-4">
          <UTextarea
            v-model="headingInput"
            placeholder="Choose Which Repository Then Press Scan"
            :rows="4"
          />
          <div
            v-if="generatedHeadings"
            class="space-y-2"
          >
            <div
              v-for="(heading, index) in generatedHeadings"
              :key="index"
              class="p-2 rounded bg-gray-800/50 cursor-pointer hover:bg-gray-800"
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
  }
]

// README templates
const templates = [
  {
    id: 'standard',
    name: 'Standard Project',
    description: 'Basic project template',
    icon: 'i-heroicons-document-text'
  }
]

// Best practices
const bestPractices = [
  'Include a clear project description',
  'Add installation instructions'
]

// Heading generator state
const showHeadingGenerator = ref(false)
const headingInput = ref('')
const generating = ref(false)
const generatedHeadings = ref<string[]>([])

function activateTool(toolId: string) {
  if (toolId === 'heading-generator') {
    showHeadingGenerator.value = true
  }
}

async function generateHeadings() {
  if (!headingInput.value) return
  generating.value = true
  try {
    generatedHeadings.value = [
      '🚀 Project Name - Description',
      '✨ Project Name | One-line Description'
    ]
  } finally {
    generating.value = false
  }
}
</script>
