<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Connected Accounts</h3>
        <UButton
          color="primary"
          variant="ghost"
          icon="i-heroicons-plus"
          @click="showConnectModal = true"
        >
          Add Account
        </UButton>
      </div>
    </template>

    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li
        v-for="account in accounts"
        :key="account.platform"
        class="py-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <UIcon
            :name="platformIcon(account.platform)"
            class="w-6 h-6"
          />
          <div>
            <div class="font-medium">{{ platformName(account.platform) }}</div>
            <div class="text-sm text-gray-500">
              {{ account.username || 'Not connected' }}
            </div>
          </div>
        </div>
        <UButton
          :color="account.connected ? 'red' : 'primary'"
          variant="ghost"
          size="sm"
          @click="toggleConnection(account)"
        >
          {{ account.connected ? 'Disconnect' : 'Connect' }}
        </UButton>
      </li>
    </ul>

    <UModal v-model="showConnectModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">Connect Social Account</h3>
        </template>
        <!-- Modal content here -->
      </UCard>
    </UModal>
  </UCard>
</template>

<script setup lang="ts">
interface SocialAccount {
  platform: string
  username: string | null
  connected: boolean
}

const props = defineProps<{
  accounts: SocialAccount[]
}>()

const showConnectModal = ref(false)

const accounts = ref([
  { platform: 'twitter', username: null, connected: false },
  { platform: 'linkedin', username: null, connected: false },
  { platform: 'github', username: null, connected: false },
  { platform: 'gitlab', username: null, connected: false },
  { platform: 'bitbucket', username: null, connected: false },
  { platform: 'medium', username: null, connected: false },
  { platform: 'devto', username: null, connected: false },
  { platform: 'instagram', username: null, connected: false },
  { platform: 'hackernews', username: null, connected: false }
])

function platformIcon(platform: string): string {
  const icons: Record<string, string> = {
    twitter: 'i-simple-icons-twitter',
    linkedin: 'i-simple-icons-linkedin',
    github: 'i-simple-icons-github',
    gitlab: 'i-simple-icons-gitlab',
    bitbucket: 'i-simple-icons-bitbucket',
    medium: 'i-simple-icons-medium',
    devto: 'i-simple-icons-devdotto',
    instagram: 'i-simple-icons-instagram',
    hackernews: 'i-simple-icons-ycombinator'
  }
  return icons[platform] || 'i-heroicons-bookmark'
}

function platformName(platform: string): string {
  const names: Record<string, string> = {
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    bitbucket: 'Bitbucket',
    medium: 'Medium',
    devto: 'Dev.to',
    instagram: 'Instagram',
    hackernews: 'Hacker News'
  }
  return names[platform] || platform
}

function toggleConnection(account: SocialAccount) {
  // TODO: Implement connection toggle logic
  console.log('Toggle connection for', account.platform)
}
</script>