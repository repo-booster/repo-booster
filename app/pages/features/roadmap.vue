<template>
  <div>
    <UPageHeader
      title="Project Roadmap"
      description="Plan and showcase your project's future while attracting contributors"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Roadmap -->
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
              <!-- Timeline Line -->
              <div class="absolute top-0 bottom-0 left-2 w-px bg-gray-800" />

              <!-- Milestone -->
              <div class="relative flex gap-4 ml-2">
                <div
                  class="w-4 h-4 rounded-full bg-primary shrink-0 relative z-10"
                  :class="{
                    'ring-4 ring-primary/20': milestone.current
                  }"
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
                  <!-- Tasks -->
                  <div class="space-y-2">
                    <div
                      v-for="task in milestone.tasks"
                      :key="task.id"
                      class="flex items-start gap-2 p-2 rounded-lg bg-gray-800/50"
                    >
                      <UCheckbox
                        v-model="task.completed"
                        :disabled="!isAdmin"
                      />
                      <div class="flex-1">
                        <div class="font-medium text-sm">
                          {{ task.title }}
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ task.description }}
                        </div>
                      </div>
                      <UBadge
                        v-if="task.difficulty"
                        :colors="getDifficultyColor(task.difficulty)"
                      >
                        {{ task.difficulty }}
                      </UBadge>
                    </div>
                  </div>

                  <!-- Contributors -->
                  <div class="mt-4 flex items-center gap-2">
                    <div class="flex -space-x-2">
                      <img>
                      v-for="contributor in milestone.contributors"
                      :key="contributor.id"
                      :src="contributor.avatar"
                      :alt="contributor.name"
                      class="w-6 h-6 rounded-full ring-2 ring-gray-900"
                      />
                    </div>
                    <UButton
                      v-if="milestone.status !== 'completed'"
                      color="primary"
                      variant="ghost"
                      size="xs"
                      @click="joinMilestone(milestone.id)"
                    >
                      Join
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Project Stats -->
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

        <!-- Looking for Contributors -->
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

        <!-- Contribution Guidelines -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">
              How to Contribute
            </h3>
          </template>
          <ul class="space-y-3">
            <li
              v-for="(guideline, index) in guidelines"
              :key="index"
              class="flex gap-3"
            >
              <UIcon
                name="i-heroicons-check-circle"
                class="w-5 h-5 text-primary shrink-0"
              />
              <span class="text-sm">{{ guideline }}</span>
            </li>
          </ul>
        </UCard>
      </div>
    </div>

    <!-- Add Milestone Modal -->
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
            <UTextarea
              v-model="newMilestone.description"
            />
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
  </div>
</template>

<script setup lang="ts">
const isAdmin = ref(true)
const showAddMilestone = ref(false)
const saving = ref(false)

const newMilestone = ref({
  title: '',
  description: '',
  targetDate: ''
})

const milestones = ref([
  {
    id: '1',
    title: 'Core Features',
    description: 'Implement essential functionality',
    status: 'completed',
    current: false,
    tasks: [
      {
        id: '1-1',
        title: 'User Authentication',
        description: 'Implement secure login and registration',
        completed: true,
        difficulty: 'medium'
      },
      {
        id: '1-2',
        title: 'Database Setup',
        description: 'Configure and optimize database',
        completed: true,
        difficulty: 'hard'
      }
    ],
    contributors: [
      { id: '1', name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/1' }
    ]
  },
  {
    id: '2',
    title: 'Advanced Features',
    description: 'Add advanced capabilities and optimizations',
    status: 'in-progress',
    current: true,
    tasks: [
      {
        id: '2-1',
        title: 'Performance Optimization',
        description: 'Improve application performance',
        completed: false,
        difficulty: 'hard'
      },
      {
        id: '2-2',
        title: 'API Documentation',
        description: 'Create comprehensive API docs',
        completed: false,
        difficulty: 'easy'
      }
    ],
    contributors: [
      { id: '2', name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/2' }
    ]
  }
])

const projectStats = [
  { label: 'Total Contributors', value: '12' },
  { label: 'Open Tasks', value: '8' },
  { label: 'Completed Milestones', value: '3' },
  { label: 'Active Discussions', value: '5' }
]

const openRoles = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'Help improve the user interface and experience',
    skills: ['Vue.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Documentation Writer',
    description: 'Improve project documentation and guides',
    skills: ['Technical Writing', 'Markdown', 'Documentation']
  }
]

const guidelines = [
  'Fork the repository and create a feature branch',
  'Follow the coding style and conventions',
  'Write clear commit messages',
  'Add tests for new features',
  'Update documentation as needed',
  'Submit a pull request with your changes'
]

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'green'
    case 'medium': return 'yellow'
    case 'hard': return 'red'
    default: return 'gray'
  }
}

async function saveMilestone() {
  saving.value = true
  try {
    // TODO: Implement milestone saving logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    showAddMilestone.value = false
  } finally {
    saving.value = false
  }
}

function joinMilestone(milestoneId: string) {
  // TODO: Implement join milestone logic
  console.log('Joining milestone:', milestoneId)
}

function applyForRole(roleId: string) {
  // TODO: Implement role application logic
  console.log('Applying for role:', roleId)
}
</script>
