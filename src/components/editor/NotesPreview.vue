<template>
  <div class="notes-preview">
    <h2>Preview</h2>
    <div class="notes-grid">
      <div v-for="(note, index) in notes" :key="index" class="note-item">
        <div class="note-pitch">{{ note.pitch }}{{ note.octave }}</div>
        <div class="note-duration">Duration: {{ note.duration }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ParsedNote} from '../../types/musicxml';

defineProps<{
  notes: ParsedNote[];
}>();
</script>

<style scoped>
.notes-preview {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.notes-preview h2 {
  margin-bottom: 1rem;
  color: #333;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.note-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}

.note-pitch {
  font-size: 1.25rem;
  font-weight: bold;
  color: #42b883;
}

.note-duration {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}
</style>
