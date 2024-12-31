<template>
  <div>
    <UPageHeader
      title="Social Media Integration"
      description="Connect and automate your social media presence"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Connected Accounts -->
      <div class="lg:col-span-2 space-y-6">
        <SocialMediaAccounts :accounts="connectedAccounts" />
        <SocialMediaScheduler :posts="scheduledPosts" />
      </div>

      <!-- Analytics -->
      <div class="space-y-6">
        <SocialMediaStats :stats="socialStats" />
        <SocialMediaSuggestions :suggestions="contentSuggestions" />
      </div>
    </div>
  </div>
</template>

<script setup>
const connectedAccounts = ref([
  { platform: 'twitter', username: '@repobooster', connected: true },
  { platform: 'linkedin', username: 'Repo Booster', connected: true },
  { platform: 'facebook', username: null, connected: false }
])

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

const socialStats = ref([
  { label: 'Total Followers', value: '2.5K' },
  { label: 'Monthly Engagement', value: '12%' },
  { label: 'Link Clicks', value: '345' }
])

const contentSuggestions = ref([
  'Share your latest release notes',
  'Highlight a key feature',
  'Ask for community feedback'
])
</script>
