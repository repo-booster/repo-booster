<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

const links = [
  {
    id: 'home',
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H']
    }
  },
  {
    id: 'features',
    label: 'Features',
    icon: 'i-heroicons-cube',
    to: '/features',
    children: [
      { label: 'Star Growth', icon: 'i-heroicons-star', to: '/features/star-growth' },
      { label: 'Traffic Insights', icon: 'i-heroicons-globe-alt', to: '/features/analytics' },
      { label: 'README Scanner', icon: 'i-heroicons-document-text', to: '/features/readme-seo' },
      { label: 'SEO Toolbox', icon: 'i-heroicons-briefcase', to: '/features/seo-toolbox' },
      { label: 'Social Media', icon: 'i-heroicons-share', to: '/features/social-media' },
      { label: 'AI Seo Compare', icon: 'i-heroicons-presentation-chart-line', to: '/features/seo-compare' },
      { label: 'Project Roadmap', icon: 'i-heroicons-map', to: '/features/roadmap' }
    ],
    tooltip: {
      text: 'Features',
      shortcuts: ['G', 'F']
    }
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/settings',
    children: [
      { label: 'General', to: '/settings', exact: true },
      { label: 'Members', to: '/settings/members' },
      { label: 'Notifications', to: '/settings/notifications' }
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S']
    }
  }
]

const footerLinks = [
  {
    label: 'Invite people',
    icon: 'i-heroicons-plus',
    to: '/settings/members'
  },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true)
  }
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts
    }))
  },
  {
    key: 'code',
    label: 'Code',
    commands: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(
            `https://github.com/repo-booster/dashboard/blob/main/pages${
              route.path === '/' ? '/index' : route.path
            }.vue`,
            '_blank'
          )
        }
      }
    ]
  }
]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => defaultColors = colors"
        />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
