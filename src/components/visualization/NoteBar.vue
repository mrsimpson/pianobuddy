<template>
  <div
    class="note-bar"
    :style="{
      backgroundColor: color,
      width: `${duration * 50}px`,
    }"
  >
    <span class="note-label">{{ note }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  note: string;
  color: string;
  duration: number;
}>();
</script>

<style scoped>
.note-bar {
  height: 40px;
  min-width: 50px;
  margin: 4px 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  transition: width 0.3s ease;
}

.note-label {
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}
</style>
