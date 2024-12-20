```vue
<template>
  <div :style="{ width: `${width}px` }" class="note-lyric">
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
