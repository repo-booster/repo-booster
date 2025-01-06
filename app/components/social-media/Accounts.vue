<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">
          Connected Accounts
        </h3>
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

    <!-- Account List -->
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
            <div class="font-medium">
              {{ platformName(account.platform) }}
            </div>
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

    <!-- Connect Account Modal -->
    <UModal v-model="showConnectModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">
            Connect Social Account
          </h3>
        </template>
        <div class="space-y-4 p-4">
          <label
            for="platform"
            class="block text-sm font-medium text-gray-300"
          >
            Platform
          </label>
          <USelect
            v-model="newAccount.platform"
            :options="platformOptions"
            placeholder="Select a platform"
          />

          <label
            for="username"
            class="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <UInput
            v-model="newAccount.username"
            placeholder="Enter your username"
          />
        </div>
        <template #footer>
          <div class="flex justify-end gap-2 p-4">
            <UButton
              variant="ghost"
              @click="showConnectModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              @click="connectAccount"
            >
              Connect
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SocialAccount {
  platform: string
  username: string | null
  connected: boolean
}

// State
const showConnectModal = ref(false)
const accounts = ref<SocialAccount[]>([
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

// New Account Data
const newAccount = ref<SocialAccount>({
  platform: '',
  username: '',
  connected: false
})

// Platform Options for Modal
const platformOptions = [
  { value: 'twitter', label: 'Twitter' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'gitlab', label: 'GitLab' },
  { value: 'bitbucket', label: 'Bitbucket' },
  { value: 'medium', label: 'Medium' },
  { value: 'devto', label: 'Dev.to' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'hackernews', label: 'Hacker News' }
]

// Utility Methods
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

// Toggle Connection
function toggleConnection(account: SocialAccount) {
  account.connected = !account.connected
  if (!account.connected) {
    account.username = null
  }
  console.log(`${account.platform} is now ${account.connected ? 'connected' : 'disconnected'}`)
}

// Connect New Account
function connectAccount() {
  if (!newAccount.value.platform || !newAccount.value.username) {
    alert('Please select a platform and enter a username.')
    return
  }

  const existingAccount = accounts.value.find(acc => acc.platform === newAccount.value.platform)
  if (existingAccount) {
    existingAccount.username = newAccount.value.username
    existingAccount.connected = true
  } else {
    accounts.value.push({
      ...newAccount.value,
      connected: true
    })
  }

  // Reset new account data and close modal
  newAccount.value = { platform: '', username: '', connected: false }
  showConnectModal.value = false
  console.log('Account connected:', newAccount.value)
}
</script>
