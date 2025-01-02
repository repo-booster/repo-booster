<template>
  <ClientOnly>
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0">
        <Star
          v-for="(star, index) in stars"
          :key="index"
          :star="star"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { generateStars } from '~/utils/stars'
import Star from '~/components/stars/Star.vue'

const stars = ref<ReturnType<typeof generateStars>>([])

onMounted(() => {
  stars.value = generateStars(150)
})
</script>
