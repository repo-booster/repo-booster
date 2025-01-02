<template>
  <div class="reset-password-page">
    <h1>Reset Password</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      >
      <button type="submit">
        Reset Password
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

function handleSubmit() {
  alert(`Password reset link sent to ${email.value}`)
}
</script>

  <style scoped>
  .reset-password-page {
    max-width: 400px;
    margin: 50px auto;
    text-align: center;
  }
  </style>
