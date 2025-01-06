<script setup lang="ts">
import { ref } from 'vue'
import type { Milestone, ProjectStats, OpenRole } from '~/types/roadmap' // Correct import

// State variables
const showAddMilestone = ref(false)
const saving = ref(false)

// Milestone data
const milestones = ref<Milestone[]>([
  {
    id: '1',
    title: 'Core Features',
    description: 'Implement essential functionality',
    status: 'completed',
    current: false,
    targetDate: '2023-12-01',
    tasks: [
      {
        id: '1-1',
        title: 'User Authentication',
        description: 'Implement secure login and registration',
        completed: true,
        difficulty: 'medium'
      }
    ],
    contributors: [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/1'
      }
    ]
  }
])

const projectStats = ref<ProjectStats[]>([
  { label: 'Total Contributors', value: '12' },
  { label: 'Open Tasks', value: '8' },
  { label: 'Completed Milestones', value: '3' }
])

const openRoles = ref<OpenRole[]>([
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'Help improve the user interface and experience',
    skills: ['Vue.js', 'TypeScript', 'Tailwind CSS']
  }
])

// New milestone placeholder
const newMilestone = ref<Partial<Milestone>>({
  title: '',
  description: '',
  targetDate: ''
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy':
      return 'green'
    case 'medium':
      return 'yellow'
    case 'hard':
      return 'red'
    default:
      return 'gray'
  }
}

// Save milestone
async function saveMilestone() {
  saving.value = true
  try {
    milestones.value.push({
      id: String(Date.now()), // Mock ID
      ...newMilestone.value,
      tasks: [],
      contributors: [],
      status: 'planned',
      current: false
    } as Milestone)
    newMilestone.value = { title: '', description: '', targetDate: '' }
    showAddMilestone.value = false
  } finally {
    saving.value = false
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function joinMilestone(id: string) {
  console.log('Joining milestone:', id)
}

function applyForRole(id: string) {
  console.log('Applying for role:', id)
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UPageHeader
        title="Project Roadmap"
        description="Plan and showcase your project's future while attracting contributors"
        class="mb-6"
      />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium">
                  Development Roadmap
                </h3>
                <UButton
                  color="primary"
                  variant="ghost"
                  icon="i-heroicons-plus"
                  @click="showAddMilestone = true"
                >
                  Add Milestone
                </UButton>
              </div>
            </template>
            <div class="space-y-8">
              <div
                v-for="milestone in milestones"
                :key="milestone.id"
                class="relative"
              >
                <div class="absolute top-0 bottom-0 left-2 w-px bg-gray-800" />
                <div class="relative flex gap-4 ml-2">
                  <div
                    class="w-4 h-4 rounded-full bg-primary shrink-0 relative z-10"
                    :class="{ 'ring-4 ring-primary/20': milestone.current }"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium">{{ milestone.title }}</span>
                      <UChip
                        :color="milestone.status === 'completed' ? 'green' : 'yellow'"
                        size="sm"
                      >
                        {{ milestone.status }}
                      </UChip>
                    </div>
                    <p class="text-sm text-gray-500 mb-2">
                      {{ milestone.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">
                Project Stats
              </h3>
            </template>
            <div class="space-y-4">
              <div
                v-for="stat in projectStats"
                :key="stat.label"
                class="flex justify-between items-center"
              >
                <span class="text-sm text-gray-500">{{ stat.label }}</span>
                <span class="font-medium">{{ stat.value }}</span>
              </div>
            </div>
          </UCard>
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">
                Looking for Contributors
              </h3>
            </template>
            <div class="space-y-4">
              <div
                v-for="role in openRoles"
                :key="role.id"
                class="p-3 rounded-lg bg-gray-800/50"
              >
                <div class="font-medium mb-1">
                  {{ role.title }}
                </div>
                <p class="text-sm text-gray-500 mb-2">
                  {{ role.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="skill in role.skills"
                    :key="skill"
                    color="primary"
                    variant="subtle"
                  >
                    {{ skill }}
                  </UBadge>
                </div>
                <UButton
                  class="mt-3"
                  size="sm"
                  block
                  @click="applyForRole(role.id)"
                >
                  Apply
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <UModal v-model="showAddMilestone">
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">
              Add Milestone
            </h3>
          </template>
          <div class="space-y-4">
            <UFormGroup
              label="Title"
              required
            >
              <UInput v-model="newMilestone.title" />
            </UFormGroup>
            <UFormGroup
              label="Description"
              required
            >
              <UTextarea v-model="newMilestone.description" />
            </UFormGroup>
            <UFormGroup
              label="Target Date"
              required
            >
              <UInput
                v-model="newMilestone.targetDate"
                type="date"
              />
            </UFormGroup>
          </div>
          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                color="gray"
                variant="soft"
                @click="showAddMilestone = false"
              >
                Cancel
              </UButton>
              <UButton
                color="primary"
                :loading="saving"
                @click="saveMilestone"
              >
                Save Milestone
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </UDashboardPanel>
  </UDashboardPage>
</template>
