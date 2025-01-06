<script setup lang="ts">
import { computed, ref } from 'vue'
import Accounts from '~/components/social-media/Accounts.vue'

// Connected Accounts Data
const connectedAccounts = ref([
  { platform: 'twitter', username: '@repobooster', connected: true },
  { platform: 'linkedin', username: 'Repo Booster', connected: true },
  { platform: 'facebook', username: null, connected: false }
])

// Scheduled Posts Data
const scheduledPosts = ref([
  {
    platform: 'twitter',
    content: 'Check out our latest release!',
    scheduledFor: '2024-02-25T10:00:00Z',
    status: 'scheduled'
  },
  {
    platform: 'linkedin',
    content: 'New features announcement',
    scheduledFor: '2024-02-26T15:00:00Z',
    status: 'draft'
  }
])

// Social Media Stats
const socialStats = ref([
  { label: 'Total Followers', value: '2.5K' },
  { label: 'Monthly Engagement', value: '12%' },
  { label: 'Link Clicks', value: '345' }
])

// Content Suggestions
const contentSuggestions = ref([
  'Share your latest release notes',
  'Highlight a key feature',
  'Ask for community feedback'
])

// Computed: Check if at least one account is connected
const hasConnectedAccount = computed(() => {
  return connectedAccounts.value.some(account => account.connected)
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <!-- Navbar -->
      <UDashboardNavbar title="Social Media Integration" />

      <!-- Page Header -->
      <UPageHeader
        title="Social Media Integration"
        description="Connect and automate your social media presence"
        class="mb-6"
      />

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto h-full">
        <!-- Connected Accounts Section -->
        <div class="lg:col-span-2 space-y-6">
          <Accounts :accounts="connectedAccounts" />

          <!-- Conditional Content -->
          <div
            v-if="hasConnectedAccount"
            class="space-y-6"
          >
            <!-- Scheduled Posts -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  Scheduled Posts
                </h3>
              </template>
              <ul class="space-y-3">
                <li
                  v-for="post in scheduledPosts"
                  :key="post.scheduledFor"
                  class="flex flex-col p-3 rounded bg-gray-800/50"
                >
                  <div class="font-medium capitalize">
                    {{ post.platform }}
                  </div>
                  <p class="text-sm text-gray-500 mb-2">
                    {{ post.content }}
                  </p>
                  <div class="text-xs text-gray-400">
                    Scheduled For: {{ new Date(post.scheduledFor).toLocaleString() }}
                  </div>
                </li>
              </ul>
            </UCard>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Conditional Sidebar Content -->
          <template v-if="hasConnectedAccount">
            <!-- Social Media Stats -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  Social Media Stats
                </h3>
              </template>
              <div class="space-y-3">
                <div
                  v-for="stat in socialStats"
                  :key="stat.label"
                  class="flex justify-between items-center"
                >
                  <span class="text-sm text-gray-500">{{ stat.label }}</span>
                  <span class="font-medium">{{ stat.value }}</span>
                </div>
              </div>
            </UCard>

            <!-- Content Suggestions -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-medium">
                  Content Suggestions
                </h3>
              </template>
              <ul class="space-y-3">
                <li
                  v-for="suggestion in contentSuggestions"
                  :key="suggestion"
                  class="flex gap-3 items-start"
                >
                  <UIcon
                    name="i-heroicons-light-bulb"
                    class="w-5 h-5 text-yellow-500"
                  />
                  <span class="text-sm">{{ suggestion }}</span>
                </li>
              </ul>
            </UCard>
          </template>

          <!-- Message for No Connected Accounts -->
          <template v-else>
            <UCard>
              <div class="p-6 text-center text-gray-500">
                <p>No connected accounts.</p>
                <p class="mt-2">
                  Connect at least one account to access more features.
                </p>
              </div>
            </UCard>
          </template>
        </div>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
