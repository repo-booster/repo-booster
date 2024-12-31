<template>
  <div>
    <h1>Repo-Booster</h1>

    <div>
      <label>
        <input
          v-model="isAuthenticated"
          type="checkbox"
        >
      </label>
    </div>

    <div>
      <input
        v-model="owner"
        placeholder="GitHub Owner"
      >
      <input
        v-model="repo"
        placeholder="Repository Name"
      >
      <button @click="fetchData">
        Analyze
      </button>
    </div>

    <div v-if="repoDetails">
      <h2>{{ repoDetails.name }}</h2>
      <p>{{ repoDetails.description }}</p>
      <p>Stars: {{ repoDetails.stargazers_count }}</p>
      <p>Forks: {{ repoDetails.forks_count }}</p>
    </div>

    <div v-if="keywords.length">
      <h2>Keyword Suggestions</h2>
      <ul>
        <li
          v-for="keyword in keywords"
          :key="keyword"
        >
          {{ keyword }}
        </li>
      </ul>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage">
      <p style="color: red;">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGithubApi } from '@/composables/useGithubApi'
import { useSeoApi } from '@/composables/useSeoApi'

// Initialize composables
const { fetchRepoDetails, fetchReadme } = useGithubApi()
const { fetchKeywordData } = useSeoApi()

// Data properties
const owner = ref('')
const repo = ref('')
const repoDetails = ref(null)
const readmeContent = ref('')
const keywords = ref([])
const errorMessage = ref('')
const isAuthenticated = ref(false)

const fetchData = async () => {
  errorMessage.value = ''
  if (!owner.value || !repo.value) {
    errorMessage.value = 'Please provide both owner and repository name.'
    return
  }

  try {
    const token = isAuthenticated.value ? 'your-authenticated-token' : '' // Use guest/auth token
    repoDetails.value = await fetchRepoDetails(owner.value, repo.value, token)
    readmeContent.value = await fetchReadme(owner.value, repo.value, token)
    keywords.value = await fetchKeywordData(readmeContent.value)
  } catch (error) {
    errorMessage.value = 'Error fetching data. Please check the repository details or try again later.'
    console.error(error)
  }
}
</script>

<style scoped>
/* Add any specific styles */
</style>
