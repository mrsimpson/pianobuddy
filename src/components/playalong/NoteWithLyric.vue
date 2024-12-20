<template>
  <div 
    class="note-with-lyric"
    :style="{ width: `${getDurationWidth(note.duration)}px` }"
  >
    <div class="note-container">
      <NoteBar 
        :note="note"
        :class="{ 'current-note': isCurrentNote }"
      />
    </div>
    <div class="lyric" v-if="note.lyric">
      {{ note.lyric }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedNote } from '../../types/musicxml';
import NoteBar from './NoteBar.vue';
import { useNoteVisualizer } from '../../composables/useNoteVisualizer';

const props = defineProps<{
  note: ParsedNote;
  isCurrentNote?: boolean;
}>();

const { getDurationWidth } = useNoteVisualizer();
</script>

<style scoped>
.note-with-lyric {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.note-container {
  height: 60px; /* Fixed height for alignment */
  display: flex;
  align-items: flex-start; /* Align notes to top */
}

.lyric {
  font-size: 0.9rem;
  color: var(--text);
  text-align: center;
  max-width: 100%;
  overflow-wrap: break-word;
  min-height: 1.2em; /* Consistent height for lyrics */
}

:deep(.current-note) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  outline: 2px solid var(--primary);
}
</style>