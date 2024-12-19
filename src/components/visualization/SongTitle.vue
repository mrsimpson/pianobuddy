<template>
  <div class="song-title">
    <h1>{{ title || 'Song from Editor' }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.song-title {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  color: #333;
}
</style>
