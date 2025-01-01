<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Select Repository</h3>
        <UButton
          color="primary"
          variant="ghost"
          icon="i-heroicons-plus"
          @click="showAddRepo = true"
        >
          Add Repository
        </UButton>
      </div>
    </template>

    <div v-if="repositories.length" class="space-y-4">
      <div
        v-for="repo in repositories"
        :key="repo.id"
        class="flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        :class="{ 'border-2 border-primary': modelValue === repo.id }"
        @click="$emit('update:modelValue', repo.id)"
      >
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-book-open" class="w-5 h-5 text-primary" />
          <div>
            <div class="font-medium">{{ repo.name }}</div>
            <div class="text-sm text-gray-400">{{ repo.description }}</div>
          </div>
        </div>
        <UBadge v-if="repo.private" color="yellow">Private</UBadge>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-500">
      <UIcon name="i-heroicons-book-open" class="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>No repositories found</p>
      <p class="text-sm mt-2">Add a repository to get started</p>
    </div>

    <!-- Add Repository Modal -->
    <UModal v-model="showAddRepo">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Add Repository</h3>
        </template>

        <UFormGroup
          label="Repository URL"
          help="Enter the full GitHub repository URL"
        >
          <UInput
            v-model="newRepoUrl"
            placeholder="https://github.com/username/repository"
            icon="i-heroicons-link"
          />
        </UFormGroup>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="soft"
              @click="showAddRepo = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              :loading="adding"
              @click="handleAddRepo"
            >
              Add Repository
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </UCard>
</template>

<script setup lang="ts">
interface Repository {
  id: string
  name: string
  description?: string
  private: boolean
}

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Mock repositories data - replace with actual data from your API
const repositories = ref<Repository[]>([
  {
    id: '1',
    name: 'awesome-project',
    description: 'A collection of awesome things',
    private: false
  },
  {
    id: '2',
    name: 'private-repo',
    description: 'Private repository',
    private: true
  }
])

const showAddRepo = ref(false)
const newRepoUrl = ref('')
const adding = ref(false)

async function handleAddRepo() {
  if (!newRepoUrl.value) return

  adding.value = true
  try {
    // TODO: Implement repository addition logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock adding a new repository
    repositories.value.push({
      id: String(repositories.value.length + 1),
      name: newRepoUrl.value.split('/').pop() || '',
      description: 'New repository',
      private: false
    })

    showAddRepo.value = false
    newRepoUrl.value = ''
  } finally {
    adding.value = false
  }
}
</script>