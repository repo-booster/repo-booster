<template>
  <div class="flex items-center justify-center min-h-screen">
    <UCard class="w-full max-w-sm bg-gray-900/40 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-800/50">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        :providers="providers"
        title="Welcome"
        align="top"
        :ui="{
          base: 'text-center',
          footer: 'text-center',
          title: 'text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent',
          description: 'text-gray-400',
          divider: 'before:bg-gray-800 after:bg-gray-800',
          form: 'space-y-4',
          input: 'bg-gray-800/50 border-gray-700 text-gray-200 placeholder-gray-500',
          submitButton: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
        }"
        :submit-button="{
          label: 'Launch',
          trailingIcon: 'i-heroicons-rocket-launch-20-solid'
        }"
        @submit="onSubmit"
      >
        <template #description>
          Your All In One SEO Tools
          <NuxtLink
            to="/signup"
            class="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up
          </NuxtLink>
        </template>

        <template #password-hint>
          <NuxtLink
            to="/reset-password"
            class="text-blue-400 hover:text-blue-300 font-medium"
          >
            Forgot Password?
          </NuxtLink>
        </template>

        <template #footer>
          Terms of Service
          <NuxtLink
            to="/terms"
            class="text-blue-400 hover:text-blue-300 font-medium"
          >
            Agreement
          </NuxtLink>
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useAuthValidation } from '~/composables/useAuthValidation'
import { useAuthProviders } from '~/composables/useAuthProviders'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login - Repo-Booster',
  description: 'Login / Signup to Repo-Booster with our OAuth option such as GitHub, Gitlab & Bitbucket to ensure security through our providers'
})

const { fields } = useLoginFields()
const { validate } = useAuthValidation()
const { providers } = useAuthProviders()

function onSubmit(data: any) {
  console.log('Launching...', data)
}
</script>
