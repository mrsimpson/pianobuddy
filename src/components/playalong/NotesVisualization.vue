<template>
  <div class="notes-visualization">
    <div 
      v-for="(line, lineIndex) in groupedNotes" 
      :key="lineIndex"
      class="note-line"
    >
      <NoteBar 
        v-for="(note, noteIndex) in line" 
        :key="noteIndex"
        :note="note"
        :class="{ 
          'current-note': isCurrentNote(getGlobalNoteIndex(lineIndex, noteIndex))
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ParsedNote } from '../../types/musicxml';
import NoteBar from './NoteBar.vue';
import { useNoteVisualizer } from '../../composables/useNoteVisualizer';

const props = defineProps<{
  notes: ParsedNote[];
  currentNoteIndex: number;
}>();

const { getDurationWidth } = useNoteVisualizer();

// Group notes into lines based on total width
const groupedNotes = computed(() => {
  const lines: ParsedNote[][] = [];
  let currentLine: ParsedNote[] = [];
  let currentWidth = 0;
  const maxWidth = 900;

  props.notes.forEach(note => {
    const noteWidth = getDurationWidth(note.duration);
    
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
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: #f8f9fa;
  border-radius: var(--radius-md);
  min-height: 100px;
  overflow-x: auto;
}

.note-line {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl) 0;
  min-height: 60px;
}

:deep(.current-note) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  outline: 2px solid var(--primary);
}
</style>