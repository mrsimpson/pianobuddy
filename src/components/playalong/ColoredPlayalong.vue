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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { usePartsExtractor } from '../../composables/usePartsExtractor';
import { PlaybackService } from '../../services/playbackService';
import NotesVisualization from './NotesVisualization.vue';
import PlaybackControls from './PlaybackControls.vue';
import { PartParser } from '../../services/parsers/partParser';
import { parseXml } from '../../utils/xmlParser';

const props = defineProps<{
  xmlContent: string;
}>();

const { parts } = usePartsExtractor();
const containerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const selectedPart = ref('');
const currentNoteIndex = ref(-1);
const playbackService = new PlaybackService();

const updateContainerWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }
};

watch(
  () => props.xmlContent,
  () => {
    try {
      const doc = parseXml(props.xmlContent);
      const extractedParts = PartParser.parseAllParts(doc);
      parts.value = extractedParts;

      if (extractedParts.length > 0) {
        selectedPart.value = extractedParts[0].id;
      }
    } catch (error) {
      console.error('Error parsing parts:', error);
    }
  },
  { immediate: true },
);

const notesForSelectedPart = computed(() => {
  const part = parts.value.find((p) => p.id === selectedPart.value);
  const notes = part?.notes || [];
  playbackService.setNotes(notes);
  return notes;
});

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

// Debounce the resize handler
const debouncedResize = () => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(updateContainerWidth, 150);
  };
};
</script>

<style scoped>
/* ... existing styles ... */
</style>
