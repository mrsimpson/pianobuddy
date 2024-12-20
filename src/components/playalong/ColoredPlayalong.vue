<template>
  <div class="colored-playalong">
    <div class="screen-only">
      <PlaybackControls
        v-model="selectedPart"
        :playback-service="playbackService"
        :parts="parts"
      />
    </div>

    <div ref="containerRef" class="visualization-container">
      <NotesVisualization
        :notes="notesForSelectedPart"
        :current-note-index="currentNoteIndex"
        :container-width="containerWidth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from 'vue';
import {usePartsExtractor} from '../../composables/usePartsExtractor';
import {PlaybackService} from '../../services/playbackService';
import NotesVisualization from './NotesVisualization.vue';
import PlaybackControls from './PlaybackControls.vue';

const props = defineProps<{
  xmlContent: string;
}>();

const { parts, extractParts } = usePartsExtractor();
const containerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const selectedPart = ref('');
const currentNoteIndex = ref(0);
const playbackService = new PlaybackService();

const updateContainerWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }
};

// Debounce the resize handler
const debouncedResize = () => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(updateContainerWidth, 150);
  };
};

watch(
  () => props.xmlContent,
  () => {
    const extractedParts = extractParts(props.xmlContent);
    parts.value = extractedParts;
    if (extractedParts.length > 0) {
      selectedPart.value = extractedParts[0].id;
    }
  },
  {immediate: true},
);

const notesForSelectedPart = computed(() => {
  const part = parts.value.find((p) => p.id === selectedPart.value);
  const notes = part?.notes || [];
  playbackService.setNotes(notes);
  return notes;
});

// Set up playback note highlighting
playbackService.onNote((index) => {
  currentNoteIndex.value = index;
});

onMounted(() => {
  updateContainerWidth();
  window.addEventListener('resize', debouncedResize());
});

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize());
});
</script>

<style scoped>
.colored-playalong {
  background: white;
  padding: var(--spacing-lg);
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
