<template>
  <header class="page-header">
    <h1 class="page-title">{{ title }}</h1>
    <div class="page-actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-lg);
}

.page-title {
  margin: 0;
  font-size: 2rem;
  color: var(--text);
  flex: 1;
}

.page-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .page-title {
    text-align: center;
    margin-bottom: var(--spacing-md);
  }

  .page-actions {
    justify-content: center;
  }
}
</style>