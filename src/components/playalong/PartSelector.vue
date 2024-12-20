<template>
  <div class="part-selector">
    <label for="part-select">Select Part:</label>
    <select
      id="part-select"
      :value="modelValue"
      class="part-select"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option v-for="part in parts" :key="part.id" :value="part.id">
        {{ part.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { PartInfo } from '../../types/musicxml';

defineProps<{
  modelValue: string;
  parts: PartInfo[];
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped>
.part-selector {
  margin-bottom: var(--spacing-lg);
}

.part-select {
  margin-left: var(--spacing-sm);
  padding: var(--spacing-sm);
  border: 1px solid #ddd;
  border-radius: var(--radius-sm);
  font-size: 1rem;
}
</style>
