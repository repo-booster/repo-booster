<template>
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium">Repository Information</h3>
      </template>
  
      <div class="space-y-4">
        <UFormGroup
          label="Repository URL"
          help="Enter the full GitHub repository URL"
        >
          <CommonFormInput
            :model-value="modelValue"
            @update:model-value="$emit('update:modelValue', $event)"
            placeholder="https://github.com/username/repository"
            icon="i-heroicons-link"
          />
        </UFormGroup>
  
        <UFormGroup label="Analysis Options">
          <div class="space-y-2">
            <UCheckbox
              v-model="options.readme"
              label="Include README analysis"
            />
            <UCheckbox
              v-model="options.issues"
              label="Check issue templates"
            />
            <UCheckbox
              v-model="options.wiki"
              label="Analyze wiki pages"
            />
          </div>
        </UFormGroup>
      </div>
    </UCard>
  </template>
  
  <script setup lang="ts">
  interface AnalysisOptions {
    readme: boolean
    issues: boolean
    wiki: boolean
  }
  
  const options = ref<AnalysisOptions>({
    readme: true,
    issues: true,
    wiki: false
  })
  
  defineProps<{
    modelValue: string
  }>()
  
  defineEmits<{
    'update:modelValue': [value: string]
  }>()
  </script>