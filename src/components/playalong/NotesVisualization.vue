<template>
  <div ref="containerRef" class="notes-visualization">
    <div class="notes-content">
      <NoteWithLyric
        v-for="(note, index) in props.notes"
        :key="index"
        :is-current-note="isCurrentNote(index)"
        :note="note"
      />
      <template v-for="breakIndex in breakIndices" :key="`break-${breakIndex}`">
        <div class="break"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { ParsedNote } from '../../types/musicxml';
import NoteWithLyric from './NoteWithLyric.vue';
import { useMusicSheetSize } from '../../composables/useMusicSheetSize';

const props = defineProps<{
  notes: ParsedNote[];
  currentNoteIndex: number;
}>();

const { containerRef, updateWidth } = useMusicSheetSize();
const containerWidth = ref(0);

const updateContainerWidth = () => {
  if (containerRef.value) {
    const width = containerRef.value.offsetWidth;
    containerWidth.value = width - 48; // Account for padding
  }
};

const breakIndices = computed(() => {
  return []; // we don't need manual breaks for now. Keeping the method for future reference
});

const isCurrentNote = (index: number): boolean => {
  return index === props.currentNoteIndex;
};

const debouncedResize = () => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      updateContainerWidth();
      updateWidth();
    }, 150);
  };
};

onMounted(() => {
  updateContainerWidth();
  window.addEventListener('resize', debouncedResize());
});

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize());
});
</script>

<style scoped>
.notes-visualization {
  background: #f8f9fa;
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.notes-content {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  min-height: 100px;
  width: 100%;
  transform-origin: left top;
  padding: var(--spacing-xl) 0;
}

.break {
  flex-basis: 100%;
  height: 0;
  margin: 0;
  padding: calc(var(--spacing-xl) / 2) 0;
}

@media (max-width: 800px) {
  .notes-visualization {
    padding: var(--spacing-sm);
  }

  .notes-content {
    gap: var(--spacing-md);
    padding: var(--spacing-md) 0;
  }

  .break {
    padding: calc(var(--spacing-md) / 2) 0;
  }
}
</style>
