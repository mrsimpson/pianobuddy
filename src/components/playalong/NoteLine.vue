```vue
<template>
  <div class="note-line-container">
    <div class="note-line">
      <slot name="notes"></slot>
    </div>
    <div class="lyrics-container">
      <slot name="lyrics"></slot>
    </div>
  </div>
</template>

<style scoped>
.note-line-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.note-line {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) 0;
  min-height: 60px;
}

.lyrics-container {
  display: flex;
  gap: var(--spacing-lg);
  min-height: 24px;
  padding: 0 0 var(--spacing-md);
}
</style>
```