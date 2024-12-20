<template>
  <div ref="containerRef" class="notes-visualization">
    <div class="notes-content">
      <div
        v-for="(line, lineIndex) in groupedNotes"
        :key="lineIndex"
        :style="{ transform: `scale(${scaleFactor})` }"
        class="note-line"
      >
        <NoteWithLyric
          v-for="(note, noteIndex) in line"
          :key="noteIndex"
          :is-current-note="
            isCurrentNote(getGlobalNoteIndex(lineIndex, noteIndex))
          "
          :note="note"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { ParsedNote } from '../../types/musicxml';
import NoteWithLyric from './NoteWithLyric.vue';
import { useNoteVisualizer } from '../../composables/useNoteVisualizer';
import { useMusicSheetSize } from '../../composables/useMusicSheetSize';

const props = defineProps<{
  notes: ParsedNote[];
  currentNoteIndex: number;
}>();

const { getDurationWidth } = useNoteVisualizer();
const { containerRef, getScaleFactor, updateWidth } = useMusicSheetSize();
const containerWidth = ref(0);
const scaleFactor = computed(() => getScaleFactor());

const updateContainerWidth = () => {
  if (containerRef.value) {
    const width = containerRef.value.offsetWidth;
    // Account for padding in the width calculation
    containerWidth.value = width - 48; // 24px padding on each side
  }
};

const groupedNotes = computed(() => {
  const lines: ParsedNote[][] = [];
  let currentLine: ParsedNote[] = [];
  let currentWidth = 0;
  // Ensure minimum width and account for scale factor
  const maxWidth = Math.max(600, containerWidth.value / scaleFactor.value);

  props.notes.forEach((note) => {
    const noteWidth = getDurationWidth(note.duration);
    const spacing = 24; // Gap between notes

    if (currentWidth + noteWidth + spacing > maxWidth) {
      lines.push([...currentLine]);
      currentLine = [note];
      currentWidth = noteWidth + spacing;
    } else {
      currentLine.push(note);
      currentWidth += noteWidth + spacing;
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
});

const getGlobalNoteIndex = (lineIndex: number, noteIndex: number): number => {
  let index = noteIndex;
  for (let i = 0; i < lineIndex; i++) {
    index += groupedNotes.value[i].length;
  }
  return index;
};

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

watch(containerWidth, () => {
  updateWidth();
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
  flex-direction: column;
  gap: var(--spacing-xl);
  min-height: 100px;
  width: 100%;
  overflow-x: auto;
}

.note-line {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl) 0;
  min-height: 60px;
  transform-origin: left center;
  min-width: min-content;
}

@media (max-width: 800px) {
  .notes-visualization {
    padding: var(--spacing-sm);
  }

  .notes-content {
    gap: var(--spacing-md);
  }

  .note-line {
    padding: var(--spacing-md) 0;
  }
}
</style>
