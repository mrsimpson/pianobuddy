```vue
<template>
  <div 
    class="note-lyric"
    :style="{ width: `${width}px` }"
  >
    <slot>{{ content }}</slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  width: number;
  content?: string;
}>();
</script>

<style scoped>
.note-lyric {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text);
  text-align: center;
  padding: 0 var(--spacing-xs);
}
</style>
```
