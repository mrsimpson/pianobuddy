<template>
  <div ref="visualizationRef" class="notes-visualization">
    <div
      v-for="(line, lineIndex) in groupedNotes"
      :key="`${containerWidth}-${lineIndex}`"
      class="note-line"
    >
      <div class="note-line-content">
        <NoteWithLyric
          v-for="(note, noteIndex) in line"
          :key="noteIndex"
          :note="note"
          :is-current-note="
            isCurrentNote(getGlobalNoteIndex(lineIndex, noteIndex))
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ParsedNote } from '../../types/musicxml';
import NoteWithLyric from './NoteWithLyric.vue';
import { useNoteVisualizer } from '../../composables/useNoteVisualizer';

const props = defineProps<{
  notes: ParsedNote[];
  currentNoteIndex: number;
  containerWidth: number;
}>();

const { getDurationWidth } = useNoteVisualizer();
const visualizationRef = ref<HTMLElement | null>(null);

// Group notes into lines based on total width
const groupedNotes = computed(() => {
  const lines: ParsedNote[][] = [];
  let currentLine: ParsedNote[] = [];
  let currentWidth = 0;
  const padding = 32; // Account for padding
  const gap = 16; // Account for gap between notes
  const maxWidth = Math.max(300, props.containerWidth - padding * 2); // Minimum width of 300px

  props.notes.forEach((note) => {
    const noteWidth = getDurationWidth(note.duration) + gap;

    if (currentWidth + noteWidth > maxWidth) {
      lines.push([...currentLine]);
      currentLine = [note];
      currentWidth = noteWidth;
    } else {
      currentLine.push(note);
      currentWidth += noteWidth;
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
});

// Force re-render when width changes
watch(
  () => props.containerWidth,
  () => {
    if (visualizationRef.value) {
      visualizationRef.value.style.opacity = '0';
      setTimeout(() => {
        if (visualizationRef.value) {
          visualizationRef.value.style.opacity = '1';
        }
      }, 50);
    }
  },
);

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
</script>

<style scoped>
.notes-visualization {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: #f8f9fa;
  border-radius: var(--radius-md);
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.05s ease-in-out;
}

.note-line {
  width: 100%;
  padding: var(--spacing-md) 0;
}

.note-line-content {
  display: flex;
  align-items: flex-start; /* Align notes to top */
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

@media (max-width: 800px) {
  .notes-visualization {
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
  }

  .note-line {
    padding: var(--spacing-sm) 0;
  }
}
</style>
