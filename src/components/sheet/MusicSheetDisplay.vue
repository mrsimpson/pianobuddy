<template>
  <div class="music-sheet-display">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div ref="containerRef" class="sheet-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const props = defineProps<{
  xmlContent: string;
}>();

const emit = defineEmits<{
  (e: 'rendered'): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const error = ref<string>('');
const osmd = ref<OpenSheetMusicDisplay | null>(null);
const isInitialized = ref(false);

const renderScore = async () => {
  if (!osmd.value || !props.xmlContent || !isInitialized.value) return;

  error.value = '';

  try {
    await osmd.value.load(props.xmlContent);
    await osmd.value.render();
    emit('rendered');
  } catch (err) {
    console.error('Error rendering score:', err);
    error.value =
      'Error rendering the music sheet. Please check if the MusicXML is valid.';
  }
};

const initializeOSMD = async () => {
  if (!containerRef.value) return;

  try {
    if (osmd.value) {
      osmd.value.clear();
    }

    osmd.value = new OpenSheetMusicDisplay(containerRef.value, {
      autoResize: true,
      drawTitle: false,
      drawSubtitle: false,
      drawComposer: false,
      drawLyricist: false,
      drawCredits: false,
      drawPartNames: false,
    });

    isInitialized.value = true;

    if (props.xmlContent) {
      await renderScore();
    }
  } catch (err) {
    console.error('Error initializing OSMD:', err);
    error.value = 'Failed to initialize music sheet display';
  }
};

watch(
  () => props.xmlContent,
  async () => {
    if (isInitialized.value) {
      await renderScore();
    }
  },
);

onMounted(initializeOSMD);

onUnmounted(() => {
  if (osmd.value) {
    osmd.value.clear();
  }
  isInitialized.value = false;
});

defineExpose({
  osmd,
  isInitialized,
  renderScore,
});
</script>

<style scoped>
.music-sheet-display {
  background-color: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
  width: 100%;
}

.sheet-container {
  min-height: 200px;
}

.error-message {
  color: var(--danger);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background-color: #fee;
  border-radius: var(--radius-sm);
  text-align: center;
}

@media (max-width: 800px) {
  .music-sheet-display {
    padding: var(--spacing-sm);
  }
}
</style>
