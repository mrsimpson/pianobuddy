```vue
<template>
  <div 
    class="note-with-lyric"
    :style="{ width: `${getDurationWidth(note.duration)}px` }"
  >
    <NoteBar 
      :note="note"
      :class="{ 'current-note': isCurrentNote }"
    />
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
  align-items: center;
  gap: var(--spacing-sm);
  min-width: 40px;
}

.lyric {
  font-size: 0.9rem;
  color: var(--text);
  text-align: center;
  padding: 0 var(--spacing-xs);
}

:deep(.current-note) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  outline: 2px solid var(--primary);
}
</style>
```