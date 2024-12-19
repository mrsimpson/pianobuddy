<template>
  <div 
    class="note-bar"
    :class="{ 'is-rest': note.isRest }"
    :style="style"
  >
    <div class="note-content">
      <span v-if="!note.isRest" class="note-label">
        {{ formatNoteDisplay }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ParsedNote } from '../../types/musicxml';
import { useNoteVisualizer } from '../../composables/useNoteVisualizer';
import { formatNoteForDisplay } from '../../utils/noteMapping';

const props = defineProps<{
  note: ParsedNote;
}>();

const { getNoteStyle } = useNoteVisualizer();
const style = getNoteStyle(props.note);

const formatNoteDisplay = computed(() => {
  if (props.note.isRest) return '';
  return formatNoteForDisplay(props.note.pitch, props.note.octave);
});</script>

<style scoped>
.note-bar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
}

.note-bar:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.note-bar.is-rest {
  background-color: #f8f9fa;
  border: 1px dashed #ddd;
}

.note-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.note-label {
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  padding: 0 var(--spacing-sm);
  font-size: 0.875rem;
}
</style>
