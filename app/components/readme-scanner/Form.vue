<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">
        Repository Details
      </h3>
    </template>

    <UFormGroup
      label="Repository URL"
      help="Enter the full GitHub repository URL"
    >
      <CommonFormInput
        :model-value="modelValue"
        placeholder="https://github.com/username/repository"
        icon="i-heroicons-link"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </UFormGroup>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
