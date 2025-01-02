import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('~/pages/index.vue')
  },
  {
    path: '/features',
    name: 'Features',
    children: [
      {
        path: 'star-growth',
        name: 'StarGrowth',
        component: () => import('~/pages/features/star-growth.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('~/pages/features/analytics.vue')
      },
      {
        path: 'readme-seo',
        name: 'ReadmeSEO',
        component: () => import('~/pages/features/readme-seo.vue')
      },
      {
        path: 'seo-toolbox',
        name: 'SEOToolbox',
        component: () => import('~/pages/features/seo-toolbox.vue')
      },
      {
        path: 'social-media',
        name: 'SocialMedia',
        component: () => import('~/pages/features/social-media.vue')
      },
      {
        path: 'updates',
        name: 'LatestUpdates',
        component: () => import('~/pages/features/updates.vue')
      },
      {
        path: 'roadmap',
        name: 'ProjectRoadmap',
        component: () => import('~/pages/features/roadmap.vue')
      }
    ]
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
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('~/pages/reset-password.vue')
  },
  {
    path: '/terms',
    name: 'TermsAndConditions',
    component: () => import('~/pages/terms.vue')
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
