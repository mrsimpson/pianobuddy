<template>
  <div class="colored-playalong">
    <div class="screen-only">
      <PlaybackControls 
        :playback-service="playbackService"
        v-model="selectedPart"
        :parts="parts"
      />
    </div>
    
    <div 
      class="visualization-container"
      ref="containerRef"
    >
      <NotesVisualization 
        :notes="notesForSelectedPart"
        :current-note-index="currentNoteIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { usePartsExtractor } from '../../composables/usePartsExtractor';
import { useMusicSheetSize } from '../../composables/useMusicSheetSize';
import { PlaybackService } from '../../services/playbackService';
import NotesVisualization from './NotesVisualization.vue';
import PlaybackControls from './PlaybackControls.vue';

const props = defineProps<{
  xmlContent: string;
}>();

const { parts, extractParts } = usePartsExtractor();
const { containerRef } = useMusicSheetSize();
const selectedPart = ref('');
const currentNoteIndex = ref(0);
const playbackService = new PlaybackService();

watch(() => props.xmlContent, () => {
  const extractedParts = extractParts(props.xmlContent);
  parts.value = extractedParts;
  if (extractedParts.length > 0) {
    selectedPart.value = extractedParts[0].id;
  }
}, { immediate: true });

const notesForSelectedPart = computed(() => {
  const part = parts.value.find(p => p.id === selectedPart.value);
  const notes = part?.notes || [];
  playbackService.setNotes(notes);
  return notes;
});

// Set up playback note highlighting
playbackService.onNote((index) => {
  currentNoteIndex.value = index;
});
</script>

<style scoped>
.colored-playalong {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  width: 100%;
  box-sizing: border-box;
}

.visualization-container {
  margin-top: var(--spacing-lg);
  border: 1px solid #eee;
  border-radius: var(--radius-md);
  background: white;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 800px) {
  .colored-playalong {
    padding: var(--spacing-md);
  }
}

@media print {
  .screen-only {
    display: none !important;
  }

  .colored-playalong {
    padding: 0;
    margin: 0;
    box-shadow: none;
  }

  .visualization-container {
    border: none;
    margin: 0;
  }
}
</style>
