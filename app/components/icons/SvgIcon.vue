<template>
  <svg
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path :d="path" />
  </svg>
</template>

<script setup>
defineProps({
  path: {
    type: String,
    required: true
  }
})
</script>
