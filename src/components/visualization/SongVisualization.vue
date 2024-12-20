<template>
  <div class="song-visualization">
    <div class="visualization-container">
      <div v-for="(note, index) in notes" :key="index" class="note-container">
        <NoteBar
          :note="note.pitch"
          :color="getNoteColor(note.pitch)"
          :duration="note.duration"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteBar from './../playalong/NoteBar.vue';
import { pianoKeys } from '../../types/piano';
import type { ParsedNote } from '../../types/musicxml';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  notes: ParsedNote[];
}>();

const getNoteColor = (pitch: string): string => {
  const key = pianoKeys.find((k) => k.name.startsWith(pitch));
  return key?.color || '#999999';
};
</script>

<style scoped>
.song-visualization {
  width: 100%;
  overflow-x: auto;
}

.visualization-container {
  min-width: min-content;
  padding: 1rem;
}

.note-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
</style>
