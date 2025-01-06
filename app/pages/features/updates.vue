<script setup lang="ts">
const formState = ref({
  url: ''
})

const isAnalyzing = ref(false)
const results = ref<string[]>([])

const analyzeURL = async () => {
  if (!formState.value.url) return

  isAnalyzing.value = true
  results.value = []

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    results.value = [
      'Title tag is optimized',
      'Meta description is present and well-written',
      'URL structure is SEO-friendly',
      'H1 tag is properly used',
      'Content length is sufficient for the topic',
      'Images have appropriate alt text',
      'Internal linking structure is good',
      'Page load speed is within acceptable range',
      'Mobile responsiveness is excellent',
      'Schema markup is correctly implemented'
    ]
  } catch (error) {
    console.error('Error analyzing URL:', error)
  } finally {
    isAnalyzing.value = false
  }
}

useHead({
  title: 'AI SEO Analyzer',
  meta: [
    { name: 'description', content: 'Analyze your website\'s SEO with AI-powered insights' }
  ]
})
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <h1 class="text-xl font-semibold">
          AI SEO Analyzer
        </h1>
      </template>

      <UForm
        :state="formState"
        @submit="analyzeURL"
      >
        <UFormGroup
          label="Enter URL to analyze"
          name="url"
        >
          <UInput
            v-model="formState.url"
            placeholder="https://example.com"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="primary"
          :loading="isAnalyzing"
          :disabled="isAnalyzing"
        >
          {{ isAnalyzing ? 'Analyzing...' : 'Analyze' }}
        </UButton>
      </UForm>

      <template #footer>
        <h2 class="text-lg font-semibold mb-2">
          Analysis Results:
        </h2>
        <UList
          v-if="results.length"
          class="space-y-2"
        >
          <UListItem
            v-for="(result, index) in results"
            :key="index"
          >
            <template #icon>
              <UIcon
                name="i-heroicons-check-circle"
                class="text-green-500"
              />
            </template>
            {{ result }}
          </UListItem>
        </UList>
        <p
          v-else
          class="text-gray-500 italic"
        >
          No analysis results yet.
        </p>
      </template>
    </UCard>
  </UContainer>
</template>
