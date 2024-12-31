import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('~/pages/index.vue')
  },
  {
    path: '/features/star-growth',
    name: 'StarGrowth',
    component: () => import('~/pages/features/star-growth.vue')
  },
  {
    path: '/features/analytics',
    name: 'Analytics',
    component: () => import('~/pages/features/analytics.vue')
  },
  {
    path: '/features/readme-seo',
    name: 'Readme',
    component: () => import('~/pages/features/readme-seo.vue')
  },
  {
    path: '/features/seo-toolbox',
    name: 'SeoToolbox',
    component: () => import('~/pages/features/seo-toolbox.vue')
  },
  {
    path: '/features/social-media',
    name: 'SocialMedia',
    component: () => import('~/pages/features/social-media.vue')
  },
  {
    path: '/features/updates',
    name: 'LatestUpdates',
    component: () => import('~/pages/features/updates.vue')
  },
  {
    path: '/features/roadmap',
    name: 'ProjectRoadmap',
    component: () => import('~/pages/features/roadmap.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('~/pages/settings/index.vue'),
    children: [
      {
        path: 'members',
        name: 'SettingsMembers',
        component: () => import('~/pages/settings/members.vue')
      },
      {
        path: 'notifications',
        name: 'SettingsNotifications',
        component: () => import('~/pages/settings/notifications.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
