<script setup lang="ts">
const links = [[{
  label: 'General',
  icon: 'i-heroicons-user-circle',
  to: '/settings',
  exact: true
}, {
  label: 'Members',
  icon: 'i-heroicons-user-group',
  to: '/settings/members'
}, {
  label: 'Notifications',
  icon: 'i-heroicons-bell',
  to: '/settings/notifications'
}], [{
  label: 'Documentation',
  icon: 'i-heroicons-book-open',
  to: 'https://docs.repo-booster.com/',
  target: '_blank'
}, {
  label: 'Upgrade now',
  icon: 'i-heroicons-credit-card',
  to: 'https://repo-booster.com/pricing',
  target: '_blank'
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Settings" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
